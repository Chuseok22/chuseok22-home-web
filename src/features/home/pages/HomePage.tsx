import HeroSection from '../components/HeroSection/HeroSection'
import LinksSection from '../components/LinksSection/LinksSection'
import ProjectsSection from '../components/ProjectsSection/ProjectsSection'
import TechStackSection from '../components/TechStackSection/TechStackSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <TechStackSection />
      <LinksSection />
    </>
  )
}
