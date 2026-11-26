import { useEffect, useState } from 'react'
import postsService from '@/services/postsService'
import type { Comment, User } from '@/types'
import CommentSection, { type CommentWithAuthor } from './CommentSection'

interface PostCommentsProps {
  postId: string
  currentUser: User
  users: User[]
  onCommentAdded?: () => void
  className?: string
}

export default function PostComments({
  postId,
  currentUser,
  users,
  onCommentAdded,
  className,
}: PostCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [text, setText] = useState('')

  useEffect(() => {
    let cancelled = false

    postsService
      .getComments(postId)
      .then((data) => {
        if (!cancelled) setComments(data)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [postId])

  async function handleSubmit() {
    const value = text.trim()
    if (!value) return

    const created = await postsService.addComment(postId, currentUser.id, value)
    setComments((prev) => [...prev, created])
    setText('')
    onCommentAdded?.()
  }

  const items: CommentWithAuthor[] = comments.flatMap((comment) => {
    const author = users.find((u) => u.id === comment.authorId)
    return author ? [{ comment, author }] : []
  })

  return (
    <CommentSection
      className={className}
      items={items}
      currentUser={currentUser}
      value={text}
      onChange={setText}
      onSubmit={handleSubmit}
      isLoading={loading}
    />
  )
}
