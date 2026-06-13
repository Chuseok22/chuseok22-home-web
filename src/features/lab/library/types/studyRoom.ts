// GET /api/v1/library/study-rooms/ 응답 — 시간 슬롯
export interface StudyRoomSlot {
  time_label: string
  is_available: boolean
  room_no: string | null
  room_name: string | null
  start_time: string | null
  room_gb: string | null
  sroom_title: string | null
  seq: string | null
}

// GET /api/v1/library/study-rooms/ 응답 — 스터디룸
export interface StudyRoom {
  room_name: string
  group_title: string
  seat_cnt: number
  slots: StudyRoomSlot[]
}

// POST /api/v1/library/study-rooms/reserve/ — use_time 값
export type UseTimeEnum = 60 | 120

// POST /api/v1/library/study-rooms/attendees/ 요청
export interface AttendeeInput {
  student_id: string
  name: string
}

// GET·POST /api/v1/library/study-rooms/attendees/ 응답
export interface ReservationAttendee {
  id: number
  student_id: string
  name: string
  created_at: string
}

// POST /api/v1/library/study-rooms/reserve/ 요청
export interface StudyRoomReserveRequest {
  reserve_date: string      // YYYYMMDD
  start_time: string        // HHMM
  use_time: UseTimeEnum
  auto_select: boolean
  attendees: AttendeeInput[]
  // auto_select=false 일 때 필수
  room_no?: string
  room_gb?: string
  seat_cnt?: number
  sroom_title?: string
  room_name?: string
  seq?: string
}

// POST /api/v1/library/study-rooms/reserve/ 응답 (200 성공·422 실패 모두 동일 구조)
export interface StudyRoomReserveResponse {
  success: boolean
  result_code: string
  result_message: string
  room_no: string
  room_name: string
}
