import { useEffect } from 'react'
import { useSession } from '@/hooks/useSession'
import { useUsersStore } from '@/store/usersStore'
import { getFollowersCount } from '@/utils/userSelectors'

export function useCurrentUser() {
  const { currentUserId } = useSession()
  const users = useUsersStore((state) => state.users)
  const fetchUsers = useUsersStore((state) => state.fetchUsers)

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const user = currentUserId ? (users.find((u) => u.id === currentUserId) ?? null) : null

  return {
    user,
    followersCount: user ? getFollowersCount(users, user.id) : 0,
    isLoading: currentUserId != null && user === null,
  }
}

export default useCurrentUser
