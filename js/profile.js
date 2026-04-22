document.addEventListener('DOMContentLoaded', async () => {
  // ── Auth ──────────────────────────────────────────
  if (!api.getToken()) return window.location.href = '/login.html';

  let authData;
  try {
    authData = await api.verify();
  } catch (e) {
    return api.logout();
  }
  if (!authData?.valid) return api.logout();

  const uname = localStorage.getItem('username') || authData.user?.username || 'Usuario';
  document.getElementById('username-display').textContent = uname;
  document.getElementById('user-avatar').textContent = uname[0].toUpperCase();
  document.getElementById('badge-username').textContent = uname;

  // ── Logout ────────────────────────────────────────
  document.getElementById('btn-logout')?.addEventListener('click', () => api.logout());

  // ── Sidebar móvil ─────────────────────────────────
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  document.getElementById('btn-menu')?.addEventListener('click', () => {
    sidebar.classList.add('open'); overlay.classList.add('show');
  });
  overlay?.addEventListener('click', () => {
    sidebar.classList.remove('open'); overlay.classList.remove('show');
  });

  // ── Custom categories en sidebar ──────────────────
  try {
    const cats = await api.getCategories();
    const nav  = document.getElementById('custom-cats-nav');
    if (nav && cats.length) {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>`;
      nav.innerHTML = cats.map(c => `<a class="nav-item" href="/passwords.html?cat=${c.slug}">${svg}${c.name}</a>`).join('');
    }
  } catch (_) {}

  // ── Cambiar nombre de usuario ─────────────────────
  document.getElementById('btn-save-username')?.addEventListener('click', async () => {
    const newUsername     = document.getElementById('p-newuser').value.trim();
    const currentPassword = document.getElementById('p-curpw-u').value;

    if (!newUsername)     return showToast('Ingresa el nuevo nombre de usuario', 'error');
    if (!currentPassword) return showToast('Ingresa tu contraseña actual', 'error');

    const btn = document.getElementById('btn-save-username');
    btn.disabled = true; btn.textContent = 'Guardando...';

    let result;
    try {
      result = await api.updateProfile({ currentPassword, newUsername });
    } catch (e) {
      btn.disabled = false; btn.textContent = 'Guardar usuario';
      return showToast('Error de conexión. Reinicia el servidor.', 'error');
    }

    btn.disabled = false; btn.textContent = 'Guardar usuario';

    if (result.error) return showToast(result.error, 'error');

    localStorage.setItem('username', result.username);
    document.getElementById('username-display').textContent = result.username;
    document.getElementById('user-avatar').textContent = result.username[0].toUpperCase();
    document.getElementById('badge-username').textContent = result.username;
    document.getElementById('p-newuser').value  = '';
    document.getElementById('p-curpw-u').value  = '';
    showToast('Usuario actualizado correctamente', 'success');
  });

  // ── Cambiar contraseña ────────────────────────────
  document.getElementById('btn-save-password')?.addEventListener('click', async () => {
    const currentPassword = document.getElementById('p-curpw').value;
    const newPassword     = document.getElementById('p-newpw').value;
    const confirmPw       = document.getElementById('p-confirmpw').value;

    if (!currentPassword)            return showToast('Ingresa tu contraseña actual', 'error');
    if (!newPassword)                return showToast('Ingresa la nueva contraseña', 'error');
    if (newPassword.length < 6)      return showToast('La nueva contraseña debe tener al menos 6 caracteres', 'error');
    if (newPassword !== confirmPw)   return showToast('Las contraseñas no coinciden', 'error');

    const btn = document.getElementById('btn-save-password');
    btn.disabled = true; btn.textContent = 'Guardando...';

    let result;
    try {
      result = await api.updateProfile({ currentPassword, newPassword });
    } catch (e) {
      btn.disabled = false; btn.textContent = 'Guardar contraseña';
      return showToast('Error de conexión. Reinicia el servidor.', 'error');
    }

    btn.disabled = false; btn.textContent = 'Guardar contraseña';

    if (result.error) return showToast(result.error, 'error');

    document.getElementById('p-curpw').value    = '';
    document.getElementById('p-newpw').value    = '';
    document.getElementById('p-confirmpw').value = '';
    showToast('Contraseña actualizada. Cerrando sesión...', 'success');
    setTimeout(() => api.logout(), 2000);
  });
});
