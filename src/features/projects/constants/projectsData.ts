export interface ProjectItem {
  id: string
  title: string
  titleHref?: string
  description: string
  tags: string[]
  accentColor: string
  status: string
}

export const teamProjects: ProjectItem[] = [
  {
    id: 'tp-1',
    title: '팀 프로젝트 예시',
    description: '팀원들과 함께 진행한 프로젝트입니다. 상세 내용을 추가하세요.',
    tags: ['Spring Boot', 'React', 'PostgreSQL'],
    accentColor: 'var(--dc-green)',
    status: '완료',
  },
]

export const sideProjects: ProjectItem[] = [
  {
    id: 'sp-1',
    title: 'chuseok22-home-web',
    titleHref: 'https://github.com/Chuseok22/chuseok22-home-web',
    description: 'Discord UI 컨셉의 개인 Lab 사이트. React + TypeScript + framer-motion으로 구현.',
    tags: ['React', 'TypeScript', 'Vite', 'framer-motion'],
    accentColor: 'var(--dc-brand)',
    status: '진행 중',
  },
]

export const openSourceProjects: ProjectItem[] = [
  {
    id: 'os-1',
    title: '오픈소스 기여 예시',
    description: '기여한 오픈소스 프로젝트를 추가하세요.',
    tags: ['Open Source'],
    accentColor: 'var(--dc-yellow)',
    status: 'WIP',
  },
]
