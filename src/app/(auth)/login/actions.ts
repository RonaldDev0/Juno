'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

type LoginState = {
  success: boolean,
  error?: string | null,
  values?: {
    email?: string,
    password?: string,
  }
}

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return {
      success: false,
      error: error.message,
      values: {
        email: data.email,
        password: data.password,
      }
    }
  }

  redirect('/home')
}
