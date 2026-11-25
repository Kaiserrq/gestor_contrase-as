// ====================================================
//  KeyVault — js/auth.js
//  Login, registro, pestañas animadas, visibilidad de contraseña
//  y tilt 3D de la tarjeta en login.html
// ====================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── Si ya hay sesión activa, ir al dashboard ─────────────
  if (api.getToken()) {
    api.verify().then(r => {
      if (r.valid) window.location.href = '/dashboard.html';
    }).catch(() => {});
  }

  // ── Referencias DOM ───────────────────────────────────────
  const loginForm    = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const tabs         = document.getElementById('tabs');
  const tabLogin     = document.getElementById('tab-login');
  const tabRegister  = document.getElementById('tab-register');

  // ── Pestañas (indicador deslizante) ───────────────────────
  function showTab(which) {
    const isLogin = which === 'login';
    tabs.dataset.tab = which;
    tabLogin.setAttribute('aria-selected', String(isLogin));
    tabRegister.setAttribute('aria-selected', String(!isLogin));
    loginForm.classList.toggle('hidden', !isLogin);
    registerForm.classList.toggle('hidden', isLogin);
    document.getElementById(isLogin ? 'login-user' : 'reg-user')?.focus({ preventScroll: true });
  }
  tabLogin?.addEventListener('click', () => showTab('login'));
  tabRegister?.addEventListener('click', () => showTab('register'));
  tabs?.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { showTab('register'); tabRegister.focus(); }
    if (e.key === 'ArrowLeft') { showTab('login'); tabLogin.focus(); }
  });

  // ── Toggle mostrar/ocultar contraseña ─────────────────────
  document.querySelectorAll('.toggle-password').forEach(btn => {
    btn.innerHTML = svg('eye', 16);
    btn.addEventListener('click', () => {
      const input = btn.closest('.input-wrap')?.querySelector('input');
      if (!input) return;
      input.type = input.type === 'password' ? 'text' : 'password';
      btn.innerHTML = svg(input.type === 'text' ? 'eyeoff' : 'eye', 16);
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
      btn.disabled = false;
      btn.textContent = 'Crear cuenta';
      showTab('login');
    }
  });

  // ── Tilt 3D de la tarjeta (máx. 6°, rAF; solo ratón y sin reduced-motion) ──
  const card = document.getElementById('login-card');
  const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const calm = matchMedia('(prefers-reduced-motion:reduce)').matches;
  if (card && fine && !calm) {
    const MAX = 6;
    let raf = 0, px = 0, py = 0, active = false;
    const paint = () => {
      raf = 0;
      card.style.setProperty('--ry', (px * MAX).toFixed(2) + 'deg');
      card.style.setProperty('--rx', (-py * MAX).toFixed(2) + 'deg');
    };
    window.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse') return;
      px = (e.clientX / innerWidth - 0.5) * 2;
      py = (e.clientY / innerHeight - 0.5) * 2;
      if (!active) { active = true; card.classList.add('tilting'); }
      if (!raf) raf = requestAnimationFrame(paint);
    }, { passive: true });
    document.addEventListener('pointerleave', () => {
      active = false; card.classList.remove('tilting'); px = py = 0;
      if (!raf) raf = requestAnimationFrame(paint);
    }, { passive: true });
  }

});
