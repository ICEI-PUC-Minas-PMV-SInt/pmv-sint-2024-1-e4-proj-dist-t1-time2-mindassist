'use client'
import { tokenProvider } from '@/actions/stream.actions'
import Loader from '@/components/Loader'
import { useUser } from '@clerk/nextjs'
import { StreamVideo, StreamVideoClient, User } from '@stream-io/video-react-sdk'
import { ReactNode, useEffect, useState } from 'react'

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY

type StreamVideoProviderProps = {
  children: ReactNode
}

const StreamVideoProvider = ({ children }: StreamVideoProviderProps) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>()
  const { user: clerkUser, isLoaded } = useUser()

  useEffect(() => {
    if (!isLoaded || !clerkUser) return

    if (!apiKey) throw new Error('Stream Server API Key Missing')

    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: clerkUser.id,
        image: clerkUser.imageUrl,
        name: clerkUser.fullName || clerkUser.primaryEmailAddress?.emailAddress,
      },
      tokenProvider,
    })

    setVideoClient(client)
  }, [clerkUser, isLoaded])

  if (!videoClient) return <Loader />

  return <StreamVideo client={videoClient}>{children}</StreamVideo>
}

export default StreamVideoProvider
