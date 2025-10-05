import { test, expect } from '@playwright/test'

test.describe('User Journey Flows', () => {
  test.describe('Guest → Free User Registration', () => {
    test('should complete guest to free user registration', async ({ page }) => {
      // Navigate to home page
      await page.goto('http://localhost:3000')
      await expect(page).toHaveTitle(/Daily Secrets/)

      // Click on sign up button
      await page.click('text=Sign Up')
      await expect(page).toHaveURL(/.*\/auth\/signup/)

      // Fill registration form
      await page.fill('input[name="name"]', 'Test User')
      await page.fill('input[name="email"]', 'test@example.com')
      await page.fill('input[name="password"]', 'password123')
      await page.fill('input[name="confirmPassword"]', 'password123')

      // Submit registration
      await page.click('button[type="submit"]')
      
      // Should redirect to profile setup
      await expect(page).toHaveURL(/.*\/onboarding/)
    })

    test('should validate registration form', async ({ page }) => {
      await page.goto('http://localhost:3000/auth/signup')

      // Try to submit empty form
      await page.click('button[type="submit"]')
      
      // Should show validation errors
      await expect(page.locator('text=Name is required')).toBeVisible()
      await expect(page.locator('text=Email is required')).toBeVisible()
      await expect(page.locator('text=Password is required')).toBeVisible()
    })

    test('should handle duplicate email registration', async ({ page }) => {
      await page.goto('http://localhost:3000/auth/signup')

      // Fill form with existing email
      await page.fill('input[name="name"]', 'Test User')
      await page.fill('input[name="email"]', 'existing@example.com')
      await page.fill('input[name="password"]', 'password123')
      await page.fill('input[name="confirmPassword"]', 'password123')

      await page.click('button[type="submit"]')
      
      // Should show error message
      await expect(page.locator('text=Email already exists')).toBeVisible()
    })
  })

  test.describe('Free → Premium Upgrade Flow', () => {
    test('should complete free to premium upgrade', async ({ page }) => {
      // Login as free user
      await page.goto('http://localhost:3000/auth/login')
      await page.fill('input[name="email"]', 'free@example.com')
      await page.fill('input[name="password"]', 'password123')
      await page.click('button[type="submit"]')

      // Navigate to premium features
      await page.goto('http://localhost:3000/premium')
      
      // Should see premium teaser
      await expect(page.locator('text=Upgrade to Premium')).toBeVisible()
      await expect(page.locator('text=Subscribe Now')).toBeVisible()

      // Click upgrade button
      await page.click('text=Subscribe Now')
      
      // Should redirect to subscription page
      await expect(page).toHaveURL(/.*\/subscription/)
    })

    test('should show premium features with blur for free users', async ({ page }) => {
      // Login as free user
      await page.goto('http://localhost:3000/auth/login')
      await page.fill('input[name="email"]', 'free@example.com')
      await page.fill('input[name="password"]', 'password123')
      await page.click('button[type="submit"]')

      // Navigate to premium astrology
      await page.goto('http://localhost:3000/premium/astrology')
      
      // Should see blurred content
      await expect(page.locator('.blur-content')).toBeVisible()
      await expect(page.locator('text=Subscribe to unlock')).toBeVisible()
    })

    test('should handle subscription payment flow', async ({ page }) => {
      // Navigate to subscription page
      await page.goto('http://localhost:3000/subscription')
      
      // Select premium plan
      await page.click('text=Premium Plan')
      
      // Fill payment form
      await page.fill('input[name="cardNumber"]', '4242424242424242')
      await page.fill('input[name="expiryDate"]', '12/25')
      await page.fill('input[name="cvv"]', '123')
      await page.fill('input[name="name"]', 'Test User')

      // Submit payment
      await page.click('button[type="submit"]')
      
      // Should redirect to success page
      await expect(page).toHaveURL(/.*\/subscription\/success/)
    })
  })

  test.describe('Premium → Admin Access', () => {
    test('should allow admin access to admin dashboard', async ({ page }) => {
      // Login as admin user
      await page.goto('http://localhost:3000/auth/login')
      await page.fill('input[name="email"]', 'admin@example.com')
      await page.fill('input[name="password"]', 'password123')
      await page.click('button[type="submit"]')

      // Navigate to admin dashboard
      await page.goto('http://localhost:3000/admin')
      
      // Should see admin controls
      await expect(page.locator('text=Admin Dashboard')).toBeVisible()
      await expect(page.locator('text=User Management')).toBeVisible()
      await expect(page.locator('text=Analytics')).toBeVisible()
    })

    test('should restrict admin access for non-admin users', async ({ page }) => {
      // Login as premium user
      await page.goto('http://localhost:3000/auth/login')
      await page.fill('input[name="email"]', 'premium@example.com')
      await page.fill('input[name="password"]', 'password123')
      await page.click('button[type="submit"]')

      // Try to access admin dashboard
      await page.goto('http://localhost:3000/admin')
      
      // Should be redirected or show access denied
      await expect(page).toHaveURL(/.*\/dashboard/)
      await expect(page.locator('text=Access Denied')).toBeVisible()
    })
  })

  test.describe('Profile Edit & Recalculation', () => {
    test('should edit profile and trigger recalculation', async ({ page }) => {
      // Login as user
      await page.goto('http://localhost:3000/auth/login')
      await page.fill('input[name="email"]', 'user@example.com')
      await page.fill('input[name="password"]', 'password123')
      await page.click('button[type="submit"]')

      // Navigate to profile edit
      await page.goto('http://localhost:3000/profile/edit')
      
      // Update birth time
      await page.fill('input[name="birthTime"]', '14:30')
      
      // Save changes
      await page.click('button[type="submit"]')
      
      // Should show recalculation message
      await expect(page.locator('text=Recalculating your chart')).toBeVisible()
      
      // Should redirect to profile page
      await expect(page).toHaveURL(/.*\/profile/)
    })

    test('should validate profile form data', async ({ page }) => {
      await page.goto('http://localhost:3000/profile/edit')

      // Try to save with invalid data
      await page.fill('input[name="birthTime"]', '25:00') // Invalid time
      await page.click('button[type="submit"]')
      
      // Should show validation error
      await expect(page.locator('text=Invalid birth time format')).toBeVisible()
    })
  })

  test.describe('Sri Lankan Chart Toggle', () => {
    test('should toggle between astrology systems', async ({ page }) => {
      // Login as premium user
      await page.goto('http://localhost:3000/auth/login')
      await page.fill('input[name="email"]', 'premium@example.com')
      await page.fill('input[name="password"]', 'password123')
      await page.click('button[type="submit"]')

      // Navigate to astrology page
      await page.goto('http://localhost:3000/premium/astrology')
      
      // Should see system toggle
      await expect(page.locator('text=Western')).toBeVisible()
      await expect(page.locator('text=Vedic')).toBeVisible()
      await expect(page.locator('text=Sri Lankan')).toBeVisible()

      // Toggle to Sri Lankan system
      await page.click('text=Sri Lankan')
      
      // Should show Sri Lankan chart
      await expect(page.locator('.sri-lankan-chart')).toBeVisible()
      await expect(page.locator('text=Rāśi Chart')).toBeVisible()
    })

    test('should show dual zodiac mode when applicable', async ({ page }) => {
      await page.goto('http://localhost:3000/premium/astrology')
      
      // Toggle between systems
      await page.click('text=Western')
      await page.click('text=Vedic')
      
      // Should show dual zodiac banner if signs differ
      await expect(page.locator('.dual-zodiac-banner')).toBeVisible()
    })
  })

  test.describe('Paywall & Subscription Flow', () => {
    test('should show paywall for free users accessing premium content', async ({ page }) => {
      // Login as free user
      await page.goto('http://localhost:3000/auth/login')
      await page.fill('input[name="email"]', 'free@example.com')
      await page.fill('input[name="password"]', 'password123')
      await page.click('button[type="submit"]')

      // Try to access premium numerology
      await page.goto('http://localhost:3000/premium/numerology')
      
      // Should see paywall
      await expect(page.locator('.paywall-modal')).toBeVisible()
      await expect(page.locator('text=Subscribe to unlock')).toBeVisible()
      await expect(page.locator('text=Premium Features')).toBeVisible()
    })

    test('should allow premium users to access all features', async ({ page }) => {
      // Login as premium user
      await page.goto('http://localhost:3000/auth/login')
      await page.fill('input[name="email"]', 'premium@example.com')
      await page.fill('input[name="password"]', 'password123')
      await page.click('button[type="submit"]')

      // Access premium numerology
      await page.goto('http://localhost:3000/premium/numerology')
      
      // Should see full content
      await expect(page.locator('.premium-content')).toBeVisible()
      await expect(page.locator('text=Advanced Numerology')).toBeVisible()
    })
  })

  test.describe('Notification System', () => {
    test('should send notifications for important events', async ({ page }) => {
      // Login as user
      await page.goto('http://localhost:3000/auth/login')
      await page.fill('input[name="email"]', 'user@example.com')
      await page.fill('input[name="password"]', 'password123')
      await page.click('button[type="submit"]')

      // Navigate to notifications
      await page.goto('http://localhost:3000/notifications')
      
      // Should see notification list
      await expect(page.locator('.notification-list')).toBeVisible()
    })

    test('should allow notification preferences management', async ({ page }) => {
      await page.goto('http://localhost:3000/settings/notifications')
      
      // Should see notification settings
      await expect(page.locator('text=Email Notifications')).toBeVisible()
      await expect(page.locator('text=Push Notifications')).toBeVisible()
      await expect(page.locator('text=Daily Insights')).toBeVisible()
    })
  })

  test.describe('Offline Fallback', () => {
    test('should work offline with cached data', async ({ page, context }) => {
      // Login and navigate to dashboard
      await page.goto('http://localhost:3000/auth/login')
      await page.fill('input[name="email"]', 'user@example.com')
      await page.fill('input[name="password"]', 'password123')
      await page.click('button[type="submit"]')

      await page.goto('http://localhost:3000/dashboard')
      
      // Go offline
      await context.setOffline(true)
      
      // Should still show cached content
      await expect(page.locator('.dashboard-content')).toBeVisible()
      await expect(page.locator('text=Offline Mode')).toBeVisible()
    })

    test('should sync data when back online', async ({ page, context }) => {
      // Start offline
      await context.setOffline(true)
      await page.goto('http://localhost:3000/dashboard')
      
      // Go back online
      await context.setOffline(false)
      
      // Should show sync message
      await expect(page.locator('text=Syncing data')).toBeVisible()
    })
  })
})

