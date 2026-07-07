export function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  if (!cursor || window.matchMedia('(pointer: coarse)').matches) return;

  let hideTimer;

  document.addEventListener('mousemove', e => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    cursor.style.opacity = '1';
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => { cursor.style.opacity = '0'; }, 3000);
  }, { passive: true });

  document.addEventListener('mouseover', e => {
    const target = e.target.closest('a, button, .tag, .btn, .nav-link');
    if (!target) return;
    cursor.style.width = '32px';
    cursor.style.height = '32px';
    cursor.style.borderColor = 'var(--accent)';
  }, { passive: true });

  document.addEventListener('mouseout', e => {
    const target = e.target.closest('a, button, .tag, .btn, .nav-link');
    if (!target) return;
    cursor.style.width = '16px';
    cursor.style.height = '16px';
    cursor.style.borderColor = 'var(--accent)';
  }, { passive: true });
}
