import { useNavigate, useParams } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { servers } from '../../constants/servers'
import styles from './ServerBar.module.css'

export default function ServerBar() {
  const navigate = useNavigate()
  const { server: activeServer } = useParams<{ server: string }>()
  const shouldReduceMotion = useReducedMotion()

  const handleServerClick = (serverId: string, defaultChannel: string) => {
    navigate(`/${serverId}/${defaultChannel}`)
  }

  return (
    <nav className={styles.bar} aria-label="서버 목록">
      <div className={styles.serverList}>
        {servers.map((server) => {
          const isActive = server.id === activeServer
          return (
            <div key={server.id} className={styles.serverItem}>
              <div
                className={`${styles.indicator} ${isActive ? styles.indicatorActive : ''}`}
              />
              <motion.button
                className={`${styles.icon} ${isActive ? styles.iconActive : ''}`}
                onClick={() => handleServerClick(server.id, server.defaultChannel)}
                aria-label={server.name}
                aria-current={isActive ? 'page' : undefined}
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : { borderRadius: '30%', backgroundColor: 'var(--dc-brand)' }
                }
                animate={
                  isActive
                    ? { borderRadius: '30%' }
                    : { borderRadius: '50%' }
                }
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { type: 'spring', stiffness: 300, damping: 20 }
                }
                title={server.name}
              >
                <span className={styles.emoji} role="img" aria-hidden="true">
                  {server.emoji}
                </span>
              </motion.button>
            </div>
          )
        })}
      </div>
    </nav>
  )
}
