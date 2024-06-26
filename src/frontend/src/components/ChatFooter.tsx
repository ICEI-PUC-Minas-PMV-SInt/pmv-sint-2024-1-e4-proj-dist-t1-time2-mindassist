'use client'

import { useChat } from 'ai/react'
import { useState } from 'react'
import { Button } from './ui/button'
import { CardFooter } from './ui/card'
import { Input } from './ui/input'

function ChatFooter() {
  const { input, handleInputChange, handleSubmit } = useChat()
  const [loading, setLoading] = useState(false)

  return (
    <CardFooter>
      <form onSubmit={handleSubmit} className="flex w-full">
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
  )
}

export default ChatFooter
