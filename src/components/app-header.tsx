'use client'

import { usePathname } from 'next/navigation'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { 
  Breadcrumb, 
  BreadcrumbList, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbSeparator, 
  BreadcrumbPage 
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'

export default function AppHeader() {
  const pathname = usePathname()
  
  // Split pathname and filter out empty strings and 'home'
  const pathSegments = pathname.split('/').filter(segment => segment !== '' && segment !== 'home')
  
  // Function to capitalize and format segment names
  const formatSegmentName = (segment: string) => {
    return segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }
  
  // Build breadcrumb path (always starting with /home)
  const buildPath = (index: number) => {
    return '/home/' + pathSegments.slice(0, index + 1).join('/')
  }

  return (
    <header className='flex h-16 shrink-0 items-center gap-2'>
      <div className='flex items-center gap-2 px-4'>
        <SidebarTrigger className='-ml-1' />
        <Separator
          orientation='vertical'
          className='mr-2 data-[orientation=vertical]:h-4'
        />
        <Breadcrumb>
          <BreadcrumbList>
            {/* Home link */}
            <BreadcrumbItem>
              <BreadcrumbLink href='/home'>
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            
            {pathSegments.length > 0 && <BreadcrumbSeparator />}
            
            {/* Dynamic breadcrumb items */}
            {pathSegments.map((segment, index) => {
              const isLast = index === pathSegments.length - 1
              const segmentName = formatSegmentName(segment)
              const segmentPath = buildPath(index)
              
              return (
                <div key={segment} className='flex items-center'>
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>{segmentName}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={segmentPath}>
                        {segmentName}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLast && <BreadcrumbSeparator />}
                </div>
              )
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  )
}