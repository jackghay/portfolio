const themes = ['dark', 'light', 'neon', 'chrome', 'hologram'];
let currentIndex = 0;

export function initTheme() {
  try {
    const saved = localStorage.getItem('theme');
    if (saved && themes.includes(saved)) currentIndex = themes.indexOf(saved);
  } catch {}
  applyTheme(themes[currentIndex]);
}

export function cycleTheme() {
  currentIndex = (currentIndex + 1) % themes.length;
  applyTheme(themes[currentIndex]);
  return themes[currentIndex];
}

export function getCurrentTheme() { return themes[currentIndex]; }

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try { localStorage.setItem('theme', theme); } catch {}
  document.dispatchEvent(new CustomEvent('themechange'));
}
