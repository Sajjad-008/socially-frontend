import { Link } from 'react-router-dom'
import Avatar from './Avatar'

interface UserBadgeProps {
  /** نام نمایشی. اگر نباشد فقط username نشان داده می‌شود. */
  name?: string
  username: string
  avatarUrl?: string | null
  /** خط فرعی زیر username، مثل "1 followers". */
  subtitle?: string
  /** آدرس لینک (مثل /users/u2). اگر نباشد لینک نمی‌شود. */
  to?: string
}

export function UserBadge({ name, username, avatarUrl, subtitle, to }: UserBadgeProps) {
  const nameHover = to ? 'group-hover:underline' : ''

  const content = (
    <div className="flex min-w-0 items-center gap-3">
      <Avatar src={avatarUrl ?? undefined} name={name ?? username} />
      <div className="flex min-w-0 flex-col text-sm leading-snug">
        {name && <span className={`truncate text-content ${nameHover}`}>{name}</span>}
        <span className="truncate text-content-muted">@{username}</span>
        {subtitle && <span className="truncate text-content-muted">{subtitle}</span>}
      </div>
    </div>
  )

  if (!to) return content

  return (
    <Link
      to={to}
      className="group block min-w-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-content-muted"
    >
      {content}
    </Link>
  )
}

export default UserBadge
