import { useCallback, useEffect, useState } from 'react'
import { fetchWithAuth } from '../../../../shared/utils/api'
import type { ApiActivityItem, PaginatedActivities } from '../types/activity'

interface UseActivitiesResult {
  items: ApiActivityItem[]
  isLoading: boolean
  isLoadingMore: boolean
  error: string | null
  hasMore: boolean
  loadMore: () => void
}

export function useActivities(): UseActivitiesResult {
  const [items, setItems] = useState<ApiActivityItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    const isFirstPage = page === 1

    if (isFirstPage) {
      setIsLoading(true)
    } else {
      setIsLoadingMore(true)
    }
    setError(null)

    const fetchPage = async (): Promise<void> => {
      try {
        const response = await fetchWithAuth(`/api/v1/activities/?page=${page}`, {
          signal: controller.signal,
          authRequired: false,
        })

        if (!response.ok) {
          setError('활동 정보를 불러올 수 없습니다.')
          return
        }

        const data = (await response.json()) as PaginatedActivities
        setItems((prev) => (isFirstPage ? data.results : [...prev, ...data.results]))
        setHasMore(data.next !== null)
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === 'AbortError') return
        setError('활동 정보를 불러올 수 없습니다.')
      } finally {
        if (isFirstPage) setIsLoading(false)
        else setIsLoadingMore(false)
      }
    }

    void fetchPage()
    return () => {
      controller.abort()
    }
  }, [page])

  const loadMore = useCallback(() => {
    if (isLoadingMore || isLoading || !hasMore) return
    setPage((p) => p + 1)
  }, [isLoadingMore, isLoading, hasMore])

  return { items, isLoading, isLoadingMore, error, hasMore, loadMore }
}
