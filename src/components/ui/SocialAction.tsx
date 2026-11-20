import type { ButtonHTMLAttributes } from 'react'
import {
  ChatFilledIcon,
  ChatIcon,
  HeartFilledIcon,
  HeartIcon,
} from '../icons'

export type SocialActionKind = 'like' | 'comment'

export interface SocialActionProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  kind: SocialActionKind
  count: number
  selected?: boolean
}

const colorClasses = {
  like: 'text-danger',
  comment: 'text-brand',
} as const

const hoverColorClasses = {
  like: 'hover:text-danger',
  comment: 'hover:text-brand',
} as const

export function SocialAction({
  kind,
  count,
  selected = false,
  className,
  ...props
}: SocialActionProps) {
  const colorClass = colorClasses[kind]
  const label = kind === 'like' ? 'Like' : 'Comment'

  return (
    <button
      {...props}
      type={props.type ?? 'button'}
      aria-label={`${label}: ${count}`}
      aria-pressed={selected}
      className={[
        'inline-flex h-8 min-w-[55px] items-center justify-center gap-2 rounded-md bg-transparent px-3 py-2 text-xs leading-none transition-colors hover:bg-btn-tertiary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-content-muted motion-reduce:transition-none',
        selected ? colorClass : 'text-content',
        selected ? '' : hoverColorClasses[kind],
        selected ? 'bg-btn-tertiary' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {kind === 'like' ? (
        selected ? (
          <HeartFilledIcon className="h-4 w-4 shrink-0" />
        ) : (
          <HeartIcon className="h-4 w-4 shrink-0" />
        )
      ) : selected ? (
        <ChatFilledIcon className="h-4 w-4 shrink-0" />
      ) : (
        <ChatIcon className="h-4 w-4 shrink-0" />
      )}
      <span>{count}</span>
    </button>
  )
}

export default SocialAction
