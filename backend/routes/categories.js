const express = require('express');
const router  = express.Router();
const db      = require('../db/database');
const auth    = require('../middleware/auth');

router.use(auth);

// GET /api/categories — categorías personalizadas del usuario
router.get('/', (req, res) => {
  const cats = db.prepare(
    'SELECT * FROM categories WHERE user_id = ? ORDER BY name ASC'
  ).all(req.user.id);
  res.json(cats);
});

// POST /api/categories — crear categoría
router.post('/', (req, res) => {
  const { name } = req.body;
  if (!name?.trim()) return res.status(400).json({ error: 'El nombre es obligatorio.' });

  // Generar slug: quitar tildes, minúsculas, guiones
  const slug = name.trim()
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .substring(0, 40);

  if (!slug) return res.status(400).json({ error: 'Nombre inválido.' });

  const reserved = ['social', 'trabajo', 'banco', 'apps', 'all', 'general', 'otros', 'compras'];
  if (reserved.includes(slug))
    return res.status(409).json({ error: 'Ese nombre está reservado por el sistema.' });

  const dup = db.prepare(
    'SELECT id FROM categories WHERE user_id = ? AND slug = ?'
  ).get(req.user.id, slug);
  if (dup) return res.status(409).json({ error: 'Ya existe esa categoría.' });

  const result = db.prepare(
    'INSERT INTO categories (user_id, name, slug) VALUES (?, ?, ?)'
  ).run(req.user.id, name.trim(), slug);

  res.status(201).json({ id: result.lastInsertRowid, name: name.trim(), slug });
});

// DELETE /api/categories/:id — eliminar categoría
router.delete('/:id', (req, res) => {
  const cat = db.prepare(
    'SELECT id FROM categories WHERE id = ? AND user_id = ?'
  ).get(req.params.id, req.user.id);
  if (!cat) return res.status(404).json({ error: 'No encontrado.' });

  db.prepare('DELETE FROM categories WHERE id = ? AND user_id = ?')
    .run(req.params.id, req.user.id);
  res.json({ message: 'Categoría eliminada.' });
});

module.exports = router;
