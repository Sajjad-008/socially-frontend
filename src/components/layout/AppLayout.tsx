import type { ReactNode } from 'react'
import Navbar from './Navbar'

interface AppLayoutProps {
  left?: ReactNode
  right?: ReactNode
  wide?: boolean
  children: ReactNode
}

export default function AppLayout({
  left,
  right,
  wide = false,
  children,
}: AppLayoutProps) {
  const columns = wide
    ? 'lg:grid-cols-[minmax(220px,294px)_minmax(0,930px)]'
    : 'lg:grid-cols-[minmax(220px,294px)_minmax(0,550px)_minmax(240px,356px)]'

  return (
    <div className="min-h-screen bg-bg text-content">
      <Navbar />
      <div
        className={`mx-auto grid max-w-[1248px] grid-cols-1 gap-6 px-4 py-6 ${columns}`}
      >
        <aside className="hidden lg:block">{left}</aside>
        <main className="min-w-0">{children}</main>
        {!wide && <aside className="hidden lg:block">{right}</aside>}
      </div>
    </div>
  )
}
