import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppShell from '../features/discord/components/AppShell/AppShell'
import ChannelRouter from './ChannelRouter'
import ServerRedirect from './ServerRedirect'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 루트 진입 시 기본 채널로 리다이렉트 */}
        <Route path="/" element={<Navigate to="/home/welcome" replace />} />
        <Route element={<AppShell />}>
          {/* 서버·채널 라우트 — ChannelRouter가 컴포넌트 주입 담당 */}
          <Route path="/:server/:channel" element={<ChannelRouter />} />
          {/* 서버만 지정된 경우 해당 서버의 기본 채널로 리다이렉트 */}
          <Route path="/:server" element={<ServerRedirect />} />
        </Route>
        {/* 그 외 모든 경로 폴백 */}
        <Route path="*" element={<Navigate to="/home/welcome" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
