// ═══════════════════════════════════════════════════
//  GESTIÓN DE CATEGORÍAS PERSONALIZADAS
//  Se carga después de dashboard.js
// ═══════════════════════════════════════════════════

async function loadCategories() {
  customCategories = await api.getCategories();
  renderCustomCategories();
}

function renderCustomCategories() {
  const folderSVG = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>`;
  const xSVG     = `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

  // 1. Sidebar nav
  const nav = document.getElementById('custom-cats-nav');
  if (nav) {
    nav.innerHTML = customCategories.map(c => `
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:2px">
        <a class="nav-item" style="flex:1;margin-bottom:0" href="/passwords.html?cat=${c.slug}">
          ${folderSVG}${escHtml(c.name)}
        </a>
        <button class="btn-icon btn-danger" style="padding:4px 5px;flex-shrink:0;height:32px"
          title="Eliminar" onclick="deleteCat(${c.id},'${c.slug}')">
          ${xSVG}
        </button>
      </div>`).join('');
  }

  // 2. Barra de filtros
  const fc = document.getElementById('custom-filter-btns');
  if (fc) {
    fc.innerHTML = customCategories.map(c =>
      `<button class="filter-btn${currentFilter === c.slug ? ' active' : ''}" data-cat="${c.slug}">${escHtml(c.name)}</button>`
    ).join('');
    fc.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.cat;
        renderPasswords(document.getElementById('search-input')?.value || '');
      });
    });
  }

  // 3. Modal select — opciones personalizadas (mantiene fijas)
  const sel = document.getElementById('f-category');
  if (sel) {
    sel.querySelectorAll('.custom-cat-opt').forEach(o => o.remove());
    customCategories.forEach(c => {
      const o = document.createElement('option');
      o.value = c.slug; o.textContent = c.name; o.className = 'custom-cat-opt';
      sel.appendChild(o);
    });
  }
}

function setFilter(slug) {
  currentFilter = slug;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`.filter-btn[data-cat="${slug}"]`)?.classList.add('active');
  renderPasswords('');
}

async function deleteCat(id, slug) {
  if (!confirm('¿Eliminar esta categoría?\nLas contraseñas asignadas no se borrarán.')) return;
  const r = await api.deleteCategory(id);
  if (r.error) return showToast(r.error, 'error');
  if (currentFilter === slug) currentFilter = 'all';
  customCategories = customCategories.filter(c => c.id !== id);
  renderCustomCategories();
  renderPasswords('');
  showToast('Categoría eliminada', 'success');
}

function openCategoryModal() {
  const inp = document.getElementById('new-cat-name');
  if (inp) inp.value = '';
  document.getElementById('cat-modal-overlay')?.classList.add('open');
  setTimeout(() => inp?.focus(), 60);
}

function closeCategoryModal() {
  document.getElementById('cat-modal-overlay')?.classList.remove('open');
}

async function saveCategoryModal() {
  const name = document.getElementById('new-cat-name')?.value.trim();
  if (!name) return showToast('Ingresa un nombre para la categoría', 'error');

  const btn = document.getElementById('btn-cat-save');
  btn.disabled = true; btn.textContent = 'Guardando...';
  const result = await api.createCategory(name);
  btn.disabled = false; btn.textContent = 'Agregar';

  if (result.error) return showToast(result.error, 'error');

  customCategories.push(result);
  renderCustomCategories();
  closeCategoryModal();
  showToast(`Categoría "${result.name}" creada`, 'success');
}
