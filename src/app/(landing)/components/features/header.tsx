export default function Header() {
  return (
    <div className='text-center mb-16'>
      <h2 className='text-3xl md:text-4xl font-bold mb-4 text-foreground'>
        Everything you need to <span className='bg-linear-to-r from-primary to-primary/80 bg-clip-text text-transparent'>succeed</span>
      </h2>
      <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
        Build, scale, and grow with our comprehensive platform designed for modern businesses
      </p>
    </div>
  )
}