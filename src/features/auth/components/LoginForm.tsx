import { useState, type FormEvent } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import PasswordInput from '@/components/ui/PasswordInput'
import {
  validateLoginForm,
  type AuthValidationErrors,
} from '@/features/auth/validation'
import { authService } from '@/services/authService'

interface LoginFormProps {
  onSuccess: () => void
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<AuthValidationErrors>({})
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isSubmitting) return

    const validationErrors = validateLoginForm({ email, password })
    setErrors(validationErrors)
    setFormError('')

    if (Object.keys(validationErrors).length > 0) return

    setIsSubmitting(true)
    try {
      await authService.login(email, password)
      onSuccess()
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : 'Unable to log in right now.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  function updateEmail(value: string) {
    setEmail(value)
    setErrors((currentErrors: AuthValidationErrors) => ({
      ...currentErrors,
      email: undefined,
    }))
    setFormError('')
  }

  function updatePassword(value: string) {
    setPassword(value)
    setErrors((currentErrors: AuthValidationErrors) => ({
      ...currentErrors,
      password: undefined,
    }))
    setFormError('')
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
      <Input
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        value={email}
        onChange={(event) => updateEmail(event.target.value)}
        error={errors.email}
      />
      <PasswordInput
        label="Password"
        autoComplete="current-password"
        placeholder="Enter your password"
        value={password}
        onChange={(event) => updatePassword(event.target.value)}
        error={errors.password}
      />
      {formError && (
        <p className="text-sm text-danger" role="alert">
          {formError}
        </p>
      )}
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Logging in…' : 'Login'}
      </Button>
    </form>
  )
}
