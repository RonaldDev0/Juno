import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

export default async function PrivatePage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <main className='w-full h-screen flex justify-center items-center'>
      <p>Hello {data.user.email}</p>
    </main>
  )
}