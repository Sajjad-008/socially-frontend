import { Navigate, useParams } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import ProfileSummaryCard from '@/components/shared/ProfileSummaryCard'
import EmptyState from '@/components/ui/EmptyState'
import Skeleton from '@/components/ui/Skeleton'
import FollowSuggestions from '@/features/follow/components/FollowSuggestions'
import ProfileHeader from '@/features/profile/components/ProfileHeader'
import ProfilePostsSection from '@/features/profile/components/ProfilePostsSection'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useUsersStore } from '@/store/usersStore'
import { getFollowersCount } from '@/utils/userSelectors'

export default function UserProfilePage() {
  const { userId } = useParams()
  const { user: currentUser, followersCount: currentFollowers } = useCurrentUser()
  const users = useUsersStore((state) => state.users)
  const toggleFollow = useUsersStore((state) => state.toggleFollow)

  if (currentUser && userId === currentUser.id) {
    return <Navigate to="/profile" replace />
  }

  if (!currentUser || users.length === 0) {
    return (
      <AppLayout left={<Skeleton className="h-64 w-full rounded-xl" />}>
        <Skeleton className="h-64 w-full rounded-xl" />
      </AppLayout>
    )
  }

  const profileUser = users.find((candidate) => candidate.id === userId)

  return (
    <AppLayout
      left={<ProfileSummaryCard user={currentUser} followersCount={currentFollowers} />}
      right={<FollowSuggestions currentUser={currentUser} />}
    >
      {profileUser ? (
        <div className="flex flex-col gap-4">
          <ProfileHeader
            user={profileUser}
            followersCount={getFollowersCount(users, profileUser.id)}
            isOwnProfile={false}
            isFollowing={currentUser.followingIds.includes(profileUser.id)}
            onFollowToggle={() => toggleFollow(currentUser.id, profileUser.id)}
          />
          <ProfilePostsSection
            profileUser={profileUser}
            currentUser={currentUser}
            users={users}
          />
        </div>
      ) : (
        <EmptyState message="User not found" />
      )}
    </AppLayout>
  )
}
