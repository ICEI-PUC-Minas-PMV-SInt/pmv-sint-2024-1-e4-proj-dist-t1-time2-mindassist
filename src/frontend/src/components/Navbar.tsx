import { SignedIn, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import MobileNav from './MobileNav'

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
      <Link href="/" className="flex items-center gap-1">
        <Image src="/images/mind-assist-logo.png" width={42} height={42} alt="yoom logo" className="max-sm:size-10" />
        <span className="text-[26px] font-extrabold text-white max-sm:hidden">MindAssist</span>
      </Link>
      <div className="flex items-center justify-center gap-5">
        <SignedIn>
          <span className="navbar-clerk">
            <UserButton showName userProfileMode="modal" afterSignOutUrl="/login" />
          </span>
        </SignedIn>

        <MobileNav />
      </div>
    </nav>
  )
}

export default Navbar
