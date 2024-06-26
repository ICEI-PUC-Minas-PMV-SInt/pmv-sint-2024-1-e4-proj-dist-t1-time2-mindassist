import { ReactNode } from 'react'

import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'

type HomeLayoutProps = {
  children: ReactNode
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <div className="flex flex-col flex-1 flex-grow">
      <div className="flex flex-col flex-grow relative">
        <Navbar />
        <div className="flex flex-grow">
          <Sidebar />
          <section className="flex flex-col flex-1 w-full h-full">
            <div className="min-h-0 h-full">
              <section className="flex size-full overflow-y-clip flex-col gap-10 text-muted pb-6 pt-28 max-md:pb-14">
                {children}
              </section>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default HomeLayout
