import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Cancel() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-background to-muted">
      <div className="flex flex-col items-center justify-center flex-1 px-4 text-center max-w-2xl mx-auto space-y-8">
        <div className="space-y-4">
          <div className="text-9xl animate-bounce">😔</div>
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight transition-colors">
            Payment Cancelled
          </h1>
          <p className="text-lg text-muted-foreground">
            We understand things don't always work out. No worries at all – these things happen!
          </p>
          <p className="text-muted-foreground">
            Would you like to give it another try? We're here when you're ready.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/">
            <Button variant="default" size="lg" className="font-semibold">
              Return Home
            </Button>
          </Link>
          <Link href="/pricing">
            <Button variant="outline" size="lg" className="font-semibold">
              Try Again
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
