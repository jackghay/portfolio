import { testimonials } from '../data.js';

export function initTestimonials() {
  const container = document.getElementById('testimonials-carousel');
  if (!container || !testimonials.length) return;

  let current = 0;
  let interval = null;

  function render(index) {
    const t = testimonials[index];
    container.innerHTML = `
      <div class="testimonial-card-glass glass-card">
        <div class="testimonial-quote">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="var(--accent)" opacity="0.15"><path d="M10 11H6a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 011 1v7c0 2.5-1.5 4-4 4v-2c1.5 0 2-1 2-2v-1zm10 0h-4a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 011 1v7c0 2.5-1.5 4-4 4v-2c1.5 0 2-1 2-2v-1z"/></svg>
        </div>
        <p class="testimonial-card-text">${t.text}</p>
        <div class="testimonial-card-author">
          <div class="testimonial-card-avatar">${t.name.charAt(0)}</div>
          <div>
            <div class="testimonial-card-name">${t.name}</div>
            <div class="testimonial-card-role">${t.role}</div>
          </div>
        </div>
      </div>
    `;
    container.querySelector('.testimonial-card-glass').style.animation = 'scale-in 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
  }

  function goTo(i) {
    current = (i + testimonials.length) % testimonials.length;
    render(current);
    updateDots();
    resetAuto();
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function updateDots() {
    document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });
  }

  function resetAuto() {
    clearInterval(interval);
    interval = setInterval(next, 5000);
  }

  const dots = testimonials.map((_, i) =>
    `<button class="carousel-dot ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Go to testimonial ${i + 1}"></button>`
  ).join('');

  container.insertAdjacentHTML('afterend', `
    <div class="carousel-controls">
      <button class="carousel-btn" id="carousel-prev" aria-label="Previous">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <div class="carousel-dots">${dots}</div>
      <button class="carousel-btn" id="carousel-next" aria-label="Next">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
      </button>
    </div>
  `);

  render(0);

  document.getElementById('carousel-next')?.addEventListener('click', next);
  document.getElementById('carousel-prev')?.addEventListener('click', prev);
  document.querySelector('.carousel-dots')?.addEventListener('click', e => {
    const dot = e.target.closest('.carousel-dot');
    if (dot) goTo(parseInt(dot.dataset.index));
  });

  interval = setInterval(next, 5000);
  container.addEventListener('mouseenter', () => clearInterval(interval));
  container.addEventListener('mouseleave', resetAuto);
}
