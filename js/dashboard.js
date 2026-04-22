const ICONS = {
  globe: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  lock: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  mail: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  user: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  card: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,
  wifi: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="currentColor"/></svg>`,
  github: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`,
  shopping: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`,
  server: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>`,
  star: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  phone: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.64 3.35 2 2 0 0 1 3.61 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.69A16 16 0 0 0 16 16.73l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  key: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>`,
};

const ICON_EMOJIS = {
  globe: '🌐', lock: '🔒', mail: '📧', user: '👤', card: '💳',
  wifi: '📶', github: '🐙', shopping: '🛒', server: '🖥️', star: '⭐',
  phone: '📱', key: '🔑'
};

let allPasswords = [];
let customCategories = [];
let currentFilter = 'all';
let editingId = null;

document.addEventListener('DOMContentLoaded', async () => {
  // Verificar autenticación
  if (!api.getToken()) return window.location.href = '/login.html';
  const auth = await api.verify();
  if (!auth.valid) return api.logout();

  // Mostrar nombre de usuario
  const uname = localStorage.getItem('username') || auth.user.username;
  document.getElementById('username-display').textContent = uname;
  document.getElementById('user-avatar').textContent = uname[0].toUpperCase();

  await loadPasswords();

  // Búsqueda
  document.getElementById('search-input')?.addEventListener('input', (e) => renderPasswords(e.target.value));

  // Filtros de categoría
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.cat;
      renderPasswords(document.getElementById('search-input')?.value || '');
    });
  });

  // Botón cerrar sesión
  document.getElementById('btn-logout')?.addEventListener('click', () => api.logout());

  // Botón agregar contraseña
  document.getElementById('btn-add')?.addEventListener('click', () => openModal());

  // Modal: cerrar
  document.getElementById('modal-overlay')?.addEventListener('click', (e) => {
    if (e.target.id === 'modal-overlay') closeModal();
  });
  document.getElementById('btn-modal-cancel')?.addEventListener('click', closeModal);
  document.getElementById('btn-modal-save')?.addEventListener('click', savePassword);

  // Selector de íconos
  renderIconPicker();

  // Cargar categorías personalizadas
  await loadCategories();

  // Listeners modal de categoría
  document.getElementById('btn-add-category')?.addEventListener('click', openCategoryModal);
  document.getElementById('btn-cat-modal-cancel')?.addEventListener('click', closeCategoryModal);
  document.getElementById('cat-modal-overlay')?.addEventListener('click', e => {
    if (e.target.id === 'cat-modal-overlay') closeCategoryModal();
  });
  document.getElementById('btn-cat-save')?.addEventListener('click', saveCategoryModal);
  document.getElementById('new-cat-name')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') saveCategoryModal();
  });

  // Aplicar filtro de URL si viene desde sidebar
  const urlCat = window.__urlCat || new URLSearchParams(location.search).get('cat');
  if (urlCat && urlCat !== 'all') {
    currentFilter = urlCat;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    const activeBtn = document.querySelector(`.filter-btn[data-cat="${urlCat}"]`);
    if (activeBtn) activeBtn.classList.add('active');
    renderPasswords('');
    const labels = { social: 'Redes Sociales', trabajo: 'Trabajo', banco: 'Banco', apps: 'Otras aplicaciones' };
    const titleEl = document.getElementById('page-title');
    const subEl = document.getElementById('page-subtitle');
    if (titleEl && labels[urlCat]) titleEl.textContent = labels[urlCat];
    if (subEl && labels[urlCat]) subEl.textContent = 'Filtrando por categoría';
  }
});

async function loadPasswords() {
  allPasswords = await api.getPasswords();
  updateStats();
  renderPasswords('');
}

function updateStats() {
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  const count = cat => allPasswords.filter(p => p.category === cat).length;
  set('nav-count', allPasswords.length);
  set('stat-total', allPasswords.length);
  set('stat-social', count('social'));
  set('stat-trabajo', count('trabajo'));
  set('stat-banco', count('banco'));
  set('stat-apps', count('apps'));
}

function renderPasswords(query = '') {
  const grid = document.getElementById('passwords-grid');
  let list = allPasswords;

  if (currentFilter !== 'all') list = list.filter(p => p.category === currentFilter);
  if (query) {
    const q = query.toLowerCase();
    list = list.filter(p =>
      p.site_name.toLowerCase().includes(q) ||
      p.username.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }

  if (list.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-2h2v2h-2zm0-4V7h2v6h-2z"/></svg>
        <h3>Sin contraseñas guardadas</h3>
        <p>Haz clic en "+ Agregar" para guardar tu primera contraseña.</p>
      </div>`;
    return;
  }

  grid.innerHTML = list.map(p => `
    <div class="pw-card" id="card-${p.id}">
      <div class="pw-card-header">
        <div class="pw-icon">${ICONS[p.icon] ? `<svg-icon data-icon="${p.icon}"></svg-icon>` : '🌐'}</div>
        <div class="pw-card-title">
          <h4>${escHtml(p.site_name)}</h4>
          ${p.site_url ? `<a href="${escHtml(p.site_url)}" target="_blank">${escHtml(p.site_url)}</a>` : '<span style="font-size:11px;color:var(--muted)">Sin URL</span>'}
        </div>
        <span class="badge badge-${p.category}">${p.category}</span>
      </div>
      <div class="pw-card-field">
        <div class="pw-card-field-label">Usuario</div>
        <div class="pw-card-field-value">
          <span class="val">${escHtml(p.username)}</span>
          <button class="btn-icon" title="Copiar usuario" onclick="copyText('${escAttr(p.username)}', 'Usuario copiado')">
            ${copyIcon()}
          </button>
        </div>
      </div>
      <div class="pw-card-field">
        <div class="pw-card-field-label">Contraseña</div>
        <div class="pw-card-field-value">
          <span class="val pw-masked" id="pw-val-${p.id}" data-pw="${escAttr(p.password)}" title="Pasa el cursor o toca para ver">••••••••</span>
          <button class="btn-icon" title="Mostrar/ocultar contraseña" onclick="togglePwVisible(${p.id})">
            ${eyeIcon()}
          </button>
          <button class="btn-icon" title="Copiar contraseña" onclick="copyText('${escAttr(p.password)}', 'Contraseña copiada')">
            ${copyIcon()}
          </button>
        </div>
      </div>
      <div class="pw-card-footer">
        <span style="font-size:11px;color:var(--muted)">${formatDate(p.updated_at)}</span>
        <div class="pw-card-actions">
          <button class="btn-icon" title="Editar" onclick="openModal(${p.id})">${editIcon()}</button>
          <button class="btn-icon btn-danger" title="Eliminar" onclick="deletePassword(${p.id})">${trashIcon()}</button>
        </div>
      </div>
    </div>
  `).join('');

  // Inyectar SVGs de íconos
  document.querySelectorAll('svg-icon').forEach(el => {
    const key = el.dataset.icon;
    el.outerHTML = ICONS[key] || ICONS['globe'];
  });

  // Hover revelar contraseña (escritorio) — se re-adjunta tras cada render
  document.querySelectorAll('.pw-masked').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (!el.dataset.pinned) el.textContent = el.dataset.pw;
    });
    el.addEventListener('mouseleave', () => {
      if (!el.dataset.pinned) el.textContent = '\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022';
    });
  });
}

