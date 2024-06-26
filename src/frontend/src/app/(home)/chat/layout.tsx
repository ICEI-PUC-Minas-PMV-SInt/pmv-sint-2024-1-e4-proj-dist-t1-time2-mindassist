import { ReactNode } from 'react'

import ChatHistory from '@/components/ChatHistory'

type ChatLayoutProps = {
  children: ReactNode
}

const ChatLayout = ({ children }: ChatLayoutProps) => {
  return (
    <div className="flex flex-1 absolute top-0">
      <ChatHistory />
      <div className="flex flex-1 pt-28 px-4">{children}</div>
    </div>
  )
}

export default ChatLayout
