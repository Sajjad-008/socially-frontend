import { useState } from 'react'
import { Input } from './Input'
import type { InputProps } from './Input'
import { EyeIcon, EyeOffIcon } from '../icons'

export type PasswordInputProps = Omit<
  Extract<InputProps, { multiline?: false }>,
  'type'
>

export function PasswordInput({
  label,
  error,
  className,
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative w-full">
      <Input
        {...props}
        label={label}
        error={error}
        type={showPassword ? 'text' : 'password'}
        className={['pe-10', className].filter(Boolean).join(' ')}
      />

      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
        aria-pressed={showPassword}
        className={[
          'absolute end-3 flex h-5 w-5 items-center justify-center',
          'text-content-muted transition-colors hover:text-content',
          'focus-visible:outline-2 focus-visible:outline-offset-2',
          'focus-visible:outline-content-muted',
          label ? 'top-[42px]' : 'top-2.5',
        ].join(' ')}
      >
        {showPassword ? (
          <EyeIcon size={18} />
        ) : (
          <EyeOffIcon size={18} />
        )}
      </button>
    </div>
  )
}

export default PasswordInput
