import { type Message } from 'ai'

type ChatMessagesProps = {
  chatId: string
  initialMessages: Message[]
}

type ChatHistory = {
  role: 'user' | 'system' | 'assistant'
  content: string
}[]

export const dynamic = 'force-dynamic'
export const maxDuration = 30

export function ChatMessages({ chatId, initialMessages }: ChatMessagesProps) {
  // const { user, isLoaded } = useUser()
  // const [chatHistory, setChatHistory] = useState<ChatHistory | null>(null)

  // useEffect(() => {
  //   async function fetchChatHistory() {
  //     try {
  //       const response = await fetch(`http://localhost:3000/api/chat`)
  //       const data = await response.json()
  //       setChatHistory(data.chatHistory)
  //       console.log('Chat History fetched')
  //     } catch (error) {
  //       console.error('Error fetching chat history:', error)
  //     }
  //   }
  //   fetchChatHistory()
  // }, [chatId])

  // if (!isLoaded) {
  //   return <Loader /> // or any other loading indicator
  // }

  // if (!user) {
  //   return <div className="flex items-center justify-center">ID de usuário não disponível</div> // or any other loading indicator
  // }

  // function getUppercaseInitials(name: string) {
  //   return name
  //     .split(' ')
  //     .filter((name) => name) // Remove any empty strings from multiple spaces
  //     .map((letter) => letter.charAt(0).toUpperCase())
  //     .join('')
  // }

  // const initials = user?.fullName ? getUppercaseInitials(user.fullName) : 'YOU'
  console.log("I'm being used somewhere")
  return (
    <>
      <p>I'm not being used</p>
      {/* {(!chatHistory || chatHistory.length === 0) && initialMessages.length === 0 && <JoshInvitation />}
      {chatHistory &&
        chatHistory.map((m, i) => (
          <div key={i} className="flex gap-3 text-sm whitespace-pre-wrap">
            <Avatar className="border-2 border-slate-800">
              <AvatarFallback>{m.role === 'user' ? initials : 'JOSH'}</AvatarFallback>
              <AvatarImage src={m.role === 'user' ? user?.imageUrl : '/images/josh.png'} />
            </Avatar>
            <p className="leading-snug">
              <span className="block font-bold pb-1">{m.role === 'user' ? user!.firstName : 'Josh'}:</span>
              {m.content}
            </p>
          </div>
        ))}
      {!chatHistory &&
        initialMessages.map((m, i) => (
          <div key={i} className="flex gap-3 text-sm whitespace-pre-wrap">
            <Avatar className="border-2 border-slate-800">
              <AvatarFallback>{m.role === 'user' ? initials : 'JOSH'}</AvatarFallback>
              <AvatarImage src={m.role === 'user' ? user?.imageUrl : '/images/josh.png'} />
            </Avatar>
            <p className="leading-snug">
              <span className="block font-bold pb-1">{m.role === 'user' ? user!.firstName : 'Josh'}:</span>
              {m.content}
            </p>
          </div>
        ))} */}
    </>
  )
}
