'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

type ResetPasswordState = {
  success: boolean,
  error?: string | null,
  values?: {
    password?: string,
    confirmPassword?: string,
  }
}

export async function resetPassword(_prevState: ResetPasswordState, formData: FormData): Promise<ResetPasswordState> {
  const supabase = await createClient()

  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (!password) {
    return {
      success: false,
      error: 'Password is required',
      values: { password, confirmPassword }
    }
  }

  if (password !== confirmPassword) {
    return {
      success: false,
      error: 'Passwords do not match',
      values: { password, confirmPassword }
    }
  }

  if (password.length < 6) {
    return {
      success: false,
      error: 'Password must be at least 6 characters long',
      values: { password, confirmPassword }
    }
  }

  const { error } = await supabase.auth.updateUser({
    password: password
  })

  if (error) {
    return {
      success: false,
      error: error.message,
      values: { password, confirmPassword }
    }
  }

  redirect('/')
}
