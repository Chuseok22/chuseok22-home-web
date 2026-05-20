import EmbedCard from '../../../shared/components/EmbedCard/EmbedCard'
import { blogPosts } from '../constants/blogData'

export default function LatestPostsChannel() {
  return (
    <div>
      <h2 style={{ color: 'var(--dc-text-header)', fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>
        📝 최신 포스트
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
      </div>
    </div>
  )
}
