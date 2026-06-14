import ChannelSection from '../../../shared/components/ChannelSection/ChannelSection'
import ProjectCard from './ProjectCard/ProjectCard'
import { useProjects } from '../hooks/useProjects'

export default function TeamProjectsChannel() {
  const { data, isLoading, error } = useProjects()

  if (isLoading) return <ChannelSection title="🤝 팀프로젝트"><p>불러오는 중...</p></ChannelSection>
  if (error) return <ChannelSection title="🤝 팀프로젝트"><p>{error}</p></ChannelSection>

  const projects = data?.filter(p => p.category === 'team') ?? []

  return (
    <ChannelSection title="🤝 팀프로젝트">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </ChannelSection>
  )
}
