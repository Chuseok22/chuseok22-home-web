import EmbedCard from '../../../shared/components/EmbedCard/EmbedCard'
import ChannelSection from '../../../shared/components/ChannelSection/ChannelSection'
import { labTools } from '../constants/labData'

export default function ToolsChannel() {
  return (
    <ChannelSection title="🧪 Lab 도구">
      {labTools.map((tool) => (
        <EmbedCard
          key={tool.id}
          accentColor="var(--dc-yellow)"
          title={tool.title}
          titleHref={tool.titleHref}
          description={tool.description}
          tags={[...tool.tags, tool.status]}
        />
      ))}
    </ChannelSection>
  )
}
