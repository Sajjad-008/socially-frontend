import type { ReactNode } from 'react'

interface MetaItemProps {
  icon: ReactNode
  children: ReactNode
  className?: string
}

export default function MetaItem({ icon, children, className }: MetaItemProps) {
  const classes = ['flex items-center gap-2 text-xs text-content-muted', className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes}>
      <span className="shrink-0">{icon}</span>
      <span className="min-w-0 truncate">{children}</span>
    </div>
  )
}
