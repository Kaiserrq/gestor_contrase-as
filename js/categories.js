// ═══════════════════════════════════════════════════
//  GESTIÓN DE CATEGORÍAS PERSONALIZADAS (todas las páginas)
//  Carga, sidebar, alta y baja. Emite "kv:cats" al cambiar.
// ═══════════════════════════════════════════════════

async function loadCategories() {
  const r = await api.getCategories();
  customCategories = Array.isArray(r) ? r : [];
  renderCategoryNav();
  document.dispatchEvent(new CustomEvent('kv:cats'));
}

// Sidebar: categorías fijas + personalizadas (con botón de borrar)
function renderCategoryNav() {
  const nav = document.getElementById('cats-nav');
  if (!nav) return;
  nav.innerHTML = allCategories().map(c => `
    <div class="nav-row">
      <a class="nav-item" data-cat="${escHtml(c.slug)}" style="--c:${c.color}" href="/passwords.html?cat=${encodeURIComponent(c.slug)}" title="${escHtml(c.label)}">
        <span class="cat-ico">${svg('folder', 18)}</span><span class="nav-t">${escHtml(c.label)}</span>
      </a>
      ${c.custom ? `<button type="button" class="icon-btn danger nav-x" data-del-cat="${c.id}" data-slug="${escHtml(c.slug)}" aria-label="Eliminar categoría ${escHtml(c.label)}" title="Eliminar">${svg('x', 14, 2.5)}</button>` : ''}
    </div>`).join('');
  markSidebarCat();
}

function markSidebarCat() {
  const cur = typeof currentFilter !== 'undefined' ? currentFilter : null;
  document.querySelectorAll('#cats-nav .nav-item').forEach(a => a.classList.toggle('active', cur !== null && cur !== 'all' && a.dataset.cat === cur));
}

async function deleteCat(id, slug) {
  const c = customCategories.find(x => x.id === +id);
  const ok = await confirmDialog({
    title: '¿Eliminar categoría?',
    message: `${c ? `"${c.name}" se eliminará. ` : ''}Las contraseñas asignadas no se borrarán.`,
    confirmText: 'Eliminar'
  });
  if (!ok) return;
  const r = await api.deleteCategory(id);
  if (r.error) return showToast(r.error, 'error');
  customCategories = customCategories.filter(x => x.id !== +id);
  renderCategoryNav();
  document.dispatchEvent(new CustomEvent('kv:cats'));
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
  renderCategoryNav();
  document.dispatchEvent(new CustomEvent('kv:cats'));
  closeCategoryModal();
  showToast(`Categoría "${result.name}" creada`, 'success');
}

// Se registra después de shell.js, así que el DOM del layout ya existe
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btn-add-category')?.addEventListener('click', openCategoryModal);
  document.getElementById('btn-cat-modal-cancel')?.addEventListener('click', closeCategoryModal);
  document.getElementById('btn-cat-cancel2')?.addEventListener('click', closeCategoryModal);
  document.getElementById('cat-modal-overlay')?.addEventListener('click', e => {
    if (e.target.id === 'cat-modal-overlay') closeCategoryModal();
  });
  document.getElementById('btn-cat-save')?.addEventListener('click', saveCategoryModal);
  document.getElementById('new-cat-name')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') saveCategoryModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && document.getElementById('cat-modal-overlay')?.classList.contains('open')) closeCategoryModal();
  });

  // Sidebar: borrar categoría; en páginas con lista, filtrar sin recargar
  document.getElementById('cats-nav')?.addEventListener('click', e => {
    const del = e.target.closest('[data-del-cat]');
    if (del) return deleteCat(+del.dataset.delCat, del.dataset.slug);
    const a = e.target.closest('a[data-cat]');
    if (a && typeof setFilter === 'function' && document.getElementById('passwords-grid')) {
      e.preventDefault();
      setFilter(a.dataset.cat);
    }
  });
});
