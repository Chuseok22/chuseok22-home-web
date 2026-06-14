import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Activity } from 'lucide-react'
import { useActivities } from '../../activities/hooks/useActivities'
import { formatOccurredAt } from '../../activities/utils/timeFormat'
import styles from './ActivityPanel.module.css'

const SKELETON_COUNT = 5

function SkeletonItem() {
  return (
    <div className={styles.skeletonItem} aria-hidden="true">
      <span className={styles.skeletonDot} />
      <div className={styles.skeletonContent}>
        <span className={styles.skeletonTitle} />
        <span className={styles.skeletonMeta} />
        <span className={styles.skeletonTimestamp} />
      </div>
    </div>
  )
}

export default function ActivityPanel() {
  const shouldReduceMotion = useReducedMotion()
  const { items, isLoading, isLoadingMore, error, hasMore, loadMore } = useActivities()
  const sentinelRef = useRef<HTMLDivElement>(null)

  // sentinel 요소가 뷰포트에 진입하면 다음 페이지 로드
  useEffect(() => {
    const sentinel = sentinelRef.current
    if (sentinel === null) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          loadMore()
        }
      },
      { threshold: 0 },
    )

    observer.observe(sentinel)
    return () => {
      observer.disconnect()
    }
  }, [loadMore])

  return (
    <aside className={styles.panel} aria-label="활동 피드">
      <header className={styles.header}>
        <Activity size={14} />
        <span>최근 활동</span>
      </header>
      <div className={styles.list}>
        {isLoading &&
          Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <SkeletonItem key={i} />
          ))}

        {!isLoading && error !== null && (
          <p className={styles.error}>{error}</p>
        )}

        {!isLoading &&
          error === null &&
          items.map((item, index) => (
            <motion.div
              key={item.id}
              className={styles.item}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: -10 }}
              animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { delay: Math.min(index, 10) * 0.04, duration: 0.2 }
              }
            >
              <span className={styles.dot} aria-hidden="true" />
              <div className={styles.itemContent}>
                <span className={styles.itemTitle}>{item.title}</span>
                <span className={styles.itemMeta}>{item.meta}</span>
                <span className={styles.itemTimestamp}>{formatOccurredAt(item.occurred_at)}</span>
              </div>
            </motion.div>
          ))}

        {isLoadingMore && (
          <div className={styles.loadingMore} aria-label="활동 더 불러오는 중">
            <span className={styles.loadingDot} />
          </div>
        )}

        {/* IntersectionObserver 감지 대상. hasMore가 false이면 숨겨 추가 요청 방지 */}
        {hasMore && !isLoading && <div ref={sentinelRef} className={styles.sentinel} />}
      </div>
    </aside>
  )
}
