interface StatItem {
  label: string
  value: number | string
}

interface ProfileStatsProps {
  items: StatItem[]
  size?: 'sm' | 'md'
  className?: string
}

const valueClasses = {
  sm: 'text-sm font-semibold',
  md: 'text-base font-semibold',
} as const

const labelClasses = {
  sm: 'text-xs',
  md: 'text-sm',
} as const

export default function ProfileStats({
  items,
  size = 'sm',
  className,
}: ProfileStatsProps) {
  return (
    <div className={['flex', className].filter(Boolean).join(' ')}>
      {items.map(({ label, value }) => (
        <div key={label} className="flex flex-1 flex-col items-center gap-1">
          <span className={`${valueClasses[size]} text-content`}>{value}</span>
          <span className={`${labelClasses[size]} text-content-muted`}>{label}</span>
        </div>
      ))}
    </div>
  )
}
