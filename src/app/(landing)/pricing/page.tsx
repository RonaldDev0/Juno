import Header from './header'
import Stats from './stats'
import Pricing from './pricing'
import Testimonials from './testimonials'
import Faq from './faq'
import CTA from './cta'

export default function PricingPage() {
  return (
    <main className='w-full min-h-screen py-20 px-4'>
      <div className='container mx-auto max-w-6xl'>
        <Header />
        <Stats />
        <Pricing />
        <Testimonials />
        <Faq />
        <CTA />
      </div>
    </main>
  )
}
