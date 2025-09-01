import Hero from './components/hero'
import SocialProof from './components/social-proof'
import Features from './components/features'
import Stats from './components/stats'
import Testimonials from './components/testimonials'
import Integrations from './components/integrations'
import CTA from './components/cta'

export default function componentsPage() {
  return (
    <main>
      <Hero />
      <SocialProof />
      <Features />
      <Stats />
      <Testimonials />
      <Integrations />
      <CTA />
    </main>
  )
}