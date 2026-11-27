import { ChatIcon, HeartIcon } from '@/components/icons'
import Avatar from '@/components/ui/Avatar'
import { posts } from '@/mocks/posts'
import { users } from '@/mocks/users'
import type { Notification } from '@/types'
import formatRelativeTime from '@/utils/formatRelativeTime'

export default function NotificationItem({
  id,
  type,
  recipientId,
  actorId,
  postId,
  commentText,
  createdAt,
  read,
}: Notification) {
  const post = posts.find((p) => p.id === postId)
  const user = users.find((u) => u.id === actorId)
  if (!(user && post)) return null
  return (
    <div
      className={`flex items-start gap-4 p-4 border-b ${read ? '' : 'bg-content-opposite dark:bg-content'}`}
    >
      <Avatar
        size="lg"
        src={user.avatarUrl ?? undefined}
        name={user.name ?? user.username}
      />
      {type === 'comment' ? (
        <ChatIcon size={16} className="text-brand mt-1" />
      ) : (
        <HeartIcon size={16} className="text-danger mt-1" />
      )}
      <div className="flex flex-col gap-2 w-auto">
        <div className="text-content dark:text-content-opposite flex items-center">
          {user.name}
          {type === 'comment' ? ' commented on your post' : ' liked your post'}
          {!read && <div className="w-2 h-2 bg-brand rounded-full ml-auto"></div>}
        </div>
        <div className="bg-border/25 text-sm text-content-muted rounded-md p-2">
          {post && post.text.length > 50 ? `${post?.text.slice(0, 50)}...` : post?.text}
        </div>
        {type === 'comment' && (
          <div className="text-sm bg-border/80 text-content dark:text-content-opposite rounded-md p-2">
            {commentText}
          </div>
        )}
        <div className="text-sm text-content-muted">{formatRelativeTime(createdAt)}</div>
      </div>
    </div>
  )
}
