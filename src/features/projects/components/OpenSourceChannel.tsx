import EmbedCard from '../../../shared/components/EmbedCard/EmbedCard'
import ChannelSection from '../../../shared/components/ChannelSection/ChannelSection'
import { openSourceProjects } from '../constants/projectsData'

export default function OpenSourceChannel() {
  return (
    <ChannelSection title="🌐 오픈소스">
      {openSourceProjects.map((project) => (
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
