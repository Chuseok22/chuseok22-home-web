import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import ServerBar from '../ServerBar/ServerBar'
import ChannelSidebar from '../ChannelSidebar/ChannelSidebar'
import MainContent from '../MainContent/MainContent'
import ActivityPanel from '../ActivityPanel/ActivityPanel'
import styles from './AppShell.module.css'

export default function AppShell() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className={styles.shell}>
      <div className={styles.mobileDrawer} data-open={isSidebarOpen}>
        <ServerBar />
        <ChannelSidebar onClose={() => setIsSidebarOpen(false)} />
      </div>
      {isSidebarOpen && (
        <div
          className={styles.overlay}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <MainContent onMenuClick={() => setIsSidebarOpen(true)}>
        <Outlet />
      </MainContent>
      <ActivityPanel />
    </div>
  )
}
