import type { ReactNode } from 'react'
import { cookies } from 'next/headers'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/sidebar'
import AppHeader from '@/components/app-header'

export default async function PrivateLayout({ children }: Readonly<{ children: ReactNode }>) {
  const cookieStore = await cookies()
  const persisted = cookieStore.get('sidebar_state')?.value
  const defaultOpen = persisted ? persisted === 'true' : true

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
