import type { Post, User } from '@/types'
import type { ReactNode } from 'react'
import UserBadge from '@/components/shared/UserBadge'
import SocialAction from '@/components/ui/SocialAction'
import IconButton from '@/components/ui/IconButton'
import { TrashIcon } from '@/components/icons'
import formatRelativeTime from '@/utils/formatRelativeTime'

interface PostCardProps {
  post: Post
  author: User
  isOwn: boolean
  liked: boolean
  onLike: () => void
  onToggleComments: () => void
  onDelete?: () => void
  commentsOpen?: boolean
  children?: ReactNode
}

function PostCard({
  post,
  author,
  isOwn,
  liked,
  onLike,
  onToggleComments,
  onDelete,
  commentsOpen = false,
  children,
}: PostCardProps) {
  return (
    <article className="border-b border-border bg-card p-4">
      <div className="flex items-start justify-between gap-3">
        <UserBadge
          user={author}
          meta={formatRelativeTime(post.createdAt)}
          layout="inline"
        />

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
          selected={commentsOpen}
          onClick={onToggleComments}
        />
      </div>

      {children}
    </article>
  )
}

export default PostCard
