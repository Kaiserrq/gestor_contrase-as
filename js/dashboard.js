// ====================================================
//  KeyVault — js/dashboard.js
//  Lógica de dashboard.html y passwords.html: salud, categorías,
//  lista/cuadrícula, drawer de detalle y modal agregar/editar.
//  (Exportar/importar viven en io.js, categorías en categories.js)
// ====================================================

let allPasswords = [];
let currentFilter = 'all';
let currentQuery = '';
let editingId = null;
let openId = null;
let viewMode = 'list';
let loaded = false;
let genActive = false;      // la contraseña del modal viene del generador
let firstPaint = true;      // stagger solo en la primera carga
let _drawerFocus = null;

const $ = (id) => document.getElementById(id);
const store = {
  get(k) { try { return localStorage.getItem(k); } catch (_) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (_) {} }
};
const byId = (id) => allPasswords.find(p => p.id === +id);
const CAT_ICON = { social: 'user', trabajo: 'server', banco: 'card', apps: 'grid' };
const catIcon = (slug) => CAT_ICON[slug] || 'folder';
const validSlug = (s) => s === 'all' || CATS.some(c => c.slug === s) || customCategories.some(c => c.slug === s);

document.addEventListener('DOMContentLoaded', async () => {
  // Verificar autenticación
  if (!api.getToken()) return window.location.href = '/login.html';
  const auth = await api.verify();
  if (!auth.valid) return api.logout();
  Shell.setUser(localStorage.getItem('username') || auth.user.username);

  viewMode = store.get('kv_view') === 'grid' ? 'grid' : 'list';
  syncViewToggle();
  bindUI();
  initTilt($('cat-cards'));
  initTilt($('health'), '#health', 4);

  await loadCategories();
  // Filtro inicial desde ?cat=
  const urlCat = new URLSearchParams(location.search).get('cat');
  if (urlCat && validSlug(urlCat)) currentFilter = urlCat;
  await loadPasswords();

  if (new URLSearchParams(location.search).get('new') === '1') {
    history.replaceState(null, '', location.pathname);
    openModal();
  }
});

// Las categorías cambiaron (carga, alta o baja)
document.addEventListener('kv:cats', () => {
  if (!validSlug(currentFilter)) currentFilter = 'all';
  refreshCategorySelect();
  renderCatCards(); renderChips(); renderList(false);
});

// ── CARGA ────────────────────────────────────────────
async function loadPasswords() {
  const r = await api.getPasswords();
  allPasswords = Array.isArray(r) ? r : [];
  loaded = true;
  const nc = $('nav-count'); if (nc) nc.textContent = allPasswords.length;
  renderAll(firstPaint);
  firstPaint = false;
  // Si el drawer está abierto, refrescarlo (o cerrarlo si ya no existe)
  if (openId) { const p = byId(openId); p ? renderDrawer(p) : closeDrawer(); }
}

function renderAll(animate) {
  renderHealth(); renderCatCards(animate); renderChips(); renderList(animate);
}

// ── FILTRADO ─────────────────────────────────────────
function filteredList() {
  let list = allPasswords;
  if (currentFilter !== 'all') list = list.filter(p => p.category === currentFilter);
  const q = currentQuery.trim().toLowerCase();
  if (q) {
    list = list.filter(p => [p.site_name, p.username, p.site_url, p.category, catInfo(p.category).label]
      .some(v => String(v || '').toLowerCase().includes(q)));
  }
  return list;
}

function setFilter(slug) {
  currentFilter = validSlug(slug) ? slug : 'all';
  try {
    const u = new URL(location.href);
    currentFilter === 'all' ? u.searchParams.delete('cat') : u.searchParams.set('cat', currentFilter);
    history.replaceState(null, '', u);
  } catch (_) {}
  renderCatCards(); renderChips(); renderList(true);
  if (typeof markSidebarCat === 'function') markSidebarCat();
}

