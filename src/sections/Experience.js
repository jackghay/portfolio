function sanitize(str) {
  if (typeof str !== 'string') return '';
  const el = document.createElement('div');
  el.textContent = str;
  return el.innerHTML;
}

import { experience } from '../data.js';

export function initExperience() {
  const timeline = document.getElementById('timeline');
  if (!timeline) return;

  timeline.innerHTML = experience.map((exp, i) => `
    <div class="timeline-item reveal ${i % 2 === 0 ? 'reveal-left' : 'reveal-right'}" style="animation-delay:${i * 0.1}s">
      <div class="timeline-marker"></div>
      <div class="timeline-content glass-card">
        <span class="timeline-period">${sanitize(exp.period)}</span>
        <h3 class="timeline-role">${sanitize(exp.role)}</h3>
        <h4 class="timeline-company">${sanitize(exp.company)}</h4>
        <p class="timeline-desc">${sanitize(exp.desc)}</p>
        <div class="timeline-tags">${exp.tags.map(t => `<span class="tag">${sanitize(t)}</span>`).join('')}</div>
      </div>
    </div>
  `).join('');
}
