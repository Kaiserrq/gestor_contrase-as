# KeyVault (gestor de contraseñas)
Frontend HTML/CSS/JS vanilla (sin build) + backend Express/SQLite opcional (`backend/`). Demo en Netlify con localStorage.

## Correr
- Estático/demo: `python -m http.server 5500` y abrir `/login.html?demo` (se recuerda en sessionStorage; `?demo=0` lo quita). Demo: `demo` / `demo1234`.
- Backend real: `npm install && npm start` (http://localhost:3000, requiere `.env` con JWT_SECRET).

## Estructura
- `css/style.css`: único CSS, por secciones (tokens, componentes, login, layout, panel, lista, drawer/modales, toasts, perfil, responsive).
- `login.html` + `js/auth.js`: escena 3D, pestañas, tilt de tarjeta.
- `dashboard.html`, `passwords.html`, `profile.html`: solo `<div id="page-content">`; `js/shell.js` construye sidebar, topbar, barra inferior móvil y modales/drawer compartidos.
- `js/passwords.js`: utilidades globales (iconos svg(), toasts, copiar con limpieza 20 s, fuerza, generador, tilt, confirmDialog, focus trap).
- `js/dashboard.js`: lógica de panel y contraseñas (salud, tarjetas/chips, lista/cuadrícula, drawer, modal con generador). `js/io.js`: exportar TXT/PDF e importar. `js/categories.js`: categorías (emite evento `kv:cats`). `js/profile.js`.
- `js/api.js` / `js/api-demo.js`: contrato intacto (solo cambió la UI de la píldora demo y 2 semillas: WiFi débil y clave repetida).

## Decisiones del rediseño (rama `rediseno`)
- Sidebar sticky 100dvh, colapsable (localStorage `kv_side`; <1100px colapsada por defecto). <768px: barra inferior con FAB, sin sidebar.
- Preferencias: `kv_view` (list/grid); píldora demo descartable en sessionStorage `demo_pill_off`; `kvResetDemo` expuesto para el Perfil.
- Salud 0-100: débil=1, media=0.4, repetida>=0.6 de penalización por entrada.
- Animaciones solo transform/opacity (el anillo usa stroke-dashoffset). Tilt solo puntero fino y sin reduced-motion.
- `.preview/` (capturas Playwright) está en .gitignore.

## Pendientes
- Probar contra el backend real (solo se verificó modo demo).
- Pulir el emblema 3D del login en navegadores sin `mask` conic.
