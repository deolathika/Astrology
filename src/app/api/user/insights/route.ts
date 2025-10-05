import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-config';
import { prisma } from '@/lib/prisma';
import { swissEphemerisService } from '@/lib/astrology/swiss-ephemeris';
import { pythagoreanNumerologyService } from '@/lib/numerology/pythagorean';

export interface UserInsight {
  id: string;
  type: 'astrology' | 'numerology' | 'compatibility' | 'transit';
  content: string;
  system: string;
  accuracy: number;
  timestamp: Date;
  isPremium: boolean;
  personalized: boolean;
}

export interface UserInsightsResponse {
  insights: UserInsight[];
  dailyQuote: string;
  userProfile: {
    name: string;
    role: string;
    systemPreference: string;
    lastLogin: Date;
  };
  limitations: {
    maxInsights: number;
    currentCount: number;
    remainingCount: number;
  };
  upgradeBenefits: {
    message: string;
    features: string[];
  };
}

export async function GET(request: NextRequest): Promise<NextResponse<UserInsightsResponse>> {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' } as any,
        { status: 401 }
      );
    }

    // Get user profile
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { profiles: true }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' } as any,
        { status: 404 }
      );
    }

    const profile = user.profiles[0];
    const isPremium = user.role === 'premium' || user.role === 'admin';

    // Generate personalized insights
    const insights = await generateUserInsights(user, profile, isPremium);

    const dailyQuote = generateDailyQuote(user.role);

    const limitations = {
      maxInsights: isPremium ? 50 : 10,
      currentCount: insights.length,
      remainingCount: (isPremium ? 50 : 10) - insights.length
    };

    const upgradeBenefits = {
      message: "Unlock unlimited insights and advanced features",
      features: [
        "Unlimited daily insights",
        "AI-powered cosmic chat",
        "Dream analysis",
        "Advanced compatibility reports",
        "PDF report export",
        "Priority support"
      ]
    };

    const response: UserInsightsResponse = {
      insights,
      dailyQuote,
      userProfile: {
        name: user.name || 'User',
        role: user.role,
        systemPreference: profile?.systemPref || 'western',
        lastLogin: user.updatedAt
      },
      limitations,
      upgradeBenefits
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'private, max-age=1800', // 30 minutes cache
        'X-User-Role': user.role,
        'X-Insights-Count': insights.length.toString()
      }
    });

  } catch (error) {
    console.error('User insights error:', error);
    return NextResponse.json(
      { error: 'Failed to generate user insights' } as any,
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' } as any,
        { status: 401 }
      );
    }

    const body = await request.json();
    const { type, preferences } = body;

    // Get user profile
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { profiles: true }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' } as any,
        { status: 404 }
      );
    }

    const profile = user.profiles[0];
    const isPremium = user.role === 'premium' || user.role === 'admin';

    // Generate specific type of insight
    const insight = await generateSpecificInsight(type, user, profile, preferences, isPremium);

    return NextResponse.json({ insight });

  } catch (error) {
    console.error('User insights POST error:', error);
    return NextResponse.json(
      { error: 'Failed to process user insights request' },
      { status: 500 }
    );
  }
}

async function generateUserInsights(
  user: any,
  profile: any,
  isPremium: boolean
): Promise<UserInsight[]> {
  const insights: UserInsight[] = [];

  try {
    // Generate astrology insight
    if (profile?.birthDate && profile?.birthTime && profile?.lat && profile?.lng) {
      const astrologyInsight = await generateAstrologyInsight(user, profile, isPremium);
      insights.push(astrologyInsight);
    }

    // Generate numerology insight
    if (profile?.birthDate) {
      const numerologyInsight = await generateNumerologyInsight(user, profile, isPremium);
      insights.push(numerologyInsight);
    }

    // Generate transit insight (premium only)
    if (isPremium) {
      const transitInsight = await generateTransitInsight(user, profile);
      insights.push(transitInsight);
    }

  } catch (error) {
    console.error('Error generating user insights:', error);
  }

  return insights;
}

