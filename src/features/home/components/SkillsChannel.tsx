import ChannelSection from '../../../shared/components/ChannelSection/ChannelSection'
import SkillBadge from './SkillBadge/SkillBadge'
import { skillGroups } from '../constants/homeData'
import styles from './SkillsChannel.module.css'

export default function SkillsChannel() {
  return (
    <ChannelSection title="🛠 Skills">
      {skillGroups.map((group) => (
        <div key={group.category} className={styles.group}>
          <h3 className={styles.categoryLabel}>{group.category}</h3>
          <div className={styles.badgeGrid}>
            {group.items.map((skill) => (
              <SkillBadge key={skill.name} {...skill} />
            ))}
          </div>
        </div>
      ))}
    </ChannelSection>
  )
}
