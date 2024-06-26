'use client'
import { useUser } from '@clerk/nextjs'
import { useChat } from 'ai/react'
import { useEffect, useRef, useState } from 'react'
import JoshInvitation from './JoshInvitation'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'

type MessangerProps = {
  chatId: string
}

const Messanger = ({ chatId }: MessangerProps) => {
  const { user } = useUser()
  const { messages, input, handleInputChange, handleSubmit, setMessages } = useChat({
    api: '/api/chat',
    id: chatId,
  })

  const [loading, setLoading] = useState(false)

  function getUppercaseInitials(name: string) {
    return name
      .split(' ')
      .filter((name) => name) // Remove any empty strings from multiple spaces
      .map((letter) => letter.charAt(0).toUpperCase())
      .join('')
  }

  const initials = user?.fullName ? getUppercaseInitials(user.fullName) : 'YOU'

  const renderMessages = () => {
    return messages.map((m, i) => (
      <div key={i} className="flex flex-1 gap-3 text-sm whitespace-pre-wrap">
        <Avatar className="border-2 border-slate-800">
          <AvatarFallback>{m.role === 'user' ? initials : 'JOSH'}</AvatarFallback>
          <AvatarImage src={m.role === 'user' ? user?.imageUrl : '/images/josh.png'} />
        </Avatar>
        <p className="leading-snug">
          <span className="block font-bold pb-1">{m.role === 'user' ? user!.firstName : 'Josh'}:</span>
          {m.content}
        </p>
      </div>
    ))
  }

  const chatContainer = useRef<HTMLDivElement>(null)

  const scrollChat = () => {
    const { offsetHeight, scrollHeight, scrollTop } = chatContainer.current as HTMLDivElement
    if (scrollHeight >= scrollTop + offsetHeight) {
      chatContainer.current?.scrollTo(0, scrollHeight + 200)
    }
  }

  const fetchMessages = async () => {
    try {
      console.log('Attempting to fetch messages')
      const response = await fetch(`http://localhost:3333/api/chat/${chatId}?userId=${user?.id}`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      console.log('Fetched message:', result.message)
      console.log('Fetched Chat History:', result.chatHistory)
      setMessages(result.chatHistory)
    } catch (error) {
      console.error('Failed to save messages:', error)
    }
  }

  useEffect(() => {
    scrollChat()
  }, [messages])

  useEffect(() => {
    if (!user) return
    fetchMessages()
  }, [user])

  return (
    <div className="max-w-[720px] flex flex-1 h-full">
      <Card className="flex flex-col flex-1 h-full max-h-[calc(100vh-130px)] bg-slate-600 border-none shadow-2xl shadow-black">
        <section>
          <CardHeader className="bg-slate-700 rounded-t-lg mb-5">
            <CardTitle>MindAssist | Conselheiro Josh</CardTitle>
            <CardDescription className="text-slate-200">
              Um verdadeiro parceiro para ajudar a pensar no seu futuro, problemas e soluções
            </CardDescription>
          </CardHeader>
        </section>
        <section className="flex flex-col h-full flex-1 p-2 overflow-hidden">
          <CardContent
            ref={chatContainer}
            className="space-y-4 items-start h-full overflow-y-scroll flex-1"
            style={{ minHeight: '100%' }}
          >
            {messages.length < 1 && <JoshInvitation />}
            {messages.length >= 1 && renderMessages()}
          </CardContent>
        </section>
        <section>
          {user && (
            <CardFooter>
              <form
                onSubmit={(e) => handleSubmit(e, { options: { body: { userId: user.id, chatId } } })}
                className="flex w-full"
              >
                <Input
                  className="focus-visible:outline-none focus-visible:ring-[ring-0] focus-visible:ring-0 rounded-l-lg rounded-r-none placeholder:text-slate-600 placeholder:font-semibold font-semibold flex-grow"
                  placeholder="Como posso te ajudar?"
                  value={input}
                  onChange={handleInputChange}
                  disabled={loading}
                />
                <Button
                  type="submit"
                  className="rounded-none rounded-l-none rounded-r-lg bg-green-600 text-gray-300 hover:bg-green-700 hover:text-gray-200"
                  disabled={loading}
                >
                  {loading ? 'Enviando...' : 'Enviar'}
                </Button>
              </form>
            </CardFooter>
          )}
        </section>
      </Card>
    </div>
  )
}

export default Messanger
