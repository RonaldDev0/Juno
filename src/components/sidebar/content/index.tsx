import { SidebarContent } from '@/components/ui/sidebar'
import Main from './main'
import Projects from './projects'
import Secondary from './secondary'

export default function Content() {
  return (
    <SidebarContent>
      <Main />
      <Projects />
      <Secondary />
    </SidebarContent>
  )
}