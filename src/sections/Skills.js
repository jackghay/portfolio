import { skills } from '../data.js';

export function initSkills() {
  const grid = document.getElementById('skills-grid');
  if (!grid) return;

  grid.innerHTML = skills.map((skill, i) => `
    <div class="glass-card skill-card reveal" style="animation-delay:${i * 0.05}s">
      <div class="skill-info">
        <span class="skill-name">${skill.name}</span>
        <span class="skill-percent">${skill.level}%</span>
      </div>
      <div class="skill-bar">
        <div class="skill-bar-fill" style="width:0%" data-width="${skill.level}"></div>
      </div>
    </div>
  `).join('');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target.querySelector('.skill-bar-fill');
        if (fill) fill.style.width = fill.dataset.width + '%';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  grid.querySelectorAll('.skill-card').forEach(card => observer.observe(card));
}
