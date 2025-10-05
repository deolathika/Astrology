import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-config';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    // Get system statistics
    const [
      totalUsers,
      premiumUsers,
      totalReadings,
      totalDreams
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: 'premium' } }),
      prisma.astrologyReading.count(),
      prisma.dream.count()
    ]);

    const recentUsers = await prisma.user.findMany({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
        }
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' },
      take: 10
    });

    const stats = {
      overview: {
        totalUsers,
        premiumUsers,
        freeUsers: totalUsers - premiumUsers,
        totalReadings,
        totalDreams,
        conversionRate: totalUsers > 0 ? (premiumUsers / totalUsers) * 100 : 0
      },
      recentUsers,
      timestamp: new Date().toISOString()
    };

    return NextResponse.json(stats);

  } catch (error) {
    console.error('Admin stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}