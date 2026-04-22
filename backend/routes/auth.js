const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/database');

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Usuario y contraseña requeridos.' });
  }

  const existing = db.prepare('SELECT id FROM users WHERE username = ?').get(username);
  if (existing) {
    return res.status(409).json({ error: 'El usuario ya existe.' });
  }

  const hash = await bcrypt.hash(password, 12);
  const result = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run(username, hash);

  res.status(201).json({ message: 'Usuario creado correctamente.', id: result.lastInsertRowid });
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Usuario y contraseña requeridos.' });
  }

  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  if (!user) {
    return res.status(401).json({ error: 'Credenciales incorrectas.' });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ error: 'Credenciales incorrectas.' });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.json({ token, username: user.username });
});

// GET /api/auth/verify  — comprueba si el token sigue siendo válido
router.get('/verify', require('../middleware/auth'), (req, res) => {
  res.json({ valid: true, user: req.user });
});

// PUT /api/auth/profile — cambiar username y/o contraseña
router.put('/profile', require('../middleware/auth'), async (req, res) => {
  const { currentPassword, newUsername, newPassword } = req.body;
  if (!currentPassword) return res.status(400).json({ error: 'La contraseña actual es requerida.' });

  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);
  const valid = await bcrypt.compare(currentPassword, user.password);
  if (!valid) return res.status(401).json({ error: 'Contraseña actual incorrecta.' });

  const changed = [];

  if (newUsername && newUsername.trim() && newUsername.trim() !== user.username) {
    if (newUsername.trim().length < 3)
      return res.status(400).json({ error: 'El usuario debe tener al menos 3 caracteres.' });
    const dup = db.prepare('SELECT id FROM users WHERE username = ? AND id != ?')
      .get(newUsername.trim(), user.id);
    if (dup) return res.status(409).json({ error: 'Ese nombre ya está en uso.' });
    db.prepare('UPDATE users SET username = ? WHERE id = ?').run(newUsername.trim(), user.id);
    changed.push('usuario');
  }

  if (newPassword) {
    if (newPassword.length < 6)
      return res.status(400).json({ error: 'La nueva contraseña debe tener al menos 6 caracteres.' });
    const hash = await bcrypt.hash(newPassword, 12);
    db.prepare('UPDATE users SET password = ? WHERE id = ?').run(hash, user.id);
    changed.push('contraseña');
  }

  if (changed.length === 0)
    return res.status(400).json({ error: 'No hay cambios que guardar.' });

  const updated = db.prepare('SELECT id, username FROM users WHERE id = ?').get(user.id);
  res.json({ message: `${changed.join(' y ')} actualizado correctamente.`, username: updated.username });
});

module.exports = router;