import { projects } from '../data.js';
import { initProjectModal } from '../components/ProjectModal.js';

function projectVisual(project) {
  const gradients = {
    web: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
    ai: 'linear-gradient(135deg, #ff6b6b, #ffd93d)',
    extensions: 'linear-gradient(135deg, #4ecdc4, #44a08d)',
  };
  const icons = {
    web: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>',
    ai: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5"><path d="M12 2a4 4 0 014 4c0 2-2 4-4 4s-4-2-4-4a4 4 0 014-4z"/><path d="M16 14c2 0 4 2 4 4v2H4v-2c0-2 2-4 4-4"/></svg>',
    extensions: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5"><path d="M20 11V7a2 2 0 00-2-2h-4"/><path d="M10 5H6a2 2 0 00-2 2v3"/><path d="M5 14v4a2 2 0 002 2h3"/><path d="M14 19h4a2 2 0 002-2v-3"/></svg>',
  };
  return `
    <div class="project-visual" style="background: ${gradients[project.category] || gradients.web}">
      <div class="project-visual-inner">
        ${icons[project.category] || icons.web}
        <span class="project-visual-label">${project.category}</span>
      </div>
      <div class="project-visual-shine"></div>
    </div>
  `;
}

export function initProjects() {
  const grid = document.getElementById('projects-grid');
  const filters = document.getElementById('project-filters');
  if (!grid) return;

  const modal = initProjectModal();
  let activeFilter = 'all';

  function render() {
    const filtered = activeFilter === 'all' ? projects : projects.filter(p => p.category === activeFilter);
    grid.innerHTML = filtered.map((project, i) => `
      <div class="glass-card project-card reveal" style="animation-delay:${i * 0.08}s" data-index="${i}">
        ${projectVisual(project)}
        <div class="project-info">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-desc">${project.desc}</p>
          <div class="project-tags">${project.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
        </div>
      </div>
    `).join('');

    grid.querySelectorAll('.project-card').forEach((card, i) => {
      const filtered = activeFilter === 'all' ? projects : projects.filter(p => p.category === activeFilter);
      const project = filtered[i];
      if (!project) return;
      card.addEventListener('click', () => modal.open(project));
    });
  }

  if (filters) {
    filters.addEventListener('click', e => {
      const tag = e.target.closest('.tag');
      if (!tag) return;
      filters.querySelector('.tag.active')?.classList.remove('active');
      tag.classList.add('active');
      activeFilter = tag.dataset.filter;
      render();
    });
  }

  render();
}
