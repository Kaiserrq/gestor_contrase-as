// ====================================================
//  KeyVault — frontend/js/auth.js
//  Maneja login, registro, toggle de formularios y
//  visibilidad de contraseñas en login.html
// ====================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── Si ya hay sesión activa, ir al dashboard ─────────────
  if (api.getToken()) {
    api.verify().then(r => {
      if (r.valid) window.location.href = '/dashboard.html';
    });
  }

  // ── Referencias DOM ───────────────────────────────────────
  const loginForm    = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const showRegLink  = document.getElementById('show-register');
  const showLogLink  = document.getElementById('show-login');

  // ── Toggle entre formularios ──────────────────────────────
  showRegLink?.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
    document.getElementById('reg-user')?.focus();
  });

  showLogLink?.addEventListener('click', (e) => {
    e.preventDefault();
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
    document.getElementById('login-user')?.focus();
  });

  // ── Toggle mostrar/ocultar contraseña ─────────────────────
  document.querySelectorAll('.toggle-password').forEach(btn => {
    btn.style.cursor = 'pointer';
    btn.addEventListener('click', () => {
      const wrap  = btn.closest('.input-icon-wrap');
      const input = wrap?.querySelector('input[type="password"], input[type="text"]');
      if (!input) return;
      input.type = input.type === 'password' ? 'text' : 'password';
      // Cambiar icono entre ojo-abierto y ojo-cerrado
      btn.innerHTML = input.type === 'text'
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
    });
  });

  // ── FORMULARIO LOGIN ──────────────────────────────────────
  loginForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('login-user').value.trim();
    const password = document.getElementById('login-pass').value;

    if (!username || !password) {
      return showToast('Ingresa tu usuario y contraseña.', 'error');
    }

    const btn = loginForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Iniciando sesión...';

    const data = await api.login(username, password);

    if (data.error) {
      showToast(data.error, 'error');
      btn.disabled = false;
      btn.textContent = 'Iniciar sesión';
      return;
    }

    // Guardar token y nombre de usuario
    api.setToken(data.token);
    localStorage.setItem('username', data.username);

    showToast('¡Bienvenido, ' + data.username + '!', 'success');
    setTimeout(() => { window.location.href = '/dashboard.html'; }, 700);
  });

  // ── FORMULARIO REGISTRO ───────────────────────────────────
  registerForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('reg-user').value.trim();
    const password = document.getElementById('reg-pass').value;
    const confirm  = document.getElementById('reg-confirm').value;

    if (!username || !password || !confirm) {
      return showToast('Completa todos los campos.', 'error');
    }
    if (username.length < 3) {
      return showToast('El usuario debe tener al menos 3 caracteres.', 'error');
    }
    if (password.length < 6) {
      return showToast('La contraseña debe tener al menos 6 caracteres.', 'error');
    }
    if (password !== confirm) {
      return showToast('Las contraseñas no coinciden.', 'error');
    }

    const btn = registerForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Creando cuenta...';

    const data = await api.register(username, password);

    if (data.error) {
      showToast(data.error, 'error');
      btn.disabled = false;
      btn.textContent = 'Crear cuenta';
      return;
    }

    showToast('Cuenta creada correctamente. Iniciando sesión...', 'success');

    // Auto-login inmediato después del registro
    const loginData = await api.login(username, password);
    if (loginData.token) {
      api.setToken(loginData.token);
      localStorage.setItem('username', loginData.username);
      setTimeout(() => { window.location.href = '/dashboard.html'; }, 900);
    } else {
      // Si algo falla, ir al login manualmente
      btn.disabled = false;
      btn.textContent = 'Crear cuenta';
      registerForm.classList.add('hidden');
      loginForm.classList.remove('hidden');
    }
  });

});
