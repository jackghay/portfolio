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

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      if (navLinks) {
        const isOpen = navLinks.classList.contains('open');
        if (isOpen) {
          navLinks.classList.remove('open');
          navLinks.style.display = '';
        } else {
          navLinks.classList.add('open');
          navLinks.style.display = 'flex';
        }
        hamburger.textContent = isOpen ? '☰' : '✕';
      }
    });
  }

  navLinks?.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      if (hamburger) hamburger.textContent = '☰';
    });
  });

  if (langToggle) {
    const langCycle = { en: 'AR', ar: 'FR', fr: 'EN' };
    try { langToggle.textContent = langCycle[getLang()] || 'EN'; } catch {}
    langToggle.addEventListener('click', () => {
      const order = ['en', 'ar', 'fr'];
      const current = getLang();
      const next = order[(order.indexOf(current) + 1) % order.length];
      try {
        setLang(next);
        langToggle.textContent = langCycle[next];
      } catch {}
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
