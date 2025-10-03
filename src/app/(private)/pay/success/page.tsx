'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSubscription } from '@/hooks/use-subscription'

export default function PaySuccessPage() {
  const router = useRouter()
  const { hasActiveSubscription, isLoading, error, refetch } = useSubscription()
  const [timedOut, setTimedOut] = useState(false)

  // Cuando la suscripción esté activa, redirigimos al dashboard
  useEffect(() => {
    if (hasActiveSubscription) {
      router.replace('/home')
    }
  }, [hasActiveSubscription, router])

  // Polling: reintenta cada 3s hasta 60s
  useEffect(() => {
    const interval = setInterval(() => {
      refetch()
    }, 3000)

    const timeout = setTimeout(() => {
      setTimedOut(true)
      clearInterval(interval)
    }, 60000) // 60s

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [refetch])

  const showProcessing = isLoading || (!hasActiveSubscription && !timedOut)

  return (
    <div className='flex min-h-[60vh] items-center justify-center p-6'>
      <div className='max-w-md text-center'>
        {showProcessing && (
          <>
            <div className='mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-muted-foreground border-t-transparent' />
            <h1 className='text-xl font-semibold'>Procesando tu pago…</h1>
            <p className='mt-2 text-sm text-muted-foreground'>
              Estamos activando tu suscripción. Esto puede tardar unos segundos.
            </p>
          </>
        )}

        {!showProcessing && hasActiveSubscription && (
          <>
            <h1 className='text-xl font-semibold'>¡Listo!</h1>
            <p className='mt-2 text-sm text-muted-foreground'>Redirigiendo a tu dashboard…</p>
          </>
        )}

        {!hasActiveSubscription && timedOut && (
          <>
            <h1 className='text-xl font-semibold'>Aún estamos esperando el webhook</h1>
            <p className='mt-2 text-sm text-muted-foreground'>
              Tu pago fue recibido, pero la confirmación tardó más de lo normal.
              Pulsa refrescar para reintentar o vuelve al inicio.
            </p>
            <div className='mt-4 flex items-center justify-center gap-2'>
              <button
                className='rounded-md bg-primary px-4 py-2 text-primary-foreground'
                onClick={() => {
                  setTimedOut(false)
                  refetch()
                }}
              >
                Refrescar estado
              </button>
              <button
                className='rounded-md border px-4 py-2'
                onClick={() => router.push('/home')}
              >
                Ir al inicio
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}