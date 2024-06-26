import { openai } from '@ai-sdk/openai'
import { auth } from '@clerk/nextjs/server'
import { streamText } from 'ai'
import { NextRequest, NextResponse } from 'next/server'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

interface ChatRequest {
  chatId: string
  messages: any[]
}

// GET Handler
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const chatId = searchParams.get('chatId')

  if (!chatId) {
    return NextResponse.json({ chatHistory: [], message: 'Chat ID not provided' }, { status: 400 })
  }

  try {
    const response = await fetch(`https://localhost:3333/api/chat/${chatId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch messages')
    }

    const data = await response.json()

    return NextResponse.json({
      chatHistory: data.chatHistory || [],
      message: 'Successfully retrieved chat history.',
    })
  } catch (error) {
    console.error('Error fetching chat history:', error)
    return NextResponse.json({ chatHistory: [], message: 'Failed to fetch messages' }, { status: 500 })
  }
}

// POST Handler
export async function POST(req: NextRequest) {
  try {
    const { chatId, messages } = (await req.json()) as ChatRequest
    const { userId } = auth()

    console.log('Received chatId:', chatId)
    console.log('Received messages:', messages)

    const data = {
      messages,
      userId,
      updatedAt: new Date(),
    }

    // Save messages to the backend
    const savedMessages = await fetch(`https://localhost:3333/api/chat/${chatId}`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const savedData = await savedMessages.json()
    console.log('Messages successfully saved:', savedData)

    if (!savedMessages.ok) {
      throw new Error('Failed to save messages to the backend')
    }

    // Stream response from OpenAI
    const result = await streamText({
      model: openai('gpt-4o'),
      messages,
    })

    return NextResponse.json(await result.toAIStreamResponse())
  } catch (error) {
    console.error('Error processing POST request:', error)
    return NextResponse.json(error, { status: 500 })
  }
}
