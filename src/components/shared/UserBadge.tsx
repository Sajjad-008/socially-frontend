import type { User } from '@/types'
import Avatar from '@/components/ui/Avatar'

interface UserBadgeProps {
  user: User
  meta?: string
  layout?: 'stacked' | 'inline'
}

function UserBadge({ user, meta, layout = 'stacked' }: UserBadgeProps) {
  if (layout === 'inline') {
    return (
      <div className="flex min-w-0 items-center gap-3">
        <Avatar name={user.name} src={user.avatarUrl} size="md" />

        <div className="flex min-w-0 flex-wrap items-center gap-x-1 text-sm">
          <span className="font-semibold text-content">{user.name}</span>
          <span className="text-content-muted">@{user.username}</span>
          {meta && <span className="text-content-muted">• {meta}</span>}
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-w-0 items-center gap-3">
      <Avatar name={user.name} src={user.avatarUrl} size="md" />

      <div className="flex min-w-0 flex-col text-sm leading-snug">
        <span className="truncate font-medium text-content">{user.name}</span>
        <span className="truncate text-content-muted">@{user.username}</span>
        {meta && <span className="truncate text-content-muted">{meta}</span>}
      </div>
    </div>
  )
}

export default UserBadge
