'use client'

import Loader from '@/components/Loader'
import MeetingRoom from '@/components/MeetingRoom'
import MeetingSetup from '@/components/MeetingSetup'
import { useGetMeetingCall } from '@/hooks/useGetMeetingCall'
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'

const Meeting = ({ params }: { params: { id: string } }) => {
  const { user, isLoaded } = useUser()
  const { isCallLoading, meetingCall } = useGetMeetingCall(params.id)
  const [isSetupComplete, setIsSetupComplete] = useState(false)

  if (!isLoaded || isCallLoading) return <Loader />

  return (
    <main className="h-screen w-full">
      <StreamCall call={meetingCall}>
        <StreamTheme>
          {!isSetupComplete ? <MeetingSetup handleSetupCompletion={setIsSetupComplete} /> : <MeetingRoom />}
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default Meeting
