const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.adminUser.findMany();
  console.log('Usuarios en BD:', users.length);
  users.forEach(u => console.log(' -', u.username, '| role:', u.role, '| id:', u.id, '| pass hash:', u.password.substring(0, 20) + '...'));
  await prisma.$disconnect();
}
main().catch(e => { console.error('Error:', e.message); process.exit(1); });
