import { setLang, getLang } from '../i18n.js';
import { cycleTheme, getCurrentTheme } from '../theme.js';

const themeIcons = { dark: '🌙', light: '☀️', neon: '💜', chrome: '🔩', hologram: '🌈' };

export function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks = document.getElementById('nav-links');
  const langToggle = document.getElementById('lang-toggle');
  const themeToggle = document.getElementById('theme-toggle');
  if (!navbar) return;

  hamburger?.addEventListener('click', () => {
    navLinks?.classList.toggle('open');
    hamburger.textContent = navLinks?.classList.contains('open') ? '✕' : '☰';
  });

  navLinks?.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      if (hamburger) hamburger.textContent = '☰';
    });
  });

  if (langToggle) {
    langToggle.textContent = getLang() === 'en' ? 'AR' : 'EN';
    langToggle.addEventListener('click', () => {
      const next = getLang() === 'en' ? 'ar' : 'en';
      setLang(next);
      langToggle.textContent = next === 'en' ? 'AR' : 'EN';
    });
  }

  document.querySelector('[data-scroll-top]')?.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  if (themeToggle) {
    themeToggle.textContent = themeIcons[getCurrentTheme()] || '🎨';
    themeToggle.addEventListener('click', () => {
      themeToggle.textContent = themeIcons[cycleTheme()] || '🎨';
    });
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const isScrollingDown = y > 100;
        navbar.dataset.hidden = y > 100 && y > (navbar._lastY || 0) ? 'true' : 'false';
        navbar.dataset.scrolled = y > 50 ? 'true' : 'false';
        navbar._lastY = y;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}
