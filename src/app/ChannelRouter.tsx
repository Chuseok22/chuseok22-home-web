import type { ComponentType } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import WelcomeChannel from '../features/home/components/WelcomeChannel'
import AboutMeChannel from '../features/home/components/AboutMeChannel'
import SkillsChannel from '../features/home/components/SkillsChannel'
import LinksChannel from '../features/home/components/LinksChannel'
import TeamProjectsChannel from '../features/projects/components/TeamProjectsChannel'
import SideProjectsChannel from '../features/projects/components/SideProjectsChannel'
import OpenSourceChannel from '../features/projects/components/OpenSourceChannel'
import LatestPostsChannel from '../features/blog/components/LatestPostsChannel'
import ToolsChannel from '../features/lab/components/ToolsChannel'
import StudyRoomsChannel from '../features/lab/library/components/StudyRoomsChannel'
import StudentSearchChannel from '../features/lab/student/components/StudentSearchChannel'
import BioChannel from '../features/about/components/BioChannel'

// 서버·채널 ID → 채널 콘텐츠 컴포넌트 매핑 테이블
const channelComponents: Record<string, Record<string, ComponentType>> = {
  home: {
    welcome: WelcomeChannel,
    'about-me': AboutMeChannel,
    skills: SkillsChannel,
    links: LinksChannel,
  },
  projects: {
    'team-projects': TeamProjectsChannel,
    'side-projects': SideProjectsChannel,
    'open-source': OpenSourceChannel,
  },
  blog: {
    'latest-posts': LatestPostsChannel,
  },
  lab: {
    tools: ToolsChannel,
    'study-rooms': StudyRoomsChannel,
    'student-search': StudentSearchChannel,
  },
  about: {
    bio: BioChannel,
  },
}

// URL 파라미터(server, channel)를 보고 대응하는 채널 컴포넌트를 렌더링한다.
// 매핑이 없는 경우 /home/welcome으로 리다이렉트한다.
export default function ChannelRouter() {
  const { server, channel } = useParams<{ server: string; channel: string }>()
  const Component = channelComponents[server ?? '']?.[channel ?? '']
  if (!Component) return <Navigate to="/home/welcome" replace />
  return <Component />
}
