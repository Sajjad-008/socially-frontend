import type { User } from '@/types'

export function getFollowersCount(users: User[], userId: string): number {
  return users.filter((user) => user.followingIds.includes(userId)).length
}

export function getSuggestedUsers(
  users: User[],
  currentUserId: string,
  limit = 3,
): User[] {
  const me = users.find((user) => user.id === currentUserId)

  return users
    .filter((user) => user.id !== currentUserId && !me?.followingIds.includes(user.id))
    .slice(0, limit)
}
