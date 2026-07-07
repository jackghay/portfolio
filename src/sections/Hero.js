import { t } from '../i18n.js';

let roleIndex = 0, charIndex = 0, isDeleting = false, tickTimeout;

export function initHero() {
  const el = document.getElementById('typing-text');
  if (!el) return;

  function getRoles() {
    const r = t('hero.role');
    return Array.isArray(r) ? r : ['Full-Stack Developer'];
  }

  function tick() {
    const roles = getRoles();
    const current = roles[roleIndex] || roles[0];
    el.textContent = isDeleting
      ? current.substring(0, --charIndex)
      : current.substring(0, ++charIndex);

    if (!isDeleting && charIndex === current.length) {
      isDeleting = true;
      tickTimeout = setTimeout(tick, 2000);
      return;
    }
    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      tickTimeout = setTimeout(tick, 500);
      return;
    }
    tickTimeout = setTimeout(tick, isDeleting ? 40 : 70);
  }

  tick();

  document.addEventListener('langchange', () => {
    clearTimeout(tickTimeout);
    roleIndex = 0;
    charIndex = 0;
    isDeleting = false;
    tick();
  });
}
