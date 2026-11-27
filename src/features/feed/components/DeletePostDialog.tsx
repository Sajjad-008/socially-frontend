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
      showCloseButton={false}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <button
            type="button"
            onClick={handleConfirm}
            className="inline-flex h-9 items-center justify-center rounded-md bg-danger px-4 text-sm font-semibold text-white transition-colors hover:bg-danger/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-content-muted motion-reduce:transition-none"
          >
            Delete
          </button>
        </>
      }
    >
      This Action Can not be undone
    </Dialog>
  )
}
