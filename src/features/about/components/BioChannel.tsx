import EmbedCard from '../../../shared/components/EmbedCard/EmbedCard'
import { bioInfo } from '../constants/aboutData'

export default function BioChannel() {
  return (
    <div>
      <h2 style={{ color: 'var(--dc-text-header)', fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>
        👤 Bio
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <EmbedCard
          accentColor="var(--dc-brand)"
          title={bioInfo.name}
          description={`${bioInfo.role} — ${bioInfo.summary}`}
          tags={['Backend', 'DevOps', 'React']}
        />
        <EmbedCard
          accentColor="var(--dc-green)"
          title="Contact"
          description={`Email: ${bioInfo.email}`}
          titleHref={`mailto:${bioInfo.email}`}
        />
        <EmbedCard
          accentColor="var(--dc-brand)"
          title="GitHub"
          titleHref={bioInfo.github}
          description="오픈소스 기여 및 개인 프로젝트 저장소"
        />
      </div>
    </div>
  )
}
