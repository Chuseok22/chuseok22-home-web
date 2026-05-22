import styles from './ProfileCard.module.css'

interface ProfileCardProps {
  imageSrc?: string
  nameEn: string
  nameKo: string
  bio: string
  tags: string[]
  links: { icon: 'github' | 'email'; href: string }[]
}

// GitHub 공식 SVG (이번 작업 한정 inline SVG 예외 허용)
function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

// 이메일 envelope SVG (이번 작업 한정 inline SVG 예외 허용)
function EmailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="20"
      height="20"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <polyline points="2,4 12,13 22,4" />
    </svg>
  )
}

export default function ProfileCard({
  imageSrc,
  nameEn,
  nameKo,
  bio,
  tags,
  links,
}: ProfileCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.avatarWrapper}>
        {imageSrc ? (
          <img className={styles.avatarImg} src={imageSrc} alt={nameEn} />
        ) : (
          // imageSrc가 없을 때 이니셜로 대체
          <div className={styles.avatarInitial} aria-label={nameEn}>
            JH
          </div>
        )}
      </div>

      <div className={styles.info}>
        <div className={styles.nameRow}>
          <span className={styles.nameEn}>{nameEn}</span>
          <span className={styles.nameKo}>{nameKo}</span>
        </div>

        <p className={styles.bio}>{bio}</p>

        <div className={styles.tags}>
          {tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>

        <div className={styles.links}>
          {links.map((link) => (
            <a
              key={link.icon}
              href={link.href}
              className={styles.linkIcon}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              aria-label={link.icon === 'github' ? 'GitHub' : 'Email'}
            >
              {link.icon === 'github' ? <GithubIcon /> : <EmailIcon />}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
