// ====================================================
//  KeyVault — utilidades globales compartidas por todas las páginas
//  (iconos SVG, toasts, portapapeles, fuerza, generador, tilt, confirmación)
// ====================================================

// ── ICONOS DE INTERFAZ (SVG inline, trazo) ───────────
const SVGI = {
  search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
  eyeoff: '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>',
  edit: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>',
  trash: '<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>',
  grid: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
  list: '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>',
  key: '<path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>',
  user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
  folder: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
  ext: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
  panel: '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
  check: '<polyline points="20 6 9 17 4 12"/>',
  refresh: '<polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  info: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
  alert: '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>'
};
function svg(name, size = 18, sw = 2) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${SVGI[name] || (typeof SITE_ICONS !== 'undefined' && SITE_ICONS[name]) || ''}</svg>`;
}

// ── ICONOS DE SITIO (selector del modal) ─────────────
const SITE_ICONS = {
  globe: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  lock: SVGI.lock,
  mail: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
  user: SVGI.user,
  card: '<rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>',
  wifi: '<path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="currentColor"/>',
  github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',
  shopping: '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>',
  server: '<rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>',
  star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.64 3.35 2 2 0 0 1 3.61 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.69A16 16 0 0 0 16 16.73l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>',
  key: SVGI.key
};
function siteIcon(key, size = 18) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${SITE_ICONS[key] || SITE_ICONS.globe}</svg>`;
}

// ── CATEGORÍAS (metadatos de color/etiqueta) ─────────
const CATS = [
  { slug: 'social',  label: 'Redes Sociales', color: '#60a5fa' },
  { slug: 'trabajo', label: 'Trabajo',        color: '#fbbf24' },
  { slug: 'banco',   label: 'Banco',          color: '#34d399' },
  { slug: 'apps',    label: 'Otras apps',     color: '#c084fc' }
];
const CUSTOM_COLORS = ['#f472b6', '#22d3ee', '#fb923c', '#a3e635', '#818cf8', '#f87171'];
let customCategories = [];   // [{id,name,slug}] cargadas por categories.js

function catInfo(slug) {
  const f = CATS.find(c => c.slug === slug);
  if (f) return f;
  const c = customCategories.find(x => x.slug === slug);
  let h = 0; for (const ch of String(slug)) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const color = CUSTOM_COLORS[h % CUSTOM_COLORS.length];
  if (c) return { slug, label: c.name, color, custom: true, id: c.id };
  const s = String(slug || 'general');
  return { slug, label: s.charAt(0).toUpperCase() + s.slice(1), color: '#8b8ba7' };
}
function allCategories() { return [...CATS, ...customCategories.map(c => catInfo(c.slug))]; }

