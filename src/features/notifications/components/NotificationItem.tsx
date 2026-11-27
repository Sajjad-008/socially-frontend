import { ChatIcon, HeartIcon } from '@/components/icons'
import Avatar from '@/components/ui/Avatar'
import type { Notification, Post, User } from '@/types'
import formatRelativeTime from '@/utils/formatRelativeTime'

type NotificationItemProps = {
  notification: Notification
  actor?: User
  post?: Post
}

export default function NotificationItem({
  notification,
  actor,
  post,
}: NotificationItemProps) {
  const { type, commentText, createdAt, read } = notification

  if (!actor) return null

  const actorName = actor.name || actor.username
  const isComment = type === 'comment'

  return (
    <div
      className={`flex items-start gap-4 border-b border-border p-4 last:border-b-0 ${
        read ? '' : 'bg-btn-tertiary/40'
      }`}
    >
      <Avatar size="sm" src={actor.avatarUrl} name={actorName} />

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-center gap-2 text-sm text-content">
          {isComment ? (
            <ChatIcon size={16} className="shrink-0 text-brand" />
          ) : (
            <HeartIcon size={16} className="shrink-0 text-danger" />
          )}
          <span className="min-w-0">
            <span className="font-semibold">{actorName}</span>
            {isComment ? ' commented on your post' : ' liked your post'}
          </span>
          {!read && (
            <span
              className="ml-auto size-2 shrink-0 rounded-full bg-brand"
              aria-label="Unread"
            />
          )}
        </div>

        <div className="line-clamp-2 rounded-md bg-btn-tertiary/40 p-2 text-sm text-content-muted">
          {post ? post.text : <span className="italic">This post was deleted</span>}
        </div>

        {isComment && commentText && (
          <div className="rounded-md bg-btn-tertiary p-2 text-sm text-content">
            {commentText}
          </div>
        )}

        <div className="text-xs text-content-muted">{formatRelativeTime(createdAt)}</div>
      </div>
    </div>
  )
}
