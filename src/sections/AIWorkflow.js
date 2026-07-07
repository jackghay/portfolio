function sanitize(str) {
  if (typeof str !== 'string') return '';
  const el = document.createElement('div');
  el.textContent = str;
  return el.innerHTML;
}

import { aiWorkflowCards, toolBadges } from '../data.js';
import { t } from '../i18n.js';

const iconMap = {
  arch: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/></svg>',
  rag: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
  pipe: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>',
  feature: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
};

export function initAIWorkflow() {
  const pipeline = document.getElementById('ai-pipeline');
  const cards = document.getElementById('ai-cards');
  if (!pipeline || !cards) return;

  function renderPipeline() {
    const steps = [t('aiworkflow.step1'), t('aiworkflow.step2'), t('aiworkflow.step3'), t('aiworkflow.step4'), t('aiworkflow.step5')];
    const connectorSvg = '<div class="pipeline-connector"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>';

    pipeline.innerHTML = `
      <div class="pipeline-container glass-card reveal">
        <div class="pipeline-steps">
          ${steps.map((step, i) => `
            <div class="pipeline-step" style="animation-delay:${i * 0.12}s">
              <div class="pipeline-node"><span>${i + 1}</span></div>
              <span class="pipeline-label">${step}</span>
              ${i < steps.length - 1 ? connectorSvg : ''}
            </div>
          `).join('')}
        </div>
        <div class="pipeline-tools">${toolBadges.map(t => `<span class="tag">${sanitize(t)}</span>`).join('')}</div>
      </div>
    `;
  }

  renderPipeline();
  document.addEventListener('langchange', renderPipeline);

  cards.innerHTML = aiWorkflowCards.map((card, i) => `
    <div class="glass-card ai-card reveal" style="animation-delay:${i * 0.12}s">
      <div class="ai-card-icon">${iconMap[card.icon] || iconMap.arch}</div>
      <h3 class="ai-card-title">${sanitize(card.title)}</h3>
      <p class="ai-card-desc">${sanitize(card.desc)}</p>
    </div>
  `).join('');
}
