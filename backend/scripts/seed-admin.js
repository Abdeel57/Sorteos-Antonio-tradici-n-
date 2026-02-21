#!/usr/bin/env node
/**
 * Script de seed: crea usuario admin y settings iniciales si no existen.
 * Se ejecuta en cada deploy de Railway - es seguro porque usa upsert.
 */

const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seed() {
  console.log('🌱 Iniciando seed de base de datos...');

  // 1. Settings por defecto
  try {
    const existing = await prisma.settings.findUnique({ where: { id: 'main_settings' } });
    if (!existing) {
      await prisma.settings.create({
        data: {
          id: 'main_settings',
          siteName: 'Mi Plataforma de Rifas',
          primaryColor: '#111827',
          secondaryColor: '#1f2937',
          accentColor: '#ec4899',
          actionColor: '#0ea5e9',
        }
      });
      console.log('✅ Settings por defecto creados');
    } else {
      console.log('✅ Settings ya existen');
    }
  } catch (e) {
    console.error('⚠️ Error creando settings:', e.message);
  }

  // 2. Usuario admin desde variables de entorno
  try {
    const username = process.env.ADMIN_USERNAME || 'admin';
    const password = process.env.ADMIN_PASSWORD;

    if (!password) {
      console.log('⚠️ No se encontró ADMIN_PASSWORD en variables de entorno. Saltando creación de admin.');
    } else {
      const existing = await prisma.adminUser.findUnique({ where: { username } });
      if (!existing) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.adminUser.create({
          data: {
            id: `admin-${Date.now()}`,
            name: 'Administrador',
            username,
            password: hashedPassword,
            role: 'admin',
          }
        });
        console.log(`✅ Usuario admin '${username}' creado`);
      } else {
        console.log(`✅ Usuario '${username}' ya existe`);
      }
    }
  } catch (e) {
    console.error('⚠️ Error creando usuario admin:', e.message);
  }

  await prisma.$disconnect();
  console.log('✅ Seed completado');
}

seed().catch(e => {
  console.error('❌ Error en seed:', e);
  process.exit(0); // No fallar el deploy por error de seed
});
