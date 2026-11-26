import type { ReactNode } from 'react'
import EmptyState from '@/components/ui/EmptyState'
import Skeleton from '@/components/ui/Skeleton'
import type { Post, User } from '@/types'
import PostCard from './PostCard'

interface PostListProps {
  posts: Post[]
  users: User[]
  currentUserId: string
  loading?: boolean
  likedPostIds: string[]
  onLike: (postId: string) => void
  onToggleComments: (postId: string) => void
  onDelete?: (postId: string) => void
  openCommentsId?: string | null
  renderComments?: (post: Post) => ReactNode
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
  openCommentsId = null,
  renderComments,
}: PostListProps) {
  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="space-y-3 rounded-xl border border-border bg-card p-6"
          >
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-8 w-24" />
          </div>
        ))}
      </div>
    )
  }

  if (posts.length === 0) {
    return <EmptyState message="No posts to show" />
  }

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => {
        const author = users.find((user) => user.id === post.authorId)
        if (!author) return null

        const isOpen = openCommentsId === post.id

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
            commentsOpen={isOpen}
          >
            {isOpen && renderComments?.(post)}
          </PostCard>
        )
      })}
    </div>
  )
}

export default PostList
