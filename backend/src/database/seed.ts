import { db } from './connection';
import { users, payments, usernameRegistry, invoices, subscriptions } from './schema';
import logger from '../utils/logger';
import { v4 as uuidv4 } from 'uuid';

/**
 * Seed the database with demo data
 */
const seedDatabase = async () => {
  logger.info('🌱 Seeding database with demo data...');

  try {
    // Create demo users
    logger.info('Creating demo users...');

    const alice = await db
      .insert(users)
      .values({
        email: 'alice@onefort.demo',
        username: 'alice',
        walletAddress: '0x1111111111111111111111111111111111111111',
        displayName: 'Alice Johnson',
        oauthProvider: 'google',
        oauthId: 'google_alice_123',
        onewalletId: 'onewallet_alice_456',
        emailVerified: true,
        usernameVerified: true,
      })
      .returning();

    const bob = await db
      .insert(users)
      .values({
        email: 'bob@onefort.demo',
        username: 'bob',
        walletAddress: '0x2222222222222222222222222222222222222222',
        displayName: 'Bob Smith',
        oauthProvider: 'google',
        oauthId: 'google_bob_123',
        onewalletId: 'onewallet_bob_456',
        emailVerified: true,
        usernameVerified: true,
      })
      .returning();

    const charlie = await db
      .insert(users)
      .values({
        email: 'charlie@onefort.demo',
        username: 'charlie',
        walletAddress: '0x3333333333333333333333333333333333333333',
        displayName: 'Charlie Davis',
        oauthProvider: 'google',
        oauthId: 'google_charlie_123',
        onewalletId: 'onewallet_charlie_456',
        emailVerified: true,
        usernameVerified: true,
      })
      .returning();

    logger.info(`✅ Created ${[alice, bob, charlie].length} demo users`);

    // Register usernames
    logger.info('Registering usernames...');

    await db.insert(usernameRegistry).values([
      {
        userId: alice[0].id,
        username: 'alice',
        isVerified: true,
        verifiedAt: new Date(),
      },
      {
        userId: bob[0].id,
        username: 'bob',
        isVerified: true,
        verifiedAt: new Date(),
      },
      {
        userId: charlie[0].id,
        username: 'charlie',
        isVerified: true,
        verifiedAt: new Date(),
      },
    ]);

    logger.info('✅ Registered usernames');

    // Create demo payments
    logger.info('Creating demo payments...');

    const demoPayments = [
      {
        senderId: alice[0].id,
        recipientId: bob[0].id,
        amount: '100.00',
        currency: 'USDO',
        status: 'completed' as const,
        type: 'send' as const,
        note: 'Payment for lunch',
        txHash: '0xabc123...',
        completedAt: new Date(),
      },
      {
        senderId: bob[0].id,
        recipientId: charlie[0].id,
        amount: '250.50',
        currency: 'USDO',
        status: 'completed' as const,
        type: 'send' as const,
        note: 'Freelance work payment',
        txHash: '0xdef456...',
        completedAt: new Date(),
      },
      {
        senderId: charlie[0].id,
        recipientId: alice[0].id,
        amount: '50.00',
        currency: 'USDO',
        status: 'pending' as const,
        type: 'send' as const,
        note: 'Coffee reimbursement',
      },
    ];

    await db.insert(payments).values(demoPayments);

    logger.info(`✅ Created ${demoPayments.length} demo payments`);

    // Create demo invoice
    logger.info('Creating demo invoice...');

    await db.insert(invoices).values({
      sellerId: bob[0].id,
      buyerId: alice[0].id,
      invoiceNumber: 'INV-2025-001',
      amount: '500.00',
      currency: 'USDO',
      title: 'Web Development Services',
      description: 'Frontend development for landing page',
      status: 'sent',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      items: JSON.stringify([
        { description: 'UI Design', quantity: 1, rate: 200, amount: 200 },
        { description: 'Frontend Development', quantity: 10, rate: 30, amount: 300 },
      ]),
    });

    logger.info('✅ Created demo invoice');

    // Create demo subscription
    logger.info('Creating demo subscription...');

    const now = new Date();
    const monthLater = new Date(now);
    monthLater.setMonth(monthLater.getMonth() + 1);

    await db.insert(subscriptions).values({
      subscriberId: alice[0].id,
      merchantId: charlie[0].id,
      name: 'Premium Plan',
      description: 'Monthly subscription for premium features',
      amount: '29.99',
      currency: 'USDO',
      interval: 'monthly',
      status: 'active',
      currentPeriodStart: now,
      currentPeriodEnd: monthLater,
      nextBillingDate: monthLater,
      totalPaid: '29.99',
      paymentCount: 1,
    });

    logger.info('✅ Created demo subscription');

    logger.info('🎉 Database seeding completed successfully!');
  } catch (error) {
    logger.error('❌ Database seeding failed:', error);
    throw error;
  }
};

// Run seed if this file is executed directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      logger.info('Seed process completed');
      process.exit(0);
    })
    .catch((error) => {
      logger.error('Seed process failed:', error);
      process.exit(1);
    });
}

export default seedDatabase;
