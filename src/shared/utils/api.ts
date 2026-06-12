// API 서버 기본 URL
export const API_BASE_URL = 'https://api.chuseok22.com'

// localStorage 키
const ACCESS_TOKEN_KEY = 'sejong_access_token'
const REFRESH_TOKEN_KEY = 'sejong_refresh_token'

export interface FetchOptions extends RequestInit {
  // false로 설정 시 Authorization 헤더를 첨부하지 않음 (로그인 등 인증 불필요 엔드포인트)
  authRequired?: boolean
  // 요청 타임아웃 (ms). 설정 시 AbortSignal과 합성하여 시간 초과 시 요청을 취소
  timeout?: number
}

interface RefreshTokenResponse {
  access: string
  refresh?: string
}

// 동시 다발적 refresh 요청을 하나의 Promise로 수렴하여 refresh token 중복 사용 방지
let refreshPromise: Promise<string | null> | null = null

async function doRefresh(): Promise<string | null> {
  const refresh = localStorage.getItem(REFRESH_TOKEN_KEY)
  if (!refresh) return null

  try {
    const response = await fetch(API_BASE_URL + '/api/v1/auth/token/refresh/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh }),
    })
    if (!response.ok) return null

    const data = await response.json() as RefreshTokenResponse
    localStorage.setItem(ACCESS_TOKEN_KEY, data.access)
    if (data.refresh !== undefined) {
      localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh)
    }
    return data.access
  } catch {
    return null
  }
}

function tryRefreshToken(): Promise<string | null> {
  if (refreshPromise !== null) return refreshPromise
  refreshPromise = doRefresh().finally(() => {
    refreshPromise = null
  })
  return refreshPromise
}

// API 요청 공통 헬퍼.
// - authRequired: true(기본)이면 localStorage의 access token을 Bearer 헤더로 첨부
// - timeout: 설정 시 지정 시간(ms) 초과하면 요청 자동 취소
// - 호출부에서 전달한 signal이 있으면 timeout signal과 합성 (AbortSignal.any)
// - 401 수신 시 refresh token으로 갱신 후 재요청 1회 (갱신 실패 시 401 응답 그대로 반환)
// Response를 그대로 반환한다 (상태 코드 처리는 호출부 책임).
export async function fetchWithAuth(path: string, options?: FetchOptions): Promise<Response> {
  const { authRequired = true, timeout, signal: callerSignal, ...restOptions } = options ?? {}

  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
  const authHeaders: HeadersInit = authRequired && accessToken
    ? { Authorization: `Bearer ${accessToken}` }
    : {}

  // timeout 포함 signal 구성 (첫 번째 요청에만 적용)
  let resolvedSignal: AbortSignal | null | undefined = callerSignal
  if (timeout !== undefined) {
    const timeoutSignal = AbortSignal.timeout(timeout)
    resolvedSignal = callerSignal
      ? AbortSignal.any([callerSignal, timeoutSignal])
      : timeoutSignal
  }

  const response = await fetch(API_BASE_URL + path, {
    ...restOptions,
    signal: resolvedSignal,
    headers: {
      ...authHeaders,
      ...restOptions.headers,
    },
  })

  // 인증 필요 요청에서 401 발생 시 refresh token으로 갱신 후 재요청 (1회)
  if (response.status === 401 && authRequired) {
    const newToken = await tryRefreshToken()
    if (newToken !== null) {
      const retryAuthHeaders: HeadersInit = { Authorization: `Bearer ${newToken}` }
      // 재요청: timeout signal은 재사용 불가이므로 caller signal만 사용
      return fetch(API_BASE_URL + path, {
        ...restOptions,
        signal: callerSignal,
        headers: {
          ...retryAuthHeaders,
          ...restOptions.headers,
        },
      })
    }
  }

  return response
}
