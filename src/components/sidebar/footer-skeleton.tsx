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
      {state === 'expanded' && (
        <div className='p-1 mb-6'>
          <div className="flex items-center gap-2 p-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 flex-1" />
          </div>
        </div>
      )}
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size='lg' className='pointer-events-none'>
            {/* Avatar skeleton */}
            <Skeleton className='h-8 w-8 rounded-lg' />
            
            {/* Text content skeleton */}
            <div className='grid flex-1 text-left text-sm leading-tight gap-1'>
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
