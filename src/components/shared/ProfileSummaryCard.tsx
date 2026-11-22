import { LinkIcon, LocationIcon } from '@/components/icons'
import MetaItem from '@/components/shared/MetaItem'
import ProfileStats from '@/components/shared/ProfileStats'
import type { User } from '@/types'

interface ProfileSummaryCardProps {
  user: User
  followersCount: number
  className?: string
}

export default function ProfileSummaryCard({
  user,
  followersCount,
  className,
}: ProfileSummaryCardProps) {
  const classes = [
    'flex flex-col items-center gap-3 rounded-lg border border-border bg-card p-6',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  //  بعد از merge شدن Card ، <section> با <Card> عوض شود
  return (
    <section className={classes}>
      {/*  بعد از merge شدن Avatar ، با <Avatar name={user.name} src={user.avatarUrl} size="xl" /> عوض شود */}
      <div
        aria-hidden="true"
        className="flex size-20 items-center justify-center rounded-full bg-brand-secondary text-2xl text-content-opposite"
      >
        {user.name.charAt(0).toUpperCase()}
      </div>

      <div className="flex flex-col items-center gap-1 text-center">
        <h2 className="text-sm font-bold text-content">{user.name}</h2>
        <p className="text-xs text-content-muted">{user.username}</p>
      </div>

      <ProfileStats
        className="w-full border-y border-border py-3"
        items={[
          { label: 'Following', value: user.followingIds.length },
          { label: 'Followers', value: followersCount },
        ]}
      />

      <div className="flex w-full flex-col gap-2">
        <MetaItem icon={<LocationIcon />}>{user.location || 'No location'}</MetaItem>
        <MetaItem icon={<LinkIcon />}>{user.website || 'No website'}</MetaItem>
      </div>
    </section>
  )
}
