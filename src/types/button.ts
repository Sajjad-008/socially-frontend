import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'pure'

export type ButtonSize = 'md' | 's'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style of the button. Defaults to `primary`. */
  variant?: ButtonVariant
  /** Button dimensions. Defaults to `md`. */
  size?: ButtonSize
  /** Optional icon element, rendered before the button label by default. */
  icon?: ReactNode
  /** Position of the optional icon. Defaults to `start`. */
  iconPosition?: 'start' | 'end'
}
