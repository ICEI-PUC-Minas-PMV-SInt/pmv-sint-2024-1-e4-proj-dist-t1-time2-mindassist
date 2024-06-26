'use client'
import dynamic from 'next/dynamic'

// Dynamically import the ChatManager component so it renders only on the client
const Messanger = dynamic(() => import('@/components/Messanger'), { ssr: false })

export default function Chat({ params }: { params: { id: string } }) {
  const chatId = params.id

  return (
    <main className="flex flex-1 max-h-fit overflow-y-clip mb-5 items-center justify-center">
      <Messanger chatId={chatId as string} />
    </main>
  )
}
