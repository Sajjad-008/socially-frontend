import Dialog from '@/components/ui/Dialog'
import DialogDeleteFooter from '@/features/dialogFooters/DialogDeleteFooter'

interface DeletePostDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

export default function DeletePostDialog({
  open,
  onClose,
  onConfirm,
}: DeletePostDialogProps) {
  if (!open) return null
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Delete Post"
      footer={DialogDeleteFooter({ onClose, onConfirm })}
    >
      This action can not be undone
    </Dialog>
  )
}
