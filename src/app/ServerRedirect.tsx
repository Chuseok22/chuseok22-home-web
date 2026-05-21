import { useParams, Navigate } from 'react-router-dom'
import { serverMap } from '../features/discord/constants/servers'

/**
 * 서버 ID만 지정된 URL에서 해당 서버의 기본 채널로 리다이렉트
 * 예: /projects → /projects/team-projects
 */
export default function ServerRedirect() {
  const { server } = useParams<{ server: string }>()
  const serverData = serverMap[server ?? '']
  if (!serverData) return <Navigate to="/home/welcome" replace />
  return <Navigate to={`/${serverData.id}/${serverData.defaultChannel}`} replace />
}
