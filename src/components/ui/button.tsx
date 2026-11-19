import type { ButtonProps } from '../../types/button'

const variantClasses = {
  primary:
    'bg-[#0A0A0A] text-[#FAFAFA] shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] hover:bg-[rgba(250,250,250,0.9)] disabled:bg-[rgba(250,250,250,0.5)]',
  secondary:
    'border border-[#262626] bg-[#0A0A0A] text-[#FAFAFA] shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] hover:bg-[#171717] disabled:bg-[rgba(23,23,23,0.5)]',
  tertiary:
    'bg-[#262626] text-[#FAFAFA] hover:bg-[rgba(38,38,38,0.8)] disabled:bg-[rgba(38,38,38,0.25)]',
  pure:
    'border border-transparent bg-transparent text-[#FAFAFA] hover:bg-[#262626] disabled:bg-[rgba(38,38,38,0.25)]',
} as const

const sizeClasses = {
  md: 'h-9 px-4 py-2 text-sm',
  s: 'h-8 px-3 py-2 text-sm',
} as const

export function Button({
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  icon,
  iconPosition = 'start',
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = [
    'inline-flex items-center justify-center gap-2 rounded-[6px] font-semibold leading-none text-center whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500 disabled:cursor-not-allowed motion-reduce:transition-none',
    variantClasses[variant],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      {...props}
      type={type}
      disabled={disabled}
      className={classes}
    >
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