function clearFilters() {
  currentQuery = '';
  const s = $('search-input'); if (s) s.value = '';
  setFilter('all');
}

// ── SALUD DE SEGURIDAD ───────────────────────────────
const RING_C = 2 * Math.PI * 52;
let _scoreShown = 0;

function computeHealth() {
  const total = allPasswords.length;
  const counts = {};
  allPasswords.forEach(p => { counts[p.password] = (counts[p.password] || 0) + 1; });
  let weak = 0, dup = 0, penalty = 0;
  allPasswords.forEach(p => {
    const st = pwStrength(p.password);
    const isDup = counts[p.password] > 1;
    if (st.level === 0) weak++;
    if (isDup) dup++;
    let w = st.level === 0 ? 1 : st.level === 1 ? 0.4 : 0;
    if (isDup) w = Math.max(w, 0.6);
    penalty += w;
  });
  const score = total ? Math.max(0, Math.round(100 * (1 - penalty / total))) : 0;
  return { total, weak, dup, score };
}

function renderHealth() {
  const el = $('health');
  if (!el) return;
  if (!el.firstElementChild) {
    el.innerHTML = `
      <div class="ring" role="img" aria-label="Puntuación de seguridad">
        <svg viewBox="0 0 120 120" aria-hidden="true"><circle class="ring-bg" cx="60" cy="60" r="52"/>
          <circle class="ring-fg" id="ring-fg" cx="60" cy="60" r="52" stroke-dasharray="${RING_C.toFixed(2)}" stroke-dashoffset="${RING_C.toFixed(2)}"/></svg>
        <div class="ring-num"><b id="h-score">0</b><span>de 100</span></div>
      </div>
      <div class="health-info">
        <h2>Salud de seguridad</h2>
        <p class="muted" id="h-msg"></p>
        <ul class="health-stats">
          <li class="w"><b id="h-weak">0</b>Débiles</li>
          <li class="d"><b id="h-dup">0</b>Repetidas</li>
          <li><b id="h-total">0</b>Total</li>
        </ul>
      </div>`;
  }
  const h = computeHealth();
  const color = h.total === 0 ? 'var(--mu)' : h.score >= 80 ? 'var(--ok)' : h.score >= 50 ? 'var(--warn)' : 'var(--bad)';
  el.style.setProperty('--rc', color);
  $('h-weak').textContent = h.weak; $('h-dup').textContent = h.dup; $('h-total').textContent = h.total;
  $('h-msg').textContent = h.total === 0 ? 'Agrega tu primera contraseña para calcular tu puntuación.'
    : h.score >= 80 ? 'Excelente: tu bóveda está en buena forma.'
    : h.score >= 50 ? 'Mejorable: revisa las contraseñas débiles o repetidas.'
    : 'En riesgo: cambia las contraseñas débiles y repetidas.';
  // Anillo animado (transición CSS) + cuenta numérica con rAF
  const fg = $('ring-fg');
  requestAnimationFrame(() => requestAnimationFrame(() => fg.setAttribute('stroke-dashoffset', (RING_C * (1 - h.score / 100)).toFixed(2))));
  const num = $('h-score');
  const from = _scoreShown, to = h.score;
  _scoreShown = to;
  if (matchMedia('(prefers-reduced-motion:reduce)').matches || from === to) { num.textContent = to; return; }
  const t0 = performance.now(), dur = 900;
  const step = (t) => {
    const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
    num.textContent = Math.round(from + (to - from) * e);
    if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// ── CATEGORÍAS: tarjetas (escritorio) y chips ────────
function catCount(slug) { return allPasswords.filter(p => p.category === slug).length; }

function renderCatCards(animate) {
  const box = $('cat-cards');
  if (!box) return;
  const cards = allCategories().map((c, i) => `
    <button type="button" class="cat-card${currentFilter === c.slug ? ' active' : ''}${animate ? ' rise' : ''}" data-tilt data-cat="${escHtml(c.slug)}"
      style="--c:${c.color};--i:${i + 1}" aria-pressed="${currentFilter === c.slug}" aria-label="Filtrar por ${escHtml(c.label)}">
      <span class="cc-top"><span class="cc-ico">${svg(catIcon(c.slug), 18)}</span></span>
      <span><span class="cc-n">${catCount(c.slug)}</span><span class="cc-l" style="display:block">${escHtml(c.label)}</span></span>
    </button>`).join('');
  box.innerHTML = cards + `<button type="button" class="cat-card add" data-act="add-cat">${svg('plus', 18)}Nueva categoría</button>`;
}

function renderChips() {
  const chip = (slug, label, n, color, extra = '') => `
    <span class="chip-w${extra}">
      <button type="button" class="chip${currentFilter === slug ? ' active' : ''}" data-cat="${escHtml(slug)}" aria-pressed="${currentFilter === slug}">
        ${color ? `<span class="dot" style="--c:${color}"></span>` : ''}${escHtml(label)} <span class="n">${n}</span></button>
      ${extra ? `<button type="button" class="chip-x" data-act="del-cat" data-slug="${escHtml(slug)}" aria-label="Eliminar categoría ${escHtml(label)}">${svg('x', 14, 2.5)}</button>` : ''}
    </span>`;
  const html = chip('all', 'Todas', allPasswords.length, null) +
    allCategories().map(c => chip(c.slug, c.label, catCount(c.slug), c.color, c.custom ? ' custom' : '')).join('') +
    `<span class="chip-w"><button type="button" class="chip add" data-act="add-cat">${svg('plus', 14, 2.5)}Categoría</button></span>`;
  document.querySelectorAll('.chips').forEach(el => { el.innerHTML = html; });
}

function refreshCategorySelect() {
  const sel = $('f-category');
  if (!sel) return;
  const prev = sel.value;
  sel.innerHTML = allCategories().map(c => `<option value="${escHtml(c.slug)}">${escHtml(c.label)}</option>`).join('');
  if (prev && [...sel.options].some(o => o.value === prev)) sel.value = prev;
}

// ── LISTA ────────────────────────────────────────────
const EMPTY_VAULT = `<svg class="ill" viewBox="0 0 120 100" fill="none" aria-hidden="true">
  <rect x="22" y="18" width="76" height="64" rx="14" fill="#151524" stroke="#7c5cff" stroke-opacity=".6" stroke-width="2"/>
  <circle cx="60" cy="50" r="17" stroke="#a78bfa" stroke-width="2" stroke-dasharray="4 4"/>
  <circle cx="60" cy="50" r="8" fill="#7c5cff"/><path d="M60 50v14" stroke="#a78bfa" stroke-width="3" stroke-linecap="round"/>
  <circle cx="14" cy="26" r="3" fill="#7c5cff" fill-opacity=".5"/><circle cx="108" cy="72" r="4" fill="#a78bfa" fill-opacity=".4"/></svg>`;
const EMPTY_SEARCH = `<svg class="ill" viewBox="0 0 120 100" fill="none" aria-hidden="true">
  <rect x="14" y="20" width="62" height="10" rx="5" fill="#151524"/><rect x="14" y="40" width="48" height="10" rx="5" fill="#151524"/><rect x="14" y="60" width="56" height="10" rx="5" fill="#151524"/>
  <circle cx="78" cy="48" r="20" fill="#0f0f1a" stroke="#7c5cff" stroke-width="3"/><path d="M93 63l14 14" stroke="#a78bfa" stroke-width="5" stroke-linecap="round"/>
  <path d="M70 48h16" stroke="#a78bfa" stroke-width="3" stroke-linecap="round"/></svg>`;

function rowHTML(p, idx) {
  const c = catInfo(p.category), st = pwStrength(p.password), n = escHtml(p.site_name);
  const anim = idx != null, url = safeUrl(p.site_url);
  return `
  <div class="pw-row${anim ? ' rise' : ''}${openId === p.id ? ' open' : ''}" data-id="${p.id}" style="--c:${c.color};${anim ? `--i:${idx}` : ''}">
    <div class="av" aria-hidden="true">${escHtml(String(p.site_name || '?').trim().charAt(0) || '?')}</div>
    <button type="button" class="pw-main" data-act="open" aria-label="Ver detalle de ${n}">
      <span class="pw-name">${n}</span>
      <span class="pw-url">${escHtml(hostOf(p.site_url) || p.username || 'Sin URL')}</span>
    </button>
    <div class="pw-user" title="${escHtml(p.username)}">${escHtml(p.username) || '—'}</div>
    <div class="pw-pass" data-pw="${escHtml(p.password)}" aria-hidden="true">••••••••</div>
    <div class="pw-str s${Math.max(st.level, 0)}" title="Fuerza: ${st.label}">${meterHTML(st.level)}<span class="s-t">${st.label}</span></div>
    <div class="row-actions">
      <button type="button" class="icon-btn hide-m" data-act="copy-user" aria-label="Copiar usuario de ${n}" title="Copiar usuario">${svg('user', 16)}</button>
      <button type="button" class="icon-btn" data-act="copy-pass" aria-label="Copiar contraseña de ${n}" title="Copiar contraseña">${svg('copy', 16)}</button>
      <button type="button" class="icon-btn hide-m hide-t" data-act="toggle-row" aria-pressed="false" aria-label="Mostrar contraseña de ${n}" title="Mostrar u ocultar">${svg('eye', 16)}</button>
      ${url ? `<a class="icon-btn hide-m" data-act="ext" href="${escHtml(url)}" target="_blank" rel="noopener noreferrer" aria-label="Abrir ${n}" title="Abrir sitio">${svg('ext', 16)}</a>` : ''}
      <button type="button" class="icon-btn hide-m" data-act="edit" aria-label="Editar ${n}" title="Editar">${svg('edit', 16)}</button>
      <button type="button" class="icon-btn danger hide-m" data-act="del" aria-label="Eliminar ${n}" title="Eliminar">${svg('trash', 16)}</button>
    </div>
  </div>`;
}

function renderList(animate) {
  const box = $('passwords-grid');
  if (!box || !loaded) return;
  const list = filteredList();
  const cat = currentFilter === 'all' ? null : catInfo(currentFilter);

  const title = $('list-title'); if (title) title.textContent = cat ? cat.label : 'Todas las contraseñas';
  const cnt = $('list-count'); if (cnt) cnt.textContent = list.length;
  const slot = $('filter-slot');
  if (slot) slot.innerHTML = cat ? `<button type="button" class="filter-tag" style="--c:${cat.color}" data-act="clear-filter" aria-label="Quitar filtro ${escHtml(cat.label)}">${escHtml(cat.label)} ${svg('x', 13, 2.5)}</button>` : '';

  box.className = 'pw-list' + (viewMode === 'grid' ? ' grid' : '');
  if (!list.length) {
    box.className = 'pw-list';
    box.innerHTML = allPasswords.length === 0
      ? `<div class="empty">${EMPTY_VAULT}<h3>Tu bóveda está vacía</h3><p>Guarda tu primera contraseña y mantén todo en un solo lugar.</p><button type="button" class="btn btn-primary" data-act="add">${svg('plus', 16, 2.5)}Agregar contraseña</button></div>`
      : `<div class="empty">${EMPTY_SEARCH}<h3>Sin resultados</h3><p>No hay contraseñas que coincidan con tu búsqueda o filtro.</p><button type="button" class="btn btn-ghost" data-act="clear-filter">Limpiar filtros</button></div>`;
    return;
  }
  box.innerHTML = list.map((p, i) => rowHTML(p, animate ? Math.min(i, 12) : null)).join('');
}

function syncViewToggle() {
  document.querySelectorAll('#view-toggle [data-view]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.view === viewMode)));
}

// ── DRAWER (panel lateral / hoja inferior) ───────────
function openDrawer(id) {
  const p = byId(id);
  if (!p) return;
  _drawerFocus = document.activeElement;
  openId = p.id;
  renderDrawer(p);
  $('drawer').classList.add('open'); $('drawer-ov').classList.add('open');
  $('drawer').setAttribute('aria-hidden', 'false');
  document.querySelectorAll('.pw-row.open').forEach(r => r.classList.remove('open'));
  document.querySelector(`.pw-row[data-id="${p.id}"]`)?.classList.add('open');
  setTimeout(() => $('dr-close')?.focus(), 60);
}

function closeDrawer() {
  openId = null;
  $('drawer')?.classList.remove('open'); $('drawer-ov')?.classList.remove('open');
  $('drawer')?.setAttribute('aria-hidden', 'true');
  document.querySelectorAll('.pw-row.open').forEach(r => r.classList.remove('open'));
  if (_drawerFocus && document.contains(_drawerFocus)) _drawerFocus.focus();
  _drawerFocus = null;
}

function renderDrawer(p) {
  const c = catInfo(p.category), st = pwStrength(p.password), url = safeUrl(p.site_url);
  const wasRevealed = $('dr-pw')?.classList.contains('revealed');
  $('drawer').innerHTML = `
    <div class="dr-head">
      <div class="av" style="--c:${c.color}" aria-hidden="true">${siteIcon(p.icon, 24)}</div>
      <div class="dr-title">
        <h2 id="dr-name">${escHtml(p.site_name)}</h2>
        ${url ? `<a href="${escHtml(url)}" target="_blank" rel="noopener noreferrer">${svg('ext', 13)}${escHtml(hostOf(p.site_url))}</a>` : '<span class="muted" style="font-size:12.5px">Sin URL</span>'}
        <div style="margin-top:8px"><span class="badge" style="--c:${c.color}">${escHtml(c.label)}</span></div>
      </div>
      <button type="button" class="icon-btn" id="dr-close" data-act="close" aria-label="Cerrar detalle">${svg('x', 18)}</button>
    </div>
    <div class="dr-body">
      <div class="dr-field">
        <span class="lbl">Usuario</span>
        <div class="dr-val"><span class="v">${p.username ? escHtml(p.username) : '<span class="muted">—</span>'}</span>
          <button type="button" class="icon-btn" data-act="copy-user" aria-label="Copiar usuario" title="Copiar usuario">${svg('copy', 16)}</button></div>
      </div>
      <div class="dr-field">
        <span class="lbl">Contraseña</span>
        <div class="dr-val">
          <span class="v dr-pw${wasRevealed ? ' revealed' : ''}" id="dr-pw"><span class="mask" aria-hidden="${!!wasRevealed}">••••••••••••</span><span class="plain" aria-hidden="${!wasRevealed}">${escHtml(p.password)}</span></span>
          <button type="button" class="icon-btn" data-act="toggle" aria-pressed="${!!wasRevealed}" aria-label="${wasRevealed ? 'Ocultar' : 'Mostrar'} contraseña" title="Mostrar u ocultar">${svg(wasRevealed ? 'eyeoff' : 'eye', 16)}</button>
          <button type="button" class="icon-btn" data-act="copy-pass" aria-label="Copiar contraseña" title="Copiar contraseña">${svg('copy', 16)}</button>
        </div>
        <div class="dr-str s${Math.max(st.level, 0)}"><span class="meter meter-lg s${Math.max(st.level, 0)}" data-on="${st.level + 1}"><i></i><i></i><i></i></span><span class="s-l">${st.label}</span></div>
      </div>
      ${p.notes ? `<div class="dr-field"><span class="lbl">Notas</span><p style="overflow-wrap:anywhere">${escHtml(p.notes)}</p></div>` : ''}
      <div class="dr-meta"><span>Creada: ${formatDate(p.created_at)}</span><span>Actualizada: ${formatDate(p.updated_at)}</span></div>
    </div>
    <div class="dr-foot">
      <button type="button" class="btn btn-ghost" data-act="edit">${svg('edit', 16)}Editar</button>
      <button type="button" class="btn btn-danger" data-act="del">${svg('trash', 16)}Eliminar</button>
    </div>`;
}

function onDrawerClick(e) {
  const b = e.target.closest('[data-act]');
  if (!b) return;
  const p = byId(openId);
  if (!p) return;
  switch (b.dataset.act) {
    case 'close': closeDrawer(); break;
    case 'copy-user': if (p.username) copyText(p.username, 'Usuario copiado'); else showToast('Esta entrada no tiene usuario', 'info'); break;
    case 'copy-pass': copyText(p.password, 'Contraseña copiada', true); break;
    case 'toggle': {
      const box = $('dr-pw'), on = box.classList.toggle('revealed');
      box.querySelector('.plain').setAttribute('aria-hidden', String(!on));
      box.querySelector('.mask').setAttribute('aria-hidden', String(on));
      b.innerHTML = svg(on ? 'eyeoff' : 'eye', 16);
      b.setAttribute('aria-pressed', String(on));
      b.setAttribute('aria-label', (on ? 'Ocultar' : 'Mostrar') + ' contraseña');
      break;
    }
    case 'edit': { const id = p.id; closeDrawer(); openModal(id); break; }
    case 'del': deletePassword(p.id); break;
  }
}

// ── MODAL AGREGAR / EDITAR ───────────────────────────
function genOptions() {
  return { len: +$('gen-len').value, upper: $('gen-upper').checked, num: $('gen-num').checked, sym: $('gen-sym').checked };
}

function regenerate() {
  const f = $('f-pass');
  f.value = genPassword(genOptions());
  f.type = 'text';
  $('btn-toggle-pass').innerHTML = svg('eyeoff', 17);
  genActive = true;
  updateFormStrength();
}

function updateFormStrength() {
  const st = pwStrength($('f-pass').value);
  const meter = $('f-meter');
  meter.dataset.on = st.level + 1;
  meter.className = 'meter meter-lg s' + Math.max(st.level, 0);
  $('f-str').className = 'f-str' + (st.level >= 0 ? ' s' + st.level : '');
  $('f-str-label').textContent = st.level >= 0 ? `${st.label} · ${st.score}/100` : 'Sin contraseña';
}

function selectIcon(key) {
  $('selected-icon').value = key;
  document.querySelectorAll('#icon-picker .icon-opt').forEach(o => o.classList.toggle('selected', o.dataset.icon === key));
}

function openModal(id = null) {
  editingId = id;
  ['f-site', 'f-url', 'f-user', 'f-pass', 'f-notes'].forEach(fid => { $(fid).value = ''; });
  $('f-pass').type = 'password';
  $('btn-toggle-pass').innerHTML = svg('eye', 17);
  refreshCategorySelect();
  $('f-category').value = currentFilter !== 'all' && validSlug(currentFilter) ? currentFilter : 'social';
  $('gen-len').value = 16; $('gen-len-val').textContent = '16';
  $('gen-upper').checked = $('gen-num').checked = $('gen-sym').checked = true;
  genActive = false;
  selectIcon('globe');

  if (id) {
    const p = byId(id);
    if (!p) return;
    $('modal-title').textContent = 'Editar contraseña';
    $('f-site').value = p.site_name;
    $('f-url').value = p.site_url || '';
    $('f-user').value = p.username || '';
    $('f-pass').value = p.password;
    if ([...$('f-category').options].some(o => o.value === p.category)) $('f-category').value = p.category;
    else {   // categoría que ya no existe: conservarla para no perder el dato
      const o = document.createElement('option'); o.value = p.category; o.textContent = catInfo(p.category).label;
      $('f-category').appendChild(o); $('f-category').value = p.category;
    }
    $('f-notes').value = p.notes || '';
    selectIcon(SITE_ICONS[p.icon] ? p.icon : 'globe');
    const len = Math.min(64, Math.max(8, p.password.length));
    $('gen-len').value = len; $('gen-len-val').textContent = len;
  } else {
    $('modal-title').textContent = 'Nueva contraseña';
  }
  updateFormStrength();
  $('modal-overlay').classList.add('open');
  setTimeout(() => $('f-site').focus(), 60);
}

function closeModal() {
  $('modal-overlay').classList.remove('open');
  editingId = null;
}

async function savePassword() {
  const data = {
    site_name: $('f-site').value.trim(),
    site_url: $('f-url').value.trim(),
    username: $('f-user').value.trim(),
    password: $('f-pass').value,
    category: $('f-category').value,
    notes: $('f-notes').value.trim(),
    icon: $('selected-icon').value || 'globe',
  };

  if (!data.site_name) { $('f-site').focus(); return showToast('El nombre del sitio es obligatorio', 'error'); }
  if (!data.password) { $('f-pass').focus(); return showToast('La contraseña es obligatoria', 'error'); }

  const btn = $('btn-modal-save');
  btn.disabled = true;
  const wasEditing = !!editingId;
  const result = wasEditing ? await api.updatePassword(editingId, data) : await api.createPassword(data);
  btn.disabled = false;

  if (result.error) return showToast(result.error, 'error');

  showToast(wasEditing ? 'Contraseña actualizada' : 'Contraseña guardada', 'success');
  closeModal();
  await loadPasswords();
}

async function deletePassword(id) {
  const p = byId(id);
  const ok = await confirmDialog({
    title: '¿Eliminar contraseña?',
    message: `Se eliminará${p ? ` "${p.site_name}"` : ' esta entrada'}. Esta acción no se puede deshacer.`,
    confirmText: 'Eliminar'
  });
  if (!ok) return;
  const r = await api.deletePassword(id);
  if (r.error) return showToast(r.error, 'error');
  showToast('Contraseña eliminada', 'success');
  if (openId === id) closeDrawer();
  await loadPasswords();
}

// ── EVENTOS ──────────────────────────────────────────
function bindUI() {
  // Búsqueda
  $('search-input')?.addEventListener('input', (e) => { currentQuery = e.target.value; renderList(false); });

  // Agregar
  $('btn-add')?.addEventListener('click', () => openModal());

  // Vista lista / cuadrícula
  $('view-toggle')?.addEventListener('click', (e) => {
    const b = e.target.closest('[data-view]');
    if (!b) return;
    viewMode = b.dataset.view; store.set('kv_view', viewMode);
    syncViewToggle(); renderList(true);
  });

  // Lista: acciones por delegación
  $('passwords-grid')?.addEventListener('click', (e) => {
    const act = e.target.closest('[data-act]');
    const row = e.target.closest('.pw-row');
    const a = act?.dataset.act;
    if (a === 'add') return openModal();
    if (a === 'clear-filter') return clearFilters();
    if (a === 'ext') return;
    if (!row) return;
    const id = +row.dataset.id, p = byId(id);
    if (!p) return;
    if (a === 'copy-user') return p.username ? copyText(p.username, 'Usuario copiado') : showToast('Esta entrada no tiene usuario', 'info');
    if (a === 'copy-pass') return copyText(p.password, 'Contraseña copiada', true);
    if (a === 'toggle-row') {
      const el = row.querySelector('.pw-pass'), on = act.getAttribute('aria-pressed') !== 'true';
      el.textContent = on ? el.dataset.pw : '••••••••';
      act.setAttribute('aria-pressed', String(on));
      act.setAttribute('aria-label', (on ? 'Ocultar' : 'Mostrar') + ' contraseña de ' + p.site_name);
      act.innerHTML = svg(on ? 'eyeoff' : 'eye', 16);
      return;
    }
    if (a === 'edit') return openModal(id);
    if (a === 'del') return deletePassword(id);
    openDrawer(id);
  });

  // Chips y tarjetas de categoría
  document.addEventListener('click', (e) => {
    const x = e.target.closest('[data-act="del-cat"]');
    if (x) { const c = customCategories.find(k => k.slug === x.dataset.slug); if (c) deleteCat(c.id, c.slug); return; }
    if (e.target.closest('[data-act="add-cat"]')) return openCategoryModal();
    if (e.target.closest('[data-act="clear-filter"]') && !e.target.closest('#passwords-grid')) return clearFilters();
    const cc = e.target.closest('.cat-card[data-cat]');
    if (cc) return setFilter(currentFilter === cc.dataset.cat ? 'all' : cc.dataset.cat);
    const ch = e.target.closest('.chip[data-cat]');
    if (ch) setFilter(ch.dataset.cat);
  });

  // Drawer
  $('drawer')?.addEventListener('click', onDrawerClick);
  $('drawer-ov')?.addEventListener('click', closeDrawer);

  // Modal agregar/editar
  $('modal-overlay')?.addEventListener('click', (e) => { if (e.target.id === 'modal-overlay') closeModal(); });
  $('btn-modal-cancel')?.addEventListener('click', closeModal);
  $('btn-modal-cancel-2')?.addEventListener('click', closeModal);
  $('btn-modal-save')?.addEventListener('click', savePassword);
  $('password-form')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.tagName === 'INPUT' && e.target.type !== 'range' && e.target.type !== 'checkbox') { e.preventDefault(); savePassword(); }
  });
  $('f-pass')?.addEventListener('input', () => { genActive = false; updateFormStrength(); });
  $('btn-toggle-pass')?.addEventListener('click', () => {
    const f = $('f-pass'); f.type = f.type === 'password' ? 'text' : 'password';
    $('btn-toggle-pass').innerHTML = svg(f.type === 'password' ? 'eye' : 'eyeoff', 17);
  });
  $('btn-gen')?.addEventListener('click', regenerate);
  $('btn-regen')?.addEventListener('click', regenerate);
  $('gen-len')?.addEventListener('input', () => { $('gen-len-val').textContent = $('gen-len').value; if (genActive) regenerate(); });
  ['gen-upper', 'gen-num', 'gen-sym'].forEach(id => $(id)?.addEventListener('change', () => { if (genActive) regenerate(); }));
  $('icon-picker')?.addEventListener('click', (e) => { const b = e.target.closest('.icon-opt'); if (b) selectIcon(b.dataset.icon); });

  // Exportar / importar (passwords.html)
  $('btn-export-txt')?.addEventListener('click', exportTxt);
  $('btn-export-pdf')?.addEventListener('click', exportPDF);
  $('btn-import')?.addEventListener('click', openImportModal);
  $('btn-import-modal-cancel')?.addEventListener('click', closeImportModal);
  $('btn-import-cancel2')?.addEventListener('click', closeImportModal);
  $('import-modal-overlay')?.addEventListener('click', (e) => { if (e.target.id === 'import-modal-overlay') closeImportModal(); });
  $('btn-import-preview')?.addEventListener('click', previewImport);
  $('btn-import-confirm')?.addEventListener('click', confirmImport);
  $('import-text-area')?.addEventListener('input', () => {
    $('import-preview').style.display = 'none';
    $('btn-import-confirm').disabled = true;
    $('import-error').style.display = 'none';
  });

  // Escape cierra la capa superior
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape' || e.defaultPrevented) return;
    if ($('modal-overlay')?.classList.contains('open')) return closeModal();
    if ($('import-modal-overlay')?.classList.contains('open')) return closeImportModal();
    if ($('drawer')?.classList.contains('open') && !document.querySelector('.modal-ov.open')) closeDrawer();
  });
}
