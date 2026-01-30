import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Serve static files from public/static directory
app.use('/static/*', serveStatic({ root: './public' }))

// Main page
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
      <title>Flow Capital - 智能融资对接平台</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <script>
        tailwind.config = {
          theme: {
            extend: {
              colors: {
                primary: '#0F2557',
                secondary: '#1E40AF',
                accent: '#D4AF37',
                success: '#059669',
                warning: '#F59E0B',
                error: '#DC2626',
              },
              backgroundImage: {
                'gradient-finance': 'linear-gradient(135deg, #0F2557 0%, #1E40AF 50%, #2563EB 100%)',
                'gradient-gold': 'linear-gradient(135deg, #D4AF37 0%, #F59E0B 100%)',
                'gradient-card': 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
              },
              boxShadow: {
                'finance': '0 4px 20px rgba(15, 37, 87, 0.1), 0 8px 40px rgba(15, 37, 87, 0.08)',
                'finance-hover': '0 8px 30px rgba(15, 37, 87, 0.15), 0 12px 50px rgba(15, 37, 87, 0.12)',
                'gold': '0 4px 15px rgba(212, 175, 55, 0.3)',
              },
              fontFamily: {
                sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro SC', 'SF Pro Display', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
              }
            }
          }
        }
      </script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      <link href="/static/styles.css" rel="stylesheet">
    </head>
    <body class="bg-gray-50 font-sans antialiased">
      
      <!-- Mobile Container -->
      <div id="app" class="max-w-[428px] mx-auto bg-white min-h-screen relative shadow-2xl">
        <!-- Content will be loaded here -->
      </div>
      
      <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
      <script src="/static/app.js"></script>
    </body>
    </html>
  `)
})

export default app
