import type { ReactNode } from 'react'
import styles from './EmbedCard.module.css'

interface MetaItem {
  icon: ReactNode
  label: string
}

export interface EmbedCardProps {
  accentColor?: string
  icon?: ReactNode
  title: string
  titleHref?: string
  description?: string
  tags?: string[]
  meta?: MetaItem[]
}

export default function EmbedCard({
  accentColor = 'var(--dc-brand)',
  icon,
  title,
  titleHref,
  description,
  tags,
  meta,
}: EmbedCardProps) {
  return (
    <div className={styles.card} style={{ borderLeftColor: accentColor }}>
      <div className={styles.header}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <div className={styles.titleRow}>
          {titleHref ? (
            <a href={titleHref} className={styles.titleLink} target="_blank" rel="noopener noreferrer">
              {title}
            </a>
          ) : (
            <span className={styles.title}>{title}</span>
          )}
          {tags && tags.length > 0 && (
            <div className={styles.tags}>
              {tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      {description && <p className={styles.description}>{description}</p>}
      {meta && meta.length > 0 && (
        <div className={styles.meta}>
          {meta.map((item, i) => (
            <span key={i} className={styles.metaItem}>
              {item.icon}
              {item.label}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
