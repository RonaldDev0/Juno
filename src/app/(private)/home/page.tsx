
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

export default async function HomePage () {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <main className='w-full h-[90dvh] flex flex-col gap-6 justify-center items-center'>
      <p>Hello {data.user.user_metadata.username} 🎉</p>
    </main>
  )
}