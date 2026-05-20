import EmbedCard from '../../../shared/components/EmbedCard/EmbedCard'
import { openSourceProjects } from '../constants/projectsData'

export default function OpenSourceChannel() {
  return (
    <div>
      <h2 style={{ color: 'var(--dc-text-header)', fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>
        🌐 오픈소스
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
      </div>
    </div>
  )
}
