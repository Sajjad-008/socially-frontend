import type { ReactNode } from 'react'
import AuthBrandPanel from './AuthBrandPanel'
import AuthCardHeader from './AuthCardHeader'

interface AuthLayoutProps {
  title: string
  subtitle: string
  children: ReactNode
  footer?: ReactNode
}

export default function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: AuthLayoutProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-bg px-4 py-8">
      <div className="w-full max-w-3xl">
        <div className="grid w-full overflow-hidden rounded-2xl border border-border bg-card md:grid-cols-2">
          <div className="flex flex-col justify-center p-5 sm:p-6">
            <AuthCardHeader title={title} subtitle={subtitle} />

            <div className="w-full">{children}</div>

            {footer && (
              <div className="mt-5 text-center text-sm">
                {footer}
              </div>
            )}
          </div>

          <div className="hidden border-s border-border md:block">
            <AuthBrandPanel />
          </div>
        </div>
      </div>

      <p className="mt-4 px-2 text-center text-xs leading-5 text-content-muted">
        By continuing, you agree to our{' '}
        <a href="#" className="underline underline-offset-2">
          Terms of Service
        </a>
        {' '}and{' '}
        <a href="#" className="underline underline-offset-2">
          Privacy Policy
        </a>
      </p>
    </main>
  )
}