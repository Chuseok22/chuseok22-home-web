import { useCallback, useState } from 'react'
import { fetchWithAuth } from '../../../../shared/utils/api'
import type { StudyRoomReserveRequest, StudyRoomReserveResponse } from '../types/studyRoom'

interface UseReserveStudyRoomResult {
  isLoading: boolean
  reserve: (request: StudyRoomReserveRequest) => Promise<StudyRoomReserveResponse | null>
}

export function useReserveStudyRoom(): UseReserveStudyRoomResult {
  const [isLoading, setIsLoading] = useState(false)

  // 200(성공)·422(실패) 모두 응답 body 구조 동일 → success 필드로 성공 여부 판별
  const reserve = useCallback(async (
    request: StudyRoomReserveRequest,
  ): Promise<StudyRoomReserveResponse | null> => {
    setIsLoading(true)
    try {
      const response = await fetchWithAuth('/api/v1/library/study-rooms/reserve/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      })
      if (response.status === 401) return null
      return (await response.json()) as StudyRoomReserveResponse
    } catch {
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { isLoading, reserve }
}
