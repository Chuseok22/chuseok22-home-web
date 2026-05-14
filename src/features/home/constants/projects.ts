export interface Project {
  title: string
  description: string
  tags: string[]
  githubUrl?: string
  webUrl?: string
  playStoreUrl?: string
  appStoreUrl?: string
}

export const projects: Project[] = [
  {
    title: 'Waitee Plus',
    description: '웨이팅 기반 매장 관리 서비스. 고객 웨이팅 등록부터 입장 알림까지 제공하는 모바일 앱.',
    tags: ['React', 'Next.js', 'Capacitor', 'Spring Boot'],
    playStoreUrl: 'https://play.google.com/store/apps/details?id=kr.co.waitee.plus&pcampaignid=web_share',
    appStoreUrl: 'https://apps.apple.com/kr/app/%EC%9B%A8%EC%9D%B4%ED%8B%B0-%ED%94%8C%EB%9F%AC%EC%8A%A4-waitee/id6761998778',
  },
  {
    title: 'Meet Time',
    description: '여러 사람의 가능한 시간을 취합해 모임 시간을 쉽게 정할 수 있는 웹 서비스.',
    tags: ['React', 'TypeScript', 'Spring Boot'],
    githubUrl: 'https://github.com/Chuseok22/meet-time-web',
  },
  {
    title: 'capacitor-kakao-login',
    description: 'Capacitor 앱에서 카카오 소셜 로그인을 npm install 만으로 사용할 수 있는 플러그인. iOS/Android 지원.',
    tags: ['Capacitor', 'TypeScript', 'iOS', 'Android'],
    githubUrl: 'https://github.com/Chuseok22/capacitor-kakao-login',
  },
  {
    title: 'umbrella-return',
    description: '우산 대여 및 반납 관리 서비스. SMS 알림과 관리자 대시보드를 포함한 웹 애플리케이션.',
    tags: ['Spring Boot', 'Thymeleaf', 'MySQL'],
    githubUrl: 'https://github.com/Chuseok22/umbrella-return',
  },
]
