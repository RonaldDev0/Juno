'use client'

import { Sidebar } from '@/components/ui/sidebar'
import { useEffect } from 'react'
import { useSubscriptionStore, selectSubscription, selectLoading, selectError } from '@/store/subscription'
import Header from './header'
import Content from './content'
import Footer from './footer'
import { useRouter } from 'next/navigation'

export function AppSidebar() {
  const router = useRouter()
  const subscription = useSubscriptionStore(selectSubscription)
  const isLoading = useSubscriptionStore(selectLoading)
  const error = useSubscriptionStore(selectError)

  useEffect(() => {
    // Inicializa la suscripción global una sola vez
    useSubscriptionStore.getState().init()
  }, [])

  if (error) router.push('/')

  return (
    <Sidebar collapsible='icon'>
      <Header plan_name={subscription?.plan_name} isLoading={isLoading} />
      <Content />
      <Footer />
    </Sidebar>
  )
}