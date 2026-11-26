import type { User } from '@/types'
import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import ProfileStats from '@/components/shared/ProfileStats'
import MetaItem from '@/components/shared/MetaItem'
import {
  CalendarIcon,
  EditIcon,
  LinkIcon,
  LocationIcon,
} from '@/components/icons'

interface ProfileHeaderProps {
  user: User
  followersCount: number
  isOwnProfile: boolean
  isFollowing: boolean
  onEditProfile?: () => void
  onFollowToggle?: () => void
}

export default function ProfileHeader({
  user,
  followersCount,
  isOwnProfile,
  isFollowing,
  onEditProfile,
  onFollowToggle,
}: ProfileHeaderProps) {
  const joinedDate = new Date(user.joinedAt).toLocaleDateString()

  return (
    <section className="flex flex-col gap-5 rounded-xl border border-border bg-card p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar
            name={user.name}
            src={user.avatarUrl}
            size="xl"
          />

          <div className="flex min-w-0 flex-col gap-1">
            <h1 className="text-lg font-bold text-content">
              {user.name}
            </h1>

            <p className="text-sm text-content-muted">
              @{user.username}
            </p>
          </div>
        </div>

        {isOwnProfile ? (
          <Button
            variant="secondary"
            icon={<EditIcon size={16} />}
            onClick={onEditProfile}
          >
            Edit Profile
          </Button>
        ) : (
          <Button
            variant={isFollowing ? 'secondary' : 'primary'}
            onClick={onFollowToggle}
          >
            {isFollowing ? 'Unfollow' : 'Follow'}
          </Button>
        )}
      </div>

      {user.bio && (
        <p className="text-sm leading-6 text-content">
          {user.bio}
        </p>
      )}

      <ProfileStats
        className="max-w-sm border-y border-border py-4"
        items={[
          { label: 'Following', value: user.followingIds.length },
          { label: 'Followers', value: followersCount },
        ]}
      />

      <div className="flex flex-wrap gap-x-5 gap-y-3">
        <MetaItem icon={<CalendarIcon />}>
          Joined {joinedDate}
        </MetaItem>

        {user.location && (
          <MetaItem icon={<LocationIcon />}>
            {user.location}
          </MetaItem>
        )}

        {user.website && (
          <MetaItem icon={<LinkIcon />}>
            {user.website}
          </MetaItem>
        )}
      </div>
    </section>
  )
}
