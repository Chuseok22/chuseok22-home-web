import type { ReactNode } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Hash, Menu } from 'lucide-react'
import { serverMap } from '../../constants/servers'
import styles from './MainContent.module.css'

interface MainContentProps {
  children: ReactNode
  onMenuClick: () => void
}

export default function MainContent({ children, onMenuClick }: MainContentProps) {
  const { server: serverId, channel: channelId } = useParams<{
    server: string
    channel: string
  }>()
  const location = useLocation()
  const shouldReduceMotion = useReducedMotion()

  const currentServer = serverMap[serverId ?? '']
  const currentChannel = currentServer?.channels.find((ch) => ch.id === channelId)

  const pageVariants: Variants = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -4 },
      }

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <button
          className={styles.menuButton}
          onClick={onMenuClick}
          aria-label="채널 목록 열기"
        >
          <Menu size={20} />
        </button>
        <Hash size={20} className={styles.hashIcon} />
        <span className={styles.channelName}>{currentChannel?.name ?? ''}</span>
      </header>

      <div className={styles.content}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.15 }}
            className={styles.channelContent}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  )
}
