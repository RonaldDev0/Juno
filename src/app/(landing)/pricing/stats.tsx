export default function Stats() {
  return (
    <div className='grid md:grid-cols-3 gap-6 mb-16'>
      <div className='text-center p-6 rounded-xl bg-primary/5 border border-primary/20'>
        <div className='text-3xl font-bold text-primary mb-2'>300%</div>
        <div className='text-sm text-muted-foreground'>Average ROI</div>
      </div>
      <div className='text-center p-6 rounded-xl bg-primary/5 border border-primary/20'>
        <div className='text-3xl font-bold text-primary mb-2'>14 Days</div>
        <div className='text-sm text-muted-foreground'>To see results</div>
      </div>
      <div className='text-center p-6 rounded-xl bg-primary/5 border border-primary/20'>
        <div className='text-3xl font-bold text-primary mb-2'>$2.1B</div>
        <div className='text-sm text-muted-foreground'>Saved by Microsoft</div>
      </div>
    </div>
  )
}