import type { ReactNode } from 'react'
import styles from './ChannelSection.module.css'

interface ChannelSectionProps {
  title: string
  children: ReactNode
  headingSize?: 'sm' | 'lg'
}

export default function ChannelSection({
  title,
  children,
  headingSize = 'sm',
}: ChannelSectionProps) {
  return (
    <div className={styles.section}>
      <h2 className={styles.heading} data-size={headingSize}>
        {title}
      </h2>
      <div className={styles.cardList}>{children}</div>
    </div>
  )
}
