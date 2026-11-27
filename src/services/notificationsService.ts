import type { Notification } from '@/types'
import { notifications as mockNotifications } from '@/mocks/notifications'

const notifications: Notification[] = [...mockNotifications]

const delay = () => new Promise<void>((resolve) => setTimeout(resolve, 300))

export interface NotificationsPage {
  items: Notification[]
  hasMore: boolean
  unreadCount: number
}

export const notificationsService = {
  async getNotifications(
    userId: string,
    page = 0,
    pageSize = 10,
  ): Promise<NotificationsPage> {
    await delay()

    const userNotifications = notifications
      .filter((notification) => notification.recipientId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    const start = page * pageSize
    const items = userNotifications.slice(start, start + pageSize)

    return {
      items,
      hasMore: start + pageSize < userNotifications.length,
      unreadCount: userNotifications.filter((notification) => !notification.read).length,
    }
  },

  async getUnreadCount(userId: string): Promise<number> {
    await delay()
    return notifications.filter(
      (notification) => notification.recipientId === userId && !notification.read,
    ).length
  },
}

export default notificationsService
