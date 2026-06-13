import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useAuth } from '../../../../shared/contexts/AuthContext'
import { useStudyRooms } from '../hooks/useStudyRooms'
import type { StudyRoom, StudyRoomSlot } from '../types/studyRoom'
import ReservationModal from './ReservationModal'
import styles from './StudyRoomsChannel.module.css'

const KR_WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']

function getKSTDateInfo(daysOffset: number): { dateStr: string; label: string } {
  const kstMs = Date.now() + 9 * 60 * 60 * 1000
  const kstDate = new Date(kstMs)
  kstDate.setUTCDate(kstDate.getUTCDate() + daysOffset)
  const year = kstDate.getUTCFullYear()
  const month = kstDate.getUTCMonth() + 1
  const day = kstDate.getUTCDate()
  const weekday = KR_WEEKDAYS[kstDate.getUTCDay()]
  return {
    dateStr: `${year}${String(month).padStart(2, '0')}${String(day).padStart(2, '0')}`,
    label: `${month}/${day} (${weekday})`,
  }
}

const DATE_TABS = Array.from({ length: 8 }, (_, i) => getKSTDateInfo(i))

// Hook 규칙을 지키기 위해 내부 컴포넌트로 분리
export default function StudyRoomsChannel() {
  const { isLoggedIn } = useAuth()
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.15 }}
    >
      {isLoggedIn ? <StudyRoomsView /> : <LoginView />}
    </motion.div>
  )
}

// 로그인 폼 뷰
function LoginView() {
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      await login(username, password)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('로그인에 실패했습니다.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginCard}>
        <p className={styles.loginTitle}>세종대학교 스터디룸 조회</p>
        <p className={styles.loginSubtitle}>로그인이 필요한 서비스입니다.</p>
        <form onSubmit={handleSubmit}>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel} htmlFor="study-username">
              아이디
            </label>
            <input
              id="study-username"
              className={styles.fieldInput}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel} htmlFor="study-password">
              비밀번호
            </label>
            <input
              id="study-password"
              className={styles.fieldInput}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>
          {error !== null && <p className={styles.loginError}>{error}</p>}
          <button
            type="submit"
            className={styles.loginButton}
            disabled={isLoading}
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </button>
        </form>
      </div>
    </div>
  )
}

// 스터디룸 조회 뷰 (useStudyRooms 훅을 여기서 호출)
function StudyRoomsView() {
  const { logout } = useAuth()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [selectedSlot, setSelectedSlot] = useState<{
    room: StudyRoom
    slot: StudyRoomSlot
  } | null>(null)
  const { data, isLoading, error, refresh } = useStudyRooms(DATE_TABS[selectedIndex].dateStr)

  useEffect(() => {
    if (error === 'UNAUTHORIZED') logout()
  }, [error, logout])

  const handleSlotClick = (room: StudyRoom, slot: StudyRoomSlot): void => {
    if (!slot.is_available) return
    setSelectedSlot({ room, slot })
  }

  const handleModalClose = (): void => {
    setSelectedSlot(null)
  }

  const renderContent = (): React.ReactNode => {
    if (isLoading) return <p className={styles.loading}>조회 중...</p>
    if (error !== null && error !== 'UNAUTHORIZED') return <p className={styles.error}>{error}</p>
    if (data === null) return null
    return (
      <div className={styles.roomList}>
        {data.map((room) => (
          <RoomCard key={room.room_name} room={room} onSlotClick={handleSlotClick} />
        ))}
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.headerTitle}>📚 스터디룸 조회</span>
        <button type="button" className={styles.logoutButton} onClick={logout}>
          로그아웃
        </button>
      </div>
      <div className={styles.dateTabs}>
        {DATE_TABS.map((tab, index) => (
          <button
            key={tab.dateStr}
            type="button"
            className={styles.dateTab}
            data-active={selectedIndex === index}
            onClick={() => setSelectedIndex(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {renderContent()}

      <ReservationModal
        isOpen={selectedSlot !== null}
        onClose={handleModalClose}
        slotInfo={
          selectedSlot !== null
            ? {
                room: selectedSlot.room,
                slot: selectedSlot.slot,
                date: DATE_TABS[selectedIndex].dateStr,
                dateLabel: DATE_TABS[selectedIndex].label,
              }
            : null
        }
        onSuccess={() => {
          handleModalClose()
          refresh()
        }}
      />
    </div>
  )
}

interface RoomCardProps {
  room: StudyRoom
  onSlotClick: (room: StudyRoom, slot: StudyRoomSlot) => void
}

function RoomCard({ room, onSlotClick }: RoomCardProps) {
  return (
    <div className={styles.roomCard}>
      <div className={styles.roomHeader}>
        <span className={styles.roomName}>{room.room_name}</span>
        <span className={styles.groupTitle}>{room.group_title}</span>
        <span className={styles.seatBadge}>{room.seat_cnt}명</span>
      </div>
      <div className={styles.slotsGrid}>
        {room.slots.map((slot) => (
          <span
            key={slot.time_label}
            className={styles.slot}
            data-available={slot.is_available}
            role={slot.is_available ? 'button' : undefined}
            tabIndex={slot.is_available ? 0 : undefined}
            onClick={slot.is_available ? () => onSlotClick(room, slot) : undefined}
            onKeyDown={slot.is_available
              ? (e) => { if (e.key === 'Enter' || e.key === ' ') onSlotClick(room, slot) }
              : undefined}
          >
            {slot.time_label}
          </span>
        ))}
      </div>
    </div>
  )
}
