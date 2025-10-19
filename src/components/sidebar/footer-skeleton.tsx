import { Skeleton } from '@/components/ui/skeleton'
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar
} from '@/components/ui/sidebar'

export default function FooterSkeleton() {
  const { state } = useSidebar()

  return (
    <SidebarFooter>
      {/* Match actual footer height: remove extra expanded block */}
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size='lg' className='pointer-events-none'>
            {/* Avatar skeleton */}
            <Skeleton className='h-8 w-8 rounded-lg' />
            
            {/* Text content skeleton */}
            <div className='grid flex-1 text-left text-sm leading-tight'>
              <Skeleton className='h-4 w-20' />
              <Skeleton className='h-3 w-24' />
            </div>
            
            {/* Chevron skeleton */}
            <Skeleton className='ml-auto h-4 w-4' />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}
