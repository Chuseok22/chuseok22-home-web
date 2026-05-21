export interface BlogPost {
  id: string
  title: string
  titleHref?: string
  description: string
  tags: string[]
  date: string
}

export const blogPosts: BlogPost[] = [
  {
    id: 'bp-1',
    title: 'React 19 Concurrent 정리',
    description: 'React 19의 Concurrent 기능과 use() Hook에 대한 정리 글입니다.',
    tags: ['React', 'Frontend'],
    date: '2026-05-20',
  },
  {
    id: 'bp-2',
    title: 'Spring Boot + Kotlin 실전 팁',
    description: 'Kotlin coroutine과 Spring Boot를 함께 사용할 때의 실전 패턴을 정리했습니다.',
    tags: ['Spring Boot', 'Kotlin', 'Backend'],
    date: '2026-05-10',
  },
]
