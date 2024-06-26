import { db } from '@/db'
import { messagesTable, type Chat } from '@/db/schemas'
import { eq } from 'drizzle-orm'
import { FastifyInstance, FastifyReply, FastifyRequest, RouteShorthandOptions } from 'fastify'

type GetChatParams = {
  chatId: string
}

type GetChatsRequest = FastifyRequest<{
  Params: GetChatParams
  Query: UserIdQuery
}>

type UserIdQuery = {
  userId: string
}

const userRoutes = async (app: FastifyInstance, opts: RouteShorthandOptions) => {
  //* HTTP GET SECTION */
  app.get('/chats', async (request: GetChatsRequest, reply: FastifyReply) => {
    const { userId } = request.query as UserIdQuery

    console.log(`Received GET all chats request for userId: ${userId}`)

    try {
      const storedChatMessages = (await db
        .select()
        .from(messagesTable)
        .where(eq(messagesTable.userId, userId))) as Chat[]

      console.log(storedChatMessages)

      if (storedChatMessages.length < 1) {
        reply.send({
          chats: [],
          message: 'The is no previous chat',
        })
        return
      }

      const chats = storedChatMessages.map((curr) => ({
        chatId: curr.chatId,
        createdAt: curr.createdAt,
      }))

      console.log('Successfully retrieved all user chats.')

      reply.send({
        chats,
        message: 'Successfully retrieved all user chats.',
      })
    } catch (error) {
      reply.status(400).send({ error, message: 'Problem in get db operation' })
    }
  })
}

export default userRoutes
