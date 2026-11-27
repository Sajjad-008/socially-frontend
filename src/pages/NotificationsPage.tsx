import AppLayout from '@/components/layout/AppLayout'
import NotificationList from '@/features/notifications/components/NotificationList'

export default function NotificationsPage() {
  return (
    <AppLayout left={<div>left</div>} wide={true}>
      <NotificationList id="u1" />
    </AppLayout>
  )
}