function openModal(id = null) {
  editingId = id;
  const overlay = document.getElementById('modal-overlay');
  const title = document.getElementById('modal-title');

  // Limpiar campos manualmente (#password-form es un div, no un <form>)
  ['f-site', 'f-url', 'f-user', 'f-pass', 'f-notes'].forEach(fid => {
    const el = document.getElementById(fid);
    if (el) el.value = '';
  });
  const catEl = document.getElementById('f-category');
  if (catEl) catEl.value = 'social';
  document.getElementById('selected-icon').value = 'globe';
  document.querySelectorAll('.icon-option').forEach(o => o.classList.remove('selected'));
  document.querySelector('.icon-option[data-icon="globe"]')?.classList.add('selected');

  if (id) {
    const p = allPasswords.find(x => x.id === id);
    if (!p) return;
    title.textContent = 'Editar contraseña';
    document.getElementById('f-site').value = p.site_name;
    document.getElementById('f-url').value = p.site_url || '';
    document.getElementById('f-user').value = p.username || '';
    document.getElementById('f-pass').value = p.password;
    document.getElementById('f-category').value = p.category;
    document.getElementById('f-notes').value = p.notes || '';
    document.getElementById('selected-icon').value = p.icon;
    document.querySelectorAll('.icon-option').forEach(o => o.classList.remove('selected'));
    document.querySelector(`.icon-option[data-icon="${p.icon}"]`)?.classList.add('selected');
  } else {
    title.textContent = 'Nueva contraseña';
  }

  overlay.classList.add('open');
  // Foco en el primer campo
  setTimeout(() => document.getElementById('f-site')?.focus(), 50);
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  editingId = null;
}

