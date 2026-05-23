import ChannelSection from '../../../shared/components/ChannelSection/ChannelSection'
import ProjectCard from './ProjectCard/ProjectCard'
import { sideProjects } from '../constants/projectsData'

export default function SideProjectsChannel() {
  return (
    <ChannelSection title="🚀 개인프로젝트">
      {sideProjects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </ChannelSection>
  )
}
