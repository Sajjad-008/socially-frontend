import { useId } from 'react'
import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react'

type SharedInputProps = {
  label?: string
  bordered?: boolean
  error?: string
  className?: string
}

type SingleLineInputProps = SharedInputProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'className'> & {
    multiline?: false
  }

type MultilineInputProps = SharedInputProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> & {
    multiline: true
  }

export type InputProps = SingleLineInputProps | MultilineInputProps

function getControlProps<T extends InputProps>(props: T) {
  const controlProps = { ...props }
  delete controlProps.label
  delete controlProps.bordered
  delete controlProps.error
  delete controlProps.className
  delete controlProps.multiline
  return controlProps
}

export function Input(props: InputProps) {
  const generatedId = useId()
  const { label, bordered = true, error, className, id } = props
  const controlId = id ?? generatedId
  const errorId = `${controlId}-error`
  const controlClassName = [
    'w-full rounded-md bg-bg px-3 text-sm text-content shadow-[0_1px_2px_rgba(0,0,0,0.05)] placeholder:text-content-muted focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-content-muted disabled:cursor-not-allowed disabled:opacity-50',
    error
      ? 'border border-danger focus-visible:outline-danger'
      : bordered
        ? 'border border-border'
        : 'border border-transparent',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  let control
  if (props.multiline) {
    const textareaProps = getControlProps(props)
    const { 'aria-describedby': ariaDescribedBy, 'aria-invalid': ariaInvalid } =
      props
    const describedBy = [ariaDescribedBy, error ? errorId : undefined]
      .filter(Boolean)
      .join(' ') || undefined

    control = (
      <textarea
        {...textareaProps}
        id={controlId}
        className={`${controlClassName} h-[100px] min-h-[100px] overflow-auto py-3`}
        aria-invalid={error ? true : ariaInvalid}
        aria-describedby={describedBy}
      />
    )
  } else {
    const inputProps = getControlProps(props)
    const { 'aria-describedby': ariaDescribedBy, 'aria-invalid': ariaInvalid } =
      props
    const describedBy = [ariaDescribedBy, error ? errorId : undefined]
      .filter(Boolean)
      .join(' ') || undefined

    control = (
      <input
        {...inputProps}
        id={controlId}
        className={`${controlClassName} h-10`}
        aria-invalid={error ? true : ariaInvalid}
        aria-describedby={describedBy}
      />
    )
  }

  return (
    <div className="flex w-full flex-col items-start gap-3">
      {label && (
        <label htmlFor={controlId} className="text-sm text-content">
          {label}
        </label>
      )}
      {control}
      {error && (
        <p id={errorId} className="text-sm text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export default Input
