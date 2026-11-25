// ====================================================
//  KeyVault — Modo DEMO (sin backend)
//  Reemplaza los métodos de `api` por una implementación
//  que guarda todo en localStorage (claves con prefijo demo_).
//  Datos 100% ficticios. Misma interfaz y formas de respuesta
//  que backend/routes/*.js.
// ====================================================
(function () {
  const P = 'demo_';
  const read = (k, d) => { try { const v = localStorage.getItem(P + k); return v ? JSON.parse(v) : d; } catch (_) { return d; } };
  const write = (k, v) => localStorage.setItem(P + k, JSON.stringify(v));
  const now = () => new Date().toISOString().replace('T', ' ').slice(0, 19);

  function seed() {
    if (read('seeded', false)) return;
    const t = now();
    const mk = (id, site_name, site_url, username, password, icon, category, notes) =>
      ({ id, user_id: 1, site_name, site_url, username, password, icon, category, notes, created_at: t, updated_at: t });
    write('users', [{ id: 1, username: 'demo', password: 'demo1234' }]);
    write('passwords', [
      mk(1, 'Red Social Ejemplo', 'https://social.example.com', 'demo_user', 'Falsa-Pass-001', 'user', 'social', 'Dato ficticio'),
      mk(2, 'Foto Share', 'https://fotos.example.com', 'demo@example.com', 'Falsa-Pass-002', 'star', 'social', ''),
      mk(3, 'Correo Trabajo', 'https://mail.example.com', 'demo@empresa.example', 'Falsa-Pass-003', 'mail', 'trabajo', 'Cuenta de ejemplo'),
      mk(4, 'Repositorio de Código', 'https://git.example.com', 'demo-dev', 'Falsa-Pass-004', 'github', 'trabajo', ''),
      mk(5, 'Servidor Interno', 'https://intranet.example.com', 'admin-demo', 'Falsa-Pass-005', 'server', 'trabajo', 'Solo demostración'),
      mk(6, 'Banco Ejemplo', 'https://banco.example.com', '00000000', 'Falsa-Pass-006', 'card', 'banco', 'No es un banco real'),
      mk(7, 'Tienda Online', 'https://tienda.example.com', 'demo@example.com', 'Falsa-Pass-002', 'shopping', 'apps', ''),
      mk(8, 'WiFi Casa', '', 'RedDemo', 'casa1234', 'wifi', 'apps', 'Contraseña ficticia')
    ]);
    write('categories', [{ id: 1, user_id: 1, name: 'Streaming', slug: 'streaming', created_at: t }]);
    write('seq', { passwords: 8, categories: 1, users: 1 });
    write('seeded', true);
  }
  const nextId = (t) => { const s = read('seq', {}); s[t] = (s[t] || 0) + 1; write('seq', s); return s[t]; };
  const me = () => {
    const tk = localStorage.getItem('token') || '';
    const m = /^demo-token-(\d+)$/.exec(tk);
    return m ? read('users', []).find(u => u.id === +m[1]) : null;
  };
  const NOAUTH = { error: 'Token inválido o expirado.' };

  seed();

  Object.assign(api, {
    async login(username, password) {
      if (!username || !password) return { error: 'Usuario y contraseña requeridos.' };
      const u = read('users', []).find(x => x.username === username);
      if (!u || u.password !== password) return { error: 'Credenciales incorrectas.' };
      return { token: 'demo-token-' + u.id, username: u.username };
    },
    async register(username, password) {
      if (!username || !password) return { error: 'Usuario y contraseña requeridos.' };
      const users = read('users', []);
      if (users.find(x => x.username === username)) return { error: 'El usuario ya existe.' };
      const id = nextId('users');
      users.push({ id, username, password });
      write('users', users);
      return { message: 'Usuario creado correctamente.', id };
    },
    async verify() {
      const u = me();
      return u ? { valid: true, user: { id: u.id, username: u.username } } : { ...NOAUTH, valid: false };
    },
    async getPasswords() {
      const u = me(); if (!u) { this.logout(); return []; }
      return read('passwords', []).filter(p => p.user_id === u.id)
        .sort((a, b) => a.site_name.localeCompare(b.site_name));
    },
    async createPassword(data) {
      const u = me(); if (!u) return NOAUTH;
      if (!data.site_name || !data.password) return { error: 'Nombre del sitio y contraseña son obligatorios.' };
      const t = now();
      const e = {
        id: nextId('passwords'), user_id: u.id, site_name: data.site_name, site_url: data.site_url || '',
        username: data.username, password: data.password, icon: data.icon || 'globe',
        category: data.category || 'general', notes: data.notes || '', created_at: t, updated_at: t
      };
      const all = read('passwords', []); all.push(e); write('passwords', all);
      return e;
    },
    async updatePassword(id, data) {
      const u = me(); if (!u) return NOAUTH;
      const all = read('passwords', []);
      const e = all.find(p => p.id === +id && p.user_id === u.id);
      if (!e) return { error: 'No encontrado.' };
      ['site_name', 'site_url', 'username', 'password', 'icon', 'category', 'notes']
        .forEach(k => { if (data[k] !== undefined) e[k] = data[k]; });
      e.updated_at = now();
      write('passwords', all);
      return e;
    },
    async deletePassword(id) {
      const u = me(); if (!u) return NOAUTH;
      const all = read('passwords', []);
      if (!all.find(p => p.id === +id && p.user_id === u.id)) return { error: 'No encontrado.' };
      write('passwords', all.filter(p => !(p.id === +id && p.user_id === u.id)));
      return { message: 'Eliminado correctamente.' };
    },
    async getCategories() {
      const u = me(); if (!u) return [];
      return read('categories', []).filter(c => c.user_id === u.id).sort((a, b) => a.name.localeCompare(b.name));
    },
    async createCategory(name) {
      const u = me(); if (!u) return NOAUTH;
      if (!name || !name.trim()) return { error: 'El nombre es obligatorio.' };
      const slug = name.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
        .replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').substring(0, 40);
      if (!slug) return { error: 'Nombre inválido.' };
      if (['social', 'trabajo', 'banco', 'apps', 'all', 'general', 'otros', 'compras'].includes(slug))
        return { error: 'Ese nombre está reservado por el sistema.' };
      const cats = read('categories', []);
      if (cats.find(c => c.user_id === u.id && c.slug === slug)) return { error: 'Ya existe esa categoría.' };
      const c = { id: nextId('categories'), user_id: u.id, name: name.trim(), slug, created_at: now() };
      cats.push(c); write('categories', cats);
      return { id: c.id, name: c.name, slug };
    },
    async deleteCategory(id) {
      const u = me(); if (!u) return NOAUTH;
      const cats = read('categories', []);
      if (!cats.find(c => c.id === +id && c.user_id === u.id)) return { error: 'No encontrado.' };
      write('categories', cats.filter(c => !(c.id === +id && c.user_id === u.id)));
      return { message: 'Categoría eliminada.' };
    },
    async updateProfile({ currentPassword, newUsername, newPassword } = {}) {
      const u = me(); if (!u) return NOAUTH;
      if (!currentPassword) return { error: 'La contraseña actual es requerida.' };
      if (u.password !== currentPassword) return { error: 'Contraseña actual incorrecta.' };
      const users = read('users', []);
      const cur = users.find(x => x.id === u.id);
      const changed = [];
      if (newUsername && newUsername.trim() && newUsername.trim() !== cur.username) {
        if (newUsername.trim().length < 3) return { error: 'El usuario debe tener al menos 3 caracteres.' };
        if (users.find(x => x.username === newUsername.trim() && x.id !== cur.id)) return { error: 'Ese nombre ya está en uso.' };
        cur.username = newUsername.trim(); changed.push('usuario');
      }
      if (newPassword) {
        if (newPassword.length < 6) return { error: 'La nueva contraseña debe tener al menos 6 caracteres.' };
        cur.password = newPassword; changed.push('contraseña');
      }
      if (!changed.length) return { error: 'No hay cambios que guardar.' };
      write('users', users);
      return { message: `${changed.join(' y ')} actualizado correctamente.`, username: cur.username };
    }
  });

  // ── Píldora demo (descartable) + reinicio + chip de credenciales ────
  function resetDemo() {
    Object.keys(localStorage).filter(k => k.startsWith(P) && k !== P + 'active')
      .forEach(k => localStorage.removeItem(k));
    localStorage.removeItem('token'); localStorage.removeItem('username');
    window.location.href = '/login.html';
  }
  window.kvResetDemo = resetDemo;   // lo usa también la página de perfil

  document.addEventListener('DOMContentLoaded', () => {
    let dismissed = false;
    try { dismissed = sessionStorage.getItem('demo_pill_off') === '1'; } catch (_) {}
    if (!dismissed) {
      const wrap = document.createElement('div');
      wrap.className = 'demo-wrap';
      wrap.innerHTML = '<div class="demo-pill" role="note"><span>Modo demo</span>' +
        '<button type="button" class="demo-reset">Restablecer</button>' +
        '<button type="button" class="demo-x" aria-label="Ocultar aviso de demo">×</button></div>';
      wrap.querySelector('.demo-reset').addEventListener('click', resetDemo);
      wrap.querySelector('.demo-x').addEventListener('click', () => {
        try { sessionStorage.setItem('demo_pill_off', '1'); } catch (_) {}
        wrap.remove();
      });
      document.body.appendChild(wrap);   // en la app, shell.js lo recoloca arriba del contenido
    }

    // Login: chip clicable que autocompleta las credenciales de demo
    const u = document.getElementById('login-user'), p = document.getElementById('login-pass');
    const chip = document.getElementById('demo-chip');
    if (u && p && chip) {
      chip.classList.remove('hidden');
      chip.addEventListener('click', () => {
        u.value = 'demo'; p.value = 'demo1234';
        p.focus();
      });
    }
  });
})();
