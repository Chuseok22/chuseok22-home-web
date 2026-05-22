export interface ProjectItem {
  id: string
  title: string
  description: string
  tags: string[]
  accentColor: string
  status: string
  // 기존 선택 필드
  titleHref?: string
  // 팀 프로젝트 확장 필드
  period?: string
  teamSize?: number
  role?: string
  highlights?: string[]
  githubHref?: string
  demoHref?: string
}

export const teamProjects: ProjectItem[] = [
  {
    id: 'tp-1',
    title: '프로젝트명 입력 예정',
    description: '프로젝트 설명을 입력하세요. 어떤 문제를 해결했는지, 어떤 서비스인지 2-3줄로 작성합니다.',
    period: '2024.01 ~ 2024.06',
    teamSize: 4,
    role: '백엔드 개발',
    highlights: [
      '주요 성과 1을 입력하세요.',
      '주요 성과 2를 입력하세요.',
    ],
    tags: ['Spring Boot', 'React', 'PostgreSQL'],
    accentColor: 'var(--dc-green)',
    status: '완료',
    githubHref: 'https://github.com/Chuseok22',
  },
]

export const sideProjects: ProjectItem[] = [
  {
    id: 'sp-1',
    title: 'chuseok22-home-web',
    description: 'Discord UI 컨셉의 개인 Lab 사이트. React + TypeScript + framer-motion으로 구현.',
    period: '2026.05 ~ 현재',
    role: '풀스택 개발',
    highlights: [
      'Discord 4패널 레이아웃 구현',
      '개인 포트폴리오·블로그·유틸 통합',
    ],
    tags: ['React', 'TypeScript', 'Vite', 'framer-motion'],
    accentColor: 'var(--dc-brand)',
    status: '진행 중',
    githubHref: 'https://github.com/Chuseok22/chuseok22-home-web',
  },
]

export const openSourceProjects: ProjectItem[] = [
  {
    id: 'os-1',
    title: '오픈소스 기여 예시',
    description: '기여한 오픈소스 프로젝트를 추가하세요.',
    role: '컨트리뷰터',
    highlights: [
      '기여 내용을 입력하세요.',
    ],
    tags: ['Open Source'],
    accentColor: 'var(--dc-yellow)',
    status: 'WIP',
  },
]
