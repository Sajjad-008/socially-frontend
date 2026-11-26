import Button from '@/components/ui/Button'

export default function DialogDeleteFooter({
  onClose,
  onConfirm,
}: {
  onClose: () => void
  onConfirm: () => void
}) {
  return (
    <div className="flex justify-end gap-3">
      <Button size="md" variant="secondary" onClick={onClose}>
        Cancel
      </Button>
      <Button
        size="md"
        variant="secondary"
        className="bg-danger"
        onClick={() => {
          onConfirm()
          onClose()
        }}
      >
        Delete
      </Button>
    </div>
  )
}
