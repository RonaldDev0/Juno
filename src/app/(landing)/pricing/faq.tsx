export default function Faq() {
  return (
    <div className='max-w-3xl mx-auto mb-16'>
      <h2 className='text-3xl font-bold text-center mb-12'>
        Frequently asked questions
      </h2>

      <div className='space-y-6'>
        <div className='border-b pb-6'>
          <h3 className='text-lg font-semibold mb-2'>
            How quickly will I see results?
          </h3>
          <p className='text-muted-foreground'>
            Most customers see measurable results within 14 days. Microsoft achieved $2.1B in savings within 6 months.
          </p>
        </div>

        <div className='border-b pb-6'>
          <h3 className='text-lg font-semibold mb-2'>
            What does the 14-day free trial include?
          </h3>
          <p className='text-muted-foreground'>
            Full access to all Pro plan features for 14 days, including unlimited integrations and advanced analytics.
          </p>
        </div>

        <div className='border-b pb-6'>
          <h3 className='text-lg font-semibold mb-2'>
            Do you offer enterprise discounts?
          </h3>
          <p className='text-muted-foreground'>
            Yes, we offer volume discounts for teams with 50+ users. Meta saved 40% with our enterprise pricing.
          </p>
        </div>
      </div>
    </div>
  )
}