import type { ReactNode } from 'react'

export interface TabItem {
  id: string
  label: string
  icon?: ReactNode
}

interface TabsProps {
  items: TabItem[]
  activeId: string
  onChange: (id: string) => void
}

export function Tabs({ items, activeId, onChange }: TabsProps) {
  return (
    <div role="tablist" className="flex border-b border-border">
      {items.map((item) => {
        const isActive = item.id === activeId

        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(item.id)}
            className={[
              '-mb-px inline-flex items-center gap-2 border-b-2 px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-content-muted motion-reduce:transition-none',
              isActive
                ? 'border-content text-content'
                : 'border-transparent text-content-muted hover:text-content',
            ].join(' ')}
          >
            {item.icon != null && (
              <span className="inline-flex shrink-0" aria-hidden="true">
                {item.icon}
              </span>
            )}
            {item.label}
          </button>
        )
      })}
    </div>
  )
}

export default Tabs
