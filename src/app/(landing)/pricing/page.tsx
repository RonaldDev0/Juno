import Header from './header'
import Pricing from './pricing'
import Faq from './faq'

export default function PricingPage() {
  return (
    <main className='w-full min-h-screen py-20 px-4'>
      <div className='container mx-auto max-w-6xl'>
        <Header />
        <Pricing />
        <Faq />
      </div>
    </main>
  )
}
