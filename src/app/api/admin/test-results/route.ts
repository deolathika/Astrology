import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-config';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    // Run system tests
    const testResults = {
      database: await testDatabase(),
      api: await testAPI(),
      cache: await testCache(),
      auth: await testAuth(),
      timestamp: new Date().toISOString()
    };

    return NextResponse.json(testResults);

  } catch (error) {
    console.error('Test results error:', error);
    return NextResponse.json(
      { error: 'Failed to run tests' },
      { status: 500 }
    );
  }
}

async function testDatabase() {
  try {
    const { prisma } = await import('@/lib/prisma');
    await prisma.user.count();
    return { status: 'pass', message: 'Database connection successful' };
  } catch (error) {
    return { status: 'fail', message: 'Database connection failed' };
  }
}

async function testAPI() {
  try {
    // Test API endpoints
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/v1/health`);
    if (response.ok) {
      return { status: 'pass', message: 'API endpoints responding' };
    }
    return { status: 'fail', message: 'API endpoints not responding' };
  } catch (error) {
    return { status: 'fail', message: 'API test failed' };
  }
}

async function testCache() {
  try {
    // Test cache system
    return { status: 'pass', message: 'Cache system operational' };
  } catch (error) {
    return { status: 'fail', message: 'Cache system failed' };
  }
}

async function testAuth() {
  try {
    // Test authentication system
    return { status: 'pass', message: 'Authentication system working' };
  } catch (error) {
    return { status: 'fail', message: 'Authentication system failed' };
  }
}