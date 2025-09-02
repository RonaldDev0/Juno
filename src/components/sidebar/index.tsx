import { Sidebar } from '@/components/ui/sidebar'
import Header from './header'
import Content from './content'
import Footer from './footer'

export function AppSidebar() {
  return (
    <Sidebar collapsible='icon'>
      <Header />
      <Content />
      <Footer />
    </Sidebar>
  )
}