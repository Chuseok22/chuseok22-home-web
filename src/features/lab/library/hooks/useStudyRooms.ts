import { useEffect, useState } from 'react'
import { fetchWithAuth } from '../../../../shared/utils/api'
import type { StudyRoom } from '../types/studyRoom'

interface UseStudyRoomsResult {
  data: StudyRoom[] | null
  isLoading: boolean
  error: string | null
}

// date: 'YYYYMMDD' 형식 (예: '20260611')
export function useStudyRooms(date: string): UseStudyRoomsResult {
  const [data, setData] = useState<StudyRoom[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    const fetchStudyRooms = async (): Promise<void> => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetchWithAuth(
          '/api/v1/library/study-rooms/?date=' + date,
          { signal: controller.signal },
        )

        // 401 인증 오류는 별도 에러 코드로 구분
        if (response.status === 401) {
          setError('UNAUTHORIZED')
          return
        }

        if (!response.ok) {
          setError('데이터를 불러오는 데 실패했습니다.')
          return
        }

        const json = (await response.json()) as StudyRoom[]
        setData(json)
      } catch (err: unknown) {
        // AbortError는 의도적 취소이므로 에러 상태로 처리하지 않음
        if (err instanceof DOMException && err.name === 'AbortError') {
          return
        }
        setError('데이터를 불러오는 데 실패했습니다.')
      } finally {
        setIsLoading(false)
      }
    }

    void fetchStudyRooms()

    return () => {
      controller.abort()
    }
  }, [date])

  return { data, isLoading, error }
}
