import styles from './SkillBadge.module.css'

interface SkillBadgeProps {
  name: string
  bgColor: string
  textColor: string
}

const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'

// devicon CDN URL 매핑 (없으면 이름 첫 글자로 대체)
const SKILL_ICON_MAP: Record<string, string> = {
  React: `${DEVICON_BASE}/react/react-original.svg`,
  TypeScript: `${DEVICON_BASE}/typescript/typescript-original.svg`,
  Vite: `${DEVICON_BASE}/vitejs/vitejs-original.svg`,
  Capacitor: `${DEVICON_BASE}/capacitor/capacitor-original.svg`,
  'Next.js': `${DEVICON_BASE}/nextjs/nextjs-original.svg`,
  'Spring Boot': `${DEVICON_BASE}/spring/spring-original.svg`,
  Java: `${DEVICON_BASE}/java/java-original.svg`,
  Kotlin: `${DEVICON_BASE}/kotlin/kotlin-original.svg`,
  PostgreSQL: `${DEVICON_BASE}/postgresql/postgresql-original.svg`,
  MySQL: `${DEVICON_BASE}/mysql/mysql-original.svg`,
  Redis: `${DEVICON_BASE}/redis/redis-original.svg`,
  Docker: `${DEVICON_BASE}/docker/docker-original.svg`,
  'GitHub Actions': `${DEVICON_BASE}/github/github-original.svg`,
  Nginx: `${DEVICON_BASE}/nginx/nginx-original.svg`,
  AWS: `${DEVICON_BASE}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
  NAS: '',
}

export default function SkillBadge({ name, bgColor, textColor }: SkillBadgeProps) {
  const iconUrl = SKILL_ICON_MAP[name]

  return (
    // bgColor/textColor는 JS 데이터 객체로 inline style 전달 — 예외 허용
    <div className={styles.badge} style={{ background: bgColor, color: textColor }}>
      {iconUrl ? (
        <img className={styles.icon} src={iconUrl} alt={name} aria-hidden="true" />
      ) : (
        // 매핑 없는 스킬: 이름 첫 글자로 대체
        <span className={styles.iconFallback}>{name.charAt(0)}</span>
      )}
      <span className={styles.name}>{name}</span>
    </div>
  )
}
