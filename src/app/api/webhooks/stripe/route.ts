import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';

const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-09-30.clover',
    })
  : null;

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!stripe) {
    return NextResponse.json(
      { error: 'Stripe not configured' },
      { status: 503 }
    );
  }

  try {
    const body = await request.text();
    const signature = headers().get('stripe-signature');

    if (!signature) {
      console.error('Missing Stripe signature');
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe!.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object as Stripe.Subscription);
        break;
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;
      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(event.data.object as Stripe.Invoice);
        break;
      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
        break;
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;
      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object as Stripe.PaymentIntent);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Stripe webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  try {
    const customerId = session.customer as string;
    const subscriptionId = session.subscription as string;

    // Find user by customer ID (using email as fallback)
    const customer = await stripe!.customers.retrieve(customerId);
    const user = await prisma.user.findFirst({
      where: { 
        OR: [
          { email: (customer as any).email },
          { name: (customer as any).name }
        ]
      }
    });

    if (!user) {
      console.error('User not found for customer:', customerId);
      return;
    }

    // Update user role to premium
    await prisma.user.update({
      where: { id: user.id },
      data: {
        role: 'premium'
      }
    });

    // Create subscription record
    await prisma.subscription.create({
      data: {
        userId: user.id,
        stripeId: subscriptionId,
        status: 'active',
        plan: 'premium',
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        price: 9.99,
        currency: 'USD'
      }
    });

    console.log(`User ${user.id} upgraded to premium via checkout session ${session.id}`);

  } catch (error) {
    console.error('Error handling checkout session completed:', error);
  }
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  try {
    const customerId = subscription.customer as string;

    // Find user by customer ID (using email as fallback)
    const customer = await stripe!.customers.retrieve(customerId);
    const user = await prisma.user.findFirst({
      where: { 
        OR: [
          { email: (customer as any).email },
          { name: (customer as any).name }
        ]
      }
    });

    if (!user) {
      console.error('User not found for customer:', customerId);
      return;
    }

    // Update user role to premium
    await prisma.user.update({
      where: { id: user.id },
      data: {
        role: 'premium'
      }
    });

    // Create or update subscription record
    await prisma.subscription.upsert({
      where: { stripeId: subscription.id },
      update: {
        status: subscription.status,
        startDate: new Date((subscription as any).current_period_start * 1000),
        endDate: new Date((subscription as any).current_period_end * 1000)
      },
      create: {
        userId: user.id,
        stripeId: subscription.id,
        status: subscription.status,
        plan: 'premium',
        startDate: new Date((subscription as any).current_period_start * 1000),
        endDate: new Date((subscription as any).current_period_end * 1000),
        price: 9.99,
        currency: 'USD'
      }
    });

    console.log(`Subscription created for user ${user.id}: ${subscription.id}`);

  } catch (error) {
    console.error('Error handling subscription created:', error);
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  try {
    // Update subscription record
    await prisma.subscription.update({
      where: { stripeId: subscription.id },
      data: {
        status: subscription.status,
        startDate: new Date((subscription as any).current_period_start * 1000),
        endDate: new Date((subscription as any).current_period_end * 1000)
      }
    });

    // If subscription is cancelled or past due, downgrade user
    if (subscription.status === 'canceled' || subscription.status === 'past_due') {
      const subscriptionRecord = await prisma.subscription.findUnique({
        where: { stripeId: subscription.id }
      });

      if (subscriptionRecord) {
        await prisma.user.update({
          where: { id: subscriptionRecord.userId },
          data: { role: 'user' }
        });

        console.log(`User ${subscriptionRecord.userId} downgraded due to subscription status: ${subscription.status}`);
      }
    }

    console.log(`Subscription updated: ${subscription.id} - Status: ${subscription.status}`);

  } catch (error) {
    console.error('Error handling subscription updated:', error);
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  try {
    // Find subscription record
    const subscriptionRecord = await prisma.subscription.findUnique({
      where: { stripeId: subscription.id }
    });

    if (subscriptionRecord) {
      // Downgrade user to free
      await prisma.user.update({
        where: { id: subscriptionRecord.userId },
        data: { role: 'user' }
      });

      // Update subscription status
      await prisma.subscription.update({
        where: { stripeId: subscription.id },
        data: { status: 'canceled' }
      });

      console.log(`User ${subscriptionRecord.userId} downgraded due to subscription deletion`);
    }

  } catch (error) {
    console.error('Error handling subscription deleted:', error);
  }
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  try {
    const subscriptionId = (invoice as any).subscription as string;

    if (subscriptionId) {
      // Update subscription record
      await prisma.subscription.update({
        where: { stripeId: subscriptionId },
        data: {
          status: 'active',
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        }
      });

      console.log(`Payment succeeded for subscription: ${subscriptionId}`);
    }

  } catch (error) {
    console.error('Error handling invoice payment succeeded:', error);
  }
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  try {
    const subscriptionId = (invoice as any).subscription as string;

    if (subscriptionId) {
      // Update subscription record
      await prisma.subscription.update({
        where: { stripeId: subscriptionId },
        data: { status: 'past_due' }
      });

      // Find user and send notification
      const subscription = await prisma.subscription.findUnique({
        where: { stripeId: subscriptionId },
        include: { user: true }
      });

      if (subscription) {
        // Create notification for payment failure
        await prisma.notification.create({
          data: {
            userId: subscription.userId,
            type: 'payment_failed',
            title: 'Payment Failed',
            message: 'Your payment could not be processed. Please update your payment method.',
            read: false
          }
        });

        console.log(`Payment failed for subscription: ${subscriptionId}`);
      }
    }

  } catch (error) {
    console.error('Error handling invoice payment failed:', error);
  }
}

async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  try {
    // Log successful payment
    console.log(`Payment intent succeeded: ${paymentIntent.id}`);

    // You can add additional logic here for one-time payments
    // For example, if this is a one-time premium upgrade

  } catch (error) {
    console.error('Error handling payment intent succeeded:', error);
  }
}

async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  try {
    // Log failed payment
    console.log(`Payment intent failed: ${paymentIntent.id}`);

    // You can add additional logic here for failed payments
    // For example, notify the user or retry the payment

  } catch (error) {
    console.error('Error handling payment intent failed:', error);
  }
}
