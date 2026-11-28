
import AppLayout from '@/components/layout/AppLayout'
import ProfileSummaryCard from '@/components/shared/ProfileSummaryCard'
import Skeleton from '@/components/ui/Skeleton'
import FollowSuggestions from '@/features/follow/components/FollowSuggestions'
import ProfileHeader from '@/features/profile/components/ProfileHeader'
import ProfilePostsSection from '@/features/profile/components/ProfilePostsSection'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useUsersStore } from '@/store/usersStore'
import { usePostsStore } from '@/store/postsStore'

export default function ProfilePage() {
  const { user, followersCount } = useCurrentUser()
  const users = useUsersStore((state) => state.users)
  const posts = usePostsStore((state) => state.posts)

  if (!user) {
    return (
      <AppLayout left={<Skeleton className="h-64 w-full rounded-xl" />}>
        <Skeleton className="h-64 w-full rounded-xl" />
      </AppLayout>
    )
  }

  const postsCount = posts.filter(
    (post) => post.authorId === user.id,
  ).length

  return (
    <AppLayout
      left={<ProfileSummaryCard user={user} followersCount={followersCount} />}
      right={<FollowSuggestions currentUser={user} />}
    >
      <div className="flex flex-col gap-4">
        <ProfileHeader
          user={user}
          followersCount={followersCount}
          postsCount={postsCount}
          isOwnProfile
          isFollowing={false}
          onEditProfile={() => {}}
        />

        <ProfilePostsSection
          profileUser={user}
          currentUser={user}
          users={users}
        />
      </div>
    </AppLayout>
  )
}
