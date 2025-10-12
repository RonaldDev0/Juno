'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSubscriptionStore, selectHasActiveSubscription, selectLoading } from '@/store/subscription'

export default function PaySuccessPage() {
  const router = useRouter()
  const hasActiveSubscription = useSubscriptionStore(selectHasActiveSubscription)
  const isLoading = useSubscriptionStore(selectLoading)
  const [timedOut, setTimedOut] = useState(false)

  // When the subscription is active, redirect to the dashboard
  useEffect(() => {
    if (hasActiveSubscription) {
      router.replace('/home')
    }
  }, [hasActiveSubscription, router])

  // Polling: refetch every 3s up to 60s
  useEffect(() => {
    const interval = setInterval(() => {
      // Refresca la suscripción desde el store global
      useSubscriptionStore.getState().fetch()
    }, 3000)

    const timeout = setTimeout(() => {
      setTimedOut(true)
      clearInterval(interval)
    }, 60000) // 60s

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])

  const showProcessing = isLoading || (!hasActiveSubscription && !timedOut)

  return (
    <div className='flex min-h-[95dvh] items-center justify-center p-6'>
      <div className='max-w-md text-center'>
        {showProcessing && (
          <>
            <div className='mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent' />
            <h1 className='text-xl font-semibold text-primary'>Procesando tu pago…</h1>
            <p className='mt-2 text-sm text-muted-foreground'>
              Estamos activando tu suscripción. Esto puede tardar unos segundos.
            </p>
          </>
        )}

        {!showProcessing && hasActiveSubscription && (
          <>
            <h1 className='text-xl font-semibold text-primary'>¡Listo!</h1>
            <p className='mt-2 text-sm text-muted-foreground'>Redirigiendo a tu dashboard…</p>
          </>
        )}

        {!hasActiveSubscription && timedOut && (
          <>
            <h1 className='text-xl font-semibold text-primary'>Aún estamos esperando el webhook</h1>
            <p className='mt-2 text-sm text-muted-foreground'>
              Tu pago fue recibido, pero la confirmación tardó más de lo normal.
              Pulsa refrescar para reintentar o vuelve al inicio.
            </p>
            <div className='mt-4 flex items-center justify-center gap-2'>
              <button
                className='rounded-md bg-primary px-4 py-2 text-primary-foreground'
                onClick={() => {
                  setTimedOut(false)
                  useSubscriptionStore.getState().fetch()
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