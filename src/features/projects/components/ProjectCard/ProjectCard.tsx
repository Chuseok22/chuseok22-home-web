import { Calendar, Users, Briefcase, ExternalLink } from 'lucide-react'
import { GithubIcon } from '../../../../assets/icons'
import TechTag from '../../../../shared/components/TechTag/TechTag'
import type { ProjectItem } from '../../constants/projectsData'
import styles from './ProjectCard.module.css'

interface ProjectCardProps {
  project: ProjectItem
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const {
    title,
    description,
    period,
    teamSize,
    role,
    highlights,
    tags,
    status,
    accentColor,
    githubHref,
    demoHref,
  } = project

  const hasMeta = period || teamSize !== undefined || role

  return (
    <div
      className={styles.card}
      style={{ '--card-accent': accentColor } as React.CSSProperties}
    >
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <span className={styles.title}>{title}</span>
          <span className={styles.statusBadge}>{status}</span>
        </div>
        {(githubHref || demoHref) && (
          <div className={styles.links}>
            {githubHref && (
              <a
                href={githubHref}
                className={styles.linkBtn}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub 저장소"
              >
                <GithubIcon className={styles.githubIcon} />
              </a>
            )}
            {demoHref && (
              <a
                href={demoHref}
                className={styles.linkBtn}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="라이브 데모"
              >
                <ExternalLink size={15} />
              </a>
            )}
          </div>
        )}
      </div>

      {hasMeta && (
        <div className={styles.meta}>
          {period && (
            <span className={styles.metaItem}>
              <Calendar size={12} />
              {period}
            </span>
          )}
          {teamSize !== undefined && (
            <span className={styles.metaItem}>
              <Users size={12} />
              {teamSize}명
            </span>
          )}
          {role && (
            <span className={styles.metaItem}>
              <Briefcase size={12} />
              {role}
            </span>
          )}
        </div>
      )}

      <p className={styles.description}>{description}</p>

      {highlights && highlights.length > 0 && (
        <ul className={styles.highlights}>
          {highlights.map((item) => (
            <li key={item} className={styles.highlightItem}>
              {item}
            </li>
          ))}
        </ul>
      )}

      {tags.length > 0 && (
        <div className={styles.tags}>
          {tags.map((tag) => (
            <TechTag key={tag} name={tag} />
          ))}
        </div>
      )}
    </div>
  )
}
