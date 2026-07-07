const GITHUB_USER = 'jackghay';
const CACHE_KEY = 'gh-stats-2';
const CACHE_TTL = 3600000;

function sanitize(str) {
  if (typeof str !== 'string') return '';
  const el = document.createElement('div');
  el.textContent = str;
  return el.innerHTML;
}

export function initGitHubStats() {
  const el = document.getElementById('github-stats');
  if (!el) return;

  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    try {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TTL) { render(data); return; }
    } catch {}
  }

  el.innerHTML = '<div class="gh-loading"><span class="pulse-glow" style="display:inline-block;width:24px;height:24px;border-radius:50%;border:2px solid var(--accent)"></span></div>';

  fetch('https://api.github.com/users/' + GITHUB_USER)
    .then(r => r.ok ? r.json() : Promise.reject())
    .then(async profile => {
      const reposRes = await fetch('https://api.github.com/users/' + GITHUB_USER + '/repos?per_page=100&sort=updated');
      const repos = reposRes.ok ? await reposRes.json() : [];
      const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
      const topLangs = {};
      repos.forEach(r => { if (r.language) topLangs[r.language] = (topLangs[r.language] || 0) + 1; });
      const sortedLangs = Object.entries(topLangs).sort((a, b) => b[1] - a[1]).slice(0, 5);

      const data = {
        publicRepos: typeof profile.public_repos === 'number' ? profile.public_repos : 0,
        totalStars,
        followers: typeof profile.followers === 'number' ? profile.followers : 0,
        topLangs: sortedLangs,
        avatar: typeof profile.avatar_url === 'string' ? profile.avatar_url : '',
        bio: typeof profile.bio === 'string' ? profile.bio : '',
        ghUrl: typeof profile.html_url === 'string' ? profile.html_url : '',
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
      render(data);
    })
    .catch(() => { el.innerHTML = ''; });
}

function render(data) {
  const el = document.getElementById('github-stats');
  if (!el) return;

  el.innerHTML = '';
  const safe = {
    avatar: data.avatar.replace(/[^\w\-.:/]/g, ''),
    ghUrl: data.ghUrl.replace(/[^\w\-.:/?#@!$&'()*+,;=]/g, ''),
    bio: sanitize(data.bio || 'Full-Stack Developer & AI Engineer'),
  };

  const langs = Array.isArray(data.topLangs) ? data.topLangs : [];
  const langHtml = langs.length
    ? '<div class="gh-langs">' + langs.map(([lang]) =>
        '<span class="gh-lang" style="--gh-color:' + encodeURIComponent(langColor(lang)) + '">' + sanitize(lang) + '</span>'
      ).join('') + '</div>'
    : '';

  el.innerHTML = [
    '<div class="gh-header">',
      '<img src="' + safe.avatar + '" alt="' + GITHUB_USER + '" class="gh-avatar" loading="lazy" />',
      '<div class="gh-meta">',
        '<a href="' + safe.ghUrl + '" target="_blank" rel="noopener noreferrer" class="gh-username">' + GITHUB_USER + '</a>',
        '<p class="gh-bio">' + safe.bio + '</p>',
      '</div>',
    '</div>',
    '<div class="gh-numbers">',
      '<div class="gh-number"><strong>' + data.publicRepos + '</strong> <span>repos</span></div>',
      '<div class="gh-number"><strong>' + data.totalStars + '</strong> <span>stars</span></div>',
      '<div class="gh-number"><strong>' + data.followers + '</strong> <span>followers</span></div>',
    '</div>',
    langHtml,
  ].join('');
}

function langColor(lang) {
  const colors = { JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5', HTML: '#e34c26', CSS: '#563d7c', PHP: '#4F5D95', 'Jupyter Notebook': '#DA5B0B' };
  return colors[lang] || '#00d4ff';
}
