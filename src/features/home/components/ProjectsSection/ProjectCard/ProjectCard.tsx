import type { Project } from '../../../constants/projects'
import styles from './ProjectCard.module.css'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.content}>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>
        <div className={styles.tags}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className={styles.links}>
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            GitHub
          </a>
        )}
        {project.webUrl && (
          <a
            href={project.webUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Website
          </a>
        )}
        {project.playStoreUrl && (
          <a
            href={project.playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Google Play
          </a>
        )}
        {project.appStoreUrl && (
          <a
            href={project.appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            App Store
          </a>
        )}
      </div>
    </article>
  )
}
