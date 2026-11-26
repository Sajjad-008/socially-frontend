import type { Post, Comment } from '@/types'
import { posts as mockPosts } from '@/mocks/posts'
import { comments as mockComments } from '@/mocks/comments'

let posts: Post[] = [...mockPosts]
let comments: Comment[] = [...mockComments]

export interface CreatePostInput {
  authorId: string
  text: string
}

const delay = () => new Promise<void>((resolve) => setTimeout(resolve, 300))

export const postsService = {
  async getPosts(): Promise<Post[]> {
    await delay()
    return [...posts]
  },

  async getPostsByAuthor(authorId: string): Promise<Post[]> {
    await delay()
    return posts.filter((post) => post.authorId === authorId)
  },

  async getLikedPosts(userId: string): Promise<Post[]> {
    await delay()
    return posts.filter((post) => post.likedByIds.includes(userId))
  },

  async getComments(postId: string): Promise<Comment[]> {
    await delay()
    return comments.filter((comment) => comment.postId === postId)
  },

  async addComment(postId: string, authorId: string, text: string): Promise<Comment> {
    await delay()

    const post = posts.find((item) => item.id === postId)
    if (!post) throw new Error('Post not found')

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      postId,
      authorId,
      text: text.trim(),
      createdAt: new Date().toISOString(),
    }

    comments = [...comments, newComment]

    posts = posts.map((item) =>
      item.id === postId ? { ...item, commentsCount: item.commentsCount + 1 } : item,
    )

    return newComment
  },

  async toggleLike(postId: string, userId: string): Promise<Post> {
    await delay()

    const post = posts.find((item) => item.id === postId)
    if (!post) throw new Error('Post not found')

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
    await delay()

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
    await delay()

    posts = posts.filter((post) => post.id !== postId)
    comments = comments.filter((comment) => comment.postId !== postId)
  },
}

export default postsService
