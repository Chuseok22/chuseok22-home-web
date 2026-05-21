import EmbedCard from '../../../shared/components/EmbedCard/EmbedCard'
import ChannelSection from '../../../shared/components/ChannelSection/ChannelSection'
import { teamProjects } from '../constants/projectsData'

export default function TeamProjectsChannel() {
  return (
    <ChannelSection title="🤝 팀프로젝트">
      {teamProjects.map((project) => (
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
