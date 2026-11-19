import { Navigate, Outlet } from 'react-router-dom'
import { useSession } from '@/hooks/useSession'

export default function GuestRoute() {
  const { isLoggedIn } = useSession()
  return isLoggedIn ? <Navigate to="/" replace /> : <Outlet />
}
