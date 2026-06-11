// API 서버 기본 URL
export const API_BASE_URL = 'https://api.chuseok22.com'

// localStorage 키
const ACCESS_TOKEN_KEY = 'sejong_access_token'

export interface FetchOptions extends RequestInit {
  // false로 설정 시 Authorization 헤더를 첨부하지 않음 (로그인 등 인증 불필요 엔드포인트)
  authRequired?: boolean
  // 요청 타임아웃 (ms). 설정 시 AbortSignal과 합성하여 시간 초과 시 요청을 취소
  timeout?: number
}

// API 요청 공통 헬퍼.
// - authRequired: true(기본)이면 localStorage의 access token을 Bearer 헤더로 첨부
// - timeout: 설정 시 지정 시간(ms) 초과하면 요청 자동 취소
// - 호출부에서 전달한 signal이 있으면 timeout signal과 합성 (AbortSignal.any)
// Response를 그대로 반환한다 (상태 코드 처리는 호출부 책임).
export async function fetchWithAuth(path: string, options?: FetchOptions): Promise<Response> {
  const { authRequired = true, timeout, signal: callerSignal, ...restOptions } = options ?? {}

  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
  const authHeaders: HeadersInit = authRequired && accessToken
    ? { Authorization: `Bearer ${accessToken}` }
    : {}

  let resolvedSignal: AbortSignal | null | undefined = callerSignal

  if (timeout !== undefined) {
    const timeoutSignal = AbortSignal.timeout(timeout)
    resolvedSignal = callerSignal
      ? AbortSignal.any([callerSignal, timeoutSignal])
      : timeoutSignal
  }

  return fetch(API_BASE_URL + path, {
    ...restOptions,
    signal: resolvedSignal,
    headers: {
      ...authHeaders,
      ...restOptions.headers,
    },
  })
}
