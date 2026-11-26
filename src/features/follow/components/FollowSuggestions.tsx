import WhoToFollow from '@/features/follow/components/WhoToFollow'
import { useUsersStore } from '@/store/usersStore'
import type { User } from '@/types'
import { getFollowersCount, getSuggestedUsers } from '@/utils/userSelectors'

interface FollowSuggestionsProps {
  currentUser: User
}

export default function FollowSuggestions({ currentUser }: FollowSuggestionsProps) {
  const users = useUsersStore((state) => state.users)
  const toggleFollow = useUsersStore((state) => state.toggleFollow)

  const suggested = getSuggestedUsers(users, currentUser.id).map((user) => ({
    id: user.id,
    name: user.name,
    username: user.username,
    avatarUrl: user.avatarUrl,
    followersCount: getFollowersCount(users, user.id),
  }))

  return (
    <WhoToFollow
      users={suggested}
      onFollow={(targetId) => toggleFollow(currentUser.id, targetId)}
    />
  )
}
