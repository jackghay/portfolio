function animateStats() {
  document.querySelectorAll('.stat-number').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    if (isNaN(target)) return;
    let current = 0;
    const step = Math.ceil(target / 60);
    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + (el.dataset.suffix || '');
      if (current >= target) clearInterval(interval);
    }, 20);
  });
}

export function initAbout() {
  const container = document.getElementById('stats-container');
  if (!container) return;

  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      animateStats();
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.5 });

  observer.observe(container);
}
