import EmbedCard from '../../../shared/components/EmbedCard/EmbedCard'
import ChannelSection from '../../../shared/components/ChannelSection/ChannelSection'
import { bioInfo } from '../constants/aboutData'

export default function BioChannel() {
  return (
    <ChannelSection title="👤 Bio">
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
    </ChannelSection>
  )
}
