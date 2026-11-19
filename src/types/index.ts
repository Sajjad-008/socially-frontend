export interface User {
  id: string
  name: string
  username: string
  email: string
  avatarUrl?: string
  bio?: string
  location?: string
  website?: string
  joinedAt: string // ISO
  followingIds: string[] // کاربرانی که این کاربر دنبال می‌کند
}

export interface Post {
  id: string
  authorId: string
  text: string
  createdAt: string // ISO
  likedByIds: string[] // شمارنده لایک = طول این آرایه
  commentsCount: number
}

export interface Comment {
  id: string
  postId: string
  authorId: string
  text: string
  createdAt: string // ISO
}

export type NotificationType = 'like' | 'comment'

export interface Notification {
  id: string
  type: NotificationType
  recipientId: string // صاحب پست
  actorId: string // کسی که لایک یا کامنت کرده
  postId: string
  commentText?: string // فقط برای type = 'comment'
  createdAt: string // ISO
  read: boolean
}
