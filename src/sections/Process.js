function sanitize(str) {
  if (typeof str !== 'string') return '';
  const el = document.createElement('div');
  el.textContent = str;
  return el.innerHTML;
}

import { t } from '../i18n.js';

const iconMap = {
  chat: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>',
  arch: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/></svg>',
  code: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
  rocket: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="M12 15l-3-3a5 5 0 017.07-7.07L12 8l-3 3 3 3 3-3"/><path d="M21 12a5 5 0 01-5 5"/></svg>',
};

export function initProcess() {
  const container = document.getElementById('process-grid');
  if (!container) return;

  const icons = ['chat', 'arch', 'code', 'rocket'];

  function render() {
    container.innerHTML = icons.map((icon, i) => {
      const num = i + 1;
      return `
        <div class="process-card glass-card reveal" style="animation-delay:${i * 0.12}s">
          <div class="process-step-number">${num}</div>
          <div class="process-card-icon">${iconMap[icon] || iconMap.chat}</div>
          <h3 class="process-card-title">${sanitize(t('process.step' + num))}</h3>
          <p class="process-card-desc">${sanitize(t('process.step' + num + 'desc'))}</p>
        </div>
      `;
    }).join('');
  }

  render();
  document.addEventListener('langchange', render);
}
