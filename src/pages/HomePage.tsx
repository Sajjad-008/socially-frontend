import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import ProfileSummaryCard from '@/components/shared/ProfileSummaryCard'
import Skeleton from '@/components/ui/Skeleton'
import WelcomeCard from '@/features/auth/components/WelcomeCard'
import CreatePost from '@/features/feed/components/CreatePost'
import PostComments from '@/features/feed/components/PostComments'
import PostList from '@/features/feed/components/PostList'
import FollowSuggestions from '@/features/follow/components/FollowSuggestions'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useSession } from '@/hooks/useSession'
import { usePostsStore } from '@/store/postsStore'
import { useUsersStore } from '@/store/usersStore'
import DeletePostDialog from '@/features/feed/components/DeletePostDialog'

export default function HomePage() {
  const navigate = useNavigate()
  const { isLoggedIn } = useSession()
  const { user, followersCount } = useCurrentUser()

  const users = useUsersStore((state) => state.users)
  const fetchUsers = useUsersStore((state) => state.fetchUsers)

  const posts = usePostsStore((state) => state.posts)
  const postsLoading = usePostsStore((state) => state.loading)
  const fetchPosts = usePostsStore((state) => state.fetchPosts)
  const toggleLike = usePostsStore((state) => state.toggleLike)
  const deletePost = usePostsStore((state) => state.deletePost)

  const [openCommentsId, setOpenCommentsId] = useState<string | null>(null)

  const [postToDelete, setPostToDelete] = useState<string | null>(null)

  useEffect(() => {
    fetchPosts()
    fetchUsers()
  }, [fetchPosts, fetchUsers])

  const goToLogin = () => navigate('/login')

  const handleLike = (postId: string) => {
    if (!isLoggedIn) return goToLogin()
    if (user) toggleLike(postId, user.id)
  }

  const handleToggleComments = (postId: string) => {
    if (!isLoggedIn) return goToLogin()
    setOpenCommentsId((current) => (current === postId ? null : postId))
  }

  const likedPostIds = user
    ? posts.filter((post) => post.likedByIds.includes(user.id)).map((post) => post.id)
    : []

  let left
  if (!isLoggedIn) {
    left = <WelcomeCard />
  } else if (user) {
    left = <ProfileSummaryCard user={user} followersCount={followersCount} />
  } else {
    left = <Skeleton className="h-64 w-full rounded-xl" />
  }

  const right = isLoggedIn && user ? <FollowSuggestions currentUser={user} /> : undefined

  const feedLoading = (postsLoading && posts.length === 0) || users.length === 0

  return (
    <AppLayout left={left} right={right}>
      <div className="flex flex-col gap-4">
        {isLoggedIn && user && <CreatePost currentUser={user} />}

        <PostList
          posts={posts}
          users={users}
          currentUserId={user?.id ?? ''}
          loading={feedLoading}
          likedPostIds={likedPostIds}
          onLike={handleLike}
          onToggleComments={handleToggleComments}
          onDelete={isLoggedIn ? setPostToDelete : undefined}
          openCommentsId={openCommentsId}
          renderComments={(post) =>
            user ? (
              <PostComments
                className="mt-4"
                postId={post.id}
                currentUser={user}
                users={users}
                onCommentAdded={fetchPosts}
              />
            ) : null
          }
        />
        <DeletePostDialog
          open={postToDelete !== null}
          onClose={() => setPostToDelete(null)}
          onConfirm={() => {
            if (postToDelete) deletePost(postToDelete)
          }}
        />
      </div>
    </AppLayout>
  )
}
