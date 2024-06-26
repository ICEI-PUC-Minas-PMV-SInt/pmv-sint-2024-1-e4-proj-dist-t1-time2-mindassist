import { FastifyInstance, FastifyReply } from 'fastify'
import chatRoutes from './chat.routes'
import userRoutes from './user.routes'

const routes = async (app: FastifyInstance) => {
  app.register(chatRoutes, { prefix: '/chat' })
  app.register(userRoutes, { prefix: '/user' })

  app.get('/healthCheck', async (_, reply: FastifyReply) => {
    try {
      return reply.status(200).send({
        health: 'ok',
        success: true,
      })
    } catch (err) {
      return reply.status(500).send({
        health: 'bad',
        success: false,
        error: err,
      })
    }
  })
}

export default routes
