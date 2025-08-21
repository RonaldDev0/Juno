import { signOut } from './actions'
import { Button } from '@/components/ui/button'

import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

export default async function Home () {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <main className='w-full h-screen flex flex-col gap-6 justify-center items-center'>
      <p>Hello {data.user.email}</p>
      <form>
        <Button formAction={signOut}>signOut</Button>
      </form>
    </main>
  )
}