import { jsonb, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import z from 'zod'

export const messagesTable = pgTable('messages', {
  id: uuid('id').defaultRandom().primaryKey(),
  chatId: uuid('chat_id').notNull(),
  messages: jsonb('messages').notNull(),
  userId: varchar('user_id').notNull(),
  createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date', withTimezone: true }).notNull().defaultNow(),
})

// Zod Schemas
export const messageSchema = z.object({
  role: z.enum(['system', 'user', 'assistant']),
  content: z.string(),
})

export const messagesSchema = z.array(messageSchema)

export const updateMessagesSchema = z.object({
  chatId: z.string().uuid(),
  messages: messagesSchema,
  updatedAt: z.date().default(new Date()),
})

export const chatSchema = z.object({
  id: z.string().uuid(),
  chatId: z.string().uuid(),
  messages: messagesSchema,
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().default(new Date()),
})

// Infer the TypeScript type from the Zod schema
export type Messages = z.output<typeof messagesSchema>
export type Chat = z.infer<typeof chatSchema>
export type UpdateMessagesRequest = z.infer<typeof updateMessagesSchema>
