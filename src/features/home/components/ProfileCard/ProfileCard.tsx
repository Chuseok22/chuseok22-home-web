import { Mail } from 'lucide-react'
import { GithubIcon } from '../../../../assets/icons'
import styles from './ProfileCard.module.css'

interface ProfileCardProps {
  imageSrc?: string
  nameEn: string
  nameKo: string
  bio: string
  tags: string[]
  links: { icon: 'github' | 'email'; href: string }[]
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
              {link.icon === 'github' ? <GithubIcon className={styles.githubIcon} /> : <Mail size={20} />}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
