'use client'

import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTrigger } from '@/components/ui/drawer'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import { SignedIn, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from './ui/button'

const MobileNav = () => {
  const pathname = usePathname()

  return (
    <section className="w-full flex">
      <Drawer direction="left">
        <DrawerTrigger asChild>
          <Image
            src="/icons/hamburger.svg"
            width={36}
            height={36}
            alt="hamburger icon"
            className="cursor-pointer sm:hidden"
          />
        </DrawerTrigger>
        <DrawerContent className="border-muted-foreground/25 border-0 border-r-2 bg-dark-1 w-full max-w-[264px]">
          <DrawerHeader>
            <Link href="/" className="flex items-center justify-start gap-2">
              <Image src="/images/mind-assist-logo.png" width={42} height={42} alt="Mind Assist Logo" />
              <span className="text-[26px] font-extrabold text-white">MindAssist</span>
            </Link>
          </DrawerHeader>
          <div className="flex h-full flex-col justify-between overflow-y-auto px-2">
            <section className=" flex h-full flex-col gap-4 pt-6 text-white">
              {sidebarLinks.map((item) => {
                const isActive = pathname === item.route

                return (
                  <DrawerClose asChild key={item.route}>
                    <Link
                      href={item.route}
                      key={item.label}
                      className={cn('flex gap-4 items-center p-4 rounded-lg w-full max-w-52', {
                        'bg-info-darker': isActive,
                      })}
                    >
                      <Image src={item.imgUrl} alt={item.label} width={20} height={20} />
                      <p className="font-semibold">{item.label}</p>
                    </Link>
                  </DrawerClose>
                )
              })}
            </section>
          </div>
          <DrawerFooter>
            <div className="self-center p-4">
              <SignedIn>
                <div className="mobile-navbar-clerk">
                  <UserButton showName />
                </div>
              </SignedIn>
            </div>
            <DrawerClose>
              <Button variant="default" size="default" className="w-full">
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </section>
  )
}

export default MobileNav
