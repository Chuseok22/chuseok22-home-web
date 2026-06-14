// occurred_at(UTC ISO 8601) → 상대 시간 또는 날짜 문자열 반환
export function formatOccurredAt(occurred_at: string): string {
  const now = new Date()
  const date = new Date(occurred_at)
  // 서버-클라이언트 시계 차이로 미래 타임스탬프가 올 경우 음수 diff 방어
  const diffMs = Math.max(0, now.getTime() - date.getTime())
  const diffMinutes = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMinutes < 1) return '방금 전'
  if (diffMinutes < 60) return `${diffMinutes}분 전`
  if (diffHours < 24) return `${diffHours}시간 전`
  if (diffDays < 7) return `${diffDays}일 전`

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}.${month}.${day}`
}
