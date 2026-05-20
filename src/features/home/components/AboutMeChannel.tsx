import EmbedCard from '../../../shared/components/EmbedCard/EmbedCard'
import ChannelSection from '../../../shared/components/ChannelSection/ChannelSection'

export default function AboutMeChannel() {
  return (
    <ChannelSection title="👤 About Me">
      <EmbedCard
        accentColor="var(--dc-brand)"
        title="Baek Jihoon"
        description="백엔드 개발자. Spring Boot / Kotlin 기반 서버 개발과 React 프론트엔드 작업을 주로 합니다. Docker + NAS 환경에서 개인 프로젝트를 직접 운영합니다."
        tags={['Backend', 'DevOps', 'React']}
      />
      <EmbedCard
        accentColor="var(--dc-green)"
        title="현재 진행 중"
        description="개인 Lab 사이트 Discord UI 컨셉 재구성. Spring Boot 기반 API 서버(api.chuseok22.com) 연동 예정."
        tags={['In Progress']}
      />
    </ChannelSection>
  )
}
