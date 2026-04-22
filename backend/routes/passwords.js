const express = require('express');
const router = express.Router();
const db = require('../db/database');
const authMiddleware = require('../middleware/auth');

// Todas las rutas requieren JWT válido
router.use(authMiddleware);

// GET /api/passwords — obtener todas las contraseñas del usuario
router.get('/', (req, res) => {
  const passwords = db.prepare(`
    SELECT id, site_name, site_url, username, password, icon, category, notes, created_at, updated_at
    FROM passwords
    WHERE user_id = ?
    ORDER BY site_name ASC
  `).all(req.user.id);

  res.json(passwords);
});

// GET /api/passwords/:id — obtener una contraseña específica
router.get('/:id', (req, res) => {
  const entry = db.prepare(`
    SELECT * FROM passwords WHERE id = ? AND user_id = ?
  `).get(req.params.id, req.user.id);

  if (!entry) return res.status(404).json({ error: 'No encontrado.' });
  res.json(entry);
});

// POST /api/passwords — crear nueva contraseña
router.post('/', (req, res) => {
  const { site_name, site_url, username, password, icon, category, notes } = req.body;

  if (!site_name || !password) {
    return res.status(400).json({ error: 'Nombre del sitio y contraseña son obligatorios.' });
  }

  const result = db.prepare(`
    INSERT INTO passwords (user_id, site_name, site_url, username, password, icon, category, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    req.user.id,
    site_name,
    site_url || '',
    username,
    password,
    icon || 'globe',
    category || 'general',
    notes || ''
  );

  const created = db.prepare('SELECT * FROM passwords WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(created);
});

// PUT /api/passwords/:id — editar contraseña
router.put('/:id', (req, res) => {
  const entry = db.prepare('SELECT id FROM passwords WHERE id = ? AND user_id = ?').get(req.params.id, req.user.id);
  if (!entry) return res.status(404).json({ error: 'No encontrado.' });

  const { site_name, site_url, username, password, icon, category, notes } = req.body;

  db.prepare(`
    UPDATE passwords
    SET site_name = ?, site_url = ?, username = ?, password = ?, icon = ?, category = ?, notes = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ? AND user_id = ?
  `).run(site_name, site_url, username, password, icon, category, notes, req.params.id, req.user.id);

  const updated = db.prepare('SELECT * FROM passwords WHERE id = ?').get(req.params.id);
  res.json(updated);
});

// DELETE /api/passwords/:id — eliminar contraseña
router.delete('/:id', (req, res) => {
  const entry = db.prepare('SELECT id FROM passwords WHERE id = ? AND user_id = ?').get(req.params.id, req.user.id);
  if (!entry) return res.status(404).json({ error: 'No encontrado.' });

  db.prepare('DELETE FROM passwords WHERE id = ? AND user_id = ?').run(req.params.id, req.user.id);
  res.json({ message: 'Eliminado correctamente.' });
});

module.exports = router;