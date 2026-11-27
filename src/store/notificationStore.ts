import { create } from 'zustand'
import notificationsService from '@/services/notificationsService'
import type { Notification } from '@/types'

const PAGE_SIZE = 10

type NotificationsState = {
  notifications: Notification[]
  unreadCount: number
  loading: boolean
  hasMore: boolean
  page: number
  userId: string | null

  loadNotifications: (userId: string) => Promise<void>

  loadMore: () => Promise<void>
}

export const useNotificationsStore = create<NotificationsState>((set, get) => {
  const fetchPage = async (userId: string, page: number) => {
    set({ loading: true })
    try {
      const res = await notificationsService.getNotifications(userId, page, PAGE_SIZE)
      if (get().userId !== userId) return
      set((state) => ({
        notifications: page === 0 ? res.items : [...state.notifications, ...res.items],
        unreadCount: res.unreadCount,
        hasMore: res.hasMore,
        page: page + 1,
        loading: false,
      }))
    } catch (error) {
      console.error('Failed to load notifications', error)
      if (get().userId === userId) set({ loading: false })
    }
  }

  return {
    notifications: [],
    unreadCount: 0,
    loading: false,
    hasMore: true,
    page: 0,
    userId: null,

    loadNotifications: async (userId) => {
      set({ userId, notifications: [], unreadCount: 0, hasMore: true, page: 0 })
      await fetchPage(userId, 0)
    },

    loadMore: async () => {
      const { userId, loading, hasMore, page } = get()
      if (!userId || loading || !hasMore) return
      await fetchPage(userId, page)
    },
  }
})
