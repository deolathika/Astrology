import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-config';
import { prisma } from '@/lib/prisma';

export interface UserDataExport {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
  };
  profile: {
    birthDate: Date;
    birthTime: Date;
    placeLabel: string;
    lat: number;
    lng: number;
    tzIana: string;
    systemPref: string;
    localePref: string;
    privacy: any;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  astrologyReadings: any[];
  numerologyReadings: any[];
  dreams: any[];
  userSettings: any[];
  notifications: any[];
  subscriptions: any[];
  purchases: any[];
  donations: any[];
  exportDate: Date;
  exportVersion: string;
}

export async function GET(request: NextRequest): Promise<NextResponse<UserDataExport>> {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' } as any,
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        profiles: true,
        astrologyReadings: true,
        numerologyReadings: true,
        dreams: true,
        userSettings: true,
        notifications: true,
        subscriptions: true,
        purchases: true,
        donations: true
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' } as any,
        { status: 404 }
      );
    }

    // Prepare export data
    const exportData: UserDataExport = {
      user: {
        id: user.id,
        name: user.name || '',
        email: user.email || '',
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
      profile: user.profiles[0] ? {
        birthDate: user.profiles[0].birthDate,
        birthTime: new Date(user.profiles[0].birthTime),
        placeLabel: user.profiles[0].placeLabel,
        lat: user.profiles[0].lat,
        lng: user.profiles[0].lng,
        tzIana: user.profiles[0].tzIana,
        systemPref: user.profiles[0].systemPref,
        localePref: user.profiles[0].localePref,
        privacy: user.profiles[0].privacy,
        createdAt: user.profiles[0].createdAt,
        updatedAt: user.profiles[0].updatedAt
      } : null,
      astrologyReadings: user.astrologyReadings,
      numerologyReadings: user.numerologyReadings,
      dreams: user.dreams,
      userSettings: user.userSettings ? [user.userSettings] : [],
      notifications: user.notifications,
      subscriptions: user.subscriptions,
      purchases: user.purchases,
      donations: user.donations,
      exportDate: new Date(),
      exportVersion: '1.0.0'
    };

    // Log the export request
    await prisma.notification.create({
      data: {
        userId: user.id,
        type: 'data_export',
        title: 'Data Export Requested',
        message: 'Your personal data has been exported successfully.',
        read: false
      }
    });

    return NextResponse.json(exportData, {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="daily-secrets-export-${user.id}-${Date.now()}.json"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });

  } catch (error) {
    console.error('Data export error:', error);
    return NextResponse.json(
      { error: 'Failed to export user data' } as any,
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
    const { format, includeAnalytics, includeCache } = body;

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        profiles: true,
        astrologyReadings: true,
        numerologyReadings: true,
        dreams: true,
        userSettings: true,
        notifications: true,
        subscriptions: true,
        purchases: true,
        donations: true
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' } as any,
        { status: 404 }
      );
    }

    // Prepare export data based on preferences
    const exportData: any = {
      user: {
        id: user.id,
        name: user.name || '',
        email: user.email || '',
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
      profile: user.profiles[0] ? {
        birthDate: user.profiles[0].birthDate,
        birthTime: new Date(user.profiles[0].birthTime),
        placeLabel: user.profiles[0].placeLabel,
        lat: user.profiles[0].lat,
        lng: user.profiles[0].lng,
        tzIana: user.profiles[0].tzIana,
        systemPref: user.profiles[0].systemPref,
        localePref: user.profiles[0].localePref,
        privacy: user.profiles[0].privacy,
        createdAt: user.profiles[0].createdAt,
        updatedAt: user.profiles[0].updatedAt
      } : null,
      exportDate: new Date(),
      exportVersion: '1.0.0'
    };

    // Include additional data based on preferences
    if (includeAnalytics) {
      exportData.analytics = {
        astrologyReadings: user.astrologyReadings,
        numerologyReadings: user.numerologyReadings,
        dreams: user.dreams,
      };
    }

    if (includeCache) {
      exportData.cache = {
        userSettings: user.userSettings ? [user.userSettings] : [],
        notifications: user.notifications
      };
    }

    // Add subscription and payment data
    exportData.subscriptions = user.subscriptions;
    exportData.purchases = user.purchases;
    exportData.donations = user.donations;

    // Generate different formats
    let responseData: any;
    let contentType: string;
    let filename: string;

    switch (format) {
      case 'csv':
        responseData = convertToCSV(exportData);
        contentType = 'text/csv';
        filename = `daily-secrets-export-${user.id}-${Date.now()}.csv`;
        break;
      case 'xml':
        responseData = convertToXML(exportData);
        contentType = 'application/xml';
        filename = `daily-secrets-export-${user.id}-${Date.now()}.xml`;
        break;
      default:
        responseData = exportData;
        contentType = 'application/json';
        filename = `daily-secrets-export-${user.id}-${Date.now()}.json`;
    }

    // Log the export request
    await prisma.notification.create({
      data: {
        userId: user.id,
        type: 'data_export',
        title: 'Data Export Requested',
        message: `Your personal data has been exported in ${format.toUpperCase()} format.`,
        read: false
      }
    });

    return NextResponse.json(responseData, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });

  } catch (error) {
    console.error('Data export POST error:', error);
    return NextResponse.json(
      { error: 'Failed to export user data' } as any,
      { status: 500 }
    );
  }
}

