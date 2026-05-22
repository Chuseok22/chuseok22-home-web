import { useState } from 'react'
import type { TimelineItem } from '../../constants/homeData'
import styles from './Timeline.module.css'
import { AppStoreBadge, GooglePlayBadge } from '../../../../assets/icons'

interface TimelineProps {
  items: TimelineItem[]
}

interface LogoProps {
  src: string
  alt: string
}

// 로고 이미지 — onerror 시 이니셜 대체
function OrgLogo({ src, alt }: LogoProps) {
  const [errored, setErrored] = useState(false)
  const initial = alt.charAt(0).toUpperCase()

  if (errored) {
    return (
      <div className={styles.logoFallback} aria-label={alt}>
        {initial}
      </div>
    )
  }

  return (
    <img
      className={styles.logo}
      src={src}
      alt={alt}
      onError={() => setErrored(true)}
    />
  )
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className={styles.timeline}>
      {items.map((item, index) => (
        <div key={`${item.org}-${item.period}`} className={styles.item}>
          {/* 왼쪽: 로고 + 연결선 */}
          <div className={styles.leftCol}>
            <div className={styles.logoWrapper}>
              <OrgLogo src={item.logoSrc} alt={item.org} />
            </div>
            {/* 마지막 항목이 아니면 연결선 표시 */}
            {index < items.length - 1 && <div className={styles.connector} />}
          </div>

          {/* 오른쪽: 콘텐츠 */}
          <div className={styles.content}>
            <div className={styles.headerRow}>
              <span className={styles.period}>{item.period}</span>
              {item.isCurrent && (
                <span className={styles.currentBadge}>Current</span>
              )}
            </div>
            <p className={styles.org}>{item.org}</p>
            {item.description && (
              <p className={styles.description}>{item.description}</p>
            )}
            {item.storeLinks && (
              <div className={styles.storeLinks}>
                {item.storeLinks.appStore && (
                  <a
                    href={item.storeLinks.appStore}
                    className={styles.storeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="App Store"
                  >
                    <AppStoreBadge className={styles.storeBadge} />
                  </a>
                )}
                {item.storeLinks.playStore && (
                  <a
                    href={item.storeLinks.playStore}
                    className={styles.storeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Google Play"
                  >
                    <GooglePlayBadge className={styles.storeBadge} />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
