import { useEffect, useState } from 'react'
import { HeartIcon, PostIcon } from '@/components/icons'
import EmptyState from '@/components/ui/EmptyState'
import Tabs from '@/components/ui/Tabs'
import DeletePostDialog from '@/features/feed/components/DeletePostDialog'
import PostComments from '@/features/feed/components/PostComments'
import PostList from '@/features/feed/components/PostList'
import { usePostsStore } from '@/store/postsStore'
import type { User } from '@/types'

type TabId = 'posts' | 'likes'

const TAB_ITEMS = [
  { id: 'posts', label: 'Posts', icon: <PostIcon /> },
  { id: 'likes', label: 'Likes', icon: <HeartIcon /> },
]

interface ProfilePostsSectionProps {
  profileUser: User
  currentUser: User
  users: User[]
}

export default function ProfilePostsSection({
  profileUser,
  currentUser,
  users,
}: ProfilePostsSectionProps) {
  const [tab, setTab] = useState<TabId>('posts')
  const [openCommentsId, setOpenCommentsId] = useState<string | null>(null)
  const [postToDelete, setPostToDelete] = useState<string | null>(null)

  const posts = usePostsStore((state) => state.posts)
  const loading = usePostsStore((state) => state.loading)
  const fetchPosts = usePostsStore((state) => state.fetchPosts)
  const toggleLike = usePostsStore((state) => state.toggleLike)
  const deletePost = usePostsStore((state) => state.deletePost)

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const visiblePosts =
    tab === 'posts'
      ? posts.filter((post) => post.authorId === profileUser.id)
      : posts.filter((post) => post.likedByIds.includes(profileUser.id))

  const likedPostIds = posts
    .filter((post) => post.likedByIds.includes(currentUser.id))
    .map((post) => post.id)

  const isInitialLoading = loading && posts.length === 0
  const isOwnProfile = profileUser.id === currentUser.id

  return (
    <div className="flex flex-col gap-4">
      <Tabs
        items={TAB_ITEMS}
        activeId={tab}
        onChange={(id) => {
          setTab(id as TabId)
          setOpenCommentsId(null)
        }}
      />

      {!isInitialLoading && visiblePosts.length === 0 ? (
        <EmptyState
          message={tab === 'posts' ? 'No Posts to Show' : 'No Liked Posts to Show'}
        />
      ) : (
        <PostList
          posts={visiblePosts}
          users={users}
          currentUserId={currentUser.id}
          loading={isInitialLoading}
          likedPostIds={likedPostIds}
          onLike={(postId) => toggleLike(postId, currentUser.id)}
          onToggleComments={(postId) =>
            setOpenCommentsId((current) => (current === postId ? null : postId))
          }
          onDelete={isOwnProfile ? setPostToDelete : undefined}
          openCommentsId={openCommentsId}
          renderComments={(post) => (
            <PostComments
              className="mt-4"
              postId={post.id}
              currentUser={currentUser}
              users={users}
              onCommentAdded={fetchPosts}
            />
          )}
        />
      )}

      <DeletePostDialog
        open={postToDelete !== null}
        onClose={() => setPostToDelete(null)}
        onConfirm={() => {
          if (postToDelete) deletePost(postToDelete)
        }}
      />
    </div>
  )
}
