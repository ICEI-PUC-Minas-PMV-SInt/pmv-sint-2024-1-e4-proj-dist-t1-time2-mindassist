// app/actions.tsx
'use server'

import { openai } from '@ai-sdk/openai'
import { CoreMessage, streamText } from 'ai'
import { createStreamableValue } from 'ai/rsc'

export async function continueConversation(userId: string | undefined, chatId: string, messages: CoreMessage[]) {
  if (!userId) {
    throw new Error('User ID is required to continue the conversation.')
  }

  if (!chatId) {
    throw new Error('Chat ID is required to exibit the chat page')
  }

  // Log usarId and chatId for session tracking
  console.log(`Processing conversation for user: ${userId}, chat: ${chatId}`)

  const result = await streamText({
    model: openai('gpt-4-turbo'),
    messages,
  })

  const stream = createStreamableValue(result.textStream)
  return stream.value
}
