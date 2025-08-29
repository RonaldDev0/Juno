import Link from 'next/link'

export default function ProfilePage () {
  return (
    <main className='w-full h-[90dvh] flex flex-col gap-6 justify-center items-center'>
      <p>Profile page 🎉</p>
      <Link
        href='/reset-password'
        className='inline-block text-sm underline-offset-4 hover:underline opacity-70'
      >
        reset password
      </Link>
    </main>
  )
}