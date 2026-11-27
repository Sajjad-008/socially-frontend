import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '@/features/auth/components/AuthLayout'
import LoginForm from '@/features/auth/components/LoginForm'

export default function LoginPage() {
  const navigate = useNavigate()

  return (
    <AuthLayout
      title="Login"
      subtitle="Welcome back. Enter your details to continue."
      footer={
        <p className="text-content-muted">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="font-semibold text-content underline">
            Sign up
          </Link>
        </p>
      }
    >
      <LoginForm onSuccess={() => navigate('/')} />
    </AuthLayout>
  )
}
