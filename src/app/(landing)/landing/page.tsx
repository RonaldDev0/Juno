import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Zap, ArrowRight, BarChart3, Users, Shield } from 'lucide-react'
import { Check } from 'lucide-react'

export default function LandingPage() {
  return (
    <main className='w-full min-h-screen'>
      {/* Hero Section */}
      <section className='w-full py-20 px-4 bg-gradient-to-br from-background via-background to-muted/20'>
        <div className='container mx-auto max-w-6xl text-center'>
          <div className='max-w-3xl mx-auto space-y-6'>
            <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20'>
              <Zap className='h-4 w-4' />
              <span>New version available</span>
            </div>
            
            <h1 className='text-5xl md:text-6xl font-bold tracking-tight'>
              The platform that{' '}
              <span className='text-primary'>transforms</span> your business
            </h1>
            
            <p className='text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed'>
              Juno helps you manage, analyze, and scale your business with intelligent tools designed for modern success.
            </p>
            
            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
              <Button asChild size='lg' className='text-lg px-8 py-6'>
                <Link href='/'>
                  Start free
                  <ArrowRight className='ml-2 h-5 w-5' />
                </Link>
              </Button>
              <Button variant='outline' size='lg' className='text-lg px-8 py-6'>
                <Link href='/pricing'>View pricing</Link>
              </Button>
            </div>
            
            <p className='text-sm text-muted-foreground'>
              ✨ No credit card required • 14 days free • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='w-full py-20 px-4'>
        <div className='container mx-auto max-w-6xl'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>
              Everything you need to grow
            </h2>
            <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
              Powerful tools that adapt to your workflow
            </p>
          </div>
          
          <div className='grid md:grid-cols-3 gap-8'>
            <Card className='border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1'>
              <CardHeader className='text-center'>
                <div className='w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4'>
                  <BarChart3 className='h-6 w-6 text-primary' />
                </div>
                <CardTitle>Smart Analytics</CardTitle>
                <CardDescription>
                  Get deep insights about your business with customizable dashboards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className='space-y-2 text-sm'>
                  <li className='flex items-center gap-2'>
                    <Check className='h-4 w-4 text-green-500' />
                    Real-time reports
                  </li>
                  <li className='flex items-center gap-2'>
                    <Check className='h-4 w-4 text-green-500' />
                    Custom metrics
                  </li>
                  <li className='flex items-center gap-2'>
                    <Check className='h-4 w-4 text-green-500' />
                    Auto export
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className='border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1'>
              <CardHeader className='text-center'>
                <div className='w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4'>
                  <Users className='h-6 w-6 text-primary' />
                </div>
                <CardTitle>Team Management</CardTitle>
                <CardDescription>
                  Coordinate your team efficiently with collaborative tools
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className='space-y-2 text-sm'>
                  <li className='flex items-center gap-2'>
                    <Check className='h-4 w-4 text-green-500' />
                    Roles & permissions
                  </li>
                  <li className='flex items-center gap-2'>
                    <Check className='h-4 w-4 text-green-500' />
                    Integrated communication
                  </li>
                  <li className='flex items-center gap-2'>
                    <Check className='h-4 w-4 text-green-500' />
                    Task tracking
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className='border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1'>
              <CardHeader className='text-center'>
                <div className='w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4'>
                  <Shield className='h-6 w-6 text-primary' />
                </div>
                <CardTitle>Enterprise Security</CardTitle>
                <CardDescription>
                  Protect your data with enterprise-grade security standards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className='space-y-2 text-sm'>
                  <li className='flex items-center gap-2'>
                    <Check className='h-4 w-4 text-green-500' />
                    AES-256 encryption
                  </li>
                  <li className='flex items-center gap-2'>
                    <Check className='h-4 w-4 text-green-500' />
                    2FA authentication
                  </li>
                  <li className='flex items-center gap-2'>
                    <Check className='h-4 w-4 text-green-500' />
                    GDPR compliance
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='w-full py-20 px-4 bg-primary/5'>
        <div className='container mx-auto max-w-4xl text-center'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>
            Ready to transform your business?
          </h2>
          <p className='text-xl text-muted-foreground mb-8 max-w-2xl mx-auto'>
            Join thousands of companies that already trust Juno for their growth
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button asChild size='lg' className='text-lg px-8 py-6'>
              <Link href='/'>
                Get started now
                <ArrowRight className='ml-2 h-5 w-5' />
              </Link>
            </Button>
            <Button variant='outline' size='lg' className='text-lg px-8 py-6'>
              <Link href='/pricing'>Compare plans</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
