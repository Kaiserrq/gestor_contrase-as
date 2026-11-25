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
  Shell.setUser(uname);

  // Categorías en el sidebar
  loadCategories();

  // ── Restablecer demo (solo en modo demo) ──────────
  if (typeof window.kvResetDemo === 'function') {
    const box = document.getElementById('demo-reset-box');
    box?.classList.remove('hidden');
    document.getElementById('btn-demo-reset')?.addEventListener('click', async () => {
      const ok = await confirmDialog({
        title: '¿Restablecer la demo?',
        message: 'Se borrarán los datos de este navegador y volverán los de ejemplo.',
        confirmText: 'Restablecer', danger: false
      });
      if (ok) window.kvResetDemo();
    });
  }

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
    Shell.setUser(result.username);
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
