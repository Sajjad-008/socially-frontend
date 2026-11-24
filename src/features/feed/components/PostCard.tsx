import type { Post, User } from '@/types'
import UserBadge from '@/components/shared/UserBadge'
import SocialAction from '@/components/ui/SocialAction'
import IconButton from '@/components/ui/IconButton'
import { TrashIcon } from '@/components/icons'

interface PostCardProps {
  post: Post
  author: User
  isOwn: boolean
  liked: boolean
  onLike: () => void
  onToggleComments: () => void
  onDelete?: () => void
}

function PostCard({
  post,
  author,
  isOwn,
  liked,
  onLike,
  onToggleComments,
  onDelete,
}: PostCardProps) {
  return (
    <article className="border-b border-border bg-card p-4">
      <div className="flex items-start justify-between gap-3">
        <UserBadge user={author} meta={post.createdAt} />

        {isOwn && onDelete && (
          <IconButton
            variant="trash"
            icon={<TrashIcon className="h-4 w-4" />}
            aria-label="Delete post"
            onClick={onDelete}
          />
        )}
      </div>

      <p className="mt-3 whitespace-pre-wrap break-words text-sm text-content">
        {post.text}
      </p>

      <div className="mt-3 flex items-center gap-2">
        <SocialAction
          kind="like"
          count={post.likedByIds.length}
          selected={liked}
          onClick={onLike}
        />

        <SocialAction
          kind="comment"
          count={post.commentsCount}
          onClick={onToggleComments}
        />
      </div>
    </article>
  )
}

export default PostCard
