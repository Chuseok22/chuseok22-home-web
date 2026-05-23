import ChannelSection from '../../../shared/components/ChannelSection/ChannelSection'
import ProjectCard from './ProjectCard/ProjectCard'
import { openSourceProjects } from '../constants/projectsData'

export default function OpenSourceChannel() {
  return (
    <ChannelSection title="🌐 오픈소스">
      {openSourceProjects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </ChannelSection>
  )
}
