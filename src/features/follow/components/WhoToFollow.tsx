import Button from '@/components/ui/Button'
import UserBadge from '@/components/ui/UserBadge'

export interface SuggestedUser {
  id: string
  name?: string
  username: string
  avatarUrl?: string | null
  followersCount: number
}

interface WhoToFollowProps {
  users: SuggestedUser[]
  onFollow?: (userId: string) => void
}

export function WhoToFollow({ users, onFollow }: WhoToFollowProps) {
  return (
    <section className="rounded-xl border border-border bg-card p-6 text-content shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)]">
      <h2 className="mb-5 text-lg font-bold">Who to Follow</h2>

      <ul className="flex flex-col gap-4">
        {users.map((user) => (
          <li key={user.id} className="flex items-center justify-between gap-3">
            <UserBadge
              name={user.name}
              username={user.username}
              avatarUrl={user.avatarUrl}
              subtitle={`${user.followersCount} followers`}
              to={`/users/${user.id}`}
            />
            <Button variant="tertiary" size="s" onClick={() => onFollow?.(user.id)}>
              Follow
            </Button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default WhoToFollow
