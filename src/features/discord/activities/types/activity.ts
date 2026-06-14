// API 응답 단일 아이템 타입
export interface ApiActivityItem {
  id: number
  event_type: string
  repo_name: string
  title: string
  meta: string
  occurred_at: string // ISO 8601 UTC
}

// 페이지네이션 래퍼 타입
export interface PaginatedActivities {
  count: number
  next: string | null
  previous: string | null
  results: ApiActivityItem[]
}
