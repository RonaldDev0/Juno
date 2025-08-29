'use server'

import { createClient } from '@/lib/supabase/server'

type ForgotPasswordState = {
  success: boolean,
  error?: string | null,
  values?: {
    email?: string,
  }
}

export async function forgotPassword(_prevState: ForgotPasswordState, formData: FormData): Promise<ForgotPasswordState> {
  const supabase = await createClient()

  const email = formData.get('email') as string

  if (!email) {
    return {
      success: false,
      error: 'Email is required',
      values: { email }
    }
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email)

  if (error) {
    return {
      success: false,
      error: error.message,
      values: { email }
    }
  }

  return { success: true }
}
