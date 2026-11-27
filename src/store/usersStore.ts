import { create } from 'zustand'
import type { User } from '@/types'
import usersService, { type UpdateProfileInput } from '@/services/usersService'

interface UsersState {
  users: User[]
  loading: boolean
  error: string | null

  fetchUsers: () => Promise<void>
  toggleFollow: (currentUserId: string, targetId: string) => Promise<void>
  updateProfile: (userId: string, data: UpdateProfileInput) => Promise<void>
}

const replaceUser = (users: User[], updated: User) =>
  users.map((user) => (user.id === updated.id ? updated : user))

export const useUsersStore = create<UsersState>((set, get) => ({
  users: [],
  loading: false,
  error: null,

  fetchUsers: async () => {
    if (get().loading || get().users.length > 0) return

    set({ loading: true, error: null })
    try {
      const users = await usersService.getUsers()
      set({ users, loading: false })
    } catch {
      set({ error: 'Failed to load users', loading: false })
    }
  },

  toggleFollow: async (currentUserId, targetId) => {
    try {
      const updated = await usersService.toggleFollow(currentUserId, targetId)
      set((state) => ({ users: replaceUser(state.users, updated) }))
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to update follow' })
    }
  },

  updateProfile: async (userId, data) => {
    try {
      const updated = await usersService.updateProfile(userId, data)
      set((state) => ({ users: replaceUser(state.users, updated) }))
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to update profile' })
    }
  },
}))

export default useUsersStore
