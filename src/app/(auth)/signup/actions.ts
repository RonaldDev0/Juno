'use server'

import { createClient } from '@/lib/supabase/server'

type SignupState = {
  success: boolean,
  error?: string | null,
  values?: {
    username?: string,
    email?: string,
    password?: string,
    confirmPassword?: string
  }
}

export async function signup(_prevState: SignupState, formData: FormData): Promise<SignupState> {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        username: formData.get('username') as string, 
      }
    }
  }

  const confirmPassword = formData.get('confirmPassword') as string

  if (!(data.password === confirmPassword)) {
    return {
      success: false,
      error: 'Passwords do not match',
      values: {
        username: data.options.data.username,
        email: data.email,
        password: data.password,
        confirmPassword: confirmPassword
      }
    }
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    return {
      success: false,
      error: error.message,
      values: {
        username: data.options.data.username,
        email: data.email,
        password: data.password,
        confirmPassword: confirmPassword
      }
    }
  }

  return { success: true }
}