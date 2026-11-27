import { useState, type FormEvent } from 'react'
import { authService } from '@/services/authService'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import PasswordInput from '@/components/ui/PasswordInput'
import {
  validateRegisterForm,
  type AuthValidationErrors,
  type RegisterFormValues,
} from '@/features/auth/validation'

const initialValues: RegisterFormValues = {
  name: '',
  email: '',
  password: '',
}

export default function RegisterForm() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState<AuthValidationErrors>({})
  const [submitError, setSubmitError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateField = (field: keyof RegisterFormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    setSubmitError('')
    setSuccessMessage('')
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const validationErrors = validateRegisterForm(values)
    setErrors(validationErrors)
    setSubmitError('')
    setSuccessMessage('')

    if (Object.keys(validationErrors).length > 0) return

    setIsSubmitting(true)
    try {
      await authService.register(values)
      setSuccessMessage('Your account has been created. You can now sign in.')
      setValues(initialValues)
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'Unable to create your account.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
      <Input
        label="Name"
        name="name"
        type="text"
        autoComplete="name"
        placeholder="Enter your name"
        value={values.name}
        onChange={(event) => updateField('name', event.target.value)}
        error={errors.name}
        required
      />

      <Input
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="m@example.com"
        value={values.email}
        onChange={(event) => updateField('email', event.target.value)}
        error={errors.email}
        required
      />

      <PasswordInput
        label="Password"
        name="password"
        autoComplete="new-password"
        placeholder="Enter your password"
        value={values.password}
        onChange={(event) => updateField('password', event.target.value)}
        error={errors.password}
        required
      />

      {submitError && (
        <p className="text-sm text-danger" role="alert">
          {submitError}
        </p>
      )}
      {successMessage && (
        <p className="text-sm text-content-muted" role="status">
          {successMessage}
        </p>
      )}

      <Button type="submit" className="mt-1 w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Creating account...' : 'Create Account'}
      </Button>
    </form>
  )
}