function convertToCSV(data: any): string {
  // Simple CSV conversion
  const csvRows: string[] = [];
  
  // Add headers
  csvRows.push('Field,Value');
  
  // Add user data
  csvRows.push(`User ID,${data.user.id}`);
  csvRows.push(`Name,${data.user.name}`);
  csvRows.push(`Email,${data.user.email}`);
  csvRows.push(`Role,${data.user.role}`);
  csvRows.push(`Created At,${data.user.createdAt}`);
  csvRows.push(`Updated At,${data.user.updatedAt}`);
  
  if (data.profile) {
    csvRows.push(`Birth Date,${data.profile.birthDate}`);
    csvRows.push(`Birth Time,${data.profile.birthTime}`);
    csvRows.push(`Place,${data.profile.placeLabel}`);
    csvRows.push(`Latitude,${data.profile.lat}`);
    csvRows.push(`Longitude,${data.profile.lng}`);
    csvRows.push(`Timezone,${data.profile.tzIana}`);
    csvRows.push(`System Preference,${data.profile.systemPref}`);
    csvRows.push(`Locale Preference,${data.profile.localePref}`);
  }
  
  csvRows.push(`Export Date,${data.exportDate}`);
  csvRows.push(`Export Version,${data.exportVersion}`);
  
  return csvRows.join('\n');
}

function convertToXML(data: any): string {
  // Simple XML conversion
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<DailySecretsExport>\n';
  xml += '  <User>\n';
  xml += `    <Id>${data.user.id}</Id>\n`;
  xml += `    <Name>${data.user.name}</Name>\n`;
  xml += `    <Email>${data.user.email}</Email>\n`;
  xml += `    <Role>${data.user.role}</Role>\n`;
  xml += `    <CreatedAt>${data.user.createdAt}</CreatedAt>\n`;
  xml += `    <UpdatedAt>${data.user.updatedAt}</UpdatedAt>\n`;
  xml += '  </User>\n';
  
  if (data.profile) {
    xml += '  <Profile>\n';
    xml += `    <BirthDate>${data.profile.birthDate}</BirthDate>\n`;
    xml += `    <BirthTime>${data.profile.birthTime}</BirthTime>\n`;
    xml += `    <Place>${data.profile.placeLabel}</Place>\n`;
    xml += `    <Latitude>${data.profile.lat}</Latitude>\n`;
    xml += `    <Longitude>${data.profile.lng}</Longitude>\n`;
    xml += `    <Timezone>${data.profile.tzIana}</Timezone>\n`;
    xml += `    <SystemPreference>${data.profile.systemPref}</SystemPreference>\n`;
    xml += `    <LocalePreference>${data.profile.localePref}</LocalePreference>\n`;
    xml += '  </Profile>\n';
  }
  
  xml += `  <ExportDate>${data.exportDate}</ExportDate>\n`;
  xml += `  <ExportVersion>${data.exportVersion}</ExportVersion>\n`;
  xml += '</DailySecretsExport>';
  
  return xml;
}