async function savePassword() {
  const data = {
    site_name: document.getElementById('f-site').value.trim(),
    site_url: document.getElementById('f-url').value.trim(),
    username: document.getElementById('f-user').value.trim(),
    password: document.getElementById('f-pass').value,
    category: document.getElementById('f-category').value,
    notes: document.getElementById('f-notes').value.trim(),
    icon: document.getElementById('selected-icon').value || 'globe',
  };

  // Solo nombre del sitio y contraseña son obligatorios
  if (!data.site_name || !data.site_name.trim()) {
    document.getElementById('f-site')?.focus();
    return showToast('El nombre del sitio es obligatorio', 'error');
  }
  if (!data.password) {
    document.getElementById('f-pass')?.focus();
    return showToast('La contraseña es obligatoria', 'error');
  }

  const result = editingId
    ? await api.updatePassword(editingId, data)
    : await api.createPassword(data);

  if (result.error) return showToast(result.error, 'error');

  showToast(editingId ? 'Contraseña actualizada' : 'Contraseña guardada', 'success');
  closeModal();
  await loadPasswords();
}

async function deletePassword(id) {
  if (!confirm('¿Eliminar esta contraseña? Esta acción no se puede deshacer.')) return;
  const r = await api.deletePassword(id);
  if (r.error) return showToast(r.error, 'error');
  showToast('Contraseña eliminada', 'success');
  await loadPasswords();
}

function togglePwVisible(id) {
  const el = document.getElementById(`pw-val-${id}`);
  if (el.dataset.pinned) {
    delete el.dataset.pinned;
    el.textContent = '\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022';
  } else {
    el.dataset.pinned = 'true';
    el.textContent = el.dataset.pw;
  }
}

function renderIconPicker() {
  const grid = document.getElementById('icon-picker');
  if (!grid) return;
  grid.innerHTML = Object.entries(ICON_EMOJIS).map(([key, emoji]) => `
    <button class="icon-option${key === 'globe' ? ' selected' : ''}" data-icon="${key}" title="${key}" type="button">
      ${emoji}
    </button>
  `).join('');

  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('.icon-option');
    if (!btn) return;
    document.querySelectorAll('.icon-option').forEach(o => o.classList.remove('selected'));
    btn.classList.add('selected');
    document.getElementById('selected-icon').value = btn.dataset.icon;
  });
}

function copyText(text, msg) {
  navigator.clipboard.writeText(text).then(() => showToast(msg, 'success'));
}
function formatDate(d) {
  return new Date(d).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' });
}
function escHtml(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function escAttr(s) { return String(s).replace(/'/g, "\\'").replace(/"/g, '&quot;'); }
function copyIcon() { return `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`; }
function eyeIcon() { return `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`; }
function editIcon() { return `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`; }
function trashIcon() { return `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>`; }