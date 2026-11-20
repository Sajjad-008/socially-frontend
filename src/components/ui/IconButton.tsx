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

export function IconButton({
  variant,
  icon,
  selected = false,
  type = 'button',
  className,
  ...props
}: IconButtonProps) {
  const variantClasses: Record<IconButtonVariant, string> = {
    theme:
      'h-9 w-9 rounded-[6px] border border-border bg-card p-2 text-content shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)]',
    trash: [
      'h-8 w-8 rounded-[6px] p-0',
      selected ? 'bg-btn-tertiary text-danger' : 'bg-bg text-content-muted',
    ].join(' '),
    close: 'h-4 w-4 rounded-[4px] p-0 text-content opacity-70 dark:opacity-100',
  }

  const classes = [
    'inline-flex shrink-0 items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500 disabled:cursor-not-allowed motion-reduce:transition-none',
    variantClasses[variant],
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
