'use client'

import type { ReactNode } from 'react'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/sidebar'
import AppHeader from '@/components/app-header'
import { useEffect } from 'react'
import { useSubscriptionStore } from '@/store/subscription'

export default function PrivateLayout({ children }: Readonly<{ children: ReactNode }>) {
  useEffect(() => {
    useSubscriptionStore.getState().bindAuthListener()
    useSubscriptionStore.getState().init()
  }, [])
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
