import {
  Shield,
  Workflow,
  BarChart,
  type LucideIcon
} from 'lucide-react'
import Header from './header'
import FeatureCard from './card'

interface Feature {
  icon: LucideIcon
  title: string
  description: string
  features: string[]
}

const features: Feature[] = [
  {
    icon: Workflow,
    title: 'Workflow Automation',
    description: 'Streamline your processes with powerful automation tools that work around the clock',
    features: [
      'No-code builder - Setup in minutes, not months',
      'Multiple integrations - Works with your existing tools',
      'Smart triggers - Automate based on conditions and events'
    ]
  },
  {
    icon: BarChart,
    title: 'Analytics & Insights',
    description: 'Make informed decisions with comprehensive analytics and real-time insights',
    features: [
      'Real-time dashboards - Monitor performance 24/7',
      'Custom reports - Generate insights tailored to your needs',
      'Data visualization - Beautiful charts and graphs'
    ]
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level protection that keeps your data safe and compliant',
    features: [
      'End-to-end encryption - Your data is always protected',
      'SSO & MFA - Secure access for your team',
      'Compliance ready - GDPR, HIPAA, and more'
    ]
  }
]

export default function Features() {
  return (
    <section className='py-16 md:py-20 px-4'>
      <div className='container mx-auto max-w-6xl'>
        <Header />
        <div className='grid md:grid-cols-3 gap-8 mb-16'>
          {features.map(feat => (
            <FeatureCard
              key={feat.title}
              {...feat}
            />
          ))}
        </div>
      </div>
    </section>
  )
}