'use client'

import { Sidebar } from '@/components/ui/sidebar'
import { useSubscription } from '@/hooks/use-subscription'
import Header from './header'
import Content from './content'
import Footer from './footer'
import { useRouter } from 'next/navigation'

export function AppSidebar() {
  const router = useRouter()
  const { subscription, hasActiveSubscription, isLoading, error } = useSubscription()

  if (error) router.push('/')

  return (
    <Sidebar collapsible='icon'>
      <Header plan_name={subscription?.plan_name} isLoading={isLoading} />
      <Content />
      <Footer hasActiveSubscription={hasActiveSubscription} />
    </Sidebar>
  )
}