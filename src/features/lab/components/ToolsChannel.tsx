import EmbedCard from '../../../shared/components/EmbedCard/EmbedCard'
import { labTools } from '../constants/labData'

export default function ToolsChannel() {
  return (
    <div>
      <h2 style={{ color: 'var(--dc-text-header)', fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>
        🧪 Lab 도구
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
      </div>
    </div>
  )
}
