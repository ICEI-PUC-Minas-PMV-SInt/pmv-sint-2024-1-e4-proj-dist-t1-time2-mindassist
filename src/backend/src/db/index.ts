import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

import * as schema from '@/db/schemas'
import { env } from '@/env'

const pool = new Pool({ connectionString: env.DATABASE_URL })

// Initialize db using the pool and export it
export const db: NodePgDatabase<typeof schema> = drizzle(pool, { schema, logger: true })
// Export the pool if direct pool management is needed elsewhere
export { pool }
