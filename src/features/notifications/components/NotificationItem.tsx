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
      className={`flex items-start gap-4 p-4 border-b ${read ? '' : 'bg-content-opposite dark:bg-content'}`}
    >
      <Avatar size="lg" src={actor.avatarUrl} name={actorName} />

      {isComment ? (
        <ChatIcon size={16} className="text-brand mt-1" />
      ) : (
        <HeartIcon size={16} className="text-danger mt-1" />
      )}

      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <div className="text-content dark:text-content-opposite flex items-center">
          <span>
            <span className="font-semibold">{actorName}</span>
            {isComment ? ' commented on your post' : ' liked your post'}
          </span>
          {!read && <div className="w-2 h-2 bg-brand rounded-full ml-auto shrink-0" />}
        </div>

        <div className="bg-border/25 text-sm text-content-muted rounded-md p-2 line-clamp-2">
          {post ? post.text : <span className="italic">This post was deleted</span>}
        </div>

        {isComment && commentText && (
          <div className="text-sm bg-border/80 text-content dark:text-content-opposite rounded-md p-2">
            {commentText}
          </div>
        )}

        <div className="text-sm text-content-muted">{formatRelativeTime(createdAt)}</div>
      </div>
    </div>
  )
}
