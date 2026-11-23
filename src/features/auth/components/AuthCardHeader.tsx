import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from '@/components/icons'
import Button from '@/components/ui/Button'

interface AuthCardHeaderProps {
  title: string
  subtitle: string
}

export default function AuthCardHeader({
  title,
  subtitle,
}: AuthCardHeaderProps) {
  const navigate = useNavigate()

  return (
    <div className="mb-6">
      <div className="flex items-center gap-4">
        <Button
          variant="pure"
          onClick={() => navigate('/')}
          icon={<ArrowLeftIcon size={20} />}
          aria-label="Back to home"
        />

        <h1 className="text-2xl font-bold text-content">{title}</h1>
      </div>

      <p className="mt-2 text-sm text-content-muted">{subtitle}</p>
    </div>
  )
}