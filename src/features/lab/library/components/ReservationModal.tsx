import { useCallback, useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { useAuth } from '../../../../shared/contexts/AuthContext'
import { useAttendees } from '../hooks/useAttendees'
import { useReserveStudyRoom } from '../hooks/useReserveStudyRoom'
import type {
  AttendeeInput,
  StudyRoom,
  StudyRoomReserveRequest,
  StudyRoomReserveResponse,
  StudyRoomSlot,
  UseTimeEnum,
} from '../types/studyRoom'
import styles from './ReservationModal.module.css'

export interface ReservationSlotInfo {
  room: StudyRoom
  slot: StudyRoomSlot
  date: string       // YYYYMMDD
  dateLabel: string  // "6/13 (금)"
}

interface ReservationModalProps {
  isOpen: boolean
  onClose: () => void
  slotInfo: ReservationSlotInfo | null
  onSuccess: () => void
}

export default function ReservationModal({
  isOpen,
  onClose,
  slotInfo,
  onSuccess,
}: ReservationModalProps) {
  if (!isOpen || slotInfo === null) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="스터디룸 예약"
      >
        <ModalContent slotInfo={slotInfo} onClose={onClose} onSuccess={onSuccess} />
      </div>
    </div>
  )
}

interface ModalContentProps {
  slotInfo: ReservationSlotInfo
  onClose: () => void
  onSuccess: () => void
}

function ModalContent({ slotInfo, onClose, onSuccess }: ModalContentProps) {
  const { logout } = useAuth()
  const { attendees, isLoading: attendeesLoading, error: attendeesError, addAttendee, deleteAttendee } =
    useAttendees()
  const { isLoading: reserving, reserve } = useReserveStudyRoom()

  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())
  const [useTime, setUseTime] = useState<UseTimeEnum>(60)
  // 가용 슬롯은 room_gb·sroom_title·seq가 non-null이므로 기본값은 false(특정 방 지정)
  const [autoSelect, setAutoSelect] = useState(!hasFullRoomData(slotInfo.slot))
  const [newInput, setNewInput] = useState<AttendeeInput>({ student_id: '', name: '' })
  const [showNewForm, setShowNewForm] = useState(false)
  const [addingAttendee, setAddingAttendee] = useState(false)
  const [result, setResult] = useState<StudyRoomReserveResponse | null>(null)

  // 참여자 API 401 → 자동 로그아웃
  useEffect(() => {
    if (attendeesError === 'UNAUTHORIZED') logout()
  }, [attendeesError, logout])

  const selectedCount = selectedIds.size
  const minRequired = Math.ceil(slotInfo.room.seat_cnt / 2)
  const maxAllowed = slotInfo.room.seat_cnt
  const isCountValid = selectedCount >= minRequired && selectedCount <= maxAllowed

  const canReserve =
    !reserving &&
    isCountValid &&
    result === null

  const effectiveAutoSelect = hasFullRoomData(slotInfo.slot) ? autoSelect : true

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
      reserve_date: slotInfo.date,
      start_time: slotInfo.slot.start_time ?? '',
      use_time: useTime,
      auto_select: effectiveAutoSelect,
      attendees: selectedAttendees,
      ...(!effectiveAutoSelect && slotInfo.slot.room_no !== null
        ? {
            room_no: slotInfo.slot.room_no,
            room_gb: slotInfo.slot.room_gb ?? '',
            seat_cnt: slotInfo.room.seat_cnt,
            sroom_title: slotInfo.slot.sroom_title ?? '',
            room_name: slotInfo.slot.room_name ?? '',
            seq: slotInfo.slot.seq ?? '',
          }
        : {}),
    }

    const response = await reserve(request)
    if (response === null) {
      // 네트워크 오류
      setResult({ success: false, result_code: 'NETWORK_ERROR', result_message: '요청 중 오류가 발생했습니다.', room_no: '', room_name: '' })
      return
    }

    setResult(response)
  }

  const timeLabel = slotInfo.slot.time_label
  const endTimeLabel = computeEndTime(slotInfo.slot.start_time ?? '', useTime)

  return (
    <>
      <div className={styles.modalHeader}>
        <div>
          <p className={styles.modalTitle}>스터디룸 예약</p>
          <p className={styles.modalSubtitle}>
            {slotInfo.dateLabel} · {timeLabel} ~ {endTimeLabel}
          </p>
        </div>
      </div>

      <div className={styles.modalBody}>
        {/* 예약 정보 */}
        <div className={styles.section}>
          <span className={styles.sectionLabel}>예약 정보</span>
          <div className={styles.infoRow}>
            <span className={styles.infoBadge}>{slotInfo.room.room_name}</span>
            <span className={styles.infoBadge}>{slotInfo.room.seat_cnt}인실</span>
            <span className={styles.infoBadge}>{slotInfo.room.group_title}</span>
          </div>
        </div>

        {/* 특정 방 데이터가 있는 슬롯에서만 토글 표시 (예약 불가 슬롯은 room_gb 등 null) */}
        {hasFullRoomData(slotInfo.slot) && (
          <div className={styles.section}>
            <div className={styles.toggleRow}>
              <span className={styles.toggleLabel}>
                {autoSelect ? '자동 방 배정' : '지정 방 예약'}
              </span>
              <label className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={autoSelect}
                  onChange={(e) => setAutoSelect(e.target.checked)}
                />
                <span className={styles.toggleTrack} />
              </label>
            </div>
          </div>
        )}

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
                {t}분
              </button>
            ))}
          </div>
        </div>

        {/* 참여자 선택 */}
        <div className={styles.section}>
          <span className={styles.sectionLabel}>
            참여자 ({minRequired}~{maxAllowed}명)
          </span>

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

          {/* 새 참여자 추가 */}
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
                  className={styles.cancelBtn}
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
            {!isCountValid && selectedCount > 0 && ` (${minRequired}~${maxAllowed}명 필요)`}
          </span>
        </div>

        {/* 예약 결과 */}
        {result !== null && (
          <div className={styles.resultBox} data-success={result.success}>
            <p className={styles.resultTitle}>{result.success ? '예약 완료' : '예약 실패'}</p>
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
            {reserving ? '예약 중...' : '예약하기'}
          </button>
        )}
      </div>
    </>
  )
}

// 슬롯에 auto_select=false에 필요한 필드가 모두 있는지 확인
function hasFullRoomData(slot: StudyRoomSlot): boolean {
  return (
    slot.room_no !== null &&
    slot.room_gb !== null &&
    slot.sroom_title !== null &&
    slot.seq !== null
  )
}

// start_time('HHMM') + minutes → 종료 시간 레이블 ("HH:MM")
function computeEndTime(startTime: string, minutes: number): string {
  if (startTime.length !== 4) return ''
  const hour = parseInt(startTime.slice(0, 2), 10)
  const min = parseInt(startTime.slice(2, 4), 10)
  const totalMin = hour * 60 + min + minutes
  const endHour = Math.floor(totalMin / 60)
  const endMin = totalMin % 60
  return `${String(endHour).padStart(2, '0')}:${String(endMin).padStart(2, '0')}`
}
