import type { Post } from '@/types'
import { posts as mockPosts } from '@/mocks/posts'

let posts: Post[] = [...mockPosts]

export interface CreatePostInput {
  authorId: string
  text: string
}

export const postsService = {
  async getPosts(): Promise<Post[]> {
    return [...posts]
  },

  async toggleLike(postId: string, userId: string): Promise<Post> {
    const post = posts.find((item) => item.id === postId)

    if (!post) {
      throw new Error('Post not found')
    }

    const isLiked = post.likedByIds.includes(userId)

    const updatedPost: Post = {
      ...post,
      likedByIds: isLiked
        ? post.likedByIds.filter((id) => id !== userId)
        : [...post.likedByIds, userId],
    }

    posts = posts.map((item) => (item.id === postId ? updatedPost : item))

    return updatedPost
  },

  async addPost({ authorId, text }: CreatePostInput): Promise<Post> {
    const newPost: Post = {
      id: `post-${Date.now()}`,
      authorId,
      text: text.trim(),
      createdAt: new Date().toISOString(),
      likedByIds: [],
      commentsCount: 0,
    }

    posts = [newPost, ...posts]

    return newPost
  },

  async deletePost(postId: string): Promise<void> {
    posts = posts.filter((post) => post.id !== postId)
  },
}

export default postsService
