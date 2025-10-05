import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { nasaValidationService } from '@/lib/astrology/nasa-validation';
import { swissEphemerisService } from '@/lib/astrology/swiss-ephemeris';
import { pythagoreanNumerologyService } from '@/lib/numerology/pythagorean';
import { chaldeanNumerologyService } from '@/lib/numerology/chaldean';
import { sriLankanAstrologyService } from '@/lib/astrology/sri-lankan-astrology';

export interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  version: string;
  environment: string;
  uptime: number;
  services: {
    database: ServiceHealth;
    swissEphemeris: ServiceHealth;
    nasaValidation: ServiceHealth;
    pythagoreanNumerology: ServiceHealth;
    chaldeanNumerology: ServiceHealth;
    sriLankanAstrology: ServiceHealth;
  };
  system: {
    memory: {
      used: number;
      total: number;
      percentage: number;
    };
    cpu: {
      usage: number;
    };
    disk: {
      used: number;
      total: number;
      percentage: number;
    };
  };
  performance: {
    responseTime: number;
    requestsPerSecond: number;
    errorRate: number;
  };
  features: {
    astrology: boolean;
    numerology: boolean;
    sriLankanAstrology: boolean;
    aiChat: boolean;
    dreamAnalysis: boolean;
    premiumFeatures: boolean;
  };
}

export interface ServiceHealth {
  status: 'healthy' | 'degraded' | 'unhealthy';
  responseTime: number;
  lastCheck: string;
  error?: string;
  accuracy?: number;
}