async function generateAstrologyInsight(
  user: any,
  profile: any,
  isPremium: boolean
): Promise<UserInsight> {
  const system = profile?.systemPref || 'western';
  
  let content: string;
  let accuracy: number;

  if (isPremium) {
    // Premium: Use actual calculations
    try {
      const birthDate = new Date(profile.birthDate);
      const birthTime = new Date(profile.birthTime);
      const location = {
        latitude: profile.lat,
        longitude: profile.lng,
        altitude: 0,
        timezone: profile.tzIana || 'UTC',
        name: profile.placeLabel || 'Unknown'
      };

      const chart = await swissEphemerisService.generateBirthChart({
        date: birthDate,
        time: birthTime,
        location,
        timezone: profile.tzIana || 'UTC'
      });

      content = `Your ${system} birth chart reveals a strong ${chart.positions[0]?.planet || 'Sun'} influence today. The cosmic energy supports your natural ${chart.positions[0]?.planet || 'leadership'} abilities.`;
      accuracy = 0.1;
    } catch (error) {
      content = `Your ${system} astrological profile shows strong potential for growth and transformation today.`;
      accuracy = 0.5;
    }
  } else {
    // Free: Basic insight
    content = `Your ${system} astrological profile indicates a time of new beginnings and fresh perspectives.`;
    accuracy = 0.8;
  }

  return {
    id: `user-astrology-${Date.now()}`,
    type: 'astrology',
    content,
    system,
    accuracy,
    timestamp: new Date(),
    isPremium,
    personalized: true
  };
}

async function generateNumerologyInsight(
  user: any,
  profile: any,
  isPremium: boolean
): Promise<UserInsight> {
  let content: string;
  let accuracy: number;

  if (isPremium) {
    // Premium: Use actual calculations
    try {
      const birthDate = new Date(profile.birthDate);
      const fullName = user.name || 'User';
      
      const numerology = await pythagoreanNumerologyService.calculateFullReading(fullName, birthDate);
      
      content = `Your Life Path Number ${numerology.lifePath} reveals ${numerology.interpretations.lifePath}`;
      accuracy = 100;
    } catch (error) {
      content = `Your numerological profile shows strong potential for leadership and spiritual growth.`;
      accuracy = 80;
    }
  } else {
    // Free: Basic insight
    content = `Your numerological profile indicates a natural ability to inspire and lead others.`;
    accuracy = 70;
  }

  return {
    id: `user-numerology-${Date.now()}`,
    type: 'numerology',
    content,
    system: 'pythagorean',
    accuracy,
    timestamp: new Date(),
    isPremium,
    personalized: true
  };
}

async function generateTransitInsight(
  user: any,
  profile: any
): Promise<UserInsight> {
  // Premium-only transit insight
  const content = `Today's planetary transits bring opportunities for growth and transformation. The cosmic energy supports your spiritual journey and personal development.`;
  
  return {
    id: `user-transit-${Date.now()}`,
    type: 'transit',
    content,
    system: 'western',
    accuracy: 0.1,
    timestamp: new Date(),
    isPremium: true,
    personalized: true
  };
}

async function generateSpecificInsight(
  type: string,
  user: any,
  profile: any,
  preferences: any,
  isPremium: boolean
): Promise<UserInsight> {
  switch (type) {
    case 'astrology':
      return await generateAstrologyInsight(user, profile, isPremium);
    case 'numerology':
      return await generateNumerologyInsight(user, profile, isPremium);
    case 'transit':
      if (isPremium) {
        return await generateTransitInsight(user, profile);
      } else {
        throw new Error('Transit insights require premium subscription');
      }
    default:
      throw new Error('Invalid insight type');
  }
}

function generateDailyQuote(role: string): string {
  const quotes = {
    admin: "As an administrator, you hold the keys to cosmic wisdom. Use them wisely.",
    premium: "Your premium access unlocks the deepest secrets of the universe.",
    user: "The stars align to guide your path. Trust in the cosmic wisdom.",
    guest: "Welcome to the cosmic journey. The universe has much to reveal."
  };

  return quotes[role as keyof typeof quotes] || "The universe speaks to those who listen.";
}