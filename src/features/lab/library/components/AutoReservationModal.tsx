import { useCallback, useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { useAuth } from '../../../../shared/contexts/AuthContext'
import { useAttendees } from '../hooks/useAttendees'
import { useReserveStudyRoom } from '../hooks/useReserveStudyRoom'
import { DATE_TABS } from '../constants/studyRoomDates'
import { computeEndTime } from '../utils/timeFormat'
import type {
  AttendeeInput,
  StudyRoomReserveRequest,
  StudyRoomReserveResponse,
  UseTimeEnum,
} from '../types/studyRoom'
import styles from './AutoReservationModal.module.css'

// 스터디룸 운영 시간 기준 시작 시간 옵션
const START_TIME_OPTIONS = [
  { value: '0900', label: '09:00' },
  { value: '1000', label: '10:00' },
  { value: '1100', label: '11:00' },
  { value: '1200', label: '12:00' },
  { value: '1300', label: '13:00' },
  { value: '1400', label: '14:00' },
  { value: '1500', label: '15:00' },
  { value: '1600', label: '16:00' },
  { value: '1700', label: '17:00' },
  { value: '1800', label: '18:00' },
  { value: '1900', label: '19:00' },
  { value: '2000', label: '20:00' },
  { value: '2100', label: '21:00' },
]

interface AutoReservationModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  defaultDateIndex: number
}

export default function AutoReservationModal({
  isOpen,
  onClose,
  onSuccess,
  defaultDateIndex,
}: AutoReservationModalProps) {
  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="자동 방 배정"
      >
        <ModalContent
          defaultDateIndex={defaultDateIndex}
          onClose={onClose}
          onSuccess={onSuccess}
        />
      </div>
    </div>
  )
}

interface ModalContentProps {
  defaultDateIndex: number
  onClose: () => void
  onSuccess: () => void
}

