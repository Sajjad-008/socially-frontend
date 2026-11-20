import { useEffect, type ReactNode } from 'react'
import { CloseIcon } from '@/components/icons'

interface DrawerProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

export default function Drawer({ open, onClose, title = 'Menu', children }: DrawerProps) {
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open, onClose])

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}
      inert={!open}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-overlay transition-opacity motion-reduce:transition-none ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`absolute inset-y-0 right-0 flex w-72 max-w-[85%] flex-col gap-4 border-l border-border bg-card p-4 transition-transform motion-reduce:transition-none ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-xl font-bold">Socially</span>

          {/*  بعد از merge شدن IconButton عوض شود */}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="inline-flex size-9 items-center justify-center rounded-md border border-border text-content hover:bg-btn-secondary-hover"
          >
            <CloseIcon />
          </button>
        </div>
        {children}
      </aside>
    </div>
  )
}
