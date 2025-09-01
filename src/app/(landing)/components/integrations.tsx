import {
  Check,
  Globe,
  Zap
} from 'lucide-react'

const integrations = [
  'Microsoft', 'Google', 'Amazon', 'Meta', 'Apple', 'Netflix',
  'Salesforce', 'Oracle', 'IBM', 'Adobe', 'Intel', 'Cisco',
  'Slack', 'Zoom', 'Teams', 'Jira', 'Asana', 'Trello',
  'HubSpot', 'Mailchimp', 'Stripe', 'Shopify', 'Zendesk', 'Notion'
]

export default function Integrations() {
  return (
    <section className='py-16 md:py-20 px-4 border-t border-border bg-gradient-to-r from-background via-card/20 to-background'>
      <div className='container mx-auto max-w-6xl'>
        <div className='text-center mb-16'>
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 mb-4'>
            <Globe className='h-4 w-4' />
            <span>500+ Enterprise Integrations</span>
          </div>
          <h2 className='text-3xl md:text-4xl font-bold mb-4 text-foreground'>
            Connect with your existing tools instantly
          </h2>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            No need to change your workflow. Integrate with the tools you already use and love.
          </p>
        </div>

        <div className='grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-6'>
          {integrations.map((integration) => (
            <div key={integration} className='text-center group'>
              <div className='p-4 rounded-xl bg-card border border-border backdrop-blur-sm hover:border-primary/30 transition-all duration-300 group-hover:bg-primary/5'>
                <p className='text-sm font-semibold text-muted-foreground group-hover:text-primary transition-colors'>
                  {integration}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className='text-center mt-12'>
          <div className='inline-flex items-center gap-4 px-6 py-3 rounded-full bg-primary/10 border border-primary/20'>
            <div className='flex items-center gap-2'>
              <Check className='h-4 w-4 text-green-500' />
              <span className='text-sm font-medium text-foreground'>5-minute setup</span>
            </div>
            <div className='w-px h-4 bg-border' />
            <div className='flex items-center gap-2'>
              <Zap className='h-4 w-4 text-primary' />
              <span className='text-sm font-medium text-foreground'>Real-time sync</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}