import type { SubmitEvent } from 'react'
import { SendIcon } from '@/components/icons'
import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

interface ComposeUser {
  name: string
  avatarUrl?: string | null
}

interface ComposeBoxProps {
  user: ComposeUser
  placeholder: string
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  submitLabel: 'Post' | 'Comment'
}

export function ComposeBox({
  user,
  placeholder,
  value,
  onChange,
  onSubmit,
  submitLabel,
}: ComposeBoxProps) {
  const canSubmit = value.trim().length > 0

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (canSubmit) onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <Avatar name={user.name} src={user.avatarUrl ?? undefined} />
        <Input
          multiline
          bordered={false}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
          className="resize-none bg-transparent shadow-none"
        />
      </div>

      <div className="border-t border-border" />

      <div className="flex justify-end">
        <Button type="submit" disabled={!canSubmit} icon={<SendIcon />}>
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}

export default ComposeBox
