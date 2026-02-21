# Sorteos-Antonio-tradici-n-

# 🎯 Lucky Snap - Sistema de Rifas Completo

Sistema completo de gestión de rifas con panel de administración, frontend moderno y backend robusto.

## 🚀 Inicio Rápido

### Opción 1: Inicio Automático (Recomendado)
```bash
npm start
```
Este comando iniciará automáticamente tanto el frontend como el backend usando `start-app.js`.

### Opción 2: Inicio Manual
```bash
# Terminal 1 - Backend
cd backend
npm run start:dev

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

### Opción 3: Script Batch (Windows)
```bash
iniciar-completo.bat
```
Este script detiene procesos existentes, verifica dependencias y Prisma, e inicia ambos servidores en ventanas separadas.

## 📱 URLs de Acceso

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000/api
- **Panel Admin**: http://localhost:5173/#/admin
- **Health Check**: http://localhost:3000/api/health

## 🛠️ Comandos Disponibles

### Desarrollo
```bash
npm start              # Inicia toda la aplicación
npm run dev            # Modo desarrollo completo
npm run dev:frontend   # Solo frontend
npm run dev:backend    # Solo backend
```

### Construcción
```bash
npm run build          # Construye frontend y backend
npm run build:frontend # Solo frontend
npm run build:backend  # Solo backend
```

### Base de Datos
```bash
npm run migrate:status # Estado de migraciones
npm run migrate:deploy # Aplicar migraciones
npm run migrate:dev    # Migración de desarrollo
npm run backup         # Respaldar datos
npm run test:db        # Probar conexión DB
```

### Utilidades
```bash
npm run setup          # Instalar dependencias y configurar DB
npm run clean          # Limpiar node_modules
npm run typecheck      # Verificar tipos TypeScript
```

## 🏗️ Arquitectura

### Frontend (React + Vite)
- **Framework**: React 19 + TypeScript
- **Routing**: React Router DOM
- **UI**: Lucide React Icons + Tailwind CSS
- **Animaciones**: Framer Motion
- **Formularios**: React Hook Form

### Backend (NestJS)
- **Runtime**: Node.js 18+
- **Framework**: NestJS + TypeScript
- **Base de Datos**: PostgreSQL + Prisma ORM
- **CORS**: Configurado para desarrollo y producción

### Base de Datos
- **Motor**: PostgreSQL (Railway)
- **ORM**: Prisma
- **Migraciones**: Automáticas
- **Esquema**: Optimizado para rifas

## 📊 Funcionalidades

### Panel de Administración
- ✅ Gestión de Rifas
- ✅ Gestión de Órdenes/Apartados
- ✅ Gestión de Usuarios
- ✅ Gestión de Ganadores
- ✅ Estadísticas y Analytics
- ✅ Configuración del Sistema

### Frontend Público
- ✅ Visualización de Rifas Activas
- ✅ Compra de Boletos
- ✅ Historial de Órdenes
- ✅ Verificación de Boletos
- ✅ Información de Ganadores

## 🔧 Configuración

### Variables de Entorno
El archivo `backend/.env` contiene:
```env
DATABASE_URL=postgresql://...
PORT=3000
NODE_ENV=development
JWT_SECRET=...
```

### Base de Datos
- **Host**: Railway PostgreSQL
- **Puerto**: 50670
- **Esquema**: Automáticamente creado por Prisma

## 🚨 Solución de Problemas

### Verificar Estado de Servidores
```bash
node verificar-servidores.js
```
Este script verifica si los servidores frontend y backend están corriendo.

### Puerto en Uso
Si los puertos 3000 o 5173 están ocupados:
```bash
# Windows - Verificar procesos
netstat -ano | findstr :3000
netstat -ano | findstr :5173

# Terminar proceso (reemplazar PID)
taskkill /PID <PID> /F
```

O usa el script:
```bash
reiniciar-backend.bat
```

### Problemas de Dependencias
```bash
npm run clean
npm run install:all
```

### Problemas de Base de Datos
Si el backend no puede conectar a la base de datos, el servidor iniciará de todas formas e intentará reconectar automáticamente cada 10 segundos.

## 📈 Despliegue

### Desarrollo Local
```bash
npm start
# o
iniciar-completo.bat
```

### Producción

Para desplegar el backend en Railway, consulta la guía completa:
- **[DEPLOY-BACKEND-RAILWAY.md](./DEPLOY-BACKEND-RAILWAY.md)** - Guía paso a paso para deploy en Railway
- **[SOLUCION-DEFINITIVA-RAILWAY.md](./SOLUCION-DEFINITIVA-RAILWAY.md)** - Solución de problemas comunes en Railway

Para desarrollo local detallado:
- **[GUIA-INICIO-LOCAL.md](./GUIA-INICIO-LOCAL.md)** - Guía completa para iniciar el proyecto localmente

## 🤝 Soporte

Si encuentras problemas:
1. Verifica que Node.js 18+ esté instalado
2. Ejecuta `npm run setup` para configuración inicial
3. Revisa los logs en la consola
4. Verifica la conexión a la base de datos con `npm run test:db`

## 📝 Notas Importantes

- El backend usa NestJS con Prisma ORM
- La base de datos está configurada para Railway PostgreSQL
- CORS está configurado para desarrollo y producción
- Todas las rutas de API están bajo `/api`
- El panel de administración está en `/#/admin`
- El backend intenta reconectar automáticamente si la base de datos no está disponible inicialmente

## 📚 Documentación Adicional

- **[GUIA-INICIO-LOCAL.md](./GUIA-INICIO-LOCAL.md)** - Guía completa para desarrollo local
- **[DEPLOY-BACKEND-RAILWAY.md](./DEPLOY-BACKEND-RAILWAY.md)** - Guía de deploy en Railway
- **[SOLUCION-DEFINITIVA-RAILWAY.md](./SOLUCION-DEFINITIVA-RAILWAY.md)** - Solución de problemas en Railway

---

**¡Disfruta usando Lucky Snap! 🎉**