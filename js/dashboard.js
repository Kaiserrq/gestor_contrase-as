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

  // ── EXPORTAR / IMPORTAR ──────────────────────────
  document.getElementById('btn-export-txt')?.addEventListener('click', exportTxt);
  document.getElementById('btn-export-pdf')?.addEventListener('click', exportPDF);
  document.getElementById('btn-import')?.addEventListener('click', openImportModal);
  document.getElementById('btn-import-modal-cancel')?.addEventListener('click', closeImportModal);
  document.getElementById('import-modal-overlay')?.addEventListener('click', e => {
    if (e.target.id === 'import-modal-overlay') closeImportModal();
  });
  document.getElementById('btn-import-preview')?.addEventListener('click', previewImport);
  document.getElementById('btn-import-confirm')?.addEventListener('click', confirmImport);
  document.getElementById('import-text-area')?.addEventListener('input', () => {
    // reset preview when user edits
    document.getElementById('import-preview').style.display = 'none';
    document.getElementById('btn-import-confirm').disabled = true;
    document.getElementById('import-error').style.display = 'none';
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

// ── EXPORTAR TXT ─────────────────────────────────────────────────────────────────
function exportTxt() {
  if (!allPasswords.length) return showToast('No hay contraseñas para exportar', 'error');

  // Una línea por contraseña, campos separados por coma
  // Formato: Nombre, Usuario, Contraseña, Notas
  const lines = allPasswords.map(p => {
    // Si un campo contiene coma, lo encerramos entre comillas
    const cell = v => {
      const s = String(v ?? '');
      return s.includes(',') ? `"${s.replace(/"/g, '""')}"` : s;
    };
    return [cell(p.site_name), cell(p.username), cell(p.password), cell(p.notes)].join(', ');
  });

  const txt  = lines.join('\r\n');
  const blob = new Blob([txt], { type: 'text/plain;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  const date = new Date().toISOString().split('T')[0];
  a.href     = url;
  a.download = `keyvault_contraseñas_${date}.txt`;
  a.click();
  URL.revokeObjectURL(url);
  showToast(`${allPasswords.length} contraseñas exportadas a TXT`, 'success');
}

// ── EXPORTAR PDF ─────────────────────────────────────────────────────────────────
function exportPDF() {
  if (!allPasswords.length) return showToast('No hay contraseñas para exportar', 'error');

  const date = new Date().toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric' });

  const catLabel = { social: 'Redes Sociales', trabajo: 'Trabajo', banco: 'Banco', apps: 'Otras apps', general: 'General' };

  const cards = allPasswords.map((p, i) => `
    <div class="pw-card">
      <div class="pw-number">${i + 1}</div>
      <div class="pw-body">
        <div class="pw-site">${escHtml(p.site_name)}</div>
        ${p.site_url ? `<div class="pw-url">${escHtml(p.site_url)}</div>` : ''}
        <table class="pw-table">
          <tr><td class="lbl">Usuario</td><td>${escHtml(p.username) || '<em>—</em>'}</td></tr>
          <tr><td class="lbl">Contraseña</td><td class="pw-pass">${escHtml(p.password)}</td></tr>
          <tr><td class="lbl">Categoría</td><td>${catLabel[p.category] || escHtml(p.category)}</td></tr>
          ${p.notes ? `<tr><td class="lbl">Notas</td><td>${escHtml(p.notes)}</td></tr>` : ''}
        </table>
      </div>
    </div>
  `).join('');

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>KeyVault — Contraseñas</title>
  <style>
    * { box-sizing:border-box; margin:0; padding:0; }
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      background: #f5f5f7;
      color: #1a1a2e;
      padding: 32px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 28px;
      padding-bottom: 16px;
      border-bottom: 2px solid #6c63ff;
    }
    .header h1 { font-size: 24px; color: #6c63ff; letter-spacing: -0.03em; }
    .header p  { font-size: 12px; color: #666; margin-top: 4px; }
    .header-right { text-align: right; font-size: 12px; color: #888; }
    .grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }
    .pw-card {
      background: #fff;
      border: 1px solid #e0e0e8;
      border-radius: 12px;
      padding: 16px 18px;
      position: relative;
      border-top: 3px solid #6c63ff;
      break-inside: avoid;
      page-break-inside: avoid;
    }
    .pw-number {
      position: absolute;
      top: 12px; right: 14px;
      width: 22px; height: 22px;
      background: #6c63ff;
      color: #fff;
      border-radius: 50%;
      font-size: 10px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .pw-site {
      font-size: 15px;
      font-weight: 700;
      color: #1a1a2e;
      margin-bottom: 2px;
    }
    .pw-url {
      font-size: 10px;
      color: #6c63ff;
      margin-bottom: 10px;
      word-break: break-all;
    }
    .pw-table { width: 100%; border-collapse: collapse; margin-top: 8px; }
    .pw-table tr td { padding: 4px 0; font-size: 12px; vertical-align: top; }
    .pw-table .lbl {
      width: 80px;
      color: #888;
      font-weight: 600;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      padding-right: 8px;
    }
    .pw-pass { font-family: monospace; font-size: 13px; color: #2d2d4e; font-weight: 600; }
    .footer {
      margin-top: 28px;
      text-align: center;
      font-size: 10px;
      color: #aaa;
      border-top: 1px solid #e0e0e8;
      padding-top: 14px;
    }
    @media print {
      body { background: #fff; padding: 16px; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <h1>🔑 KeyVault</h1>
      <p>${allPasswords.length} contraseña${allPasswords.length !== 1 ? 's' : ''} guardadas</p>
    </div>
    <div class="header-right">
      <div>Exportado el ${date}</div>
      <div style="margin-top:4px;color:#e03">Confidencial — No compartir</div>
    </div>
  </div>
  <div style="text-align:right;margin-bottom:16px" class="no-print">
    <button onclick="window.print()" style="padding:8px 20px;background:#6c63ff;color:#fff;border:none;border-radius:8px;font-size:13px;cursor:pointer;font-weight:600">
      🖨️ Imprimir / Guardar PDF
    </button>
  </div>
  <div class="grid">${cards}</div>
  <div class="footer">
    KeyVault — Gestor de contraseñas &bull; Exportado el ${date}
  </div>
</body>
</html>`;

  const win = window.open('', '_blank');
  if (!win) return showToast('Permite ventanas emergentes para exportar PDF', 'error');
  win.document.write(html);
  win.document.close();
  // Pequena pausa para que el navegador renderice antes de imprimir
  setTimeout(() => win.print(), 600);
}

// ── IMPORTAR ─────────────────────────────────────────────────────────────────
let _importParsed = [];

function openImportModal() {
  _importParsed = [];
  document.getElementById('import-text-area').value = '';
  document.getElementById('import-preview').style.display = 'none';
  document.getElementById('import-preview-cards').innerHTML = '';
  document.getElementById('import-error').style.display = 'none';
  document.getElementById('btn-import-confirm').disabled = true;
  document.getElementById('import-modal-overlay').classList.add('open');
  setTimeout(() => document.getElementById('import-text-area')?.focus(), 50);
}

function closeImportModal() {
  document.getElementById('import-modal-overlay').classList.remove('open');
  _importParsed = [];
}

/**
 * Parsea una línea de CSV respetando campos entre comillas.
 * Retorna array de campos.
 */
function parseCsvLine(line) {
  const result = [];
  let cur = '', inQ = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQ && line[i + 1] === '"') { cur += '"'; i++; }
      else inQ = !inQ;
    } else if (ch === ',' && !inQ) {
      result.push(cur.trim()); cur = '';
    } else {
      cur += ch;
    }
  }
  result.push(cur.trim());
  return result;
}

function previewImport() {
  const raw = document.getElementById('import-text-area').value.trim();
  const errEl  = document.getElementById('import-error');
  const prevEl = document.getElementById('import-preview');
  const cardsEl = document.getElementById('import-preview-cards');
  errEl.style.display = 'none';
  prevEl.style.display = 'none';
  document.getElementById('btn-import-confirm').disabled = true;
  _importParsed = [];

  if (!raw) {
    errEl.textContent = 'Pega al menos una línea en el área de texto.';
    errEl.style.display = 'block';
    return;
  }

  const lines = raw.split(/\r?\n/).filter(l => l.trim());
  const parsed = [];
  const problems = [];

  lines.forEach((line, i) => {
    const fields = parseCsvLine(line);
    const [name = '', user = '', pass = '', notes = ''] = fields;
    if (!name) {
      problems.push(`Línea ${i + 1}: falta el nombre del sitio.`);
      return;
    }
    if (!pass) {
      problems.push(`Línea ${i + 1} (${name}): falta la contraseña.`);
      return;
    }
    parsed.push({ site_name: name, username: user, password: pass, notes, category: 'social', icon: 'globe' });
  });

  if (!parsed.length) {
    errEl.textContent = problems.length ? problems.join(' | ') : 'No se encontraron entradas válidas.';
    errEl.style.display = 'block';
    return;
  }

  _importParsed = parsed;

  // Mostrar cards de previsualización
  cardsEl.innerHTML = parsed.map((p, i) => `
    <div style="background:var(--card-bg);border:1px solid var(--border);border-radius:10px;padding:10px 14px;display:flex;justify-content:space-between;align-items:center;gap:12px">
      <div style="display:flex;align-items:center;gap:10px">
        <div style="width:32px;height:32px;border-radius:8px;background:var(--accent-bg);display:flex;align-items:center;justify-content:center;font-size:16px">🔑</div>
        <div>
          <div style="font-weight:600;font-size:.88rem">${escHtml(p.site_name)}</div>
          <div style="font-size:.75rem;color:var(--muted)">${escHtml(p.username) || '<em>sin usuario</em>'}</div>
        </div>
      </div>
      <div style="font-size:.75rem;color:var(--muted);text-align:right">
        <div>••••••••</div>
        ${p.notes ? `<div>${escHtml(p.notes.substring(0, 30))}${p.notes.length > 30 ? '...' : ''}</div>` : ''}
      </div>
    </div>
  `).join('');

  document.getElementById('import-preview-label').textContent =
    `${parsed.length} contraseña${parsed.length !== 1 ? 's' : ''} listas para importar${problems.length ? ' (' + problems.length + ' omitidas por error)' : ''}:`;
  prevEl.style.display = 'block';
  document.getElementById('btn-import-confirm').disabled = false;

  if (problems.length) {
    errEl.textContent = 'Advertencias: ' + problems.join(' | ');
    errEl.style.display = 'block';
  }
}

async function confirmImport() {
  if (!_importParsed.length) return;
  const btn = document.getElementById('btn-import-confirm');
  btn.disabled = true;
  btn.textContent = 'Importando...';

  let ok = 0, fail = 0;
  for (const entry of _importParsed) {
    const r = await api.createPassword(entry);
    if (r.error) fail++;
    else ok++;
  }

  closeImportModal();
  await loadPasswords();

  if (fail === 0) showToast(`✅ ${ok} contraseña${ok !== 1 ? 's' : ''} importada${ok !== 1 ? 's' : ''} correctamente`, 'success');
  else showToast(`${ok} importadas, ${fail} fallaron`, fail === ok ? 'error' : 'info');
}