import { useEffect, useState } from 'react'
import type { Certification } from '../../constants/homeData'
import styles from './CertificationList.module.css'

interface CertificationListProps {
  items: Certification[]
}

export default function CertificationList({ items }: CertificationListProps) {
  // 선택된 자격증 인덱스 (null이면 모달 닫힘)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const selectedCert = selectedIndex !== null ? items[selectedIndex] : null

  useEffect(() => {
    if (selectedCert === null) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedIndex(null)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedCert])

  return (
    <>
      <div className={styles.list}>
        {items.map((cert, index) => (
          <button
            key={cert.title}
            className={styles.card}
            onClick={() => setSelectedIndex(index)}
            type="button"
          >
            <p className={styles.title}>{cert.title}</p>
            <p className={styles.issuer}>{cert.issuer}</p>
            <p className={styles.issuedAt}>{cert.issuedAt}</p>
          </button>
        ))}
      </div>

      {/* 모달: 자격증 이미지 전체 표시 */}
      {selectedCert && (
        <div
          className={styles.overlay}
          onClick={() => setSelectedIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selectedCert.title}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.closeBtn}
              onClick={() => setSelectedIndex(null)}
              type="button"
              aria-label="닫기"
            >
              ×
            </button>
            <img
              className={styles.certImage}
              src={selectedCert.imageSrc}
              alt={selectedCert.title}
            />
            <p className={styles.modalTitle}>{selectedCert.title}</p>
          </div>
        </div>
      )}
    </>
  )
}
