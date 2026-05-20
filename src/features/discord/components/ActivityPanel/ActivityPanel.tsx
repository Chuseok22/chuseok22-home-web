import { motion, useReducedMotion } from 'framer-motion'
import { Activity } from 'lucide-react'
import { activityItems } from '../../constants/activity'
import styles from './ActivityPanel.module.css'

export default function ActivityPanel() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <aside className={styles.panel} aria-label="활동 피드">
      <header className={styles.header}>
        <Activity size={14} />
        <span>최근 활동</span>
      </header>
      <div className={styles.list}>
        {activityItems.map((item, index) => (
          <motion.div
            key={item.id}
            className={styles.item}
            initial={shouldReduceMotion ? {} : { opacity: 0, y: -10 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { delay: index * 0.05, duration: 0.2 }
            }
          >
            <span className={styles.dot} aria-hidden="true" />
            <div className={styles.itemContent}>
              <span className={styles.itemTitle}>{item.title}</span>
              <span className={styles.itemMeta}>{item.meta}</span>
              <span className={styles.itemTimestamp}>{item.timestamp}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </aside>
  )
}
