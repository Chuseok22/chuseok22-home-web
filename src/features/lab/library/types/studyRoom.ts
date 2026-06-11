// GET /api/v1/library/study-rooms/ 응답의 각 슬롯
export interface StudyRoomSlot {
  /** "09:00", "10:00", ... 형식의 시간 레이블 */
  time_label: string;
  /** 예약 가능 여부 */
  is_available: boolean;
  /** 예약 가능 시 방 번호, 불가 시 null */
  room_no: string | null;
  /** 예약 가능 시 방 이름, 불가 시 null */
  room_name: string | null;
  /** 예약 가능 시 시작 시간 "0900" 형식, 불가 시 null */
  start_time: string | null;
}

// GET /api/v1/library/study-rooms/ 응답의 각 스터디룸
export interface StudyRoom {
  /** 스터디룸 이름 ("01스터디룸", ...) */
  room_name: string;
  /** 그룹 제목 ("스터디룸 12인실", ...) */
  group_title: string;
  /** 수용 인원 */
  seat_cnt: number;
  /** 시간 슬롯 목록 */
  slots: StudyRoomSlot[];
}
