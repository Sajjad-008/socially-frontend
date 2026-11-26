import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'

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
  function handleConfirm() {
    onConfirm()
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Delete Post"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="bg-danger text-white hover:bg-danger/90"
            onClick={handleConfirm}
          >
            Delete
          </Button>
        </>
      }
    >
      This Action Can not be undone
    </Dialog>
  )
}
