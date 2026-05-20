import EmbedCard from '../../../shared/components/EmbedCard/EmbedCard'
import ChannelSection from '../../../shared/components/ChannelSection/ChannelSection'

export default function WelcomeChannel() {
  return (
    <ChannelSection title="👋 안녕하세요!" headingSize="lg">
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
    </ChannelSection>
  )
}
