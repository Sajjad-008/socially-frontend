import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { TrashIcon } from '@/components/icons'
import Avatar from '@/components/ui/Avatar'
import IconButton from '@/components/ui/IconButton'
import SocialAction from '@/components/ui/SocialAction'
import type { Post, User } from '@/types'
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
  const profilePath = `/users/${author.id}`

  return (
    <article className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <Link
          to={profilePath}
          aria-label={`${author.name}'s profile`}
          className="shrink-0 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-content-muted"
        >
          <Avatar name={author.name} src={author.avatarUrl} size="md" />
        </Link>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 flex-wrap items-center gap-x-2 text-sm">
              <Link
                to={profilePath}
                className="font-semibold text-content hover:underline"
              >
                {author.name}
              </Link>
              <span className="text-content-muted">@{author.username}</span>
              <span className="ml-2 text-content-muted">
                • {formatRelativeTime(post.createdAt)}
              </span>
            </div>

            {isOwn && onDelete && (
              <IconButton
                variant="trash"
                icon={<TrashIcon className="h-4 w-4" />}
                aria-label="Delete post"
                onClick={onDelete}
                className="-mt-1.5"
              />
            )}
          </div>

          <p className="mt-2.5 whitespace-pre-wrap break-words text-sm text-content">
            {post.text}
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-4">
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
