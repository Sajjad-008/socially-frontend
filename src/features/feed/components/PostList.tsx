import type { Post, User } from '@/types'
import PostCard from './PostCard'
import Skeleton from '@/components/ui/Skeleton'
import EmptyState from '@/components/ui/EmptyState'

interface PostListProps {
  posts: Post[]
  users: User[]
  currentUserId: string
  loading?: boolean
  likedPostIds: string[]
  onLike: (postId: string) => void
  onToggleComments: (postId: string) => void
  onDelete?: (postId: string) => void
}

function PostList({
  posts,
  users,
  currentUserId,
  loading = false,
  likedPostIds,
  onLike,
  onToggleComments,
  onDelete,
}: PostListProps) {
  if (loading) {
    return (
      <div className="space-y-4 p-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="space-y-3">
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-8 w-24" />
          </div>
        ))}
      </div>
    )
  }

  if (posts.length === 0) {
    return <EmptyState message="No posts yet" />
  }

  return (
    <div>
      {posts.map((post) => {
        const author = users.find((user) => user.id === post.authorId)

        if (!author) return null

        return (
          <PostCard
            key={post.id}
            post={post}
            author={author}
            isOwn={post.authorId === currentUserId}
            liked={likedPostIds.includes(post.id)}
            onLike={() => onLike(post.id)}
            onToggleComments={() => onToggleComments(post.id)}
            onDelete={onDelete ? () => onDelete(post.id) : undefined}
          />
        )
      })}
    </div>
  )
}

export default PostList
