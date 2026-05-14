import { techStack } from '../../constants/techStack'
import styles from './TechStackSection.module.css'

export default function TechStackSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>Tech Stack</h2>
        <p className={styles.subheading}>주로 사용하는 기술 스택입니다.</p>
        <div className={styles.categories}>
          {techStack.map(({ category, items }) => (
            <div key={category} className={styles.category}>
              <h3 className={styles.categoryName}>{category}</h3>
              <div className={styles.items}>
                {items.map((item) => (
                  <span key={item} className={styles.item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
