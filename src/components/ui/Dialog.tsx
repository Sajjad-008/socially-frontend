interface DialogProps {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  footer?: React.ReactNode
}

export default function Dialog({ open, onClose, title, children, footer }: DialogProps) {
  if (open === false) return null
  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose()
      }}
    >
      <div className="bg-bg p-6 border rounded-lg min-w-125 flex flex-col gap-4">
        <div className="flex items-center">
          <h2 className="text-lg font-bold">{title}</h2>
        </div>
        <div className="flex flex-col gap-2 text-content-muted">{children}</div>
        {footer}
      </div>
    </div>
  )
}
