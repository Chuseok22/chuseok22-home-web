import EmbedCard from '../../../shared/components/EmbedCard/EmbedCard'
import { links } from '../constants/homeData'

export default function LinksChannel() {
  return (
    <div>
      <h2 style={{ color: 'var(--dc-text-header)', fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>
        🔗 Links
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {links.map((link) => (
          <EmbedCard
            key={link.label}
            accentColor="var(--dc-brand)"
            title={link.label}
            titleHref={link.href}
            description={link.description}
          />
        ))}
      </div>
    </div>
  )
}
