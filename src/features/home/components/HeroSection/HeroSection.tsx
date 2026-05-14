import styles from './HeroSection.module.css'

export default function HeroSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.greeting}>안녕하세요</p>
        <h1 className={styles.name}>Baek Jihoon</h1>
        <p className={styles.role}>Backend & Frontend Developer</p>
        <p className={styles.bio}>
          Java/Spring 기반 백엔드와 TypeScript/React/Next.js/Capacitor 기반의
          웹·앱 개발을 합니다.
        </p>
        <div className={styles.links}>
          <a
            href="https://github.com/Chuseok22"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkPrimary}
          >
            GitHub
          </a>
          <a
            href="https://velog.io/@chuseok22/posts"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkSecondary}
          >
            Blog
          </a>
        </div>
      </div>
    </section>
  )
}
