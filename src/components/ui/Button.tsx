import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'pure'
type ButtonSize = 'md' | 's'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style of the button. Defaults to `primary`. */
  variant?: ButtonVariant
  /** Button dimensions. Defaults to `md`. */
  size?: ButtonSize
  /** Optional icon element, rendered before the button label by default. */
  icon?: ReactNode
  /** Position of the optional icon. Defaults to `start`. */
  iconPosition?: 'start' | 'end'
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-btn-primary text-content-opposite shadow-sm hover:bg-btn-primary-hover disabled:opacity-50',
  secondary:
    'border border-border bg-btn-secondary text-content shadow-sm hover:bg-btn-secondary-hover disabled:opacity-50',
  tertiary:
    'bg-btn-tertiary text-content hover:bg-btn-tertiary/80 disabled:opacity-25',
  pure:
    'bg-transparent text-content hover:bg-btn-tertiary disabled:opacity-25',
}

const sizeClasses: Record<ButtonSize, string> = {
  md: 'h-9 px-4 py-2 text-sm',
  s: 'h-8 px-3 py-2 text-sm',
}

export function Button({
  variant = 'primary',
  size = 'md',
  type = 'button',
  icon,
  iconPosition = 'start',
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = [
    'inline-flex items-center justify-center gap-2 rounded-md font-semibold leading-none text-center whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-content-muted disabled:cursor-not-allowed motion-reduce:transition-none',
    variantClasses[variant],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button {...props} type={type} className={classes}>
      {iconPosition === 'start' && icon != null && (
        <span className="inline-flex shrink-0" aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
      {iconPosition === 'end' && icon != null && (
        <span className="inline-flex shrink-0" aria-hidden="true">
          {icon}
        </span>
      )}
    </button>
  )
}

export default Button
