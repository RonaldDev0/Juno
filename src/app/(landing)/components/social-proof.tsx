import { Shield } from 'lucide-react'

const companies = ['Microsoft', 'Google', 'Amazon', 'Meta', 'Apple', 'Netflix', 'Salesforce', 'Oracle', 'IBM', 'Adobe', 'Intel', 'Cisco']

export default function SocialProof() {
  return (
    <section className='py-16 px-4 border-t border-border bg-gradient-to-r from-background via-card/50 to-background'>
      <div className='container mx-auto max-w-5xl'>
        <div className='text-center mb-12'>
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 mb-4'>
            <Shield className='h-4 w-4' />
            <span>Trusted by Industry Leaders</span>
          </div>
          <h3 className='text-2xl md:text-3xl font-bold text-foreground mb-2'>
            Powering the world's most innovative companies
          </h3>
          <p className='text-muted-foreground'>
            Join thousands of enterprises that trust our platform
          </p>
        </div>

        <div className='relative overflow-hidden'>
          <div className='flex animate-scroll-left'>
            <div className='flex items-center gap-16 whitespace-nowrap'>
              {companies.map(company => (
                <div key={company} className='text-2xl font-semibold text-muted-foreground hover:text-primary transition-colors duration-300'>
                  {company}
                </div>
              ))}
            </div>
            <div className='flex items-center gap-16 whitespace-nowrap ml-16'>
              {companies.map(company => (
                <div key={`${company}-duplicate`} className='text-2xl font-semibold text-muted-foreground hover:text-primary transition-colors duration-300'>
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='text-center mt-12'>
          <div className='inline-flex items-center gap-4 px-6 py-3 rounded-full bg-card border border-border backdrop-blur-sm'>
            <div className='flex items-center gap-2'>
              <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse' />
              <span className='text-sm font-medium text-foreground'>
                10,000+ Active Users
              </span>
            </div>
            <div className='w-px h-4 bg-border' />
            <div className='w-px h-4 bg-border' />
            <div className='flex items-center gap-2'>
              <div className='w-2 h-2 bg-purple-500 rounded-full animate-pulse' />
              <span className='text-sm font-medium text-foreground'>
                24/7 Support
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}