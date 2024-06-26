import { db } from '@/db'
import { messagesTable, updateMessagesSchema, type Chat, type Messages } from '@/db/schemas'
import { and, eq } from 'drizzle-orm'
import { FastifyInstance, FastifyReply, FastifyRequest, RouteShorthandOptions } from 'fastify'

type GetChatParams = {
  chatId: string
}

type GetMessagesRequest = FastifyRequest<{
  Params: GetChatParams
  Query: UserIdQuery
}>

type UserIdQuery = {
  userId: string
}

type PostMessagesRequest = FastifyRequest<{
  Params: GetChatParams
  Body: {
    userId: string
    messages: Messages
  }
}>

type StoredChat = {
  chatId: string
  messages: Messages
}

type DeleteMessagesRequest = FastifyRequest<{
  Params: GetChatParams
  Query: UserIdQuery
}>

type ChatMessagesResponse = {
  chatHistory: Messages
  message: string
}

type dbMessagesResponse = {}

const chatRoutes = async (app: FastifyInstance, opts: RouteShorthandOptions) => {
  //* HTTP GET SECTION */
  app.get('/:chatId', async (request: GetMessagesRequest, reply: FastifyReply) => {
    const { chatId } = request.params
    const { userId } = request.query as UserIdQuery

    console.log(`Received GET request for chatId: ${chatId}, userId: ${userId}`)

    try {
      const storedChatMessages = (await db
        .select()
        .from(messagesTable)
        .where(and(eq(messagesTable.chatId, chatId), eq(messagesTable.userId, userId)))) as Chat[]
      console.log(storedChatMessages)
      if (storedChatMessages.length < 1) {
        reply.send({
          chatId: chatId,
          chatHistory: [] as Messages,
          message: 'There is no chat history',
        } as ChatMessagesResponse)
        return
      }

      const chatHistory: Messages = storedChatMessages.flatMap((curr) => curr.messages)

      console.log('Successfully retrieved chat history.')

      reply.send({
        chatId: chatId,
        chatHistory,
        message: 'Successfully retrieved chat history.',
      } as ChatMessagesResponse)
    } catch (error) {
      reply.status(400).send({ error, message: 'Problem in get db operation' })
    }
  })

  //* HTTP POST SECTION */
  app.post('/:chatId', async (request: PostMessagesRequest, reply: FastifyReply) => {
    const { chatId } = request.params
    const { messages, userId } = request.body

    console.log(`Received POST request for chatId: ${chatId}`)
    console.log(`Received POST request for userId: ${userId}`)

    try {
      // Validate the incoming data
      console.log('trying to parse')
      updateMessagesSchema.parse({ chatId, messages })
      console.log('Parsing successfull')

      // Fetch existing messages
      console.log('Querying db')
      const storedChatMessages = (await db
        .select()
        .from(messagesTable)
        .where(and(eq(messagesTable.chatId, chatId), eq(messagesTable.userId, userId)))) as Chat[]

      console.log('Sucess querying:', storedChatMessages)
      const existingMessages = storedChatMessages.length > 0 ? storedChatMessages[0].messages : ([] as Messages[])

      // Append new messages to the existing ones
      const chatMessages = existingMessages.concat(messages)

      if (storedChatMessages.length > 0) {
        // Update existing entry
        console.log(`Updating chat ${chatId}`)
        await db.update(messagesTable).set({ messages: chatMessages }).where(eq(messagesTable.chatId, chatId))
        console.log('Chat Messages Successfully updated')
        reply.status(200).send({
          updatedChat: chatMessages,
          message: 'Chat Messages Successfully updated',
        })
      } else {
        // If no existing messages, create a new entry
        console.log(`Creating new chat ${chatId}`)
        await db.insert(messagesTable).values({ chatId, messages: chatMessages, userId: userId })
        console.log('Chat Messages Successfully created')
        reply.status(200).send({
          createdChat: chatMessages,
          message: 'Chat Messages Successfully created',
        })
      }
    } catch (error) {
      reply.status(400).send({ error, message: 'Problem in post db operation' })
    }
  })

  //* HTTP DELETE SECTION */
  app.delete('/:chatId', async (request: DeleteMessagesRequest, reply: FastifyReply) => {
    const { chatId } = request.params
    const { userId } = request.query as UserIdQuery

    console.log(`Received DELETE request for chatId: ${chatId}`)

    try {
      const deletedCount = await db
        .delete(messagesTable)
        .where(and(eq(messagesTable.chatId, chatId), eq(messagesTable.userId, userId)))
      console.log('Deleted messages count:', deletedCount)

      reply.status(200).send({
        message: `Successfully deleted messages for chatId: ${chatId}`,
      })
    } catch (error) {
      reply.status(400).send({ error, message: 'Problem in delete db operation' })
    }
  })
}

export default chatRoutes
