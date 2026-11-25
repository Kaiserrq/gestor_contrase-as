# KeyVault — gestor de contraseñas

Frontend HTML/JS vanilla (raíz) + backend Express/SQLite (`backend/`).

## Demo

Versión sin backend ni datos reales, pensada para Netlify (portafolio).

- Se activa sola en dominios `*.netlify.app`, con `window.DEMO_MODE = true` o añadiendo `?demo` a la URL (p. ej. `/login.html?demo`; dura mientras la pestaña esté abierta, `?demo=0` la desactiva).
- Todo se guarda en `localStorage` (claves `demo_*`), solo en tu navegador.
- Credenciales: usuario `demo` / contraseña `demo1234` (prellenadas en el login). Las entradas son ficticias.
- El botón "Restablecer" de la píldora superior (o "Restablecer demo" en Perfil) borra los datos y vuelve a los de ejemplo.
- Despliegue: conectar el repo a Netlify; `netlify.toml` publica la raíz sin build ni funciones.

## Correr con backend local

```bash
npm install
# crear .env con JWT_SECRET=<secreto> y JWT_EXPIRES_IN=7d (opcional PORT)
npm start        # http://localhost:3000
```

El servidor sirve el frontend y la API (`/api`), con la base SQLite en `passwords.db`.
