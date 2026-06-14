import ChannelSection from '../../../shared/components/ChannelSection/ChannelSection'
import ProjectCard from './ProjectCard/ProjectCard'
import { useProjects } from '../hooks/useProjects'

export default function SideProjectsChannel() {
  const { data, isLoading, error } = useProjects()

  if (isLoading) return <ChannelSection title="🚀 개인프로젝트"><p>불러오는 중...</p></ChannelSection>
  if (error) return <ChannelSection title="🚀 개인프로젝트"><p>{error}</p></ChannelSection>

  const projects = data?.filter(p => p.category === 'side') ?? []

  return (
    <ChannelSection title="🚀 개인프로젝트">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </ChannelSection>
  )
}
