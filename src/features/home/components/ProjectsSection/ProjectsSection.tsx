import { projects } from '../../constants/projects'
import ProjectCard from './ProjectCard/ProjectCard'
import styles from './ProjectsSection.module.css'

export default function ProjectsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>Projects</h2>
        <p className={styles.subheading}>진행한 프로젝트들입니다.</p>
        <div className={styles.grid}>
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
