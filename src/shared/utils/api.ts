// API 서버 기본 URL
export const API_BASE_URL = 'https://api.chuseok22.com'

// localStorage 키
const ACCESS_TOKEN_KEY = 'sejong_access_token'

// Authorization 헤더를 자동으로 첨부하는 fetch 래퍼.
// 토큰이 있으면 Bearer 헤더를 추가하고, path를 API_BASE_URL 기준으로 요청한다.
// Response를 그대로 반환한다 (상태 코드 처리는 호출부 책임).
export async function fetchWithAuth(path: string, options?: RequestInit): Promise<Response> {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)

  const authHeaders: HeadersInit = accessToken
    ? { Authorization: `Bearer ${accessToken}` }
    : {}

  const mergedOptions: RequestInit = {
    ...options,
    headers: {
      ...authHeaders,
      ...options?.headers,
    },
  }

  return fetch(API_BASE_URL + path, mergedOptions)
}
