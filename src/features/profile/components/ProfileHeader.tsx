import type { User } from '@/types'
import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import ProfileStats from '@/components/shared/ProfileStats'
import { CalendarIcon, EditIcon } from '@/components/icons'

interface ProfileHeaderProps {
  user: User
  followersCount: number
  postsCount?: number
  isOwnProfile: boolean
  isFollowing: boolean
  onEditProfile?: () => void
  onFollowToggle?: () => void
}

export default function ProfileHeader({
  user,
  followersCount,
  postsCount = 0,
  isOwnProfile,
  isFollowing,
  onEditProfile,
  onFollowToggle,
}: ProfileHeaderProps) {
  const joinedDate = new Date(user.joinedAt).toLocaleDateString()

  return (
    <section className="flex flex-col items-center gap-5 rounded-xl border border-border bg-card p-5 sm:p-6">
      <div className="flex flex-col items-center gap-3 text-center">
        <Avatar
          name={user.name}
          src={user.avatarUrl}
          size="xl"
        />

        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-bold text-content">
            {user.name}
          </h1>

          <p className="text-sm text-content-muted">
            @{user.username}
          </p>
        </div>
      </div>

      <ProfileStats
        className="w-full border-y border-border py-4"
        items={[
          { label: 'Following', value: user.followingIds.length },
          { label: 'Followers', value: followersCount },
          { label: 'Posts', value: postsCount },
        ]}
      />

      {isOwnProfile ? (
        <Button
          variant="primary"
          icon={<EditIcon size={16} />}
          onClick={onEditProfile}
          className="w-full"
        >
          Edit Profile
        </Button>
      ) : (
        <Button
          variant={isFollowing ? 'secondary' : 'primary'}
          onClick={onFollowToggle}
          className="w-full"
        >
          {isFollowing ? 'Unfollow' : 'Follow'}
        </Button>
      )}

      <div className="flex w-full items-center justify-start gap-2 text-sm text-content-muted">
        <CalendarIcon size={16} />
        <span>Joined {joinedDate}</span>
      </div>
    </section>
  )
}
