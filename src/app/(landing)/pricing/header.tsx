import { Timer } from 'lucide-react'

export default function Header() {
  return (
    <div className='text-center mb-16'>
      <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 mb-4'>
        <Timer className='h-4 w-4' />
        <span>50% Off Enterprise Plans - Limited Time</span>
      </div>
      <h1 className='text-4xl md:text-5xl font-bold mb-4'>
        Pricing that scales with your success
      </h1>
      <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
        Join 10,000+ companies achieving 300% ROI. Start free, scale as you grow.
      </p>
    </div>
  )
}