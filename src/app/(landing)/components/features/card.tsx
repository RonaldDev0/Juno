import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { type LucideIcon, Check } from 'lucide-react'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  features: string[]
}

export default function FeatureCard({ icon: Icon, title, description, features }: FeatureCardProps) {
  return (
    <Card className='relative text-center space-y-4 p-6 md:p-8 hover:border-primary/30 transition-all duration-300 group hover:-translate-y-1'>
      <div className='w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300'>
        <Icon className='h-8 w-8 text-primary' />
      </div>
      <CardHeader className='text-center p-0'>
        <CardTitle className='text-2xl font-bold text-foreground'>
          {title}
        </CardTitle>
        <CardDescription className='text-lg'>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className='p-0'>
        <ul className='space-y-3 text-sm text-muted-foreground'>
          {features.map((feature, index) => (
            <li key={index} className='flex items-start gap-3'>
              <Check className='h-5 w-5 text-green-500 shrink-0 mt-0.5' />
              <span>
                <strong className='text-foreground'>{feature.split(' - ')[0]}</strong> - {feature.split(' - ')[1]}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}