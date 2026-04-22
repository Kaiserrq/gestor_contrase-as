require('dotenv').config();
const express = require('express');
const path    = require('path');

const app  = express();
const ROOT = path.join(__dirname, '..');

// ── Middlewares de parseo ─────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Protección de rutas sensibles ─────────────────────────────────────────────
// Bloquea el acceso a archivos de config, backend y node_modules
const BLOCKED = [
  /^\/\.env/i,
  /^\/package(-lock)?\.json/i,
  /^\/node_modules/i,
  /^\/backend/i,
  /^\/passwords\.db/i,
  /^\/\.gitignore/i,
  /^\/\.qodo/i,
];

app.use((req, res, next) => {
  const blocked = BLOCKED.some(re => re.test(req.path));
  if (blocked) {
    return res.status(403).json({ error: 'Acceso denegado.' });
  }
  next();
});

// ── Archivos estáticos del frontend (ahora en la raíz del proyecto) ───────────
app.use(express.static(ROOT, { index: false }));

// ── Rutas de la API ───────────────────────────────────────────────────────────
app.use('/api/auth',       require('./routes/auth'));
app.use('/api/passwords',  require('./routes/passwords'));
app.use('/api/categories', require('./routes/categories'));

// ── Favicon / logo ────────────────────────────────────────────────────────────
app.get('/icono.jpg',   (req, res) => res.sendFile(path.join(ROOT, 'icono.jpg')));
app.get('/favicon.ico', (req, res) => res.sendFile(path.join(ROOT, 'icono.jpg')));

// ── Páginas HTML explícitas ───────────────────────────────────────────────────
app.get('/login.html',      (req, res) => res.sendFile(path.join(ROOT, 'login.html')));
app.get('/dashboard.html',  (req, res) => res.sendFile(path.join(ROOT, 'dashboard.html')));
app.get('/passwords.html',  (req, res) => res.sendFile(path.join(ROOT, 'passwords.html')));
app.get('/profile.html',    (req, res) => res.sendFile(path.join(ROOT, 'profile.html')));

// ── Ruta raíz → login ─────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.sendFile(path.join(ROOT, 'login.html'));
});

// ── Iniciar servidor ──────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log('Presiona Ctrl+C para detener');
});