import type { User } from '@/types'
import Avatar from '@/components/ui/Avatar'

interface UserBadgeProps {
  user: User
  meta?: string
}

function UserBadge({ user, meta }: UserBadgeProps) {
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
