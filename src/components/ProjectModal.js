function sanitize(str) {
  if (typeof str !== 'string') return '';
  const el = document.createElement('div');
  el.textContent = str;
  return el.innerHTML;
}

export function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const body = document.getElementById('modal-body');
  const close = document.getElementById('modal-close');
  const backdrop = document.getElementById('modal-backdrop');
  if (!modal || !body) return;

  function open(project) {
    const tags = (Array.isArray(project.tags) ? project.tags : []).map(t => '<span class="tag">' + sanitize(t) + '</span>').join('');
    const features = Array.isArray(project.features) ? project.features : [];
    const featureHtml = features.length
      ? '<div class="modal-section"><h3 class="modal-section-title">Key Features</h3><ul class="modal-features">' +
        features.map(f => '<li>' + sanitize(f) + '</li>').join('') + '</ul></div>'
      : '';

    const problemHtml = project.problem
      ? '<div class="modal-section"><div class="case-block case-problem"><div class="case-label">Problem</div><p>' + sanitize(project.problem) + '</p></div></div>'
      : '';

    const solutionHtml = project.solution
      ? '<div class="modal-section"><div class="case-block case-solution"><div class="case-label">Solution</div><p>' + sanitize(project.solution) + '</p></div></div>'
      : '';

    const resultHtml = project.result
      ? '<div class="modal-section"><div class="case-block case-result"><div class="case-label">Result</div><p>' + sanitize(project.result) + '</p></div></div>'
      : '';

    const challengeHtml = project.challenges
      ? '<div class="modal-section"><h3 class="modal-section-title">Technical Challenge</h3><p class="modal-challenge">' + sanitize(project.challenges) + '</p></div>'
      : '';

    body.innerHTML = [
      '<div class="modal-header">',
        '<h2 class="modal-title">' + sanitize(project.title) + '</h2>',
        '<div class="modal-tags">' + tags + '</div>',
      '</div>',
      '<div class="modal-body-content">',
        '<p class="modal-desc">' + sanitize(project.fullDesc || project.desc) + '</p>',
        featureHtml,
        problemHtml,
        solutionHtml,
        resultHtml,
        challengeHtml,
      '</div>',
      '<div class="modal-footer">',
        project.demo ? '<a href="' + sanitize(project.demo) + '" class="btn btn-primary" target="_blank" rel="noopener noreferrer">Live Demo</a>' : '',
        project.source ? '<a href="' + sanitize(project.source) + '" class="btn btn-glass" target="_blank" rel="noopener noreferrer">Source Code</a>' : '',
      '</div>',
    ].join('');
    modal.classList.remove('chatbot--hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.add('chatbot--hidden');
    document.body.style.overflow = '';
  }

  close.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  return { open };
}
