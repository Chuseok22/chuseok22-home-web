import { useCallback, useEffect, useState } from 'react'
import { fetchWithAuth } from '../../../../shared/utils/api'
import type { SearchType, StudentInfo, StudentSearchResponse } from '../types/student'

interface SearchParams {
  type: SearchType
  query: string
}

interface UseStudentSearchResult {
  data: StudentInfo[] | null
  isLoading: boolean
  error: string | null
  search: (type: SearchType, query: string) => void
  reset: () => void
}

export function useStudentSearch(): UseStudentSearchResult {
  const [data, setData] = useState<StudentInfo[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null)

  useEffect(() => {
    // 검색 전 초기 상태에서는 fetch 하지 않음
    if (searchParams === null) return

    const controller = new AbortController()

    const fetchStudents = async (): Promise<void> => {
      setIsLoading(true)
      setError(null)

      try {
        const paramKey = searchParams.type === 'name' ? 'name' : 'student_no'
        const url = `/api/v1/sejong/students/search/?${paramKey}=${encodeURIComponent(searchParams.query)}`
        const response = await fetchWithAuth(url, { signal: controller.signal })

        // [H-1] abort 이후 resolve된 응답 무시 — race condition 방지
        if (controller.signal.aborted) return

        if (response.status === 401) {
          setError('UNAUTHORIZED')
          return
        }

        // [H-2] 400: 서버 detail 메시지를 사용자에게 직접 표시
        if (response.status === 400) {
          const body = (await response.json()) as { detail?: string }
          setError(body.detail ?? '잘못된 요청입니다.')
          return
        }

        if (response.status === 503) {
          setError('세종대 Classic 서비스에 연결할 수 없습니다. 잠시 후 다시 시도하세요.')
          return
        }

        if (!response.ok) {
          setError('검색 중 오류가 발생했습니다.')
          return
        }

        const json = (await response.json()) as StudentSearchResponse
        setData(json.results)
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === 'AbortError') return
        setError('검색 중 오류가 발생했습니다.')
      } finally {
        setIsLoading(false)
      }
    }

    void fetchStudents()

    return () => {
      controller.abort()
    }
  }, [searchParams])

  const search = useCallback((type: SearchType, query: string): void => {
    setSearchParams({ type, query })
  }, [])

  // [H-3] 탭 전환 등 외부에서 결과·에러·검색상태 일괄 초기화
  const reset = useCallback((): void => {
    setData(null)
    setError(null)
    setSearchParams(null)
  }, [])

  return { data, isLoading, error, search, reset }
}
