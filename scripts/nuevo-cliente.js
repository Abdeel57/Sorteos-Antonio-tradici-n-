#!/usr/bin/env node

/**
 * Script maestro para preparar la página para un nuevo cliente
 * Ejecuta: node scripts/nuevo-cliente.js [--solo-preparar | --solo-aplicar]
 *
 * Sin argumentos: prepara + aplica (si config-cliente.json está completo)
 * --solo-preparar: solo limpia datos y deja plantilla
 * --solo-aplicar: solo aplica config-cliente.json (sin limpiar)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  red: '\x1b[31m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkConfigComplete() {
  const configPath = path.join(__dirname, '..', 'config-cliente.json');
  if (!fs.existsSync(configPath)) return false;

  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  return config.clientName && config.clientName !== 'NOMBRE_DEL_CLIENTE' &&
         config.databaseUrl && !config.databaseUrl.includes('usuario:password');
}

function main() {
  const args = process.argv.slice(2);
  const soloPreparar = args.includes('--solo-preparar');
  const soloAplicar = args.includes('--solo-aplicar');

  log('\n🚀 Preparar página para nuevo cliente\n', 'bold');

  if (soloPreparar) {
    log('Ejecutando solo preparación (limpieza)...', 'blue');
    require('./prepare-new-client.js');
    return;
  }

  if (soloAplicar) {
    if (!checkConfigComplete()) {
      log('❌ config-cliente.json no está completo', 'red');
      log('   Completa los datos del cliente antes de usar --solo-aplicar', 'yellow');
      process.exit(1);
    }
    log('Ejecutando solo aplicación de configuración...', 'blue');
    require('./apply-client-config.js');
    return;
  }

  // Flujo completo
  log('1/2 Preparando proyecto (limpieza de datos)...', 'blue');
  require('./prepare-new-client.js');

  if (checkConfigComplete()) {
    log('\n2/2 Aplicando configuración del cliente...', 'blue');
    require('./apply-client-config.js');
    log('\n✅ Proceso completado. Sigue los pasos mostrados arriba.', 'green');
  } else {
    log('\n⚠️  config-cliente.json no está completo', 'yellow');
    log('   Completa los datos del cliente y ejecuta:', 'yellow');
    log('   node scripts/apply-client-config.js', 'blue');
    log('\n   O ejecuta el flujo completo de nuevo después de completar config-cliente.json', 'yellow');
  }
}

main();
