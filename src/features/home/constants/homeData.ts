// 타임라인 항목 타입
export interface TimelineItem {
  period: string
  org: string
  description?: string
  logoSrc: string
  isCurrent?: boolean
  storeLinks?: { appStore?: string; playStore?: string }
}

// 자격증 타입
export interface Certification {
  title: string
  issuedAt: string
  issuer: string
  imageSrc: string
}

// 스킬 배지 타입
export interface SkillItem {
  name: string
  bgColor: string
  textColor: string
}

// 스킬 그룹 타입
export interface SkillGroup {
  category: string
  items: SkillItem[]
}

// 프로필 데이터
export const profileData = {
  imageSrc: undefined as string | undefined,
  nameEn: 'Baek Jihoon',
  nameKo: '백지훈',
  bio: 'Spring Boot & Java backend developer. Builds across React and Capacitor cross-platform apps.',
  tags: ['Spring', 'React', 'Capacitor', 'DevOps'],
  links: [
    { icon: 'github' as const, href: 'https://github.com/Chuseok22' },
    { icon: 'email' as const, href: 'mailto:bjh59629@gmail.com' },
  ],
}

// 타임라인 데이터
export const timelineItems: TimelineItem[] = [
  {
    period: 'Jan 2026 – Present',
    org: 'Takit Corp. (Waitee)',
    logoSrc: '/images/waitee-plus.svg',
    isCurrent: true,
    storeLinks: {
      appStore:
        'https://apps.apple.com/kr/app/%EC%9B%A8%EC%9D%B4%ED%8B%B0-%ED%94%8C%EB%9F%AC%EC%8A%A4-waitee/id6761998778',
      playStore:
        'https://play.google.com/store/apps/details?id=kr.co.waitee.plus',
    },
  },
  {
    period: 'Feb 2022 – Present',
    org: 'Sejong University',
    description: 'Computer Engineering (Transfer)',
    logoSrc: '/schools/sejong-university-logo.svg',
    isCurrent: true,
  },
  {
    period: 'Feb 2021 – Feb 2022',
    org: 'Sejong University',
    description: 'Mechanical & Aerospace Engineering',
    logoSrc: '/schools/sejong-university-logo.svg',
  },
  {
    period: 'Mar 2020 – Feb 2021',
    org: 'Seoul National Univ. of Science & Technology',
    description: 'Architecture Engineering (Withdrew)',
    logoSrc: '/schools/seoul-national-university-of-science-technology.svg',
  },
  {
    period: 'Mar 2017 – Feb 2020',
    org: 'Donghwa High School',
    logoSrc: '/schools/donghwa-logo.webp',
  },
]

// 자격증 데이터
export const certifications: Certification[] = [
  {
    title: 'SQL Developer (SQLD)',
    issuedAt: 'Mar 27, 2026',
    issuer: 'Korea Data Industry Promotion Institute',
    imageSrc: '/images/sqld.png',
  },
]

// 스킬 그룹 데이터 (bgColor/textColor는 JS inline style용 예외 허용)
export const skillGroups: SkillGroup[] = [
  {
    category: 'Frontend',
    items: [
      { name: 'React', bgColor: '#1e3a5f', textColor: '#61dafb' },
      { name: 'TypeScript', bgColor: '#1a3040', textColor: '#3178c6' },
      { name: 'Vite', bgColor: '#1e3a2a', textColor: '#646cff' },
      { name: 'Capacitor', bgColor: '#1a1a2e', textColor: '#119eff' },
      { name: 'Next.js', bgColor: '#0d0d0d', textColor: '#ffffff' },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Spring Boot', bgColor: '#1e4d1e', textColor: '#6db33f' },
      { name: 'Java', bgColor: '#1a2a3a', textColor: '#f89820' },
      { name: 'Kotlin', bgColor: '#1a2040', textColor: '#7f52ff' },
      { name: 'PostgreSQL', bgColor: '#1a2a3a', textColor: '#336791' },
      { name: 'MySQL', bgColor: '#1a2030', textColor: '#4479a1' },
      { name: 'Redis', bgColor: '#2a1a1a', textColor: '#ff4438' },
    ],
  },
  {
    category: 'Infra',
    items: [
      { name: 'Docker', bgColor: '#1a2a3a', textColor: '#2496ed' },
      { name: 'GitHub Actions', bgColor: '#1a1a1a', textColor: '#ffffff' },
      { name: 'Nginx', bgColor: '#1e2e1e', textColor: '#009639' },
      { name: 'AWS', bgColor: '#2a1a1a', textColor: '#ff9900' },
      { name: 'NAS', bgColor: '#1a2030', textColor: '#b9bbbe' },
    ],
  },
]

// LinksChannel에서 사용 중인 links 유지
export const links = [
  {
    label: 'GitHub',
    href: 'https://github.com/Chuseok22',
    description: '코드 저장소',
  },
  {
    label: 'Email',
    href: 'mailto:bjh59629@gmail.com',
    description: '이메일 연락',
  },
]
