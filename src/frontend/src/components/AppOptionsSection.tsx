'use client'

import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import OptionsCard from '@/components/OptionsCard'
import { default as OptionsModal } from '@/components/OptionsModal'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import ReactDatePicker from 'react-datepicker'

const AppOptionsSection = () => {
  const router = useRouter()
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: '',
    link: '',
  })
  const [callDetails, setCallDetails] = useState<Call>()
  const [meetingState, setMeetingState] = useState<
    'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
  >(undefined)

  const { user } = useUser()
  const client = useStreamVideoClient()

  const createCallMeeting = async () => {
    try {
      if (!client || !user) throw new Error('Client or user is not defined')

      if (!values.dateTime) {
        toast.error('Please select a date and time!')

        return
      }

      const callMeetingId = crypto.randomUUID()
      console.log('Generated UUID:', callMeetingId)

      const callMeeting = client.call('default', callMeetingId)
      if (!callMeeting) {
        throw new Error('Failed to create meeting call')
      }

      console.log('Call meeting initialized:', callMeeting)

      const startAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString()
      const description = values.description || 'Instant Meeting'

      console.log('About to create or get call meeting with:', startAt, description)
      try {
        await callMeeting.getOrCreate({
          data: {
            starts_at: startAt,
            custom: {
              description,
            },
          },
        })
      } catch (error) {
        console.log('Error getting or creating', error)
        throw error
      }

      setCallDetails(callMeeting)
      console.log('Call meeting details set')

      if (!values.description) {
        router.push(`/meeting/${callMeeting.id}`)
      }

      toast.success('Meeting call created!')
    } catch (error) {
      if (error instanceof Error || error instanceof TypeError) {
        console.log(error)
        toast.error(error.name, { description: error.message + (error.cause ? error.cause : '') })
      } else {
        // Handle non-Error objects being thrown
        console.log('Error not instance of error?', error, typeof error)
        toast.error('An unexpected error occurred', { description: `Error: ${JSON.stringify(error)}` })
      }
    }
  }

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <OptionsCard
        imgUrl="/icons/add-meeting.svg"
        title="Novo Chat"
        description="Inicie um novo chat"
        handleClick={() => {
          toast.success('OK')
          setMeetingState('isInstantMeeting')
        }}
        className="bg-gradient-to-tl from-orange-400 to-orange-300 via-70% via-orange-400/90"
      />
      <OptionsCard
        imgUrl="/icons/add-meeting.svg"
        title="Nova anotação"
        description="Crie uma nova anotação"
        handleClick={() => setMeetingState('isScheduleMeeting')}
        className="bg-gradient-to-tl from-red-400 to-red-300 via-70% via-red-400/90"
      />
      <OptionsCard
        imgUrl="/icons/join-meeting.svg"
        title="Compartilhe"
        description="Convide alguém para visualizar seu painel"
        handleClick={() => setMeetingState('isJoiningMeeting')}
        className="bg-gradient-to-tl from-purple-400 to-purple-300 via-70% via-purple-400/90"
      />

      {!callDetails ? (
        <OptionsModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          handleClick={createCallMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label htmlFor="schedule-meeting-description" className="text-base leading-6 text-sky-400">
              Add a description
              <Textarea
                id="schedule-meeting-description"
                className="mt-2 border-none bg-slate-600 focus-visible:ring-0 focus-visible-ring-offset-0"
                onChange={(e) => {
                  setValues((prevValues) => ({ ...prevValues, description: e.target.value }))
                }}
              />
            </label>
          </div>
          <label htmlFor="schedule-meeting-datetime" className="text-base leading-6 text-sky-400 w-full">
            Select a Date and Time
          </label>
          <div className="flex flex-col gap-2.5">
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full text-dark-1 rounded bg-dark-3 p-2 focus:outline-none"
            />
          </div>
        </OptionsModal>
      ) : (
        <OptionsModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink)
            toast.info('Link copied')
          }}
          image="/icons/checked.svg"
          buttonIconUrl="/icons/copy.svg"
          buttonText="Copy meeting link"
        >
          <h3 className="text-center">Share your meeting link!</h3>
        </OptionsModal>
      )}

      <OptionsModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        buttonText="Start Meeting"
        handleClick={createCallMeeting}
        className="text-center"
      />

      <OptionsModal
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Paste meeting link here"
        buttonText="Join Meeting"
        handleClick={() => {
          if (!values.link || values.link.length < 10) {
            return toast.error('Invalid meeting link')
          }
          router.push(values.link)
        }}
        className="text-center"
      >
        <Input
          placeholder="Meeting link"
          className="border-none bg-dark-2 focus-visible:ring-0 focus-visible:ring-offset-0 text-muted"
          onChange={(e) => {
            setValues((prevValues) => ({ ...prevValues, link: e.target.value }))
          }}
        />
      </OptionsModal>
    </section>
  )
}

export default AppOptionsSection
