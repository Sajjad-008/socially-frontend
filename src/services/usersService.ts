import type { User } from '@/types'
import { users as mockUsers } from '@/mocks/users'

let users: User[] = [...mockUsers]

const delay = () => new Promise<void>((resolve) => setTimeout(resolve, 300))

export interface UpdateProfileInput {
  name: string
  bio?: string
  location?: string
  website?: string
}

export const usersService = {
  async getUsers(): Promise<User[]> {
    await delay()
    return [...users]
  },

  async getUserById(userId: string): Promise<User | undefined> {
    await delay()
    return users.find((user) => user.id === userId)
  },

  async toggleFollow(currentUserId: string, targetId: string): Promise<User> {
    await delay()

    if (currentUserId === targetId) throw new Error('You cannot follow yourself')

    const me = users.find((user) => user.id === currentUserId)
    if (!me) throw new Error('User not found')

    const isFollowing = me.followingIds.includes(targetId)
    const updated: User = {
      ...me,
      followingIds: isFollowing
        ? me.followingIds.filter((id) => id !== targetId)
        : [...me.followingIds, targetId],
    }

    users = users.map((user) => (user.id === currentUserId ? updated : user))
    return updated
  },

  async updateProfile(userId: string, data: UpdateProfileInput): Promise<User> {
    await delay()

    const target = users.find((user) => user.id === userId)
    if (!target) throw new Error('User not found')

    const updated: User = {
      ...target,
      name: data.name.trim(),
      bio: data.bio?.trim() || undefined,
      location: data.location?.trim() || undefined,
      website: data.website?.trim() || undefined,
    }

    users = users.map((user) => (user.id === userId ? updated : user))
    return updated
  },
}

export default usersService
