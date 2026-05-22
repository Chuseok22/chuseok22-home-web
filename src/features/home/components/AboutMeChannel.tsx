import ChannelSection from '../../../shared/components/ChannelSection/ChannelSection'
import Timeline from './Timeline/Timeline'
import CertificationList from './CertificationList/CertificationList'
import { timelineItems, certifications } from '../constants/homeData'
import styles from './AboutMeChannel.module.css'

export default function AboutMeChannel() {
  return (
    <ChannelSection title="👤 About Me">
      <div className={styles.sectionDivider}>
        <span className={styles.sectionLabel}>Timeline</span>
        <div className={styles.dividerLine} />
      </div>
      <Timeline items={timelineItems} />
      <div className={styles.sectionDivider}>
        <span className={styles.sectionLabel}>Certifications</span>
        <div className={styles.dividerLine} />
      </div>
      <CertificationList items={certifications} />
    </ChannelSection>
  )
}
