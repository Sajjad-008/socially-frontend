import { Link } from 'react-router-dom'
import Avatar from '@/components/ui/Avatar'
import type { User } from '@/types'

interface UserBadgeProps {
  user: User
  meta?: string
  layout?: 'stacked' | 'inline'
  /** لینک به پروفایل کاربر. داخل لینک یا دکمه دیگر false بدهید. */
  linked?: boolean
}

function UserBadge({ user, meta, layout = 'stacked', linked = true }: UserBadgeProps) {
  const nameHover = linked ? 'group-hover:underline' : ''

  const content =
    layout === 'inline' ? (
      <div className="flex min-w-0 items-center gap-3">
        <Avatar name={user.name} src={user.avatarUrl} size="md" />

        <div className="flex min-w-0 flex-wrap items-center gap-x-1 text-sm">
          <span className={`font-semibold text-content ${nameHover}`}>{user.name}</span>
          <span className="text-content-muted">@{user.username}</span>
          {meta && <span className="text-content-muted">• {meta}</span>}
        </div>
      </div>
    ) : (
      <div className="flex min-w-0 items-center gap-3">
        <Avatar name={user.name} src={user.avatarUrl} size="md" />

        <div className="flex min-w-0 flex-col text-sm leading-snug">
          <span className={`truncate font-medium text-content ${nameHover}`}>
            {user.name}
          </span>
          <span className="truncate text-content-muted">@{user.username}</span>
          {meta && <span className="truncate text-content-muted">{meta}</span>}
        </div>
      </div>
    )

  if (!linked) return content

  return (
    <Link
      to={`/users/${user.id}`}
      className="group block min-w-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-content-muted"
    >
      {content}
    </Link>
  )
}

export default UserBadge
