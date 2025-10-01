# Testing Environment Setup - Daily Secrets App

## Environment Configuration

### Development Environment
- **URL**: `http://localhost:8120`
- **Database**: Local PostgreSQL
- **Environment**: Development
- **Features**: Hot reload, debug mode, mock data

### Staging Environment
- **URL**: `https://staging.dailysecrets.app`
- **Database**: Staging PostgreSQL
- **Environment**: Staging
- **Features**: Production-like setup, real APIs, testing data

### Production Environment
- **URL**: `https://dailysecrets.app`
- **Database**: Production PostgreSQL
- **Environment**: Production
- **Features**: Full production setup, real APIs, live data

## Testing Strategy

### 1. Unit Tests
```bash
# Run unit tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm run test -- --testPathPattern=profile
```

### 2. Integration Tests
```bash
# Run integration tests
npm run test:integration

# Test API endpoints
npm run test:api

# Test database operations
npm run test:db
```

### 3. End-to-End Tests
```bash
# Run E2E tests
npm run test:e2e

# Run E2E tests in headless mode
npm run test:e2e:headless

# Run E2E tests on specific browser
npm run test:e2e:chrome
```

### 4. Performance Tests
```bash
# Run performance tests
npm run test:performance

# Run Lighthouse audit
npm run test:lighthouse

# Run load tests
npm run test:load
```

## Test Configuration

### Jest Configuration
```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.ts'],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.test.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{test,spec}.{js,jsx,ts,tsx}'
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/__tests__/**',
    '!src/**/node_modules/**'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
}
```

### Playwright Configuration
```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/__tests__/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:8120',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:8120',
    reuseExistingServer: !process.env.CI,
  },
});
```

## Test Data Setup

### Mock Data
```typescript
// src/__tests__/fixtures/mock-data.ts
export const mockUser = {
  id: 'test-user-123',
  name: 'Test User',
  email: 'test@example.com',
  birthDate: '1990-01-15',
  birthTime: '14:30',
  birthPlace: {
    country: 'US',
    city: 'New York',
    coordinates: { latitude: 40.7128, longitude: -74.0060 },
    timezone: 'America/New_York'
  }
};

export const mockAstrologyData = {
  zodiacSign: 'Capricorn',
  planetaryPositions: [
    { name: 'Sun', longitude: 285.5, latitude: 0, distance: 1 },
    { name: 'Moon', longitude: 45.2, latitude: 2.1, distance: 0.0025 }
  ],
  houseCusps: [
    { house: 1, longitude: 285.5 },
    { house: 2, longitude: 315.2 }
  ]
};
```

### Database Seeding
```typescript
// src/__tests__/fixtures/database-seed.ts
export async function seedTestDatabase() {
  // Create test users
  await prisma.user.create({
    data: {
      id: 'test-user-123',
      name: 'Test User',
      email: 'test@example.com',
      role: 'USER'
    }
  });

  // Create test profiles
  await prisma.profile.create({
    data: {
      userId: 'test-user-123',
      fullName: 'Test User',
      birthDate: new Date('1990-01-15'),
      birthTime: '14:30',
      birthPlace: 'New York, US',
      latitude: 40.7128,
      longitude: -74.0060,
      timezone: 'America/New_York',
      zodiacSign: 'Capricorn',
      system: 'western'
    }
  });
}
```

## Test Scenarios

### 1. Profile Management Tests
```typescript
// src/__tests__/profile.test.ts
describe('Profile Management', () => {
  test('should display user profile information', async () => {
    // Test profile view page
  });

  test('should allow editing profile information', async () => {
    // Test profile edit functionality
  });

  test('should validate profile data', async () => {
    // Test validation
  });

  test('should save profile changes', async () => {
    // Test save functionality
  });
});
```

### 2. Astrology Calculation Tests
```typescript
// src/__tests__/astrology.test.ts
describe('Astrology Calculations', () => {
  test('should calculate planetary positions', async () => {
    // Test planetary position calculations
  });

  test('should calculate house cusps', async () => {
    // Test house cusp calculations
  });

  test('should validate birth data', async () => {
    // Test birth data validation
  });
});
```

### 3. API Endpoint Tests
```typescript
// src/__tests__/api.test.ts
describe('API Endpoints', () => {
  test('GET /api/users/profile should return user profile', async () => {
    // Test profile API
  });

  test('PUT /api/users/profile should update profile', async () => {
    // Test profile update API
  });

  test('POST /api/astro/natal should calculate natal chart', async () => {
    // Test astrology API
  });
});
```

## Continuous Integration

### GitHub Actions Workflow
```yaml
# .github/workflows/test.yml
name: Test Suite

on:
  push:
    branches: [main, develop, staging]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [18.x, 20.x]
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linting
      run: npm run lint
    
    - name: Run type checking
      run: npm run type-check
    
    - name: Run unit tests
      run: npm run test:coverage
    
    - name: Run integration tests
      run: npm run test:integration
    
    - name: Run E2E tests
      run: npm run test:e2e
    
    - name: Upload coverage reports
      uses: codecov/codecov-action@v3
```

## Performance Testing

### Lighthouse Audits
```bash
# Run Lighthouse audit
npm run test:lighthouse

# Run Lighthouse with specific thresholds
npm run test:lighthouse -- --thresholds.performance=90 --thresholds.accessibility=95
```

### Load Testing
```bash
# Run load tests with Artillery
npm run test:load

# Run stress tests
npm run test:stress
```

## Security Testing

### Security Scans
```bash
# Run security audit
npm audit

# Run dependency vulnerability scan
npm run security:scan

# Run OWASP ZAP scan
npm run security:zap
```

## Test Data Management

### Test Database
```bash
# Reset test database
npm run test:db:reset

# Seed test database
npm run test:db:seed

# Clean test database
npm run test:db:clean
```

### Test Environment Variables
```bash
# .env.test
DATABASE_URL="postgresql://test:test@localhost:5432/daily_secrets_test"
NEXTAUTH_SECRET="test-secret"
NEXTAUTH_URL="http://localhost:8120"
```

## Monitoring and Reporting

### Test Reports
- **Coverage Report**: `coverage/lcov-report/index.html`
- **E2E Report**: `playwright-report/index.html`
- **Performance Report**: `lighthouse-report.html`
- **Security Report**: `security-report.json`

### Test Metrics
- **Test Coverage**: Minimum 80%
- **Test Execution Time**: Maximum 10 minutes
- **E2E Test Success Rate**: 100%
- **Performance Score**: Minimum 90
- **Accessibility Score**: Minimum 95

## Troubleshooting

### Common Issues
1. **Database Connection Issues**
   ```bash
   # Check database connection
   npm run test:db:check
   ```

2. **Test Timeout Issues**
   ```bash
   # Increase timeout
   npm run test -- --timeout=30000
   ```

3. **Memory Issues**
   ```bash
   # Run tests with increased memory
   node --max-old-space-size=4096 node_modules/.bin/jest
   ```

### Debug Mode
```bash
# Run tests in debug mode
npm run test:debug

# Run specific test in debug mode
npm run test:debug -- --testNamePattern="Profile Management"
```
