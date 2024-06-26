// tsup.config.ts
import 'dotenv/config' // Ensure environment variables are loaded
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/server.ts'], // Your main server entry file
  outDir: 'dist', // Output directory
  splitting: false, // Code splitting is not needed for Node.js
  sourcemap: true, // Enable source map for better debugging
  clean: true, // Clean the output directory before building
  format: ['cjs'], // CommonJS format suitable for Node.js
  target: 'node20', // Target specific Node.js version, match your production environment
  watch: process.env.WATCH === 'true', // Watch mode can be toggled with an environment variable
  treeshake: true, // Remove unused code
  minify: process.env.NODE_ENV === 'production', // Minify code in production
  bundle: true, // Bundle all dependencies into the output files
  dts: true, // Generate .d.ts files
})
