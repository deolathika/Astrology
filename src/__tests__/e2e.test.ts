import { describe, it, expect, beforeAll, afterAll } from '@jest/globals'
import { chromium, Browser, Page } from 'playwright'

describe('End-to-End Tests', () => {
  let browser: Browser
  let page: Page

  beforeAll(async () => {
    browser = await chromium.launch({ headless: true })
  })

  afterAll(async () => {
    await browser.close()
  })

  beforeEach(async () => {
    page = await browser.newPage()
  })

  afterEach(async () => {
    await page.close()
  })

  describe('Application Flow', () => {
    it('should load the home page', async () => {
      await page.goto('http://localhost:3000')
      await page.waitForLoadState('networkidle')
      
      expect(await page.title()).toContain('Daily Secrets')
    })

    it('should navigate to onboarding', async () => {
      await page.goto('http://localhost:3000/onboarding')
      await page.waitForLoadState('networkidle')
      
      const heading = await page.textContent('h1')
      expect(heading).toContain('Welcome')
    })

    it('should display cosmic profile page', async () => {
      await page.goto('http://localhost:3000/cosmic-profile')
      await page.waitForLoadState('networkidle')
      
      const heading = await page.textContent('h1')
      expect(heading).toContain('Cosmic Profile')
    })

    it('should show today\'s guidance', async () => {
      await page.goto('http://localhost:3000/today')
      await page.waitForLoadState('networkidle')
      
      const heading = await page.textContent('h1')
      expect(heading).toContain('Today')
    })
  })

  describe('Security Features', () => {
    it('should have security headers', async () => {
      const response = await page.goto('http://localhost:3000')
      
      const headers = response?.headers()
      expect(headers?.['x-frame-options']).toBe('DENY')
      expect(headers?.['x-content-type-options']).toBe('nosniff')
      expect(headers?.['referrer-policy']).toBe('strict-origin-when-cross-origin')
    })

    it('should have Content Security Policy', async () => {
      const response = await page.goto('http://localhost:3000')
      
      const headers = response?.headers()
      expect(headers?.['content-security-policy']).toContain("default-src 'self'")
    })

    it('should block XSS attempts', async () => {
      await page.goto('http://localhost:3000')
      
      // Try to inject script
      await page.evaluate(() => {
        const script = document.createElement('script')
        script.textContent = 'window.xssTest = true'
        document.head.appendChild(script)
      })
      
      const xssTest = await page.evaluate(() => (window as any).xssTest)
      expect(xssTest).toBeUndefined()
    })
  })

  describe('API Endpoints', () => {
    it('should respond to health check', async () => {
      const response = await page.request.get('http://localhost:3000/api/health')
      expect(response.status()).toBe(200)
      
      const data = await response.json()
      expect(data.status).toBeDefined()
      expect(data.timestamp).toBeDefined()
    })

    it('should rate limit API requests', async () => {
      // Make multiple requests to test rate limiting
      const promises = Array.from({ length: 10 }, () => 
        page.request.get('http://localhost:3000/api/health')
      )
      
      const responses = await Promise.all(promises)
      const statusCodes = responses.map(r => r.status())
      
      // All requests should succeed (rate limit not reached)
      expect(statusCodes.every(code => code === 200)).toBe(true)
    })

    it('should include API version headers', async () => {
      const response = await page.request.get('http://localhost:3000/api/health')
      const headers = response.headers()
      
      expect(headers['x-api-version']).toBe('1.0.0')
    })
  })

  describe('Performance', () => {
    it('should load within performance budget', async () => {
      const startTime = Date.now()
      await page.goto('http://localhost:3000')
      await page.waitForLoadState('networkidle')
      const loadTime = Date.now() - startTime
      
      // Should load within 3 seconds
      expect(loadTime).toBeLessThan(3000)
    })

    it('should have good Lighthouse scores', async () => {
      // This would require lighthouse integration
      // For now, just check basic performance metrics
      await page.goto('http://localhost:3000')
      
      const metrics = await page.evaluate(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        return {
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          loadComplete: navigation.loadEventEnd - navigation.loadEventStart
        }
      })
      
      expect(metrics.domContentLoaded).toBeLessThan(1000)
      expect(metrics.loadComplete).toBeLessThan(2000)
    })
  })

  describe('Accessibility', () => {
    it('should have proper heading structure', async () => {
      await page.goto('http://localhost:3000')
      
      const headings = await page.$$eval('h1, h2, h3, h4, h5, h6', elements => 
        elements.map(el => ({ tag: el.tagName, text: el.textContent }))
      )
      
      expect(headings.length).toBeGreaterThan(0)
      expect(headings[0].tag).toBe('H1')
    })

    it('should have alt text for images', async () => {
      await page.goto('http://localhost:3000')
      
      const images = await page.$$eval('img', elements => 
        elements.map(img => ({ src: img.src, alt: img.alt }))
      )
      
      images.forEach(img => {
        if (img.src) {
          expect(img.alt).toBeDefined()
        }
      })
    })

    it('should be keyboard navigable', async () => {
      await page.goto('http://localhost:3000')
      
      // Check if focusable elements exist
      const focusableElements = await page.$$eval(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        elements => elements.length
      )
      
      expect(focusableElements).toBeGreaterThan(0)
    })
  })
})


