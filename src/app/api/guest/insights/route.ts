import { NextRequest, NextResponse } from 'next/server';
import { swissEphemerisService } from '@/lib/astrology/swiss-ephemeris';
import { pythagoreanNumerologyService } from '@/lib/numerology/pythagorean';

export interface GuestInsight {
  id: string;
  type: 'astrology' | 'numerology' | 'quote';
  content: string;
  system: string;
  timestamp: Date;
  isPremium: boolean;
}

export interface GuestInsightsResponse {
  insights: GuestInsight[];
  dailyQuote: string;
  upgradePrompt: {
    message: string;
    features: string[];
  };
  limitations: {
    maxInsights: number;
    currentCount: number;
    remainingCount: number;
  };
}

export async function GET(request: NextRequest): Promise<NextResponse<GuestInsightsResponse>> {
  try {
    // Generate basic guest insights (limited)
    const insights: GuestInsight[] = [
      {
        id: 'guest-astrology-1',
        type: 'astrology',
        content: 'Today brings opportunities for growth and new beginnings. The cosmic energy supports your creative endeavors.',
        system: 'western',
        timestamp: new Date(),
        isPremium: false
      },
      {
        id: 'guest-numerology-1',
        type: 'numerology',
        content: 'Your life path number reveals a natural leadership ability and strong determination.',
        system: 'pythagorean',
        timestamp: new Date(),
        isPremium: false
      }
    ];

    const dailyQuote = "The stars whisper secrets to those who listen with their hearts.";

    const upgradePrompt = {
      message: "Unlock unlimited insights and personalized guidance",
      features: [
        "Unlimited daily insights",
        "Personalized birth chart analysis",
        "AI-powered cosmic chat",
        "Dream analysis",
        "Advanced compatibility reports"
      ]
    };

    const limitations = {
      maxInsights: 3,
      currentCount: 2,
      remainingCount: 1
    };

    const response: GuestInsightsResponse = {
      insights,
      dailyQuote,
      upgradePrompt,
      limitations
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, max-age=3600', // 1 hour cache
        'X-Rate-Limit': '100',
        'X-Rate-Limit-Remaining': '99'
      }
    });

  } catch (error) {
    console.error('Guest insights error:', error);
    return NextResponse.json(
      { error: 'Failed to generate guest insights' } as any,
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { birthDate, birthTime, location } = body;

    // Validate required fields
    if (!birthDate || !location) {
      return NextResponse.json(
        { error: 'Birth date and location are required' },
        { status: 400 }
      );
    }

    // Generate personalized insights for guest
    const insights: GuestInsight[] = [];

    // Basic astrology insight
    try {
      const astrologyInsight = await generateBasicAstrologyInsight(birthDate, birthTime, location);
      insights.push(astrologyInsight);
    } catch (error) {
      console.warn('Astrology insight generation failed:', error);
    }

    // Basic numerology insight
    try {
      const numerologyInsight = await generateBasicNumerologyInsight(birthDate);
      insights.push(numerologyInsight);
    } catch (error) {
      console.warn('Numerology insight generation failed:', error);
    }

    const response: GuestInsightsResponse = {
      insights,
      dailyQuote: "The universe speaks through the language of numbers and stars.",
      upgradePrompt: {
        message: "Get personalized insights based on your exact birth data",
        features: [
          "Accurate birth chart analysis",
          "Personalized daily guidance",
          "Transit interpretations",
          "Compatibility analysis"
        ]
      },
      limitations: {
        maxInsights: 3,
        currentCount: insights.length,
        remainingCount: 3 - insights.length
      }
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Guest insights POST error:', error);
    return NextResponse.json(
      { error: 'Failed to process guest insights request' },
      { status: 500 }
    );
  }
}

async function generateBasicAstrologyInsight(
  birthDate: string,
  birthTime?: string,
  location?: { latitude: number; longitude: number; name: string }
): Promise<GuestInsight> {
  // Simplified astrology insight for guests
  const insights = [
    "Today's cosmic energy supports new beginnings and fresh perspectives.",
    "The stars align to bring opportunities for growth and self-discovery.",
    "Cosmic forces encourage you to trust your intuition and inner wisdom.",
    "Today brings a chance to connect with your higher purpose and spiritual path."
  ];

  const randomInsight = insights[Math.floor(Math.random() * insights.length)];

  return {
    id: `guest-astrology-${Date.now()}`,
    type: 'astrology',
    content: randomInsight,
    system: 'western',
    timestamp: new Date(),
    isPremium: false
  };
}

async function generateBasicNumerologyInsight(birthDate: string): Promise<GuestInsight> {
  // Simplified numerology insight for guests
  const insights = [
    "Your life path number reveals a natural ability to inspire and lead others.",
    "The numbers show you have a strong connection to spiritual wisdom and intuition.",
    "Your numerological profile indicates a creative and expressive nature.",
    "The cosmic numbers suggest a time of transformation and personal growth."
  ];

  const randomInsight = insights[Math.floor(Math.random() * insights.length)];

  return {
    id: `guest-numerology-${Date.now()}`,
    type: 'numerology',
    content: randomInsight,
    system: 'pythagorean',
    timestamp: new Date(),
    isPremium: false
  };
}
