# 🚀 Guía: Preparar Página para Nuevo Cliente

Esta guía te permite estructurar y configurar la plataforma de rifas para un cliente nuevo de forma rápida y ordenada.

---

## 📋 Opción A: Flujo Rápido (Recomendado)

### Paso 1: Reúne los datos del cliente

Usa `config-cliente.json` o completa el cuestionario en `DATOS-CLIENTE.md`. Necesitas:

| Campo | Requerido | Ejemplo |
|-------|-----------|---------|
| Nombre del cliente | ✅ | "Rifas García" |
| Dominio | ⚠️ | "rifasgarcia.com" |
| URL PostgreSQL | ✅ | postgresql://user:pass@host:5432/db |
| Usuario admin | ✅ | admin |
| Contraseña admin | ✅ | ******* |
| Email admin | ❌ | admin@rifasgarcia.com |
| Nombre del admin | ❌ | "Juan García" |

### Paso 2: Completa `config-cliente.json`

Edita el archivo en la raíz del proyecto con los datos del cliente:

```json
{
  "clientName": "Rifas García",
  "domain": "rifasgarcia.com",
  "databaseUrl": "postgresql://usuario:password@host:puerto/database",
  "admin": {
    "username": "admin",
    "password": "tu_password_seguro",
    "email": "admin@rifasgarcia.com",
    "name": "Juan García"
  }
}
```

### Paso 3: Duplica el proyecto

1. **Copia toda la carpeta** del proyecto
2. **Renómbrala** con el nombre del cliente (ej: `Rifas Garcia`)
3. **Entra** en la carpeta duplicada

### Paso 4: Ejecuta el script de preparación

En la carpeta del **nuevo cliente** (la duplicada):

```bash
node scripts/prepare-new-client.js
```

Esto limpia datos de ejemplo y deja la base lista.

### Paso 5: Aplica la configuración

```bash
node scripts/apply-client-config.js
```

Esto crea `.env`, actualiza dominios en el backend y genera el script para crear el usuario admin.

### Paso 6: Inicializa la base de datos

```bash
cd backend
npm run migrate:deploy
cd ..
```

### Paso 7: Crea el usuario administrador

```bash
CREAR-ADMIN-CLIENTE.bat
```

O manualmente:

```bash
node backend/scripts/create-admin-user.js admin tu_password admin@cliente.com "Nombre Admin"
```

### Paso 8: Inicia la aplicación

```bash
npm start
```

### Paso 9: Configura desde el panel

1. Abre: http://localhost:5173/#/admin
2. Inicia sesión con el usuario admin
3. Ve a **Configuración** y completa:
   - Nombre del sitio
   - Logo y favicon
   - Colores de marca
   - WhatsApp, email, redes sociales
   - Cuentas de pago
   - Preguntas frecuentes

### Paso 10: Personaliza meta tags

Edita `frontend/index.html`:
- Título de la página
- URLs de Open Graph y Twitter
- Descripciones

---

## 📋 Opción B: Configuración interactiva

Si prefieres guía paso a paso sin editar JSON:

```bash
node scripts/setup-new-client.js
```

Responde las preguntas y sigue las instrucciones que aparecen.

---

## 📁 Estructura de archivos clave

```
proyecto/
├── config-cliente.json          ← Datos del cliente (editar)
├── config-cliente.ejemplo.json  ← Plantilla de referencia
├── DATOS-CLIENTE.md             ← Cuestionario para recopilar datos
├── scripts/
│   ├── prepare-new-client.js    ← Limpia datos de ejemplo
│   ├── apply-client-config.js   ← Aplica config-cliente.json
│   └── setup-new-client.js      ← Configuración interactiva
├── backend/
│   ├── .env                     ← Se genera con apply-client-config
│   └── src/main.ts              ← Dominios CORS (se actualizan automáticamente)
└── frontend/
    └── index.html               ← Meta tags (editar manualmente)
```

---

## ⚠️ Checklist final antes de entregar

- [ ] Base de datos PostgreSQL creada y migrada
- [ ] Usuario admin creado
- [ ] Dominios agregados en `backend/src/main.ts`
- [ ] Configuración del sitio completada en el panel admin
- [ ] Logo y favicon subidos
- [ ] Meta tags actualizados en `index.html`
- [ ] WhatsApp y contacto configurados
- [ ] Cuentas de pago configuradas
- [ ] Primera rifa de prueba creada

---

## 🔗 Recursos útiles

- **Crear PostgreSQL**: [Railway](https://railway.app) | [Supabase](https://supabase.com)
- **Deploy frontend**: Netlify, Vercel
- **Deploy backend**: Railway, Render

---

## 📞 Soporte

Si algo falla, revisa:
1. `backend/.env` tiene la URL correcta de la base de datos
2. Las migraciones se ejecutaron sin errores
3. Los dominios en `main.ts` coinciden con el sitio del cliente
