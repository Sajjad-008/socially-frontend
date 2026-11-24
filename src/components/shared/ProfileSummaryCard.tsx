import { LinkIcon, LocationIcon } from '@/components/icons'
import MetaItem from '@/components/shared/MetaItem'
import ProfileStats from '@/components/shared/ProfileStats'
import Avatar from '@/components/ui/Avatar'
import Card from '@/components/ui/Card'
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
  const classes = ['flex flex-col items-center gap-3 p-6', className]
    .filter(Boolean)
    .join(' ')

  return (
    <Card className={classes}>
      <Avatar name={user.name} src={user.avatarUrl} size="lg" />

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
    </Card>
  )
}
