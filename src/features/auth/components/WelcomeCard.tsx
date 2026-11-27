import { useNavigate } from 'react-router-dom'
import Card from '@/components/ui/Card'

const baseButtonClass =
  'inline-flex h-9 w-full items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-content-muted motion-reduce:transition-none'

const logInClass = [
  baseButtonClass,
  'border border-transparent bg-btn-primary text-content-opposite hover:bg-btn-primary-hover',
  'dark:border-border dark:bg-btn-secondary dark:text-content dark:hover:bg-btn-secondary-hover',
].join(' ')

const signUpClass = [
  baseButtonClass,
  'bg-btn-secondary-hover text-content shadow-btn-secondary hover:bg-btn-tertiary',
  'dark:bg-btn-primary dark:text-content-opposite dark:shadow-none dark:hover:bg-btn-primary-hover',
].join(' ')

export default function WelcomeCard() {
  const navigate = useNavigate()

  return (
    <Card className="p-6 text-center">
      <h2 className="text-base font-bold text-content">Welcome Back!</h2>
      <p className="mt-4 text-xs text-content-muted">
        Login to access your profile and connect with others.
      </p>
      <div className="mt-4 flex flex-col gap-2">
        <button type="button" className={logInClass} onClick={() => navigate('/login')}>
          Log In
        </button>
        <button
          type="button"
          className={signUpClass}
          onClick={() => navigate('/register')}
        >
          Sign Up
        </button>
      </div>
    </Card>
  )
}
