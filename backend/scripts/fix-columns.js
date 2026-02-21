const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fix() {
  console.log('🔧 Añadiendo columnas faltantes a la BD de producción...');

  // Columnas faltantes en settings
  const settingsColumns = [
    `ALTER TABLE "settings" ADD COLUMN IF NOT EXISTS "titleColor" TEXT`,
    `ALTER TABLE "settings" ADD COLUMN IF NOT EXISTS "subtitleColor" TEXT`,
    `ALTER TABLE "settings" ADD COLUMN IF NOT EXISTS "descriptionColor" TEXT`,
    `ALTER TABLE "settings" ADD COLUMN IF NOT EXISTS "logoAnimation" TEXT NOT NULL DEFAULT 'rotate'`,
    `ALTER TABLE "settings" ADD COLUMN IF NOT EXISTS "primaryColor" TEXT NOT NULL DEFAULT '#111827'`,
    `ALTER TABLE "settings" ADD COLUMN IF NOT EXISTS "secondaryColor" TEXT NOT NULL DEFAULT '#1f2937'`,
    `ALTER TABLE "settings" ADD COLUMN IF NOT EXISTS "accentColor" TEXT NOT NULL DEFAULT '#ec4899'`,
    `ALTER TABLE "settings" ADD COLUMN IF NOT EXISTS "actionColor" TEXT NOT NULL DEFAULT '#0ea5e9'`,
    `ALTER TABLE "settings" ADD COLUMN IF NOT EXISTS "emailFromName" TEXT`,
    `ALTER TABLE "settings" ADD COLUMN IF NOT EXISTS "emailReplyTo" TEXT`,
    `ALTER TABLE "settings" ADD COLUMN IF NOT EXISTS "emailSubject" TEXT`,
    `ALTER TABLE "settings" ADD COLUMN IF NOT EXISTS "displayPreferences" JSONB`,
    `ALTER TABLE "settings" ADD COLUMN IF NOT EXISTS "faqs" JSONB`,
    `ALTER TABLE "settings" ADD COLUMN IF NOT EXISTS "paymentAccounts" JSONB`,
  ];

  // Columnas faltantes en raffles
  const rafflesColumns = [
    `ALTER TABLE "raffles" ADD COLUMN IF NOT EXISTS "purchaseDescription" TEXT`,
    `ALTER TABLE "raffles" ADD COLUMN IF NOT EXISTS "gallery" JSONB`,
    `ALTER TABLE "raffles" ADD COLUMN IF NOT EXISTS "drawDate" TIMESTAMP(3)`,
    `ALTER TABLE "raffles" ADD COLUMN IF NOT EXISTS "tickets" INTEGER NOT NULL DEFAULT 100`,
    `ALTER TABLE "raffles" ADD COLUMN IF NOT EXISTS "sold" INTEGER NOT NULL DEFAULT 0`,
    `ALTER TABLE "raffles" ADD COLUMN IF NOT EXISTS "slug" TEXT`,
    `ALTER TABLE "raffles" ADD COLUMN IF NOT EXISTS "status" TEXT NOT NULL DEFAULT 'draft'`,
    `ALTER TABLE "raffles" ADD COLUMN IF NOT EXISTS "boletosConOportunidades" BOOLEAN NOT NULL DEFAULT false`,
    `ALTER TABLE "raffles" ADD COLUMN IF NOT EXISTS "numeroOportunidades" INTEGER NOT NULL DEFAULT 1`,
    `ALTER TABLE "raffles" ADD COLUMN IF NOT EXISTS "giftTickets" INTEGER DEFAULT 0`,
    `ALTER TABLE "raffles" ADD COLUMN IF NOT EXISTS "packs" JSONB`,
    `ALTER TABLE "raffles" ADD COLUMN IF NOT EXISTS "bonuses" TEXT[]`,
    `ALTER TABLE "raffles" ADD COLUMN IF NOT EXISTS "price" DOUBLE PRECISION NOT NULL DEFAULT 50`,
  ];

  // Columnas faltantes en users
  const usersColumns = [
    `ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "phone" TEXT`,
    `ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "district" TEXT`,
  ];

  // Columnas faltantes en orders
  const ordersColumns = [
    `ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP`,
  ];

  // RELEASED enum en OrderStatus
  const enumFix = [
    `DO $$ BEGIN
      ALTER TYPE "OrderStatus" ADD VALUE IF NOT EXISTS 'RELEASED';
    EXCEPTION WHEN duplicate_object THEN null;
    EXCEPTION WHEN others THEN null;
    END $$`,
  ];

  // Columnas faltantes en winners
  const winnersColumns = [
    `ALTER TABLE "winners" ADD COLUMN IF NOT EXISTS "name" TEXT NOT NULL DEFAULT ''`,
    `ALTER TABLE "winners" ADD COLUMN IF NOT EXISTS "prize" TEXT NOT NULL DEFAULT ''`,
    `ALTER TABLE "winners" ADD COLUMN IF NOT EXISTS "imageUrl" TEXT NOT NULL DEFAULT ''`,
    `ALTER TABLE "winners" ADD COLUMN IF NOT EXISTS "raffleTitle" TEXT NOT NULL DEFAULT ''`,
    `ALTER TABLE "winners" ADD COLUMN IF NOT EXISTS "drawDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    `ALTER TABLE "winners" ADD COLUMN IF NOT EXISTS "ticketNumber" INTEGER`,
    `ALTER TABLE "winners" ADD COLUMN IF NOT EXISTS "testimonial" TEXT`,
    `ALTER TABLE "winners" ADD COLUMN IF NOT EXISTS "phone" TEXT`,
    `ALTER TABLE "winners" ADD COLUMN IF NOT EXISTS "city" TEXT`,
    `ALTER TABLE "winners" ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP`,
  ];

  const allCommands = [
    ...settingsColumns,
    ...rafflesColumns,
    ...usersColumns,
    ...ordersColumns,
    ...winnersColumns,
    ...enumFix,
  ];

  let ok = 0, errors = 0;
  for (const sql of allCommands) {
    try {
      await prisma.$executeRawUnsafe(sql);
      ok++;
    } catch (e) {
      if (!e.message.includes('already exists') && !e.message.includes('duplicate')) {
        console.warn(`  ⚠️ ${e.message.split('\n')[0]}`);
        errors++;
      }
    }
  }

  console.log(`✅ Completado: ${ok} columnas procesadas, ${errors} errores`);

  // Verificar que settings tiene las columnas críticas
  try {
    const test = await prisma.settings.findUnique({ where: { id: 'main_settings' } });
    console.log('✅ Settings query OK, siteName:', test?.siteName || '(vacío)');
  } catch (e) {
    console.error('❌ Settings query todavía falla:', e.message);
  }

  await prisma.$disconnect();
}

fix().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
