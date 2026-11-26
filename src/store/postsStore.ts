import { create } from 'zustand'
import type { Post } from '@/types'
import postsService from '@/services/postsService'

interface PostsState {
  posts: Post[]
  loading: boolean
  error: string | null

  fetchPosts: () => Promise<void>
  toggleLike: (postId: string, userId: string) => Promise<void>
  addPost: (authorId: string, text: string) => Promise<void>
  deletePost: (postId: string) => Promise<void>
}

export const usePostsStore = create<PostsState>((set) => ({
  posts: [],
  loading: false,
  error: null,

  fetchPosts: async () => {
    set({ loading: true, error: null })

    try {
      const posts = await postsService.getPosts()
      set({ posts, loading: false })
    } catch {
      set({
        error: 'Failed to load posts',
        loading: false,
      })
    }
  },

  toggleLike: async (postId, userId) => {
    try {
      const updatedPost = await postsService.toggleLike(postId, userId)

      set((state) => ({
        posts: state.posts.map((post) => (post.id === postId ? updatedPost : post)),
      }))
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to like post',
      })
    }
  },

  addPost: async (authorId, text) => {
    try {
      const newPost = await postsService.addPost({ authorId, text })

      set((state) => ({
        posts: [newPost, ...state.posts],
      }))
    } catch {
      set({ error: 'Failed to add post' })
    }
  },

  deletePost: async (postId) => {
    try {
      await postsService.deletePost(postId)

      set((state) => ({
        posts: state.posts.filter((post) => post.id !== postId),
      }))
    } catch {
      set({ error: 'Failed to delete post' })
    }
  },
}))

export default usePostsStore
