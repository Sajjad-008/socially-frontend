export interface LoginFormValues {
  email: string
  password: string
}

export interface RegisterFormValues extends LoginFormValues {
  name: string
}

export interface AuthValidationErrors {
  name?: string
  email?: string
  password?: string
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateEmail(email: string) {
  const normalizedEmail = email.trim()

  if (!normalizedEmail) return 'Email is required.'
  if (!emailPattern.test(normalizedEmail)) return 'Enter a valid email address.'
  return undefined
}

function validatePassword(password: string) {
  if (!password) return 'Password is required.'
  if (password.length < 8) return 'Password must be at least 8 characters.'
  return undefined
}

export function validateLoginForm({ email, password }: LoginFormValues) {
  const errors: AuthValidationErrors = {
    email: validateEmail(email),
    password: validatePassword(password),
  }

  return Object.fromEntries(
    Object.entries(errors).filter(([, error]) => error),
  ) as AuthValidationErrors
}

export function validateRegisterForm({
  name,
  email,
  password,
}: RegisterFormValues) {
  const errors: AuthValidationErrors = {
    name: name.trim() ? undefined : 'Name is required.',
    email: validateEmail(email),
    password: validatePassword(password),
  }

  return Object.fromEntries(
    Object.entries(errors).filter(([, error]) => error),
  ) as AuthValidationErrors
}
