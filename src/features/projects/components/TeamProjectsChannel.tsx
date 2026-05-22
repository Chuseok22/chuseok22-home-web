import ChannelSection from '../../../shared/components/ChannelSection/ChannelSection'
import ProjectCard from './ProjectCard/ProjectCard'
import { teamProjects } from '../constants/projectsData'

export default function TeamProjectsChannel() {
  return (
    <ChannelSection title="🤝 팀프로젝트">
      {teamProjects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </ChannelSection>
  )
}
