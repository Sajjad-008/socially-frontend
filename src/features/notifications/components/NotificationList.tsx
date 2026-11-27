import { useEffect, useMemo, useRef } from 'react'
import Skeleton from '@/components/ui/Skeleton'
import type { Notification, Post, User } from '@/types'
import NotificationItem from './NotificationItem'

type NotificationListProps = {
  notifications: Notification[]
  users: User[]
  posts: Post[]
  unreadCount: number
  loading: boolean
  hasMore: boolean
  onLoadMore: () => void
}

export default function NotificationList({
  notifications,
  users,
  posts,
  unreadCount,
  loading,
  hasMore,
  onLoadMore,
}: NotificationListProps) {
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  const usersById = useMemo(() => new Map(users.map((u) => [u.id, u])), [users])
  const postsById = useMemo(() => new Map(posts.map((p) => [p.id, p])), [posts])

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel || !hasMore || loading) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) onLoadMore()
      },
      { rootMargin: '200px' },
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasMore, loading, onLoadMore])

  const initialLoading = loading && notifications.length === 0

  return (
    <div className="border rounded-xl">
      <div className="flex border-b align-middle p-4">
        <span className="font-bold">Notifications</span>
        <span className="ml-auto text-sm">{unreadCount} unread</span>
      </div>

      {initialLoading ? (
        <div className="flex flex-col gap-4 p-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-md" />
          ))}
        </div>
      ) : notifications.length === 0 ? (
        <div className="flex justify-center items-center h-32 text-content-muted">
          No notifications
        </div>
      ) : (
        <div className="flex flex-col">
          {notifications.map((n) => (
            <NotificationItem
              key={n.id}
              notification={n}
              actor={usersById.get(n.actorId)}
              post={postsById.get(n.postId)}
            />
          ))}

          {hasMore && <div ref={sentinelRef} className="h-1" aria-hidden />}

          {loading && (
            <div className="p-4">
              <Skeleton className="h-20 w-full rounded-md" />
            </div>
          )}

          {!hasMore && (
            <div className="flex justify-center p-4 text-sm text-content-muted">
              You're all caught up
            </div>
          )}
        </div>
      )}
    </div>
  )
}
