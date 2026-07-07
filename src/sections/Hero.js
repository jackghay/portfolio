const roles = [
  'Full-Stack Developer',
  'AI Engineer',
  'Software Architect',
  'Automation Expert',
  'Tech Innovator',
];

export function initHero() {
  const el = document.getElementById('typing-text');
  if (!el) return;

  let roleIndex = 0, charIndex = 0, isDeleting = false;

  function tick() {
    const current = roles[roleIndex];
    el.textContent = isDeleting
      ? current.substring(0, --charIndex)
      : current.substring(0, ++charIndex);

    if (!isDeleting && charIndex === current.length) {
      isDeleting = true;
      setTimeout(tick, 2000);
      return;
    }
    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(tick, 500);
      return;
    }
    setTimeout(tick, isDeleting ? 40 : 70);
  }

  tick();
}
