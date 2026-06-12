import { createContext, useContext, useEffect, useState } from 'react'
import { fetchWithAuth } from '../utils/api'

// localStorage 키 상수
const ACCESS_TOKEN_KEY = 'sejong_access_token'
const REFRESH_TOKEN_KEY = 'sejong_refresh_token'

interface AuthContextValue {
  isLoggedIn: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

interface TokenResponse {
  access: string
  refresh: string
}

const AuthContext = createContext<AuthContextValue | null>(null)

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  // 마운트 시 localStorage에서 access token 복원하여 초기 로그인 상태 결정
  const [accessToken, setAccessToken] = useState<string | null>(() =>
    localStorage.getItem(ACCESS_TOKEN_KEY)
  )

  useEffect(() => {
    // accessToken 상태가 바뀔 때마다 localStorage와 동기화
    if (accessToken !== null) {
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
    } else {
      localStorage.removeItem(ACCESS_TOKEN_KEY)
    }
  }, [accessToken])

  const login = async (username: string, password: string): Promise<void> => {
    const response = await fetchWithAuth('/api/v1/auth/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      authRequired: false,
    })

    if (!response.ok) {
      throw new Error('아이디 또는 비밀번호가 올바르지 않습니다.')
    }

    const data: TokenResponse = await response.json() as TokenResponse
    // React 리렌더 전에 localStorage에 저장하여 자식 컴포넌트의 fetchWithAuth가 즉시 토큰을 읽을 수 있도록 함
    localStorage.setItem(ACCESS_TOKEN_KEY, data.access)
    localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh)
    setAccessToken(data.access)
  }

  const logout = (): void => {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    setAccessToken(null)
  }

  const value: AuthContextValue = {
    isLoggedIn: accessToken !== null,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (context === null) {
    throw new Error('useAuth는 AuthProvider 내부에서만 사용할 수 있습니다.')
  }
  return context
}
