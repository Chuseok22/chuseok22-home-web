// GET /api/v1/sejong/students/search/ 응답 — 학생 정보
export interface StudentInfo {
  student_no: string
  name: string
  dept_cd: string
  dept_name: string
  email: string | null
  double_dept_name: string | null
}

// GET /api/v1/sejong/students/search/ 응답 래퍼
export interface StudentSearchResponse {
  results: StudentInfo[]
}

// 검색 탭 타입
export type SearchType = 'name' | 'student_no'
