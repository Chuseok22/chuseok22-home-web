import ChannelSection from '../../../shared/components/ChannelSection/ChannelSection'
import ProfileCard from './ProfileCard/ProfileCard'
import { profileData } from '../constants/homeData'

export default function WelcomeChannel() {
  return (
    <ChannelSection title="👋 안녕하세요!" headingSize="lg">
      <ProfileCard {...profileData} />
    </ChannelSection>
  )
}
