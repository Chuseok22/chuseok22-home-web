import EmbedCard from '../../../shared/components/EmbedCard/EmbedCard'

export default function WelcomeChannel() {
  return (
    <div>
      <h2 style={{ color: 'var(--dc-text-header)', fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>
        👋 안녕하세요!
      </h2>
      <p style={{ color: 'var(--dc-text-muted)', fontSize: '13px', marginBottom: '24px' }}>
        chuseok22-home에 오신 것을 환영합니다. Discord UI 컨셉으로 구성된 개인 Lab 사이트입니다.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <EmbedCard
          accentColor="var(--dc-brand)"
          title="포트폴리오 & 프로젝트"
          description="💼 Projects 서버에서 팀 프로젝트, 개인 프로젝트, 오픈소스 기여를 확인하세요."
        />
        <EmbedCard
          accentColor="var(--dc-green)"
          title="기술 블로그"
          description="📝 Blog 서버에서 개발 경험과 기술 정리 글을 읽어볼 수 있습니다."
        />
        <EmbedCard
          accentColor="var(--dc-yellow)"
          title="개인 도구 Lab"
          description="🧪 Lab 서버에서 개인 유틸리티 도구들을 사용해볼 수 있습니다."
        />
      </div>
    </div>
  )
}
