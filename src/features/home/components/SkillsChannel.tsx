import EmbedCard from '../../../shared/components/EmbedCard/EmbedCard'
import { skills } from '../constants/homeData'

export default function SkillsChannel() {
  return (
    <div>
      <h2 style={{ color: 'var(--dc-text-header)', fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>
        🛠 Skills
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {skills.map((group) => (
          <EmbedCard
            key={group.category}
            accentColor="var(--dc-brand)"
            title={group.category}
            tags={group.items}
          />
        ))}
      </div>
    </div>
  )
}
