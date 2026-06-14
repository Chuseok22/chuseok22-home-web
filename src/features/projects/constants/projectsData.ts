// Django API 응답 원본 타입 (snake_case)
export interface ProjectApiItem {
  id: number
  category: 'team' | 'side' | 'open_source'
  title: string
  description: string
  tags: string[]
  status: string
  order: number
  period: string
  team_size: number | null
  role: string
  highlights: string[]
  github_href: string
  demo_href: string
  title_href: string
}

// 컴포넌트에서 사용하는 UI 타입 (camelCase + accentColor)
export interface ProjectItem {
  id: string
  category: 'team' | 'side' | 'open_source'
  title: string
  description: string
  tags: string[]
  accentColor: string
  status: string
  titleHref?: string
  period?: string
  teamSize?: number
  role?: string
  highlights?: string[]
  githubHref?: string
  demoHref?: string
}
