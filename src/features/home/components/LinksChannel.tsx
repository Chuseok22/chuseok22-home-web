import EmbedCard from '../../../shared/components/EmbedCard/EmbedCard'
import ChannelSection from '../../../shared/components/ChannelSection/ChannelSection'
import { links } from '../constants/homeData'

export default function LinksChannel() {
  return (
    <ChannelSection title="🔗 Links">
      {links.map((link) => (
        <EmbedCard
          key={link.label}
          accentColor="var(--dc-brand)"
          title={link.label}
          titleHref={link.href}
          description={link.description}
        />
      ))}
    </ChannelSection>
  )
}
