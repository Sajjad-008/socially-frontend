import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { CloseIcon } from '@/components/icons'
import IconButton from '@/components/ui/IconButton'

interface DialogProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  footer?: ReactNode
  /** نمایش دکمه ✕ بالا. پیش‌فرض: true */
  showCloseButton?: boolean
}

export default function Dialog({
  open,
  onClose,
  title,
  children,
  footer,
  showCloseButton = true,
}: DialogProps) {
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex animate-dialog-fade items-center justify-center bg-overlay p-4 motion-reduce:animate-none"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="flex w-full max-w-[500px] animate-dialog-pop flex-col gap-4 rounded-lg border border-border bg-card p-6 text-content shadow-lg motion-reduce:animate-none"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold">{title}</h2>
          {showCloseButton && (
            <IconButton
              variant="close"
              aria-label="Close dialog"
              onClick={onClose}
              icon={<CloseIcon />}
            />
          )}
        </div>

        <div className="text-sm text-content-muted">{children}</div>

        {footer && <div className="flex justify-end gap-3">{footer}</div>}
      </div>
    </div>,
    document.body,
  )
}
