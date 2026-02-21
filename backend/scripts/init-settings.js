const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const settings = await prisma.settings.upsert({
    where: { id: 'main_settings' },
    update: {},
    create: {
      id: 'main_settings',
      siteName: 'Mi Plataforma de Rifas',
      primaryColor: '#111827',
      secondaryColor: '#1f2937',
      accentColor: '#ec4899',
      actionColor: '#0ea5e9',
    }
  });
  console.log('✅ Settings OK:', settings.id);
  await prisma.$disconnect();
}

main().catch(e => { console.error('❌ Error:', e.message); process.exit(1); });
