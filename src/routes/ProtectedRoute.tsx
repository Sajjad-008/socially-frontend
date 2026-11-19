import { Navigate, Outlet } from 'react-router-dom'
import { useSession } from '@/hooks/useSession'

export default function ProtectedRoute() {
  const { isLoggedIn } = useSession()
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />
}