function ModalContent({ defaultDateIndex, onClose, onSuccess }: ModalContentProps) {
  const { logout } = useAuth()
  const { attendees, isLoading: attendeesLoading, error: attendeesError, addAttendee, deleteAttendee } =
    useAttendees()
  const { isLoading: reserving, reserve } = useReserveStudyRoom()

  const [dateIndex, setDateIndex] = useState(defaultDateIndex)
  const [startTime, setStartTime] = useState('0900')
  const [useTime, setUseTime] = useState<UseTimeEnum>(60)
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())
  const [newInput, setNewInput] = useState<AttendeeInput>({ student_id: '', name: '' })
  const [showNewForm, setShowNewForm] = useState(false)
  const [addingAttendee, setAddingAttendee] = useState(false)
  const [result, setResult] = useState<StudyRoomReserveResponse | null>(null)

  useEffect(() => {
    if (attendeesError === 'UNAUTHORIZED') logout()
  }, [attendeesError, logout])

  const selectedCount = selectedIds.size
  // 자동 배정 인원 범위: 6인실 최소(3명) ~ 12인실 최대(12명)
  const isCountValid = selectedCount >= 3 && selectedCount <= 12
  const canReserve = !reserving && isCountValid && result === null

  const toggleAttendee = useCallback((id: number): void => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [])

  async function handleAddAttendee(): Promise<void> {
    if (newInput.student_id.trim() === '' || newInput.name.trim() === '') return
    setAddingAttendee(true)
    const added = await addAttendee({
      student_id: newInput.student_id.trim(),
      name: newInput.name.trim(),
    })
    if (added !== null) {
      setSelectedIds((prev) => new Set([...prev, added.id]))
      setNewInput({ student_id: '', name: '' })
      setShowNewForm(false)
    }
    setAddingAttendee(false)
  }

  async function handleReserve(): Promise<void> {
    const selectedAttendees: AttendeeInput[] = attendees
      .filter((a) => selectedIds.has(a.id))
      .map((a) => ({ student_id: a.student_id, name: a.name }))

    const request: StudyRoomReserveRequest = {
      reserve_date: DATE_TABS[dateIndex].dateStr,
      start_time: startTime,
      use_time: useTime,
      auto_select: true,
      attendees: selectedAttendees,
    }

    const response = await reserve(request)
    if (response === null) {
      setResult({
        success: false,
        result_code: 'NETWORK_ERROR',
        result_message: '요청 중 오류가 발생했습니다.',
        room_no: '',
        room_name: '',
      })
      return
    }
    setResult(response)
  }

  const selectedTimeLabel = START_TIME_OPTIONS.find((o) => o.value === startTime)?.label ?? startTime
  const endTimeLabel = computeEndTime(startTime, useTime)

  return (
    <>
      <div className={styles.modalHeader}>
        <div>
          <p className={styles.modalTitle}>자동 방 배정</p>
          <p className={styles.modalSubtitle}>
            {result === null
              ? '조건에 맞는 방을 자동으로 찾아 예약합니다'
              : `${DATE_TABS[dateIndex].label} · ${selectedTimeLabel} ~ ${endTimeLabel}`}
          </p>
        </div>
      </div>

      <div className={styles.modalBody}>
        {/* 날짜 선택 */}
        <div className={styles.section}>
          <span className={styles.sectionLabel}>날짜</span>
          <div className={styles.dateTabs}>
            {DATE_TABS.map((tab, i) => (
              <button
                key={tab.dateStr}
                type="button"
                className={styles.dateTab}
                data-selected={dateIndex === i}
                onClick={() => setDateIndex(i)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 시작 시간 */}
        <div className={styles.section}>
          <span className={styles.sectionLabel}>시작 시간</span>
          <select
            className={styles.timeSelect}
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          >
            {START_TIME_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* 사용 시간 */}
        <div className={styles.section}>
          <span className={styles.sectionLabel}>사용 시간</span>
          <div className={styles.timeOptions}>
            {([60, 120] as UseTimeEnum[]).map((t) => (
              <button
                key={t}
                type="button"
                className={styles.timeOption}
                data-selected={useTime === t}
                onClick={() => setUseTime(t)}
              >
                {t === 60 ? '1시간' : '2시간'}
              </button>
            ))}
          </div>
        </div>

        {/* 참여자 선택 */}
        <div className={styles.section}>
          <span className={styles.sectionLabel}>참여자 (3~12명)</span>

          {attendeesLoading ? (
            <p className={styles.emptyAttendees}>참여자 목록 불러오는 중...</p>
          ) : attendees.length === 0 ? (
            <p className={styles.emptyAttendees}>저장된 참여자가 없습니다.</p>
          ) : (
            <div className={styles.attendeeList}>
              {attendees.map((a) => (
                <div key={a.id} className={styles.attendeeItem} onClick={() => toggleAttendee(a.id)}>
                  <input
                    type="checkbox"
                    className={styles.attendeeCheckbox}
                    checked={selectedIds.has(a.id)}
                    onChange={() => toggleAttendee(a.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span className={styles.attendeeName}>{a.name}</span>
                  <span className={styles.attendeeId}>{a.student_id}</span>
                  <button
                    type="button"
                    className={styles.deleteAttendeeBtn}
                    onClick={(e) => { e.stopPropagation(); void deleteAttendee(a.id) }}
                    aria-label={`${a.name} 삭제`}
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {!showNewForm ? (
            <button
              type="button"
              className={styles.addAttendeeToggle}
              onClick={() => setShowNewForm(true)}
            >
              + 새 참여자 추가
            </button>
          ) : (
            <div className={styles.newAttendeeForm}>
              <div className={styles.formRow}>
                <input
                  type="text"
                  className={styles.formInput}
                  placeholder="학번"
                  value={newInput.student_id}
                  onChange={(e) => setNewInput((p) => ({ ...p, student_id: e.target.value }))}
                  maxLength={20}
                />
                <input
                  type="text"
                  className={styles.formInput}
                  placeholder="이름"
                  value={newInput.name}
                  onChange={(e) => setNewInput((p) => ({ ...p, name: e.target.value }))}
                  maxLength={50}
                />
              </div>
              <div className={styles.formRow}>
                <button
                  type="button"
                  className={styles.addBtn}
                  onClick={() => void handleAddAttendee()}
                  disabled={addingAttendee || newInput.student_id.trim() === '' || newInput.name.trim() === ''}
                >
                  {addingAttendee ? '추가 중...' : '추가'}
                </button>
                <button
                  type="button"
                  className={styles.cancelInlineBtn}
                  onClick={() => { setShowNewForm(false); setNewInput({ student_id: '', name: '' }) }}
                >
                  취소
                </button>
              </div>
            </div>
          )}

          <span
            className={styles.attendeeCount}
            data-valid={isCountValid || selectedCount === 0 ? 'true' : 'false'}
          >
            선택됨: {selectedCount}명
            {!isCountValid && selectedCount > 0 && ' (3~12명 필요)'}
          </span>
        </div>

        {/* 배정 결과 */}
        {result !== null && (
          <div className={styles.resultBox} data-success={result.success}>
            <p className={styles.resultTitle}>{result.success ? '배정 완료' : '배정 실패'}</p>
            <p>{result.result_message}</p>
            {result.success && <p>{result.room_name}</p>}
          </div>
        )}
      </div>

      <div className={styles.modalFooter}>
        <button
          type="button"
          className={styles.cancelBtn}
          onClick={result?.success === true ? onSuccess : onClose}
        >
          {result !== null ? '닫기' : '취소'}
        </button>
        {result === null && (
          <button
            type="button"
            className={styles.reserveBtn}
            onClick={() => void handleReserve()}
            disabled={!canReserve}
          >
            {reserving ? '배정 중...' : '방 배정하기'}
          </button>
        )}
      </div>
    </>
  )
}

