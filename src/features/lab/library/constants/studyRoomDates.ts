const KR_WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']

export function getKSTDateInfo(daysOffset: number): { dateStr: string; label: string } {
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

export const DATE_TABS = Array.from({ length: 8 }, (_, i) => getKSTDateInfo(i))
