/**
 * Service Worker for PWA functionality
 * Handles caching, offline support, and push notifications
 */

const CACHE_NAME = 'daily-secrets-v1'
const STATIC_CACHE_NAME = 'daily-secrets-static-v1'
const DYNAMIC_CACHE_NAME = 'daily-secrets-dynamic-v1'

const STATIC_ASSETS = [
  '/',
  '/zodiac',
  '/numerology',
  '/dreams',
  '/community',
  '/premium',
  '/profile',
  '/manifest.json',
  '/favicon.ico',
  '/apple-touch-icon.png',
  '/favicon-32x32.png',
  '/favicon-16x16.png'
]

const API_ENDPOINTS = [
  '/api/health',
  '/api/guest/insights',
  '/api/public/astrology',
  '/api/public/numerology',
  '/api/public/dreams'
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...')
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching static assets')
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => {
        console.log('Service Worker: Static assets cached')
        return self.skipWaiting()
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...')
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
              console.log('Service Worker: Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        console.log('Service Worker: Activated')
        return self.clients.claim()
      })
  )
})

// Fetch event - handle requests with caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }

  // Skip external requests
  if (url.origin !== location.origin) {
    return
  }

  event.respondWith(
    handleRequest(request)
  )
})

async function handleRequest(request: Request): Promise<Response> {
  const url = new URL(request.url)
  
  // Static assets - cache first
  if (isStaticAsset(url.pathname)) {
    return cacheFirst(request, STATIC_CACHE_NAME)
  }
  
  // API endpoints - network first with cache fallback
  if (isApiEndpoint(url.pathname)) {
    return networkFirst(request, DYNAMIC_CACHE_NAME)
  }
  
  // Pages - network first with cache fallback
  if (isPageRequest(request)) {
    return networkFirst(request, DYNAMIC_CACHE_NAME)
  }
  
  // Default - network first
  return networkFirst(request, DYNAMIC_CACHE_NAME)
}

function isStaticAsset(pathname: string): boolean {
  return pathname.includes('/_next/static/') || 
         pathname.includes('/favicon') ||
         pathname.includes('/manifest') ||
         pathname.includes('/apple-touch-icon')
}

function isApiEndpoint(pathname: string): boolean {
  return pathname.startsWith('/api/')
}

function isPageRequest(request: Request): boolean {
  return request.headers.get('accept')?.includes('text/html') || false
}

async function cacheFirst(request: Request, cacheName: string): Promise<Response> {
  const cachedResponse = await caches.match(request)
  
  if (cachedResponse) {
    return cachedResponse
  }
  
  const networkResponse = await fetch(request)
  
  if (networkResponse.ok) {
    const cache = await caches.open(cacheName)
    cache.put(request, networkResponse.clone())
  }
  
  return networkResponse
}

async function networkFirst(request: Request, cacheName: string): Promise<Response> {
  try {
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    console.log('Network failed, trying cache:', error)
    
    const cachedResponse = await caches.match(request)
    
    if (cachedResponse) {
      return cachedResponse
    }
    
    // Return offline page for navigation requests
    if (request.headers.get('accept')?.includes('text/html')) {
      return new Response(
        `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Offline - Daily Secrets</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
              body { 
                font-family: system-ui, sans-serif; 
                text-align: center; 
                padding: 2rem;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0;
              }
              .container {
                max-width: 400px;
                padding: 2rem;
                background: rgba(255,255,255,0.1);
                border-radius: 1rem;
                backdrop-filter: blur(10px);
              }
              h1 { margin-bottom: 1rem; }
              p { margin-bottom: 2rem; opacity: 0.9; }
              button {
                background: rgba(255,255,255,0.2);
                border: 1px solid rgba(255,255,255,0.3);
                color: white;
                padding: 0.75rem 1.5rem;
                border-radius: 0.5rem;
                cursor: pointer;
                font-size: 1rem;
              }
              button:hover {
                background: rgba(255,255,255,0.3);
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>🌌 You're Offline</h1>
              <p>Don't worry, your cosmic journey continues even without internet!</p>
              <button onclick="window.location.reload()">Try Again</button>
            </div>
          </body>
        </html>
        `,
        {
          headers: { 'Content-Type': 'text/html' }
        }
      )
    }
    
    throw error
  }
}

// Push notification handling
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push received')
  
  const options = {
    body: event.data?.text() || 'New cosmic insights await you!',
    icon: '/favicon-32x32.png',
    badge: '/favicon-16x16.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore Now',
        icon: '/favicon-32x32.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/favicon-32x32.png'
      }
    ]
  }
  
  event.waitUntil(
    self.registration.showNotification('Daily Secrets', options)
  )
})

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked')
  
  event.notification.close()
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    )
  }
})

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync')
  
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Handle offline actions when connection is restored
      handleBackgroundSync()
    )
  }
})

async function handleBackgroundSync() {
  // Implement background sync logic here
  // For example, sync offline form submissions, cached API calls, etc.
  console.log('Handling background sync...')
}
