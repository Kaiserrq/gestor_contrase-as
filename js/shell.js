// ====================================================
//  KeyVault — js/shell.js
//  Construye el layout de la app (sidebar, topbar, barra inferior móvil)
//  y los overlays compartidos. Cada página aporta solo <div id="page-content">.
//  Debe cargarse DESPUÉS de passwords.js y ANTES de dashboard.js/profile.js.
// ====================================================
(function () {
  const page = document.body.dataset.page || '';
  const hasList = page === 'dashboard' || page === 'passwords';
  const TITLES = {
    dashboard: ['Panel', 'Resumen de tu bóveda'],
    passwords: ['Contraseñas', 'Todas tus credenciales'],
    profile: ['Perfil', 'Gestiona tu cuenta']
  };
  const SIDE_KEY = 'kv_side';
  const lsGet = (k) => { try { return localStorage.getItem(k); } catch (_) { return null; } };
  const lsSet = (k, v) => { try { localStorage.setItem(k, v); } catch (_) {} };

  const logoMark = `<span class="logo-mark">${svg('key', 20, 2.2)}</span>`;

  function build() {
    const content = document.getElementById('page-content');
    const [title, subtitle] = TITLES[page] || ['KeyVault', ''];
    const app = document.createElement('div');
    app.className = 'app';
    app.id = 'app';
    app.innerHTML = `
      <aside class="side" id="side" aria-label="Navegación principal">
        <div class="side-head">
          <a class="brand" href="/dashboard.html" aria-label="KeyVault, ir al panel">${logoMark}<span class="brand-t">KeyVault</span></a>
          <button type="button" class="icon-btn" id="side-toggle" aria-label="Contraer menú lateral" aria-expanded="true">${svg('panel', 18)}</button>
        </div>
        <nav class="side-nav">
          <div class="nav-label">Menú</div>
          <a class="nav-item${page === 'dashboard' ? ' active' : ''}" href="/dashboard.html" title="Panel">${svg('grid')}<span class="nav-t">Panel</span></a>
          <a class="nav-item${page === 'passwords' ? ' active' : ''}" href="/passwords.html" title="Contraseñas">${svg('key')}<span class="nav-t">Contraseñas</span><span class="count${page === 'profile' ? ' hidden' : ''}" id="nav-count">0</span></a>
          <div class="nav-label">Categorías</div>
          <div id="cats-nav"></div>
          <button type="button" class="nav-item nav-add" id="btn-add-category" title="Agregar categoría">${svg('plus')}<span class="nav-t">Agregar categoría</span></button>
          <div class="nav-label">Cuenta</div>
          <a class="nav-item${page === 'profile' ? ' active' : ''}" href="/profile.html" title="Perfil">${svg('user')}<span class="nav-t">Perfil</span></a>
        </nav>
        <div class="side-foot">
          <div class="user-chip">
            <div class="user-avatar" id="user-avatar">U</div>
            <div class="user-info"><div class="user-name" id="username-display">Usuario</div><div class="user-role">Administrador</div></div>
            <button type="button" class="icon-btn danger" id="btn-logout" data-logout aria-label="Cerrar sesión" title="Cerrar sesión">${svg('logout', 17)}</button>
            <button type="button" class="icon-btn danger logout-c" data-logout aria-label="Cerrar sesión" title="Cerrar sesión">${svg('logout', 17)}</button>
          </div>
        </div>
      </aside>

      <div class="main">
        <header class="top">
          <a class="top-brand" href="/dashboard.html" aria-label="KeyVault">${logoMark}</a>
          <div class="top-title"><h1 id="page-title">${title}</h1><p id="page-subtitle">${subtitle}</p></div>
          ${hasList ? `
          <label class="search">
            <span class="ico-l">${svg('search', 16)}</span>
            <input id="search-input" class="input" type="search" placeholder="Buscar contraseñas..." aria-label="Buscar contraseñas" autocomplete="off">
            <kbd aria-hidden="true">/</kbd>
          </label>
          <button type="button" class="btn btn-primary top-add" id="btn-add">${svg('plus', 16, 2.5)}Agregar</button>` : ''}
        </header>
        <main class="content" id="content"></main>
      </div>

      <nav class="bottom" aria-label="Navegación móvil">
        <a class="bn-item${page === 'dashboard' ? ' active' : ''}" href="/dashboard.html">${svg('grid', 22)}<span>Panel</span></a>
        <a class="bn-item${page === 'passwords' ? ' active' : ''}" href="/passwords.html">${svg('key', 22)}<span>Contraseñas</span></a>
        <button type="button" class="bn-fab" id="fab" aria-label="Agregar contraseña">${svg('plus', 26, 2.5)}</button>
        <a class="bn-item${page === 'profile' ? ' active' : ''}" href="/profile.html">${svg('user', 22)}<span>Perfil</span></a>
        <button type="button" class="bn-item" data-logout aria-label="Cerrar sesión">${svg('logout', 22)}<span>Salir</span></button>
      </nav>`;

    document.body.prepend(app);
    const slot = app.querySelector('#content');
    if (content) { while (content.firstChild) slot.appendChild(content.firstChild); content.remove(); }

    // La píldora demo (creada por api-demo.js) va dentro de la topbar, a la izquierda del buscador
    const demo = document.querySelector('.demo-wrap');
    if (demo) { const t = app.querySelector('.top'); t.insertBefore(demo, t.querySelector('.search') || null); }

    document.body.insertAdjacentHTML('beforeend', overlays());

    // Sidebar colapsable (preferencia en localStorage; en tablet, colapsada por defecto)
    const toggle = app.querySelector('#side-toggle');
    const apply = () => {
      const pref = lsGet(SIDE_KEY);
      const c = pref === null ? innerWidth < 1100 : pref === '1';
      app.classList.toggle('collapsed', c);
      toggle.setAttribute('aria-expanded', String(!c));
      toggle.setAttribute('aria-label', c ? 'Expandir menú lateral' : 'Contraer menú lateral');
    };
    apply();
    matchMedia('(max-width:1099px)').addEventListener('change', apply);
    toggle.addEventListener('click', () => {
      lsSet(SIDE_KEY, app.classList.contains('collapsed') ? '0' : '1');
      apply();
    });

    installFocusTrap();

    // Cerrar sesión (sidebar, barra móvil, perfil)
    document.querySelectorAll('[data-logout]').forEach(b => b.addEventListener('click', () => api.logout()));

    // FAB móvil: abre el modal si existe, si no, va a Contraseñas con ?new=1
    app.querySelector('#fab').addEventListener('click', () => {
      if (typeof openModal === 'function' && document.getElementById('modal-overlay')) openModal();
      else location.href = '/passwords.html?new=1';
    });

    // Atajos de búsqueda: "/" o Ctrl/Cmd+K
    document.addEventListener('keydown', (e) => {
      const t = e.target, typing = /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable;
      const isK = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k';
      const isSlash = e.key === '/' && !typing && !e.ctrlKey && !e.metaKey && !e.altKey;
      if (!isK && !isSlash) return;
      const s = document.getElementById('search-input');
      if (!s) return;
      e.preventDefault(); s.focus(); s.select();
    });
    document.getElementById('search-input')?.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { e.target.value = ''; e.target.dispatchEvent(new Event('input')); e.target.blur(); }
    });
  }

  // ── Overlays compartidos ───────────────────────────
  function overlays() {
    const closeBtn = (id, label) => `<button type="button" class="icon-btn" id="${id}" aria-label="${label}">${svg('x', 18)}</button>`;
    let h = `
      <div class="modal-ov" id="cat-modal-overlay">
        <div class="modal modal-cat" role="dialog" aria-modal="true" aria-labelledby="cat-modal-title" style="max-width:420px">
          <div class="modal-head"><h3 id="cat-modal-title">Nueva categoría</h3>${closeBtn('btn-cat-modal-cancel', 'Cerrar')}</div>
          <div class="modal-body">
            <div class="field">
              <label for="new-cat-name">Nombre de la categoría <span class="req">*</span></label>
              <input id="new-cat-name" type="text" class="input" maxlength="40" placeholder="ej. Streaming, Gaming..." autocomplete="off">
              <span class="muted" style="font-size:12px">Se crea un filtro y una opción en el selector automáticamente.</span>
            </div>
          </div>
          <div class="modal-foot">
            <button type="button" class="btn btn-ghost" id="btn-cat-cancel2">Cancelar</button>
            <button type="button" class="btn btn-primary" id="btn-cat-save">Agregar</button>
          </div>
        </div>
      </div>`;
    if (!hasList) return h;

    const iconBtns = Object.keys(SITE_ICONS).map(k =>
      `<button type="button" class="icon-opt${k === 'globe' ? ' selected' : ''}" data-icon="${k}" title="${k}" aria-label="Icono ${k}">${siteIcon(k, 20)}</button>`).join('');

    h += `
      <div class="ov" id="drawer-ov"></div>
      <aside class="drawer" id="drawer" role="dialog" aria-modal="true" aria-labelledby="dr-name" aria-hidden="true"></aside>

      <div class="modal-ov" id="modal-overlay">
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div class="modal-head"><h3 id="modal-title">Nueva contraseña</h3>${closeBtn('btn-modal-cancel', 'Cerrar')}</div>
          <div class="modal-body" id="password-form">
            <div class="field"><label for="f-site">Nombre del sitio <span class="req">*</span></label>
              <input id="f-site" type="text" class="input" placeholder="ej. Google, Netflix, GitHub..." autocomplete="off"></div>
            <div class="field"><label for="f-url">URL <span class="muted">(opcional)</span></label>
              <input id="f-url" type="text" inputmode="url" class="input" placeholder="https://..." autocomplete="off"></div>
            <div class="grid2">
              <div class="field"><label for="f-user">Usuario / Email</label>
                <input id="f-user" type="text" class="input" placeholder="tu@email.com" autocomplete="off"></div>
              <div class="field"><label for="f-category">Categoría</label>
                <select id="f-category" class="input"></select></div>
            </div>
            <div class="field">
              <label for="f-pass">Contraseña <span class="req">*</span></label>
              <div class="input-wrap has-r">
                <input id="f-pass" type="password" class="input mono" style="padding-left:12px" placeholder="••••••••" autocomplete="new-password">
                <span class="ico-r">
                  <button type="button" class="icon-btn" id="btn-toggle-pass" aria-label="Mostrar u ocultar contraseña">${svg('eye', 17)}</button>
                  <button type="button" class="icon-btn" id="btn-gen" aria-label="Generar contraseña" title="Generar contraseña">${svg('refresh', 17)}</button>
                </span>
              </div>
              <div class="f-str" id="f-str"><span class="meter meter-lg" id="f-meter" data-on="0"><i></i><i></i><i></i></span><span class="s-l" id="f-str-label">Sin contraseña</span></div>
              <div class="gen">
                <div class="gen-row"><label for="gen-len" class="lbl" style="min-width:64px">Longitud</label>
                  <input id="gen-len" type="range" min="8" max="64" value="16" aria-label="Longitud de la contraseña"><span class="gen-len" id="gen-len-val">16</span></div>
                <div class="gen-row" style="flex-wrap:wrap">
                  <label class="chk"><input type="checkbox" id="gen-upper" checked>Mayúsculas</label>
                  <label class="chk"><input type="checkbox" id="gen-num" checked>Números</label>
                  <label class="chk"><input type="checkbox" id="gen-sym" checked>Símbolos</label>
                  <button type="button" class="btn btn-ghost btn-sm" id="btn-regen" style="margin-left:auto">${svg('refresh', 15)}Regenerar</button>
                </div>
              </div>
            </div>
            <div class="field"><label>Ícono</label><div class="icon-grid" id="icon-picker">${iconBtns}</div><input type="hidden" id="selected-icon" value="globe"></div>
            <div class="field"><label for="f-notes">Notas</label>
              <textarea id="f-notes" class="input" rows="2" placeholder="Notas adicionales..."></textarea></div>
          </div>
          <div class="modal-foot">
            <button type="button" class="btn btn-ghost" id="btn-modal-cancel-2">Cancelar</button>
            <button type="button" class="btn btn-primary" id="btn-modal-save">Guardar</button>
          </div>
        </div>
      </div>`;

    if (page === 'passwords') {
      h += `
      <div class="modal-ov" id="import-modal-overlay">
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="imp-title" style="max-width:560px">
          <div class="modal-head"><h3 id="imp-title">Importar contraseñas</h3>${closeBtn('btn-import-modal-cancel', 'Cerrar')}</div>
          <div class="modal-body">
            <div class="imp-box">
              <strong>Formato esperado (una contraseña por línea):</strong><br>
              <code>Nombre, usuario@email.com, contraseña, Notas opcionales</code><br>
              Puedes pegar el contenido de tu archivo <strong>.txt</strong> exportado o escribirlo a mano.
            </div>
            <div class="field"><label for="import-text-area">Pegar texto TXT <span class="req">*</span></label>
              <textarea id="import-text-area" class="input" rows="6" placeholder="Linkedin, yo@email.com, 123456, Mi cuenta"></textarea></div>
            <div id="import-preview" style="display:none">
              <div class="muted" style="font-size:12.5px;margin-bottom:8px" id="import-preview-label"></div>
              <div id="import-preview-cards" style="display:flex;flex-direction:column;gap:8px;max-height:220px;overflow-y:auto"></div>
            </div>
            <div id="import-error"></div>
          </div>
          <div class="modal-foot">
            <button type="button" class="btn btn-ghost" id="btn-import-preview">Vista previa</button>
            <button type="button" class="btn btn-ghost" id="btn-import-cancel2">Cancelar</button>
            <button type="button" class="btn btn-primary" id="btn-import-confirm" disabled>Importar todo</button>
          </div>
        </div>
      </div>`;
    }
    return h;
  }

  // ── API pública del shell ──────────────────────────
  window.Shell = {
    setUser(name) {
      const n = name || 'Usuario';
      const a = document.getElementById('user-avatar'), d = document.getElementById('username-display');
      if (a) a.textContent = n[0].toUpperCase();
      if (d) d.textContent = n;
      const b = document.getElementById('badge-username'); if (b) b.textContent = n;
      const pa = document.getElementById('ph-avatar'); if (pa) pa.textContent = n[0].toUpperCase();
    }
  };

  document.addEventListener('DOMContentLoaded', build);
})();
