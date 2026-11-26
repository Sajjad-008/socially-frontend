import { Link } from 'react-router-dom'
import AuthLayout from '@/features/auth/components/AuthLayout'
import RegisterForm from '@/features/auth/components/RegisterForm'

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Enter your details below to create your account"
      footer={
        <p className="text-content-muted">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-content underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </p>
      }
    >
      <RegisterForm />
    </AuthLayout>
  )
}
