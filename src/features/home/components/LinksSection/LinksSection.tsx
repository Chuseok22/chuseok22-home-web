import styles from './LinksSection.module.css'

const links = [
  {
    label: 'GitHub',
    description: '오픈소스 프로젝트 및 코드',
    href: 'https://github.com/Chuseok22',
  },
  {
    label: 'Blog',
    description: '개발 경험 및 기술 글',
    href: 'https://velog.io/@chuseok22/posts',
  },
]

export default function LinksSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>Links</h2>
        <div className={styles.list}>
          {links.map(({ label, description, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.item}
            >
              <span className={styles.label}>{label}</span>
              <span className={styles.description}>{description}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
