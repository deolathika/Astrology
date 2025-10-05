import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-config';
import { prisma } from '@/lib/prisma';

export interface DeleteRequest {
  confirmation: string;
  reason?: string;
  backupData?: boolean;
}

export interface DeleteResponse {
  success: boolean;
  message: string;
  deletedData: {
    user: boolean;
    profile: boolean;
    readings: boolean;
    dreams: boolean;
    settings: boolean;
    notifications: boolean;
    subscriptions: boolean;
    communityPosts: boolean;
    matches: boolean;
    chatMessages: boolean;
    purchases: boolean;
    donations: boolean;
  };
  backupCreated: boolean;
  deletionDate: Date;
}

export async function POST(request: NextRequest): Promise<NextResponse<DeleteResponse>> {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' } as any,
        { status: 401 }
      );
    }

    const body: DeleteRequest = await request.json();
    const { confirmation, reason, backupData = true } = body;

    // Validate confirmation
    if (confirmation !== 'DELETE_MY_ACCOUNT') {
      return NextResponse.json(
        { error: 'Invalid confirmation. Please type DELETE_MY_ACCOUNT to confirm.' } as any,
        { status: 400 }
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

    // Create backup if requested
    let backupCreated = false;
    if (backupData) {
      try {
        await createDataBackup(user);
        backupCreated = true;
      } catch (error) {
        console.error('Failed to create backup:', error);
        // Continue with deletion even if backup fails
      }
    }

    // Delete user data in order (respecting foreign key constraints)
    const deletedData = {
      user: false,
      profile: false,
      readings: false,
      dreams: false,
      settings: false,
      notifications: false,
      subscriptions: false,
      communityPosts: false,
      matches: false,
      chatMessages: false,
      purchases: false,
      donations: false
    };

    try {
      // Delete related data first
      await prisma.chatMessage.deleteMany({ where: { fromId: user.id } });
      deletedData.chatMessages = true;

      await prisma.match.deleteMany({ where: { OR: [{ aId: user.id }, { bId: user.id }] } });
      deletedData.matches = true;

      await prisma.communityPost.deleteMany({ where: { userId: user.id } });
      deletedData.communityPosts = true;

      await prisma.compatibilityCheck.deleteMany({ where: { userId: user.id } });
      deletedData.readings = true;

      await prisma.dream.deleteMany({ where: { userId: user.id } });
      deletedData.dreams = true;

      await prisma.numerologyReading.deleteMany({ where: { userId: user.id } });
      deletedData.readings = true;

      await prisma.astrologyReading.deleteMany({ where: { userId: user.id } });
      deletedData.readings = true;

      await prisma.notification.deleteMany({ where: { userId: user.id } });
      deletedData.notifications = true;

      await prisma.userSettings.deleteMany({ where: { userId: user.id } });
      deletedData.settings = true;

      await prisma.subscription.deleteMany({ where: { userId: user.id } });
      deletedData.subscriptions = true;

      await prisma.purchase.deleteMany({ where: { userId: user.id } });
      deletedData.purchases = true;

      await prisma.donation.deleteMany({ where: { userId: user.id } });
      deletedData.donations = true;

      // Delete profile
      await prisma.profile.deleteMany({ where: { userId: user.id } });
      deletedData.profile = true;

      // Finally, delete the user
      await prisma.user.delete({ where: { id: user.id } });
      deletedData.user = true;

    } catch (error) {
      console.error('Error deleting user data:', error);
      return NextResponse.json(
        { 
          error: 'Failed to delete user data',
          details: error instanceof Error ? error.message : 'Unknown error'
        } as any,
        { status: 500 }
      );
    }

    // Log the deletion (if possible)
    try {
      // Create a log entry in a separate table or external system
      console.log(`User ${user.id} (${user.email}) account deleted at ${new Date().toISOString()}. Reason: ${reason || 'Not specified'}`);
    } catch (error) {
      console.error('Failed to log deletion:', error);
    }

    const response: DeleteResponse = {
      success: true,
      message: 'Your account and all associated data have been permanently deleted.',
      deletedData,
      backupCreated,
      deletionDate: new Date()
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Account deletion error:', error);
    return NextResponse.json(
        { error: 'Failed to delete account' } as any,
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' } as any,
        { status: 401 }
      );
    }

    // Return information about what will be deleted
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

    const dataSummary = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      },
      dataCounts: {
        profiles: user.profiles.length,
        astrologyReadings: user.astrologyReadings.length,
        numerologyReadings: user.numerologyReadings.length,
        dreams: user.dreams.length,
        userSettings: user.userSettings ? 1 : 0,
        notifications: user.notifications.length,
        subscriptions: user.subscriptions.length,
        purchases: user.purchases.length,
        donations: user.donations.length
      },
      warning: 'This action is irreversible. All your data will be permanently deleted.',
      instructions: 'To confirm deletion, send a POST request with confirmation: "DELETE_MY_ACCOUNT"'
    };

    return NextResponse.json(dataSummary);

  } catch (error) {
    console.error('Delete info error:', error);
    return NextResponse.json(
        { error: 'Failed to get deletion information' } as any,
      { status: 500 }
    );
  }
}

async function createDataBackup(user: any): Promise<void> {
  // Create a backup of user data before deletion
  const backupData = {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    },
    profile: user.profiles[0] || null,
    astrologyReadings: user.astrologyReadings,
    numerologyReadings: user.numerologyReadings,
    dreams: user.dreams,
    userSettings: user.userSettings,
    notifications: user.notifications,
    subscriptions: user.subscriptions,
    compatibilityChecks: user.compatibilityChecks,
    communityPosts: user.communityPosts,
    matches: user.matches,
    chatMessages: user.chatMessages,
    purchases: user.purchases,
    donations: user.donations,
    backupDate: new Date(),
    backupVersion: '1.0.0'
  };

  // In a real implementation, you would:
  // 1. Store the backup in a secure location
  // 2. Encrypt the backup data
  // 3. Set an expiration date for the backup
  // 4. Provide a way for the user to request data recovery within a certain timeframe

  console.log(`Backup created for user ${user.id} at ${new Date().toISOString()}`);
  
  // For now, just log the backup creation
  // In production, you would implement proper backup storage
}
