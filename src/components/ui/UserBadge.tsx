import Avatar from './Avatar'

interface UserBadgeProps {
  /** Display name. Optional: some users only show their username. */
  name?: string
  username: string
  avatarUrl?: string | null
  /** Extra muted line under the username, e.g. "1 followers". */
  subtitle?: string
}

export function UserBadge({ name, username, avatarUrl, subtitle }: UserBadgeProps) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <Avatar src={avatarUrl} name={avatarUrl ? name : undefined} />
      <div className="flex min-w-0 flex-col text-sm leading-snug">
        {name && <span className="truncate text-content">{name}</span>}
        <span className="truncate text-content-muted">@{username}</span>
        {subtitle && <span className="truncate text-content-muted">{subtitle}</span>}
      </div>
    </div>
  )
}

export default UserBadge