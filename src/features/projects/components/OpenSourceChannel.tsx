import ChannelSection from '../../../shared/components/ChannelSection/ChannelSection'
import ProjectCard from './ProjectCard/ProjectCard'
import { useProjects } from '../hooks/useProjects'

export default function OpenSourceChannel() {
  const { data, isLoading, error } = useProjects()

  if (isLoading) return <ChannelSection title="🌐 오픈소스"><p>불러오는 중...</p></ChannelSection>
  if (error) return <ChannelSection title="🌐 오픈소스"><p>{error}</p></ChannelSection>

  const projects = data?.filter(p => p.category === 'open_source') ?? []

  return (
    <ChannelSection title="🌐 오픈소스">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </ChannelSection>
  )
}
