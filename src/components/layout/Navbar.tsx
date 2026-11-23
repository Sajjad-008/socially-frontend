import { useState, type ComponentType } from 'react'
import { Link } from 'react-router-dom'
import {
  BellIcon,
  HomeIcon,
  MenuIcon,
  UserIcon,
  type IconProps,
} from '@/components/icons'
import Drawer from '@/components/ui/Drawer'
import IconButton from '@/components/ui/IconButton'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { useSession } from '@/hooks/useSession'

interface NavItem {
  to: string
  label: string
  icon: ComponentType<IconProps>
  requiresAuth: boolean
}

const NAV_ITEMS: NavItem[] = [
  { to: '/', label: 'Home', icon: HomeIcon, requiresAuth: false },
  { to: '/notifications', label: 'Notification', icon: BellIcon, requiresAuth: true },
  { to: '/profile', label: 'Profile', icon: UserIcon, requiresAuth: true },
]

const navLinkClass =
  'inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-content hover:bg-btn-tertiary'
const signInClass =
  'inline-flex h-8 items-center justify-center rounded-md bg-btn-primary px-3 text-sm font-semibold text-content-opposite shadow-sm hover:bg-btn-primary-hover'

export default function Navbar() {
  const { isLoggedIn } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)

  const items = NAV_ITEMS.filter((item) => !item.requiresAuth || isLoggedIn)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="sticky top-0 z-40 h-[65px] border-b border-border bg-header backdrop-blur">
      <div className="mx-auto flex h-full max-w-[1248px] items-center justify-between px-4">
        <Link to="/" className="font-mono text-xl font-bold">
          Socially
        </Link>

        {/* دسکتاپ */}
        <nav className="hidden items-center gap-2 md:flex" aria-label="Main">
          <ThemeToggle />
          {items.map(({ to, label, icon: Icon }) => (
            <Link key={to} to={to} className={navLinkClass}>
              <Icon />
              {label}
            </Link>
          ))}
          {!isLoggedIn && (
            <Link to="/login" className={signInClass}>
              Sign In
            </Link>
          )}
        </nav>

        {/* موبایل */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <IconButton
            variant="theme"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            icon={<MenuIcon />}
          />
        </div>
      </div>

      <Drawer open={menuOpen} onClose={closeMenu}>
        <nav className="flex flex-col gap-1" aria-label="Mobile">
          {items.map(({ to, label, icon: Icon }) => (
            <Link key={to} to={to} onClick={closeMenu} className={navLinkClass}>
              <Icon />
              {label}
            </Link>
          ))}
          {!isLoggedIn && (
            <Link to="/login" onClick={closeMenu} className={`${signInClass} mt-2`}>
              Sign In
            </Link>
          )}
        </nav>
        {/* TODO: ProfileSummaryCard برای کاربر واردشده اینجا اضافه شود */}
      </Drawer>
    </header>
  )
}
