type AvatarSize = 'sm' | 'md' | 'lg' | 'xl'

interface AvatarProps {
  /** Used for the fallback initial and the image alt text. */
  name?: string
  /** Image URL. When missing, the initial (or a default silhouette) is shown. */
  src?: string | null
  /** Avatar dimensions. Defaults to `md`. */
  size?: AvatarSize
  className?: string
}

const sizeClasses: Record<AvatarSize, string> = {
  sm: 'h-8 w-8 text-sm',
  md: 'h-10 w-10 text-lg',
  lg: 'h-16 w-16 text-3xl',
  xl: 'h-24 w-24 text-5xl',
}

export function Avatar({ name, src, size = 'md', className }: AvatarProps) {
  const base = [
    'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full',
    sizeClasses[size],
    className,
  ]

  if (src) {
    return (
      <img
        src={src}
        alt={name ?? ''}
        className={[...base, 'object-cover'].filter(Boolean).join(' ')}
      />
    )
  }

  const initial = name?.trim().charAt(0).toUpperCase()

  if (initial) {
    return (
      <span
        aria-label={name}
        className={[...base, 'bg-[#336a1f] font-medium leading-none text-white']
          .filter(Boolean)
          .join(' ')}
      >
        {initial}
      </span>
    )
  }

  return (
    <span
      aria-hidden="true"
      className={[...base, 'items-end bg-linear-to-br from-violet-500 to-purple-500']
        .filter(Boolean)
        .join(' ')}
    >
      <svg viewBox="0 0 40 40" className="h-full w-full" fill="white">
        <circle cx="20" cy="15" r="7" />
        <path d="M6 40c0-8 6-13 14-13s14 5 14 13z" />
      </svg>
    </span>
  )
}

export default Avatar