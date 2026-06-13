// start_time('HHMM') + minutes → 종료 시간 레이블 ("HH:MM")
export function computeEndTime(startTime: string, minutes: number): string {
  if (startTime.length !== 4) return ''
  const hour = parseInt(startTime.slice(0, 2), 10)
  const min = parseInt(startTime.slice(2, 4), 10)
  const totalMin = hour * 60 + min + minutes
  const endHour = Math.floor(totalMin / 60)
  const endMin = totalMin % 60
  return `${String(endHour).padStart(2, '0')}:${String(endMin).padStart(2, '0')}`
}
