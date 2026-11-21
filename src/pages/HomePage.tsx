import AppLayout from '@/components/layout/AppLayout'

const box = 'rounded-lg border border-border bg-card p-4'

export default function HomePage() {
  return (
    <AppLayout
      left={<div className={box}>Left column</div>}
      right={<div className={box}>Right column</div>}
    >
      <div className={box}>Feed</div>
    </AppLayout>
  )
}
