import Header from './header'
import UseCases from './use-cases'
import Cta from './cta'

export default function UseCasesPage() {
  return (
    <main className='w-full min-h-screen py-20 px-4'>
      <div className='container mx-auto max-w-6xl'>
        <Header />
        <UseCases />
        <Cta />
      </div>
    </main>
  )
}
