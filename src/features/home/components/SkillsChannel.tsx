import EmbedCard from '../../../shared/components/EmbedCard/EmbedCard'
import ChannelSection from '../../../shared/components/ChannelSection/ChannelSection'
import { skills } from '../constants/homeData'

export default function SkillsChannel() {
  return (
    <ChannelSection title="🛠 Skills">
      {skills.map((group) => (
        <EmbedCard
          key={group.category}
          accentColor="var(--dc-brand)"
          title={group.category}
          tags={group.items}
        />
      ))}
    </ChannelSection>
  )
}
