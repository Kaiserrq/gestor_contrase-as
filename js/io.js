// ====================================================
//  KeyVault — js/io.js
//  Exportar (TXT / PDF) e importar (TXT pegado). Solo en passwords.html.
//  Usa globals de dashboard.js: allPasswords, loadPasswords().
// ====================================================

// ── EXPORTAR TXT ─────────────────────────────────────────────────────────────────
function exportTxt() {
  if (!allPasswords.length) return showToast('No hay contraseñas para exportar', 'error');

  // Una línea por contraseña, campos separados por coma
  // Formato: Nombre, Usuario, Contraseña, Notas
  const lines = allPasswords.map(p => {
    // Si un campo contiene coma, lo encerramos entre comillas
    const cell = v => {
      const s = String(v ?? '');
      return s.includes(',') ? `"${s.replace(/"/g, '""')}"` : s;
    };
    return [cell(p.site_name), cell(p.username), cell(p.password), cell(p.notes)].join(', ');
  });

  const txt  = lines.join('\r\n');
  const blob = new Blob([txt], { type: 'text/plain;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  const date = new Date().toISOString().split('T')[0];
  a.href     = url;
  a.download = `keyvault_contraseñas_${date}.txt`;
  a.click();
  URL.revokeObjectURL(url);
  showToast(`${allPasswords.length} contraseñas exportadas a TXT`, 'success');
}

// ── EXPORTAR PDF ─────────────────────────────────────────────────────────────────
function exportPDF() {
  if (!allPasswords.length) return showToast('No hay contraseñas para exportar', 'error');

  const date = new Date().toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric' });

  const catLabel = { social: 'Redes Sociales', trabajo: 'Trabajo', banco: 'Banco', apps: 'Otras apps', general: 'General' };

  const cards = allPasswords.map((p, i) => `
    <div class="pw-card">
      <div class="pw-number">${i + 1}</div>
      <div class="pw-body">
        <div class="pw-site">${escHtml(p.site_name)}</div>
        ${p.site_url ? `<div class="pw-url">${escHtml(p.site_url)}</div>` : ''}
        <table class="pw-table">
          <tr><td class="lbl">Usuario</td><td>${escHtml(p.username) || '<em>—</em>'}</td></tr>
          <tr><td class="lbl">Contraseña</td><td class="pw-pass">${escHtml(p.password)}</td></tr>
          <tr><td class="lbl">Categoría</td><td>${catLabel[p.category] || escHtml(p.category)}</td></tr>
          ${p.notes ? `<tr><td class="lbl">Notas</td><td>${escHtml(p.notes)}</td></tr>` : ''}
        </table>
      </div>
    </div>
  `).join('');

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>KeyVault — Contraseñas</title>
  <style>
    * { box-sizing:border-box; margin:0; padding:0; }
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      background: #f5f5f7;
      color: #1a1a2e;
      padding: 32px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 28px;
      padding-bottom: 16px;
      border-bottom: 2px solid #6c63ff;
    }
    .header h1 { font-size: 24px; color: #6c63ff; letter-spacing: -0.03em; }
    .header p  { font-size: 12px; color: #666; margin-top: 4px; }
    .header-right { text-align: right; font-size: 12px; color: #888; }
    .grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }
    .pw-card {
      background: #fff;
      border: 1px solid #e0e0e8;
      border-radius: 12px;
      padding: 16px 18px;
      position: relative;
      border-top: 3px solid #6c63ff;
      break-inside: avoid;
      page-break-inside: avoid;
    }
    .pw-number {
      position: absolute;
      top: 12px; right: 14px;
      width: 22px; height: 22px;
      background: #6c63ff;
      color: #fff;
      border-radius: 50%;
      font-size: 10px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .pw-site {
      font-size: 15px;
      font-weight: 700;
      color: #1a1a2e;
      margin-bottom: 2px;
    }
    .pw-url {
      font-size: 10px;
      color: #6c63ff;
      margin-bottom: 10px;
      word-break: break-all;
    }
    .pw-table { width: 100%; border-collapse: collapse; margin-top: 8px; }
    .pw-table tr td { padding: 4px 0; font-size: 12px; vertical-align: top; }
    .pw-table .lbl {
      width: 80px;
      color: #888;
      font-weight: 600;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      padding-right: 8px;
    }
    .pw-pass { font-family: monospace; font-size: 13px; color: #2d2d4e; font-weight: 600; }
    .footer {
      margin-top: 28px;
      text-align: center;
      font-size: 10px;
      color: #aaa;
      border-top: 1px solid #e0e0e8;
      padding-top: 14px;
    }
    @media print {
      body { background: #fff; padding: 16px; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <h1>🔑 KeyVault</h1>
      <p>${allPasswords.length} contraseña${allPasswords.length !== 1 ? 's' : ''} guardadas</p>
    </div>
    <div class="header-right">
      <div>Exportado el ${date}</div>
      <div style="margin-top:4px;color:#e03">Confidencial — No compartir</div>
    </div>
  </div>
  <div style="text-align:right;margin-bottom:16px" class="no-print">
    <button onclick="window.print()" style="padding:8px 20px;background:#6c63ff;color:#fff;border:none;border-radius:8px;font-size:13px;cursor:pointer;font-weight:600">
      🖨️ Imprimir / Guardar PDF
    </button>
  </div>
  <div class="grid">${cards}</div>
  <div class="footer">
    KeyVault — Gestor de contraseñas &bull; Exportado el ${date}
  </div>
</body>
</html>`;

  const win = window.open('', '_blank');
  if (!win) return showToast('Permite ventanas emergentes para exportar PDF', 'error');
  win.document.write(html);
  win.document.close();
  // Pequena pausa para que el navegador renderice antes de imprimir
  setTimeout(() => win.print(), 600);
}

// ── IMPORTAR ─────────────────────────────────────────────────────────────────
let _importParsed = [];

function openImportModal() {
  _importParsed = [];
  document.getElementById('import-text-area').value = '';
  document.getElementById('import-preview').style.display = 'none';
  document.getElementById('import-preview-cards').innerHTML = '';
  document.getElementById('import-error').style.display = 'none';
  document.getElementById('btn-import-confirm').disabled = true;
  document.getElementById('btn-import-confirm').textContent = 'Importar todo';
  document.getElementById('import-modal-overlay').classList.add('open');
  setTimeout(() => document.getElementById('import-text-area')?.focus(), 50);
}

function closeImportModal() {
  document.getElementById('import-modal-overlay').classList.remove('open');
  _importParsed = [];
}

/**
 * Parsea una línea de CSV respetando campos entre comillas.
 * Retorna array de campos.
 */
function parseCsvLine(line) {
  const result = [];
  let cur = '', inQ = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQ && line[i + 1] === '"') { cur += '"'; i++; }
      else inQ = !inQ;
    } else if (ch === ',' && !inQ) {
      result.push(cur.trim()); cur = '';
    } else {
      cur += ch;
    }
  }
  result.push(cur.trim());
  return result;
}

function previewImport() {
  const raw = document.getElementById('import-text-area').value.trim();
  const errEl  = document.getElementById('import-error');
  const prevEl = document.getElementById('import-preview');
  const cardsEl = document.getElementById('import-preview-cards');
  errEl.style.display = 'none';
  prevEl.style.display = 'none';
  document.getElementById('btn-import-confirm').disabled = true;
  _importParsed = [];

  if (!raw) {
    errEl.textContent = 'Pega al menos una línea en el área de texto.';
    errEl.style.display = 'block';
    return;
  }

  const lines = raw.split(/\r?\n/).filter(l => l.trim());
  const parsed = [];
  const problems = [];

  lines.forEach((line, i) => {
    const fields = parseCsvLine(line);
    const [name = '', user = '', pass = '', notes = ''] = fields;
    if (!name) {
      problems.push(`Línea ${i + 1}: falta el nombre del sitio.`);
      return;
    }
    if (!pass) {
      problems.push(`Línea ${i + 1} (${name}): falta la contraseña.`);
      return;
    }
    parsed.push({ site_name: name, username: user, password: pass, notes, category: 'social', icon: 'globe' });
  });

  if (!parsed.length) {
    errEl.textContent = problems.length ? problems.join(' | ') : 'No se encontraron entradas válidas.';
    errEl.style.display = 'block';
    return;
  }

  _importParsed = parsed;

  // Mostrar cards de previsualización
  cardsEl.innerHTML = parsed.map(p => `
    <div class="imp-card">
      <div style="min-width:0">
        <div class="t">${escHtml(p.site_name)}</div>
        <div class="s">${escHtml(p.username) || '<em>sin usuario</em>'}</div>
      </div>
      <div class="s mono" style="text-align:right">
        <div>••••••••</div>
        ${p.notes ? `<div>${escHtml(p.notes.substring(0, 30))}${p.notes.length > 30 ? '...' : ''}</div>` : ''}
      </div>
    </div>
  `).join('');

  document.getElementById('import-preview-label').textContent =
    `${parsed.length} contraseña${parsed.length !== 1 ? 's' : ''} listas para importar${problems.length ? ' (' + problems.length + ' omitidas por error)' : ''}:`;
  prevEl.style.display = 'block';
  document.getElementById('btn-import-confirm').disabled = false;

  if (problems.length) {
    errEl.textContent = 'Advertencias: ' + problems.join(' | ');
    errEl.style.display = 'block';
  }
}

async function confirmImport() {
  if (!_importParsed.length) return;
  const btn = document.getElementById('btn-import-confirm');
  btn.disabled = true;
  btn.textContent = 'Importando...';

  let ok = 0, fail = 0;
  for (const entry of _importParsed) {
    const r = await api.createPassword(entry);
    if (r.error) fail++;
    else ok++;
  }

  closeImportModal();
  await loadPasswords();

  if (fail === 0) showToast(`${ok} contraseña${ok !== 1 ? 's' : ''} importada${ok !== 1 ? 's' : ''} correctamente`, 'success');
  else showToast(`${ok} importadas, ${fail} fallaron`, fail === ok ? 'error' : 'info');
}