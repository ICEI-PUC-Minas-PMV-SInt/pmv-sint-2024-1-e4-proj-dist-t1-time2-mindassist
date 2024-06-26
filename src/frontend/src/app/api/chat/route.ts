// import { createOpenAI } from '@ai-sdk/openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'
// import { generateText } from 'ai'
// import OpenAI from 'openai'
import { NextRequest, NextResponse } from 'next/server'
import { Configuration, OpenAIApi } from 'openai-edge'

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(config)

export const runtime = 'edge'

type saveMassageProps = {
  messages: any[]
  userId: string
  chatId: string
}
const saveMessages = async ({ messages, chatId, userId }: saveMassageProps) => {
  const pureMessages = messages.map((m) => {
    return {
      role: m.role,
      content: m.content,
    }
  })

  try {
    console.log('Saving to backend...')
    const response = await fetch(`http://localhost:3333/api/chat/${chatId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages: pureMessages, userId }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const result = await response.json()
    console.log('Response message:', result.message) // Logging the success message from the server
    console.log('Messages saved:', result.updatedChat) // Logging the array of messages
  } catch (error) {
    console.error('Failed to save messages:', error)
  }
}

// POST Handler
export async function POST(req: NextRequest) {
  const { messages, userId, chatId } = await req.json()

  console.log('messages: ', messages)
  console.log('userId: ', userId)
  console.log('chatId: ', chatId)

  if (!userId) {
    console.log('No user ID found')
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 })
  }

  const systemPrompt = `You are a Counselor and a Mental Health Professional with deep knowledge of Psychology and Psychiatry.
    You answer with a mixture of casual and professional approach, accordingly with best empathic outcome.
    You review your answers and make them concise with the golden nuggets of your text so that the user has easy time reading you answer.
    You only speak in Brazilian Portuguese and you never mention that you are a mental health professional, you only assist with your knowledge.`

  const response = await openai.createChatCompletion({
    model: 'gpt-4-1106-preview',
    messages: [
      {
        role: 'system',
        content: systemPrompt,
      },
      ...messages,
    ],
    stream: true,
    temperature: 1,
    user: userId,
  })

  saveMessages({ chatId, messages, userId })

  const stream = OpenAIStream(response)

  return new StreamingTextResponse(stream)
}
