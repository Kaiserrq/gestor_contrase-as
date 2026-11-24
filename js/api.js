// URL relativa: funciona desde localhost, IP de red, móvil, etc.
const API_URL = '/api';

const api = {
  // ── TOKEN ────────────────────────────────────────
  getToken() { return localStorage.getItem('token'); },
  setToken(t) { localStorage.setItem('token', t); },
  removeToken() { localStorage.removeItem('token'); localStorage.removeItem('username'); },

  getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    };
  },

  // ── AUTH ─────────────────────────────────────────
  async login(username, password) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    return res.json();
  },

  async register(username, password) {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    return res.json();
  },

  async verify() {
    const res = await fetch(`${API_URL}/auth/verify`, {
      headers: this.getHeaders()
    });
    return res.json();
  },

  // ── CONTRASEÑAS ──────────────────────────────────
  async getPasswords() {
    const res = await fetch(`${API_URL}/passwords`, { headers: this.getHeaders() });
    if (res.status === 401 || res.status === 403) { this.logout(); return []; }
    return res.json();
  },

  async createPassword(data) {
    const res = await fetch(`${API_URL}/passwords`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async updatePassword(id, data) {
    const res = await fetch(`${API_URL}/passwords/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async deletePassword(id) {
    const res = await fetch(`${API_URL}/passwords/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });
    return res.json();
  },

  logout() {
    this.removeToken();
    window.location.href = '/login.html';
  },

  // ── CATEGORÍAS PERSONALIZADAS ─────────────────────
  async getCategories() {
    try {
      const res = await fetch(`${API_URL}/categories`, { headers: this.getHeaders() });
      if (!res.ok) return [];
      return res.json();
    } catch { return []; }
  },

  async createCategory(name) {
    const res = await fetch(`${API_URL}/categories`, {
      method: 'POST', headers: this.getHeaders(),
      body: JSON.stringify({ name })
    });
    return res.json();
  },

  async deleteCategory(id) {
    const res = await fetch(`${API_URL}/categories/${id}`, {
      method: 'DELETE', headers: this.getHeaders()
    });
    return res.json();
  },

  // ── PERFIL ────────────────────────────────────────
  async updateProfile(data) {
    const res = await fetch(`${API_URL}/auth/profile`, {
      method: 'PUT', headers: this.getHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  }
};

// MODO DEMO (sin backend, datos en localStorage): *.netlify.app, window.DEMO_MODE=true o ?demo.
// api-demo.js se carga de forma síncrona y sobrescribe los métodos de `api`; los demás js no cambian.
(function () {
  let demo = location.hostname.endsWith("netlify.app") || window.DEMO_MODE === true;
  try {
    const q = new URLSearchParams(location.search).get("demo");
    if (q === "0") { sessionStorage.removeItem("demo_active"); demo = false; }
    else if (q !== null) sessionStorage.setItem("demo_active", "1");
    if (q !== "0" && sessionStorage.getItem("demo_active") === "1") demo = true;
  } catch (_) {}
  if (demo) document.write("<script src=\"/js/api-demo.js\"><\/script>");
})();