export async function GET(request: NextRequest): Promise<NextResponse<HealthStatus>> {
  const startTime = Date.now();
  
  try {
    // Get version information
    const version = process.env.APP_VERSION || '1.0.0';
    const environment = process.env.NODE_ENV || 'development';
    
    // Check database health
    const databaseHealth = await checkDatabaseHealth();
    
    // Check Swiss Ephemeris health
    const swissEphemerisHealth = await checkSwissEphemerisHealth();
    
    // Check NASA validation health
    const nasaValidationHealth = await checkNASAValidationHealth();
    
    // Check numerology services health
    const pythagoreanHealth = await checkPythagoreanNumerologyHealth();
    const chaldeanHealth = await checkChaldeanNumerologyHealth();
    
    // Check Sri Lankan astrology health
    const sriLankanHealth = await checkSriLankanAstrologyHealth();
    
    // Get system information
    const systemInfo = await getSystemInfo();
    
    // Get performance metrics
    const performanceMetrics = await getPerformanceMetrics();
    
    // Check feature availability
    const features = await checkFeatureAvailability();
    
    // Determine overall status
    const overallStatus = determineOverallStatus([
      databaseHealth,
      swissEphemerisHealth,
      nasaValidationHealth,
      pythagoreanHealth,
      chaldeanHealth,
      sriLankanHealth
    ]);
    
    const responseTime = Date.now() - startTime;
    
    const healthStatus: HealthStatus = {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      version,
      environment,
      uptime: process.uptime(),
      services: {
        database: databaseHealth,
        swissEphemeris: swissEphemerisHealth,
        nasaValidation: nasaValidationHealth,
        pythagoreanNumerology: pythagoreanHealth,
        chaldeanNumerology: chaldeanHealth,
        sriLankanAstrology: sriLankanHealth
      },
      system: systemInfo,
      performance: {
        responseTime,
        requestsPerSecond: 0, // Would be calculated from metrics
        errorRate: 0 // Would be calculated from metrics
      },
      features
    };
    
    return NextResponse.json(healthStatus, {
      status: overallStatus === 'unhealthy' ? 503 : 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    
  } catch (error) {
    console.error('Health check error:', error);
    
    const errorStatus: HealthStatus = {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      version: process.env.APP_VERSION || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      uptime: process.uptime(),
      services: {
        database: { status: 'unhealthy', responseTime: 0, lastCheck: new Date().toISOString(), error: 'Health check failed' },
        swissEphemeris: { status: 'unhealthy', responseTime: 0, lastCheck: new Date().toISOString(), error: 'Health check failed' },
        nasaValidation: { status: 'unhealthy', responseTime: 0, lastCheck: new Date().toISOString(), error: 'Health check failed' },
        pythagoreanNumerology: { status: 'unhealthy', responseTime: 0, lastCheck: new Date().toISOString(), error: 'Health check failed' },
        chaldeanNumerology: { status: 'unhealthy', responseTime: 0, lastCheck: new Date().toISOString(), error: 'Health check failed' },
        sriLankanAstrology: { status: 'unhealthy', responseTime: 0, lastCheck: new Date().toISOString(), error: 'Health check failed' }
      },
      system: {
        memory: { used: 0, total: 0, percentage: 0 },
        cpu: { usage: 0 },
        disk: { used: 0, total: 0, percentage: 0 }
      },
      performance: {
        responseTime: Date.now() - startTime,
        requestsPerSecond: 0,
        errorRate: 100
      },
      features: {
        astrology: false,
        numerology: false,
        sriLankanAstrology: false,
        aiChat: false,
        dreamAnalysis: false,
        premiumFeatures: false
      }
    };
    
    return NextResponse.json(errorStatus, { status: 503 });
  }
}

async function checkDatabaseHealth(): Promise<ServiceHealth> {
  const startTime = Date.now();
  
  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`;
    
    return {
      status: 'healthy',
      responseTime: Date.now() - startTime,
      lastCheck: new Date().toISOString()
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      responseTime: Date.now() - startTime,
      lastCheck: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Database connection failed'
    };
  }
}

async function checkSwissEphemerisHealth(): Promise<ServiceHealth> {
  const startTime = Date.now();
  
  try {
    // Test Swiss Ephemeris calculation
    const testDate = new Date();
    const testTime = new Date();
    const testLocation = { latitude: 0, longitude: 0, altitude: 0, timezone: 'UTC', name: 'Test' };
    
    await swissEphemerisService.calculatePlanetaryPositions(testDate, testTime, testLocation);
    
    return {
      status: 'healthy',
      responseTime: Date.now() - startTime,
      lastCheck: new Date().toISOString(),
      accuracy: 0.1
    };
  } catch (error) {
    return {
      status: 'degraded',
      responseTime: Date.now() - startTime,
      lastCheck: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Swiss Ephemeris test failed'
    };
  }
}

async function checkNASAValidationHealth(): Promise<ServiceHealth> {
  const startTime = Date.now();
  
  try {
    // Test NASA validation service
    const status = await nasaValidationService.getStatus();
    
    return {
      status: status.available ? 'healthy' : 'degraded',
      responseTime: status.responseTime,
      lastCheck: status.lastCheck.toISOString(),
      accuracy: 0.1
    };
  } catch (error) {
    return {
      status: 'degraded',
      responseTime: Date.now() - startTime,
      lastCheck: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'NASA validation test failed'
    };
  }
}

async function checkPythagoreanNumerologyHealth(): Promise<ServiceHealth> {
  const startTime = Date.now();
  
  try {
    // Test Pythagorean numerology calculation
    await pythagoreanNumerologyService.calculateFullReading('Test User', new Date());
    
    return {
      status: 'healthy',
      responseTime: Date.now() - startTime,
      lastCheck: new Date().toISOString(),
      accuracy: 100
    };
  } catch (error) {
    return {
      status: 'degraded',
      responseTime: Date.now() - startTime,
      lastCheck: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Pythagorean numerology test failed'
    };
  }
}

async function checkChaldeanNumerologyHealth(): Promise<ServiceHealth> {
  const startTime = Date.now();
  
  try {
    // Test Chaldean numerology calculation
    await chaldeanNumerologyService.calculateFullReading('Test User', new Date());
    
    return {
      status: 'healthy',
      responseTime: Date.now() - startTime,
      lastCheck: new Date().toISOString(),
      accuracy: 100
    };
  } catch (error) {
    return {
      status: 'degraded',
      responseTime: Date.now() - startTime,
      lastCheck: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Chaldean numerology test failed'
    };
  }
}

async function checkSriLankanAstrologyHealth(): Promise<ServiceHealth> {
  const startTime = Date.now();
  
  try {
    // Test Sri Lankan astrology calculation
    await sriLankanAstrologyService.calculateSriLankanChart(
      new Date(),
      new Date(),
      { latitude: 0, longitude: 0, timezone: 'UTC' }
    );
    
    return {
      status: 'healthy',
      responseTime: Date.now() - startTime,
      lastCheck: new Date().toISOString(),
      accuracy: 0.1
    };
  } catch (error) {
    return {
      status: 'degraded',
      responseTime: Date.now() - startTime,
      lastCheck: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Sri Lankan astrology test failed'
    };
  }
}

async function getSystemInfo() {
  const memUsage = process.memoryUsage();
  const totalMemory = memUsage.heapTotal + memUsage.external;
  const usedMemory = memUsage.heapUsed;
  
  return {
    memory: {
      used: Math.round(usedMemory / 1024 / 1024), // MB
      total: Math.round(totalMemory / 1024 / 1024), // MB
      percentage: Math.round((usedMemory / totalMemory) * 100)
    },
    cpu: {
      usage: 0 // Would be calculated from system metrics
    },
    disk: {
      used: 0, // Would be calculated from system metrics
      total: 0,
      percentage: 0
    }
  };
}

async function getPerformanceMetrics() {
  return {
    responseTime: 0, // Would be calculated from metrics
    requestsPerSecond: 0, // Would be calculated from metrics
    errorRate: 0 // Would be calculated from metrics
  };
}

async function checkFeatureAvailability() {
  return {
    astrology: true,
    numerology: true,
    sriLankanAstrology: true,
    aiChat: process.env.AI_CHAT_ENABLED === 'true',
    dreamAnalysis: process.env.DREAM_ANALYSIS_ENABLED === 'true',
    premiumFeatures: process.env.PREMIUM_FEATURES_ENABLED === 'true'
  };
}

function determineOverallStatus(services: ServiceHealth[]): 'healthy' | 'degraded' | 'unhealthy' {
  const unhealthyCount = services.filter(s => s.status === 'unhealthy').length;
  const degradedCount = services.filter(s => s.status === 'degraded').length;
  
  if (unhealthyCount > 0) {
    return 'unhealthy';
  }
  
  if (degradedCount > 0) {
    return 'degraded';
  }
  
  return 'healthy';
}

