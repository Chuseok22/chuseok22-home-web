import type { Server } from '../types/discord'

export const servers: Server[] = [
  {
    id: 'home',
    name: 'Home',
    emoji: '🏠',
    defaultChannel: 'welcome',
    categories: [
      { id: 'info', name: '정보' },
      { id: 'skills', name: '기술' },
    ],
    channels: [
      { id: 'welcome', name: 'welcome', categoryId: 'info' },
      { id: 'about-me', name: 'about-me', categoryId: 'info' },
      { id: 'skills', name: 'skills', categoryId: 'skills' },
      { id: 'links', name: 'links', categoryId: 'skills' },
    ],
  },
  {
    id: 'projects',
    name: 'Projects',
    emoji: '💼',
    defaultChannel: 'team-projects',
    categories: [
      { id: 'team', name: '팀프로젝트' },
      { id: 'personal', name: '개인프로젝트' },
    ],
    channels: [
      { id: 'team-projects', name: 'team-projects', categoryId: 'team' },
      { id: 'side-projects', name: 'side-projects', categoryId: 'personal' },
      { id: 'open-source', name: 'open-source', categoryId: 'personal' },
    ],
  },
  {
    id: 'blog',
    name: 'Blog',
    emoji: '📝',
    defaultChannel: 'latest-posts',
    categories: [
      { id: 'posts', name: '포스트' },
    ],
    channels: [
      { id: 'latest-posts', name: 'latest-posts', categoryId: 'posts' },
    ],
  },
  {
    id: 'lab',
    name: 'Lab',
    emoji: '🧪',
    defaultChannel: 'tools',
    categories: [
      { id: 'tools', name: '도구' },
    ],
    channels: [
      { id: 'tools', name: 'tools', categoryId: 'tools' },
      { id: 'study-rooms', name: 'study-rooms', categoryId: 'tools' },
      { id: 'student-search', name: 'student-search', categoryId: 'tools' },
    ],
  },
  {
    id: 'about',
    name: 'About',
    emoji: '👤',
    defaultChannel: 'bio',
    categories: [
      { id: 'about', name: '소개' },
    ],
    channels: [
      { id: 'bio', name: 'bio', categoryId: 'about' },
    ],
  },
]

export const serverMap: Record<string, Server> = Object.fromEntries(
  servers.map((s) => [s.id, s])
)
