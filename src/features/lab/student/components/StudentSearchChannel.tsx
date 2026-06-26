import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useAuth } from '../../../../shared/contexts/AuthContext'
import { useStudentSearch } from '../hooks/useStudentSearch'
import type { SearchType, StudentInfo } from '../types/student'
import styles from './StudentSearchChannel.module.css'

export default function StudentSearchChannel() {
  const { isLoggedIn } = useAuth()
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.15 }}
    >
      {isLoggedIn ? <StudentSearchView /> : <LoginView />}
    </motion.div>
  )
}

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
        <p className={styles.loginTitle}>세종대학교 학생 조회</p>
        <p className={styles.loginSubtitle}>로그인이 필요한 서비스입니다.</p>
        <form onSubmit={handleSubmit}>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel} htmlFor="student-search-username">
              아이디
            </label>
            <input
              id="student-search-username"
              className={styles.fieldInput}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel} htmlFor="student-search-password">
              비밀번호
            </label>
            <input
              id="student-search-password"
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

function StudentSearchView() {
  const { logout } = useAuth()
  const [searchType, setSearchType] = useState<SearchType>('name')
  const [query, setQuery] = useState('')
  const { data, isLoading, error, search, reset } = useStudentSearch()

  // 401 응답 시 자동 로그아웃
  useEffect(() => {
    if (error === 'UNAUTHORIZED') logout()
  }, [error, logout])

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    search(searchType, trimmed)
  }

  // [H-3] 탭 전환 시 쿼리 + 이전 검색 결과 모두 초기화
  const handleTabChange = (type: SearchType): void => {
    setSearchType(type)
    setQuery('')
    reset()
  }

  const placeholder = searchType === 'name' ? '이름 입력 (예: 백지훈)' : '학번 입력 (예: 22011315)'

  const renderContent = (): React.ReactNode => {
    if (isLoading) return <p className={styles.statusMessage}>검색 중...</p>
    if (error !== null && error !== 'UNAUTHORIZED') return <p className={styles.errorMessage}>{error}</p>
    // [M-1] 미검색 초기 상태 — 안내 메시지 표시
    if (data === null) return <p className={styles.statusMessage}>이름 또는 학번으로 검색하세요.</p>
    if (data.length === 0) return <p className={styles.statusMessage}>검색 결과가 없습니다.</p>
    return (
      <div className={styles.resultList}>
        {data.map((student) => (
          <StudentResultCard key={student.student_no} student={student} />
        ))}
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.headerTitle}>🔍 학생 조회</span>
        <button type="button" className={styles.logoutButton} onClick={logout}>
          로그아웃
        </button>
      </div>

      <div className={styles.searchTabs}>
        <button
          type="button"
          className={styles.searchTab}
          data-active={searchType === 'name'}
          onClick={() => handleTabChange('name')}
        >
          이름 검색
        </button>
        <button
          type="button"
          className={styles.searchTab}
          data-active={searchType === 'student_no'}
          onClick={() => handleTabChange('student_no')}
        >
          학번 검색
        </button>
      </div>

      <form onSubmit={handleSearch} className={styles.searchRow}>
        <input
          className={styles.searchInput}
          type={searchType === 'student_no' ? 'tel' : 'text'}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
        />
        <button
          type="submit"
          className={styles.searchButton}
          disabled={isLoading || query.trim() === ''}
        >
          검색
        </button>
      </form>

      {renderContent()}
    </div>
  )
}

interface StudentResultCardProps {
  student: StudentInfo
}

function StudentResultCard({ student }: StudentResultCardProps) {
  return (
    <div className={styles.resultCard}>
      <p className={styles.resultName}>{student.name}</p>
      <p className={styles.resultMeta}>
        학번: {student.student_no} · {student.dept_name}
      </p>
      {student.email !== null && student.email !== '' && (
        <p className={styles.resultEmail}>{student.email}</p>
      )}
      {student.double_dept_name !== null && student.double_dept_name !== '' && (
        <span className={styles.doubleDept}>복수전공: {student.double_dept_name}</span>
      )}
    </div>
  )
}
