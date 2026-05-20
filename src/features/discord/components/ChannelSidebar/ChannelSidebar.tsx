import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Hash, ChevronDown, ChevronRight } from 'lucide-react'
import { serverMap } from '../../constants/servers'
import styles from './ChannelSidebar.module.css'

interface ChannelSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function ChannelSidebar({ isOpen, onClose }: ChannelSidebarProps) {
  const navigate = useNavigate()
  const { server: serverId, channel: activeChannel } = useParams<{
    server: string
    channel: string
  }>()
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set())
  const shouldReduceMotion = useReducedMotion()

  const currentServer = serverMap[serverId ?? '']

  const toggleCategory = (categoryId: string) => {
    setCollapsedCategories((prev) => {
      const next = new Set(prev)
      if (next.has(categoryId)) {
        next.delete(categoryId)
      } else {
        next.add(categoryId)
      }
      return next
    })
  }

  const handleChannelClick = (channelId: string) => {
    navigate(`/${serverId}/${channelId}`)
    onClose()
  }

  return (
    <motion.aside
      className={styles.sidebar}
      aria-label="채널 목록"
      initial={false}
      animate={
        shouldReduceMotion
          ? {}
          : { x: isOpen ? 0 : -240 }
      }
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { type: 'spring', stiffness: 300, damping: 30 }
      }
    >
      <div className={styles.serverHeader}>
        <span className={styles.serverName}>{currentServer?.name ?? ''}</span>
      </div>

      <div className={styles.channelList}>
        {currentServer?.categories.map((category) => {
          const isCollapsed = collapsedCategories.has(category.id)
          const categoryChannels = currentServer.channels.filter(
            (ch) => ch.categoryId === category.id
          )

          return (
            <div key={category.id} className={styles.category}>
              <button
                className={styles.categoryHeader}
                onClick={() => toggleCategory(category.id)}
                aria-expanded={!isCollapsed}
              >
                {isCollapsed ? (
                  <ChevronRight size={12} />
                ) : (
                  <ChevronDown size={12} />
                )}
                <span>{category.name}</span>
              </button>

              <AnimatePresence initial={false}>
                {!isCollapsed && (
                  <motion.div
                    initial={shouldReduceMotion ? {} : { height: 0, opacity: 0 }}
                    animate={shouldReduceMotion ? {} : { height: 'auto', opacity: 1 }}
                    exit={shouldReduceMotion ? {} : { height: 0, opacity: 0 }}
                    transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.15 }}
                    style={{ overflow: 'hidden' }}
                  >
                    {categoryChannels.map((channel) => {
                      const isActive = channel.id === activeChannel
                      return (
                        <button
                          key={channel.id}
                          className={`${styles.channelItem} ${isActive ? styles.channelItemActive : ''}`}
                          onClick={() => handleChannelClick(channel.id)}
                          aria-current={isActive ? 'page' : undefined}
                        >
                          <Hash size={18} className={styles.hashIcon} />
                          <span className={styles.channelName}>{channel.name}</span>
                        </button>
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </motion.aside>
  )
}
