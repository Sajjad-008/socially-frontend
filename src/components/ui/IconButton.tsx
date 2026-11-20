import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type IconButtonVariant = 'theme' | 'trash' | 'close'

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label' | 'children'> {
  /** Determines the button's visual style. */
  variant: IconButtonVariant
  /** Icon displayed inside the button. */
  icon: ReactNode
  /** Accessible name for the icon-only button. */
  'aria-label': string
  /** Applies the selected appearance to the trash variant. */
  selected?: boolean
}

const variantClasses: Record<IconButtonVariant, string> = {
  theme:
    'h-9 w-9 rounded-md border border-border bg-card p-2 text-content shadow-btn-secondary hover:bg-btn-secondary-hover',
  trash:
    'h-8 w-8 rounded-md bg-bg p-0 text-content-muted hover:bg-btn-tertiary hover:text-danger',
  close: 'h-4 w-4 rounded-[4px] p-0 text-content',
}

export function IconButton({
  variant,
  icon,
  selected = false,
  type = 'button',
  className,
  ...props
}: IconButtonProps) {
  const classes = [
    'inline-flex shrink-0 items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-content-muted disabled:cursor-not-allowed motion-reduce:transition-none',
    variantClasses[variant],
    variant === 'trash' && selected ? 'bg-btn-tertiary text-danger' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button {...props} type={type} className={classes}>
      <span className="inline-flex shrink-0 items-center justify-center" aria-hidden="true">
        {icon}
      </span>
    </button>
  )
}

export default IconButton
