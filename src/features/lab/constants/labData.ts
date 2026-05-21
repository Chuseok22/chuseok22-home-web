export interface LabTool {
  id: string
  title: string
  titleHref?: string
  description: string
  tags: string[]
  status: string
}

export const labTools: LabTool[] = [
  {
    id: 'lt-1',
    title: 'JSON Formatter',
    description: 'JSON 데이터를 보기 좋게 정렬하고 검증하는 도구입니다.',
    tags: ['JSON', 'Utility'],
    status: 'WIP',
  },
]
