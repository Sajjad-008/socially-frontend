import ComposeBox from '@/components/shared/ComposeBox'
import Avatar from '@/components/ui/Avatar'
import Skeleton from '@/components/ui/Skeleton'
import type { Comment, User } from '@/types'
import formatRelativeTime from '@/utils/formatRelativeTime'

export interface CommentWithAuthor {
  comment: Comment
  author: User
}

interface CommentSectionProps {
  items: CommentWithAuthor[]
  currentUser: User
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  isLoading?: boolean
  className?: string
}

export default function CommentSection({
  items,
  currentUser,
  value,
  onChange,
  onSubmit,
  isLoading = false,
  className,
}: CommentSectionProps) {
  const classes = ['flex flex-col gap-4 border-t border-border pt-4', className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes}>
      {isLoading ? (
        <div className="flex items-start gap-3">
          <Skeleton className="size-10 shrink-0 rounded-full" />
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ) : (
        items.length > 0 && (
          <ul className="flex flex-col gap-4">
            {items.map(({ comment, author }) => (
              <li key={comment.id} className="flex items-start gap-3">
                <Avatar name={author.name} src={author.avatarUrl} />
                <div className="flex min-w-0 flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-x-2 text-xs">
                    <span className="text-sm font-semibold text-content">
                      {author.name}
                    </span>
                    <span className="text-content-muted">@{author.username}</span>
                    <span className="text-content-muted">
                      • {formatRelativeTime(comment.createdAt)}
                    </span>
                  </div>
                  <p className="break-words text-sm text-content">{comment.text}</p>
                </div>
              </li>
            ))}
          </ul>
        )
      )}

      <ComposeBox
        user={currentUser}
        placeholder="Write a comment..."
        value={value}
        onChange={onChange}
        onSubmit={onSubmit}
        submitLabel="Comment"
      />
    </div>
  )
}
