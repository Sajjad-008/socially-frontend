import Avatar from './Avatar'

interface UserBadgeProps {
  /** نام نمایشی. اگر نباشد فقط username نشان داده می‌شود. */
  name?: string
  username: string
  avatarUrl?: string | null
  /** خط فرعی زیر username، مثل "1 followers". */
  subtitle?: string
}

export function UserBadge({ name, username, avatarUrl, subtitle }: UserBadgeProps) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <Avatar src={avatarUrl ?? undefined} name={name ?? username} />
      <div className="flex min-w-0 flex-col text-sm leading-snug">
        {name && <span className="truncate text-content">{name}</span>}
        <span className="truncate text-content-muted">@{username}</span>
        {subtitle && <span className="truncate text-content-muted">{subtitle}</span>}
      </div>
    </div>
  )
}

export default UserBadge
