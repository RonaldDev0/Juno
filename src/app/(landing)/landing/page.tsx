import Hero from './hero'
import SocialProof from './social-proof'
import Features from './features'
import Stats from './stats'
import Testimonials from './testimonials'
import Integrations from './integrations'
import CTA from './cta'

export default function LandingPage() {
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