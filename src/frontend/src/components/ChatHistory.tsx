'use client'

import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { useUser } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

type Chat = {
  chatId: string
  createdAt: Date
}

type ChatsResponse = {
  chats: Chat[]
  message: string
}

const ChatHistory = () => {
  const { user } = useUser()
  const [chatsHistory, setChatsHistory] = useState<ChatsResponse | undefined>(undefined)

  const fetchChats = async (): Promise<ChatsResponse | undefined> => {
    const response = await fetch(`http://localhost:3333/api/user/chats?userId=${user?.id}`)
    if (!response.ok) {
      console.log('Error fetching users chats')
    }

    const data = await response.json()
    return data
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchChats()
      console.log(data)
      setChatsHistory(data)
    }

    fetchData() // Call the function within useEffect
  }, [user?.id]) // Trigger useEffect when user.id changes

  const pathname = usePathname()

  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col  justify-between  bg-dark-2 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]">
      <div className="flex flex-1 flex-col gap-6">
        {chatsHistory &&
          chatsHistory?.chats.map((chat) => {
            const isActive = pathname.endsWith(`chat/${chat.chatId}`)

            const route = `/chat/${chat.chatId}`

            return (
              <Link
                href={route}
                key={route}
                className={cn('flex gap-4 items-center p-4 rounded-lg justify-start', {
                  'bg-info-darker': isActive,
                  'hover:bg-info/70': !isActive,
                })}
              >
                <Image
                  src="/icons/schedule.svg"
                  className="max-lg:hidden"
                  alt={chat.createdAt.toString().slice(0, 10)}
                  width={24}
                  height={24}
                />
                <Image
                  src="/icons/schedule.svg"
                  className="hidden max-lg:flex"
                  alt={chat.createdAt.toString().slice(0, 10)}
                  width={24}
                  height={24}
                />
                <p className="text-lg font-semibold max-lg:hidden">{chat.createdAt.toString().slice(0, 10)}</p>
                <p className="text-lg font-semibold hidden max-lg:flex">{chat.createdAt.toString().slice(5, 10)}</p>
              </Link>
            )
          })}
      </div>
    </section>
  )
}

export default ChatHistory
