import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'

export default function WelcomeCard() {
  const navigate = useNavigate()

  //  بعد از merge شدن Card  <section> با <Card> عوض شود
  return (
    <section className="rounded-lg border border-border bg-card p-6 text-center">
      <h2 className="text-base font-bold text-content">Welcome Back!</h2>
      <p className="mt-4 text-xs text-content-muted">
        Login to access your profile and connect with others.
      </p>
      <div className="mt-4 flex flex-col gap-2">
        <Button
          variant="secondary"
          size="s"
          className="w-full"
          onClick={() => navigate('/login')}
        >
          Log In
        </Button>
        <Button size="s" className="w-full" onClick={() => navigate('/register')}>
          Sign Up
        </Button>
      </div>
    </section>
  )
}
