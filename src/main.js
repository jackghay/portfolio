import { initI18n } from './i18n.js';
import { initTheme } from './theme.js';
import { initScrollReveal, initScrollProgress, initActiveSection } from './scrollEffects.js';
import { initNavbar } from './components/Navbar.js';
import { initChatbot } from './components/Chatbot.js';
import { initCustomCursor } from './components/CustomCursor.js';
import { initBackToTop } from './components/BackToTop.js';
import { initGitHubStats } from './components/GitHubStats.js';
import { initTerminal } from './components/Terminal.js';
import { initHero } from './sections/Hero.js';
import { initAbout } from './sections/About.js';
import { initSkills } from './sections/Skills.js';
import { initProjects } from './sections/Projects.js';
import { initExperience } from './sections/Experience.js';
import { initAIWorkflow } from './sections/AIWorkflow.js';
import { initTestimonials } from './sections/Testimonials.js';
import { initBlog } from './sections/Blog.js';
import { initContact } from './sections/Contact.js';

function initApp() {
  initTheme();
  initI18n();
  initNavbar();
  initHero();
  initAbout();
  initGitHubStats();
  initTerminal();
  initSkills();
  initProjects();
  initExperience();
  initAIWorkflow();
  initTestimonials();
  initBlog();
  initContact();

  if (window.innerWidth >= 768 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    import('./effects/threeHero.js').then(m => m.initThreeHero()).catch(() => {});
    import('./effects/generativeArt.js').then(m => m.initGenerativeArt()).catch(() => {});
  }

  // Remove intro overlay after animation
  setTimeout(() => { document.getElementById('intro-overlay')?.remove(); }, 2400);

  initChatbot();
  initCustomCursor();
  initBackToTop();
  initScrollReveal();
  initScrollProgress();
  initActiveSection();

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp, { once: true });
} else {
  initApp();
}

// CSP violation reporting
if (typeof ReportingObserver !== 'undefined') {
  try {
    const observer = new ReportingObserver((reports) => {
      for (const r of reports) {
        if (r.type === 'csp-violation') {
          console.warn('[CSP] Blocked:', r.body.blockedURI);
        }
      }
    }, { types: ['csp-violation'], buffered: true });
    observer.observe();
  } catch {}
}
