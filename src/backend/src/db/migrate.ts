import 'dotenv/config'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { join } from 'path'
import { db, pool } from '.'

const migrationsFolder = join(__dirname, '/drizzle')

async function runMigrations() {
  console.log('[sys] Connecting to the database pool...')
  const client = await pool.connect()
  console.log('[sys] Fethed a database client.')
  console.log(`[migrator] Running migrations script...`)
  try {
    await migrate(db, { migrationsFolder })
    console.log('[migrator] All migrations have been run, exiting...')
  } catch (error) {
    console.error('[migrator] Migration failed:', error)
    throw error
  } finally {
    console.log('[sys] Releasing the client...')
    client.release()
    console.log('[sys] Attempting to close the pool...')
    await pool
      .end()
      .then(() => {
        console.log('[sys] Pool closed.')
      })
      .catch((error) => {
        console.error('[sys] Failed to close the pool:', error)
      })

    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('[sys] Timeout error: waited to long for pool to close')), 10000)
    )
  }
}

runMigrations()
  .then(() => {
    console.log('[migrator] Migrations complete!')
    process.exit(0) // Ensures the process exits successfully
  })
  .catch((error) => {
    console.error('[sys] Migration encountered an error:', error)
    process.exit(1)
  })
