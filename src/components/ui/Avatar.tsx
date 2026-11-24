import { useState } from 'react'

type AvatarProps = {
  name: string
  src?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizeClasses = {
  sm: 'h-6 w-6 text-xs',
  md: 'h-8 w-8 text-sm',
  lg: 'h-10 w-10 text-base',
  xl: 'h-12 w-12 text-lg',
}

function Avatar({ name, src, size = 'md' }: AvatarProps) {
  const [imageError, setImageError] = useState(false)

  const initial = name.trim().charAt(0).toUpperCase() || '?'

  return (
    <div
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-green-100 font-semibold text-green-700 ${sizeClasses[size]}`}
      role="img"
      aria-label={`${name} avatar`}
    >
      {src && !imageError ? (
        <img
          src={src}
          alt={name}
          className="h-full w-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        initial
      )}
    </div>
  )
}

export default Avatar
