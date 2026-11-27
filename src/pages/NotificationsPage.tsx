import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import ProfileSummaryCard from '@/components/shared/ProfileSummaryCard'
import Skeleton from '@/components/ui/Skeleton'
import NotificationList from '@/features/notifications/components/NotificationList'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useSession } from '@/hooks/useSession'
import { useNotificationsStore } from '@/store/notificationStore'
import { usePostsStore } from '@/store/postsStore'
import { useUsersStore } from '@/store/usersStore'

export default function NotificationPage() {
  const navigate = useNavigate()
  const { isLoggedIn } = useSession()
  const { user, followersCount } = useCurrentUser()
  const userId = user?.id

  const users = useUsersStore((state) => state.users)
  const fetchUsers = useUsersStore((state) => state.fetchUsers)

  const posts = usePostsStore((state) => state.posts)
  const postsLoading = usePostsStore((state) => state.loading)
  const fetchPosts = usePostsStore((state) => state.fetchPosts)

  const notifications = useNotificationsStore((state) => state.notifications)
  const unreadCount = useNotificationsStore((state) => state.unreadCount)
  const notificationsLoading = useNotificationsStore((state) => state.loading)
  const hasMore = useNotificationsStore((state) => state.hasMore)
  const loadNotifications = useNotificationsStore((state) => state.loadNotifications)
  const loadMore = useNotificationsStore((state) => state.loadMore)

  useEffect(() => {
    if (!isLoggedIn) navigate('/login', { replace: true })
  }, [isLoggedIn, navigate])

  useEffect(() => {
    fetchPosts()
    fetchUsers()
  }, [fetchPosts, fetchUsers])

  useEffect(() => {
    if (userId) loadNotifications(userId)
  }, [userId, loadNotifications])

  if (!isLoggedIn) return null

  const left = user ? (
    <ProfileSummaryCard user={user} followersCount={followersCount} />
  ) : (
    <Skeleton className="h-64 w-full rounded-xl" />
  )

  const loading =
    notificationsLoading ||
    !user ||
    users.length === 0 ||
    (postsLoading && posts.length === 0)

  return (
    <AppLayout left={left} wide={true}>
      <NotificationList
        notifications={notifications}
        users={users}
        posts={posts}
        unreadCount={unreadCount}
        loading={loading}
        hasMore={hasMore}
        onLoadMore={loadMore}
      />
    </AppLayout>
  )
}
