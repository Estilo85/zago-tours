import { prisma } from './client';
import bcrypt from 'bcryptjs';

(async () => {
  try {
    const email = process.env.SUPER_ADMIN_EMAIL;
    const password = process.env.SUPER_ADMIN_PASSWORD;
    const name = process.env.SUPER_ADMIN_NAME;

    if (!email || !password) {
      console.error('❌ ERROR: Could not find ADMIN_EMAIL or ADMIN_PASSWORD.');
      console.log(
        'Make sure you are running the command with the -e apps/api/.env flag!'
      );
      process.exit(1);
    }

    console.log(`🌱 Seeding admin user: ${email}`);

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.upsert({
      where: { email },
      update: { password: hashedPassword },
      create: {
        email,
        name: name || 'Admin',
        password: hashedPassword,
        role: 'SUPER_ADMIN',
        referralCode: `ADMIN-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      },
    });

    console.log('✅ Seed successful');
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
