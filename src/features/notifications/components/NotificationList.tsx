import { notifications } from '@/mocks/notifications'
import NotificationItem from './NotificationItem'

export default function NotificationList({ id }: { id: string }) {
  const notifs = notifications.filter((n) => n.recipientId === id)
  const unreadCount = notifs.filter((n) => !n.read).length
  return (
    <div className="border rounded-xl">
      <div className="flex border-b align-middle p-4">
        <span className="font-bold">Notifications</span>
        <span className="ml-auto text-sm">{unreadCount} unreads</span>
      </div>
      {notifs.length === 0 ? (
        <div className="flex justify-center items-center h-32 text-content-muted">
          No notifications
        </div>
      ) : (
        <div className="flex flex-col">
          {notifs.map((n) => (
            <NotificationItem key={n.id} {...n} />
          ))}
        </div>
      )}
    </div>
  )
}
