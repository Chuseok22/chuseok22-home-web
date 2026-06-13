import { useCallback, useEffect, useState } from 'react'
import { fetchWithAuth } from '../../../../shared/utils/api'
import type { AttendeeInput, ReservationAttendee } from '../types/studyRoom'

interface UseAttendeesResult {
  attendees: ReservationAttendee[]
  isLoading: boolean
  error: string | null
  addAttendee: (input: AttendeeInput) => Promise<ReservationAttendee | null>
  deleteAttendee: (id: number) => Promise<boolean>
}

export function useAttendees(): UseAttendeesResult {
  const [attendees, setAttendees] = useState<ReservationAttendee[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    const fetchAttendees = async (): Promise<void> => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetchWithAuth(
          '/api/v1/library/study-rooms/attendees/',
          { signal: controller.signal },
        )
        if (response.status === 401) { setError('UNAUTHORIZED'); return }
        if (!response.ok) { setError('참여자 목록을 불러오는 데 실패했습니다.'); return }
        setAttendees((await response.json()) as ReservationAttendee[])
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === 'AbortError') return
        setError('참여자 목록을 불러오는 데 실패했습니다.')
      } finally {
        setIsLoading(false)
      }
    }

    void fetchAttendees()
    return () => { controller.abort() }
  }, [])

  // 동일 학번이 이미 있으면 서버가 기존 레코드를 반환(200)하므로 클라이언트도 upsert 처리
  const addAttendee = useCallback(async (input: AttendeeInput): Promise<ReservationAttendee | null> => {
    try {
      const response = await fetchWithAuth('/api/v1/library/study-rooms/attendees/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      })
      if (response.status !== 200 && response.status !== 201) return null
      const data = (await response.json()) as ReservationAttendee
      setAttendees((prev) => {
        const exists = prev.some((a) => a.id === data.id)
        return exists
          ? prev.map((a) => (a.id === data.id ? data : a))
          : [...prev, data]
      })
      return data
    } catch {
      return null
    }
  }, [])

  const deleteAttendee = useCallback(async (id: number): Promise<boolean> => {
    try {
      const response = await fetchWithAuth(
        `/api/v1/library/study-rooms/attendees/${id}/`,
        { method: 'DELETE' },
      )
      if (response.status === 204) {
        setAttendees((prev) => prev.filter((a) => a.id !== id))
        return true
      }
      return false
    } catch {
      return false
    }
  }, [])

  return { attendees, isLoading, error, addAttendee, deleteAttendee }
}
