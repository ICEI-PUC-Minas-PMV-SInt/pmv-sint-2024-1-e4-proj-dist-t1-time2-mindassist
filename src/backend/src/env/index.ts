import 'dotenv/config'
import { z, ZodError } from 'zod'

// Regex to validate IPv4 addresses, ensuring correct IP format.
const ipv4Regex = /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)\.){3}(1?\d?\d|25[0-5]|2[0-4]\d)$/

const IPAddress = z.string().regex(ipv4Regex, {
  message: 'Invalid IP address format',
})

// Server configuration schema
const nodeServerEnv = z.object({
  NODE_ENV: z.enum(['test', 'development', 'production']).default('development'),
  SERVER_PORT: z.preprocess((port) => parseInt(String(port), 10), z.number().default(3333)),
})

// Database configuration schema with enhanced DATABASE_URL validation
const databaseConfigEnv = z.object({
  DB_HOST: IPAddress,
  DB_PORT: z.preprocess((port) => parseInt(String(port), 10), z.number().default(5432)),
  DB_USERNAME: z.string().min(1, 'Must have the DB_USERNAME variable set'),
  DB_PASSWORD: z.string().min(1, 'Must have the DB_PASSWORD variable set'),
  DB_NAME: z.string().min(1, 'Must have the DB_NAME variable set'),
  DB_SCHEMA: z.union([z.literal('public'), z.string()]).default('public'),
  DATABASE_URL: z
    .string()
    .url({ message: 'Must be a valid URL' })
    .optional()
    .transform((url) => {
      if (!url) return url // Return if URL is not provided
      const urlObject = new URL(url)
      const schemaParam = urlObject.searchParams.get('schema')
      if (!schemaParam) {
        console.warn("It's encouraged to set a DB_SCHEMA in DATABASE_URL")
        urlObject.searchParams.set('schema', 'public') // Set default schema if missing
      }
      return urlObject.toString() // Return the modified or unmodified URL as a string
    }),
})

// Merging server and database configuration schemas into a global environment schema
const globalEnvSchema = nodeServerEnv.merge(databaseConfigEnv)

// Parsing and validating environment variables
const _env = globalEnvSchema.safeParse(process.env)

// Detailed error handling if the environment variables do not meet the schema requirements
if (!_env.success) {
  console.error('❌ Unable to treat some invalid ENV variables:', _env.error.format())
  throw new ZodError(_env.error.issues) // Throwing ZodError for uniform error handling across the app
}

// Exporting the parsed and validated configuration
const parsedEnv = _env.data

const DATABASE_URL =
  `postgresql://${parsedEnv.DB_USERNAME}:${parsedEnv.DB_PASSWORD}@${parsedEnv.DB_HOST}:${parsedEnv.DB_PORT}/${parsedEnv.DB_NAME}?schema=${parsedEnv.DB_SCHEMA}` as const

const env = {
  ...parsedEnv,
  DATABASE_URL,
}
export { env }
