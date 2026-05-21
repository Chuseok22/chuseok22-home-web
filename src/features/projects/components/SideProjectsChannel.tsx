import EmbedCard from '../../../shared/components/EmbedCard/EmbedCard'
import ChannelSection from '../../../shared/components/ChannelSection/ChannelSection'
import { sideProjects } from '../constants/projectsData'

export default function SideProjectsChannel() {
  return (
    <ChannelSection title="🚀 개인프로젝트">
      {sideProjects.map((project) => (
        <EmbedCard
          key={project.id}
          accentColor={project.accentColor}
          title={project.title}
          titleHref={project.titleHref}
          description={project.description}
          tags={[...project.tags, project.status]}
        />
      ))}
    </ChannelSection>
  )
}
