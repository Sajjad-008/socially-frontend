import AppLayout from '@/components/layout/AppLayout'
import ProfileSummaryCard from '@/components/shared/ProfileSummaryCard'
import Skeleton from '@/components/ui/Skeleton'
import FollowSuggestions from '@/features/follow/components/FollowSuggestions'
import ProfileHeader from '@/features/profile/components/ProfileHeader'
import ProfilePostsSection from '@/features/profile/components/ProfilePostsSection'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useUsersStore } from '@/store/usersStore'

export default function ProfilePage() {
  const { user, followersCount } = useCurrentUser()
  const users = useUsersStore((state) => state.users)

  if (!user) {
    return (
      <AppLayout left={<Skeleton className="h-64 w-full rounded-xl" />}>
        <Skeleton className="h-64 w-full rounded-xl" />
      </AppLayout>
    )
  }

  return (
    <AppLayout
      left={<ProfileSummaryCard user={user} followersCount={followersCount} />}
      right={<FollowSuggestions currentUser={user} />}
    >
      <div className="flex flex-col gap-4">
        <ProfileHeader
          user={user}
          followersCount={followersCount}
          isOwnProfile
          isFollowing={false}
          onEditProfile={() => {}}
        />
        <ProfilePostsSection profileUser={user} currentUser={user} users={users} />
      </div>
    </AppLayout>
  )
}
