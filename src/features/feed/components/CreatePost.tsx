import { useState } from 'react'
import ComposeBox from '@/components/shared/ComposeBox'
import Card from '@/components/ui/Card'
import { usePostsStore } from '@/store/postsStore'
import type { User } from '@/types'

interface CreatePostProps {
  currentUser: User
}

export default function CreatePost({ currentUser }: CreatePostProps) {
  const [text, setText] = useState('')
  const addPost = usePostsStore((state) => state.addPost)

  async function handleSubmit() {
    const value = text.trim()
    if (!value) return

    await addPost(currentUser.id, value)
    setText('')
  }

  return (
    <Card className="p-4">
      <ComposeBox
        user={currentUser}
        placeholder="What's on your mind?"
        value={text}
        onChange={setText}
        onSubmit={handleSubmit}
        submitLabel="Post"
      />
    </Card>
  )
}
