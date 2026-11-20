import type { ButtonHTMLAttributes } from 'react'
import commentIcon from '../../assets/CommentIcon.svg?raw'
import heartIcon from '../../assets/HeartIcon.svg?raw'

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

function ActionIcon({ source, filled }: { source: string; filled: boolean }) {
  const markup = source
    .replace('fill="none"', `fill="${filled ? 'currentColor' : 'none'}"`)
    .replace('stroke="#FAFAFA"', 'stroke="currentColor"')

  return (
    <span
      aria-hidden="true"
      className="inline-flex shrink-0"
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  )
}

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
        'inline-flex h-8 w-[55px] items-center justify-center gap-2 rounded-[6px] border-0 bg-transparent px-3 py-2 text-xs leading-none transition-colors hover:bg-btn-tertiary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-content-muted motion-reduce:transition-none',
        selected ? colorClass : 'text-content',
        selected ? '' : hoverColorClasses[kind],
        selected ? 'bg-btn-tertiary' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <ActionIcon source={kind === 'like' ? heartIcon : commentIcon} filled={selected} />
      <span>{count}</span>
    </button>
  )
}

export default SocialAction
