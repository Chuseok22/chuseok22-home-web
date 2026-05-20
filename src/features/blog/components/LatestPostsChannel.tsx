import EmbedCard from '../../../shared/components/EmbedCard/EmbedCard'
import ChannelSection from '../../../shared/components/ChannelSection/ChannelSection'
import { blogPosts } from '../constants/blogData'

export default function LatestPostsChannel() {
  return (
    <ChannelSection title="📝 최신 포스트">
      {blogPosts.map((post) => (
        <EmbedCard
          key={post.id}
          accentColor="var(--dc-brand)"
          title={post.title}
          titleHref={post.titleHref}
          description={post.description}
          tags={[...post.tags, post.date]}
        />
      ))}
    </ChannelSection>
  )
}
