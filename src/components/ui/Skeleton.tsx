import type { HTMLAttributes } from 'react'

type SkeletonProps = HTMLAttributes<HTMLDivElement>

export function Skeleton({ className, ...props }: SkeletonProps) {
  const classes = ['animate-pulse rounded-md bg-btn-tertiary motion-reduce:animate-none', className]
    .filter(Boolean)
    .join(' ')

  return <div {...props} aria-hidden="true" className={classes} />
}

export default Skeleton
