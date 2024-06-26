'use client'

import Loader from '@/components/Loader'
import { useUser } from '@clerk/nextjs'

const Meeting = ({ params }: { params: { id: string } }) => {
  const { user, isLoaded } = useUser()

  if (!isLoaded || !user) return <Loader />

  return (
    <main className="h-screen w-full">
      <h1>Anotações</h1>
      <h2>
        {user?.fullName} - ID: {user?.id}
      </h2>
    </main>
  )
}

export default Meeting