// ── HELPERS DE TEXTO ─────────────────────────────────
function escHtml(s) { return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function formatDate(d) {
  const dt = new Date(String(d).replace(' ', 'T'));
  if (isNaN(dt)) return '';
  return dt.toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' });
}
function hostOf(url) {
  if (!url) return '';
  try { return new URL(/^https?:\/\//i.test(url) ? url : 'https://' + url).host; } catch (_) { return url; }
}
function safeUrl(url) {
  if (!url) return '';
  const u = /^https?:\/\//i.test(url) ? url : 'https://' + url;
  try { return new URL(u).href; } catch (_) { return ''; }
}

// ── TOASTS (abajo-centro) ────────────────────────────
function showToast(message, type = 'info', opts = {}) {
  let c = document.querySelector('.toast-container');
  if (!c) {
    c = document.createElement('div');
    c.className = 'toast-container';
    c.setAttribute('role', 'status');
    c.setAttribute('aria-live', 'polite');
    document.body.appendChild(c);
  }
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  const ico = type === 'success' ? 'check' : type === 'error' ? 'alert' : 'info';
  t.innerHTML = `${svg(ico, 16, 2.5)}<span class="toast-msg"></span>`;
  const msg = t.querySelector('.toast-msg');
  msg.textContent = message;
  c.appendChild(t);
  requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('in')));
  let timer = null, closed = false;
  const close = () => {
    if (closed) return; closed = true; clearTimeout(timer);
    t.classList.remove('in');
    setTimeout(() => t.remove(), 260);
  };
  const dur = opts.duration === undefined ? 3200 : opts.duration;
  if (dur) timer = setTimeout(close, dur);
  return { close, set(m) { msg.textContent = m; } };
}

// ── PORTAPAPELES (con limpieza a los 20 s) ───────────
let _clipTimer = null, _clipToast = null;
async function writeClip(text) {
  try { await navigator.clipboard.writeText(text); return true; } catch (_) { /* fallback */ }
  try {
    const ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0';
    document.body.appendChild(ta); ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  } catch (_) { return false; }
}
async function copyText(text, msg, sensitive = false) {
  const ok = await writeClip(text);
  if (!ok) return showToast('No se pudo copiar al portapapeles', 'error');
  if (!sensitive) return showToast(msg, 'success');
  clearInterval(_clipTimer);
  if (_clipToast) _clipToast.close();
  let left = 20;
  const toast = showToast('', 'success', { duration: 0 });
  _clipToast = toast;
  const paint = () => toast.set(`${msg} · se limpiará del portapapeles en ${left} s`);
  paint();
  _clipTimer = setInterval(async () => {
    left--;
    if (left > 0) return paint();
    clearInterval(_clipTimer);
    toast.close();
    const cleared = await writeClip('');
    if (cleared) showToast('Portapapeles limpiado', 'info', { duration: 2200 });
  }, 1000);
}

// ── FUERZA DE CONTRASEÑA ─────────────────────────────
const STRENGTH_LABELS = ['Débil', 'Media', 'Fuerte'];
function pwStrength(pw) {
  if (!pw) return { score: 0, level: -1, label: 'Sin contraseña' };
  let classes = 0;
  if (/[a-z]/.test(pw)) classes++;
  if (/[A-Z]/.test(pw)) classes++;
  if (/\d/.test(pw)) classes++;
  if (/[^A-Za-z0-9]/.test(pw)) classes++;
  let s = Math.min(pw.length, 20) * 3.5 + (classes - 1) * 10;
  if (classes === 1) s -= 10;
  if (/(123456|password|qwerty|abcdef|111111|contrase)/i.test(pw)) s -= 30;
  if (new Set(pw).size <= Math.ceil(pw.length / 3)) s -= 20;
  s = Math.max(0, Math.min(100, Math.round(s)));
  const level = s < 40 ? 0 : s < 70 ? 1 : 2;
  return { score: s, level, label: STRENGTH_LABELS[level] };
}
function meterHTML(level) {
  return `<span class="meter s${Math.max(level, 0)}" data-on="${level + 1}" aria-hidden="true"><i></i><i></i><i></i></span>`;
}

// ── GENERADOR DE CONTRASEÑAS ─────────────────────────
function genPassword({ len = 16, upper = true, num = true, sym = true } = {}) {
  const pools = ['abcdefghijkmnopqrstuvwxyz'];
  if (upper) pools.push('ABCDEFGHJKLMNPQRSTUVWXYZ');
  if (num) pools.push('23456789');
  if (sym) pools.push('!@#$%^&*()-_=+[]{}?');
  const all = pools.join('');
  const rnd = (n) => {                       // sin sesgo de módulo
    const max = Math.floor(0x100000000 / n) * n;
    const b = new Uint32Array(1);
    do { crypto.getRandomValues(b); } while (b[0] >= max);
    return b[0] % n;
  };
  const out = pools.map(p => p[rnd(p.length)]);   // al menos uno de cada grupo
  while (out.length < len) out.push(all[rnd(all.length)]);
  for (let i = out.length - 1; i > 0; i--) { const j = rnd(i + 1); [out[i], out[j]] = [out[j], out[i]]; }
  return out.slice(0, len).join('');
}

// ── TILT 3D (solo puntero fino, rAF, sin reduced-motion) ─
function initTilt(root, sel = '[data-tilt]', max = 6) {
  if (!root) return;
  if (!matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  if (matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  let cur = null, raf = 0, last = null;
  const reset = (el) => {
    el.classList.remove('tilting');
    el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg');
  };
  const apply = () => {
    raf = 0;
    if (!cur || !last) return;
    const r = cur.getBoundingClientRect();
    const x = (last.clientX - r.left) / r.width, y = (last.clientY - r.top) / r.height;
    cur.style.setProperty('--ry', ((x - 0.5) * 2 * max).toFixed(2) + 'deg');
    cur.style.setProperty('--rx', ((0.5 - y) * 2 * max).toFixed(2) + 'deg');
    cur.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
    cur.style.setProperty('--my', (y * 100).toFixed(1) + '%');
  };
  root.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    const t = e.target.closest(sel);
    if (t !== cur) {
      if (cur) reset(cur);
      cur = t;
      if (cur) cur.classList.add('tilting');
    }
    last = e;
    if (cur && !raf) raf = requestAnimationFrame(apply);
  }, { passive: true });
  root.addEventListener('pointerleave', () => { if (cur) { reset(cur); cur = null; } }, { passive: true });
}

// ── CONFIRMACIÓN (modal propio, reemplaza confirm()) ─
function confirmDialog({ title = '¿Confirmar?', message = '', confirmText = 'Eliminar', danger = true } = {}) {
  return new Promise((resolve) => {
    const prev = document.activeElement;
    const ov = document.createElement('div');
    ov.className = 'modal-ov';
    ov.innerHTML = `
      <div class="modal modal-sm" role="alertdialog" aria-modal="true" aria-labelledby="cf-title" aria-describedby="cf-msg">
        <div class="cf-ico ${danger ? 'danger' : ''}">${svg(danger ? 'trash' : 'info', 22)}</div>
        <h3 id="cf-title"></h3>
        <p id="cf-msg" class="muted"></p>
        <div class="modal-foot">
          <button type="button" class="btn btn-ghost" data-v="0">Cancelar</button>
          <button type="button" class="btn ${danger ? 'btn-danger' : 'btn-primary'}" data-v="1"></button>
        </div>
      </div>`;
    ov.querySelector('#cf-title').textContent = title;
    ov.querySelector('#cf-msg').textContent = message;
    ov.querySelector('[data-v="1"]').textContent = confirmText;
    document.body.appendChild(ov);
    requestAnimationFrame(() => requestAnimationFrame(() => ov.classList.add('open')));
    const done = (v) => {
      document.removeEventListener('keydown', onKey, true);
      ov.classList.remove('open');
      setTimeout(() => ov.remove(), 250);
      if (prev && prev.focus) prev.focus();
      resolve(v);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') { e.stopPropagation(); done(false); }
      else if (e.key === 'Tab') {
        const f = [...ov.querySelectorAll('button')];
        const i = f.indexOf(document.activeElement);
        e.preventDefault(); e.stopPropagation();
        f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
      }
    };
    document.addEventListener('keydown', onKey, true);
    ov.addEventListener('click', (e) => {
      if (e.target === ov) return done(false);
      const b = e.target.closest('[data-v]');
      if (b) done(b.dataset.v === '1');
    });
    ov.querySelector('[data-v="0"]').focus();
  });
}

// ── TRAMPA DE FOCO para modales y drawer abiertos ────
function installFocusTrap() {
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const layer = [...document.querySelectorAll('.modal-ov.open .modal, .drawer.open')].pop();
    if (!layer) return;
    const f = [...layer.querySelectorAll('button:not([disabled]),input:not([disabled]):not([type=hidden]),select,textarea,a[href]')]
      .filter(el => el.offsetParent !== null);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1], a = document.activeElement;
    if (!layer.contains(a)) { e.preventDefault(); first.focus(); }
    else if (e.shiftKey && a === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && a === last) { e.preventDefault(); first.focus(); }
  });
}
