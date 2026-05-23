import styles from './TechTag.module.css'

const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'

// 알려진 기술 스택 → devicon CDN URL 매핑 (빈 문자열은 아이콘 없음 — 첫 글자 폴백)
const SKILL_ICON_MAP: Record<string, string> = {
  React: `${DEVICON_BASE}/react/react-original.svg`,
  TypeScript: `${DEVICON_BASE}/typescript/typescript-original.svg`,
  JavaScript: `${DEVICON_BASE}/javascript/javascript-original.svg`,
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

interface TechTagProps {
  name: string
  // bgColor/textColor는 SkillsChannel의 스킬 배지 색상용 (JS 데이터 기반 예외 허용)
  bgColor?: string
  textColor?: string
}

export default function TechTag({ name, bgColor, textColor }: TechTagProps): React.ReactElement {
  const iconUrl = SKILL_ICON_MAP[name]
  const hasCustomColor = Boolean(bgColor || textColor)
  // 맵에 등록됐지만 아이콘 URL 없는 경우(NAS 등)만 이름 첫 글자 표시
  const showFallbackLetter = hasCustomColor && name in SKILL_ICON_MAP && !iconUrl

  return (
    <div
      className={hasCustomColor ? styles.tagColored : styles.tag}
      style={
        hasCustomColor
          ? ({ background: bgColor, color: textColor } as React.CSSProperties)
          : undefined
      }
    >
      {iconUrl && (
        <img className={styles.icon} src={iconUrl} alt={name} aria-hidden="true" />
      )}
      {showFallbackLetter && (
        <span className={styles.iconFallback}>{name.charAt(0)}</span>
      )}
      <span className={styles.name}>{name}</span>
    </div>
  )
}
