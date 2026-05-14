export interface TechCategory {
  category: string
  items: string[]
}

export const techStack: TechCategory[] = [
  {
    category: 'Backend',
    items: ['Java', 'Spring Boot', 'Spring Security', 'JPA'],
  },
  {
    category: 'Frontend',
    items: ['TypeScript', 'React', 'Next.js', 'Capacitor'],
  },
]
