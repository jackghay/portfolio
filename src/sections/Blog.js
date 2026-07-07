import { blogPosts } from '../data.js';

function sanitize(str) {
  if (typeof str !== 'string') return '';
  const el = document.createElement('div');
  el.textContent = str;
  return el.innerHTML;
}

export function initBlog() {
  const grid = document.getElementById('blog-grid');
  if (!grid || !blogPosts.length) return;

  grid.innerHTML = blogPosts.map((post, i) => `
    <article class="glass-card blog-card reveal" style="animation-delay:${i * 0.1}s" data-index="${i}">
      <div class="blog-meta">
        <time class="blog-date">${sanitize(post.date)}</time>
        <span class="blog-read-time">${sanitize(post.readTime)}</span>
      </div>
      <h3 class="blog-title">${sanitize(post.title)}</h3>
      <p class="blog-desc">${sanitize(post.desc)}</p>
      <div class="blog-tags">${(post.tags || []).map(t => `<span class="tag tag-sm">${sanitize(t)}</span>`).join('')}</div>
    </article>
  `).join('');

  grid.addEventListener('click', e => {
    const card = e.target.closest('.blog-card');
    if (!card) return;
    const i = parseInt(card.dataset.index);
    openBlogModal(blogPosts[i]);
  });
}

function openBlogModal(post) {
  const body = document.getElementById('modal-body');
  const modal = document.getElementById('project-modal');
  if (!body || !modal) return;

  body.innerHTML = [
    '<div class="modal-header">',
      '<div class="blog-meta" style="margin-bottom:8px">',
        '<time class="blog-date">' + sanitize(post.date) + '</time>',
        '<span class="blog-read-time" style="margin-left:12px">' + sanitize(post.readTime) + '</span>',
      '</div>',
      '<h2 class="modal-title">' + sanitize(post.title) + '</h2>',
      '<div class="modal-tags">' + (post.tags || []).map(t => '<span class="tag tag-sm">' + sanitize(t) + '</span>').join('') + '</div>',
    '</div>',
    '<div class="modal-body-content">',
      '<div class="blog-content">' + (post.content || '').split('\n\n').map(p => '<p>' + sanitize(p) + '</p>').join('') + '</div>',
    '</div>',
  ].join('');
  modal.classList.remove('chatbot--hidden');
  document.body.style.overflow = 'hidden';
}
