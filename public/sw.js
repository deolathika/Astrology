// Daily Secrets App - Service Worker
// Provides offline functionality and push notifications

const CACHE_NAME = 'daily-secrets-v1'
const urlsToCache = [
  '/',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/_next/static/css/',
  '/_next/static/js/'
]

// Install event
self.addEventListener('install', (event) => {
  console.log('Service Worker: Install')
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching files')
        return cache.addAll(urlsToCache)
      })
      .catch((error) => {
        console.error('Service Worker: Cache failed', error)
      })
  )
  self.skipWaiting()
})

// Activate event
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activate')
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  self.clients.claim()
})

// Fetch event
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return
  }

  // Skip external requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          console.log('Service Worker: Serving from cache', event.request.url)
          return response
        }

        console.log('Service Worker: Fetching from network', event.request.url)
        return fetch(event.request)
          .then((response) => {
            // Don't cache if not a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response
            }

            // Clone the response
            const responseToCache = response.clone()

            // Cache the response
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache)
              })

            return response
          })
          .catch(() => {
            // Return offline page for navigation requests
            if (event.request.mode === 'navigate') {
              return caches.match('/')
            }
          })
      })
  )
})

// Push event
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push received')

  if (!event.data) {
    return
  }

  const data = event.data.json()
  const options = {
    body: data.body,
    icon: data.icon || '/icon-192.png',
    badge: data.badge || '/icon-192.png',
    image: data.image,
    tag: data.tag,
    data: data.data,
    requireInteraction: data.requireInteraction || false,
    silent: data.silent || false,
    actions: data.actions || []
  }

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  )
})

// Notification click event
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked')

  event.notification.close()

  if (event.action) {
    // Handle action clicks
    console.log('Service Worker: Action clicked', event.action)
  } else {
    // Handle notification click
    event.waitUntil(
      clients.openWindow('/')
    )
  }
})

// Background sync
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync', event.tag)

  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Sync offline data when online
      syncOfflineData()
    )
  }
})

// Sync offline data
async function syncOfflineData() {
  try {
    // Get unsynced data from IndexedDB
    const response = await fetch('/api/sync/offline-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      console.log('Service Worker: Offline data synced')
    }
  } catch (error) {
    console.error('Service Worker: Sync failed', error)
  }
}

// Message event
self.addEventListener('message', (event) => {
  console.log('Service Worker: Message received', event.data)

  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})
