import { env } from '@/env'
import type { Config } from 'drizzle-kit'

export default {
  driver: 'pg',
  out: './src/db/drizzle',
  schema: './src/db/schemas/*.ts',
  dbCredentials: {
    connectionString: env.DATABASE_URL,
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
  },
  // Print all statements
  verbose: true,
  // Always ask for confirmation
  strict: true,
} satisfies Config
