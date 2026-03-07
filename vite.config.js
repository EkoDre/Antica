import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  Object.assign(process.env, env)

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'api-dev',
        configureServer(server) {
          server.middlewares.use('/api/contact', (req, res) => {
            let body = ''
            req.on('data', (chunk) => (body += chunk))
            req.on('end', async () => {
              try {
                req.body = JSON.parse(body || '{}')
              } catch {
                req.body = {}
              }
              res.status = (code) => {
                res.statusCode = code
                return res
              }
              res.json = (data) => {
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(data))
              }
              const { default: handler } = await import('./api/contact.js')
              handler(req, res)
            })
          })
        },
      },
    ],
  }
})
