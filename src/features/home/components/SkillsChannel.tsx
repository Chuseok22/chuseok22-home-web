import ChannelSection from '../../../shared/components/ChannelSection/ChannelSection'
import TechTag from '../../../shared/components/TechTag/TechTag'
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
              <TechTag key={skill.name} name={skill.name} bgColor={skill.bgColor} textColor={skill.textColor} />
            ))}
          </div>
        </div>
      ))}
    </ChannelSection>
  )
}
