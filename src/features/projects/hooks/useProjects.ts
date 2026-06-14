import { useCallback, useEffect, useState } from 'react'
import { fetchWithAuth } from '../../../shared/utils/api'
import type { ProjectApiItem, ProjectItem } from '../constants/projectsData'

const CATEGORY_COLOR: Record<string, string> = {
  team: 'var(--dc-green)',
  side: 'var(--dc-brand)',
  open_source: 'var(--dc-yellow)',
}

function toProjectItem(p: ProjectApiItem): ProjectItem {
  return {
    id: String(p.id),
    category: p.category,
    title: p.title,
    description: p.description,
    tags: p.tags,
    status: p.status,
    accentColor: CATEGORY_COLOR[p.category] ?? 'var(--dc-brand)',
    titleHref: p.title_href || undefined,
    period: p.period || undefined,
    teamSize: p.team_size ?? undefined,
    role: p.role || undefined,
    highlights: p.highlights.length > 0 ? p.highlights : undefined,
    githubHref: p.github_href || undefined,
    demoHref: p.demo_href || undefined,
  }
}

interface UseProjectsResult {
  data: ProjectItem[] | null
  isLoading: boolean
  error: string | null
  refresh: () => void
}

export function useProjects(): UseProjectsResult {
  const [data, setData] = useState<ProjectItem[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    const fetchProjects = async (): Promise<void> => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetchWithAuth('/api/v1/projects/', {
          authRequired: false,
          signal: controller.signal,
        })

        if (!response.ok) {
          setError('프로젝트 데이터를 불러오는 데 실패했습니다.')
          return
        }

        const json = (await response.json()) as ProjectApiItem[]
        setData(json.map(toProjectItem))
      } catch (err: unknown) {
        // AbortError는 의도적 취소이므로 에러 상태로 처리하지 않음
        if (err instanceof DOMException && err.name === 'AbortError') {
          return
        }
        setError('프로젝트 데이터를 불러오는 데 실패했습니다.')
      } finally {
        setIsLoading(false)
      }
    }

    void fetchProjects()

    return () => {
      controller.abort()
    }
  }, [refreshTrigger])

  const refresh = useCallback(() => {
    setRefreshTrigger((n) => n + 1)
  }, [])

  return { data, isLoading, error, refresh }
}
