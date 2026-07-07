const commands = {};

const BANNER = [
  '╔══════════════════════════════════════════════╗',
  '║    Amine Nasser Allah — Interactive Shell    ║',
  '║    Full-Stack Developer & AI Engineer        ║',
  '║    Type "help" to begin                      ║',
  '╚══════════════════════════════════════════════╝',
].join('\n');

const FORTUNES = [
  '"The best code is the code you never write." —佚名',
  '"First solve the problem, then write the code." — John Johnson',
  '"Simplicity is prerequisite for reliability." — Edsger Dijkstra',
  '"Code is like humor. When you have to explain it, it\'s bad." — Cory House',
  '"Talk is cheap. Show me the code." — Linus Torvalds',
  '"Make it work, make it right, make it fast." — Kent Beck',
  '"Any fool can write code that a computer can understand." — Martin Fowler',
  '"AI is not magic. It\'s engineering with data." — Me',
];

let matrixInterval = null;
let matrixActive = false;
let canvas = null;
let ctx = null;

const skillsData = [
  'JavaScript/TypeScript  [████████████████████] 95%',
  'React                 [███████████████████░] 90%',
  'HTML/CSS              [████████████████████] 95%',
  'Node.js               [██████████████████░░] 88%',
  'Python                [███████████████████░] 92%',
  'PHP                   [████████████████░░░░] 80%',
  'SQL/PostgreSQL        [█████████████████░░░] 85%',
  'System Architecture   [█████████████████░░░] 87%',
  'AI/ML                 [██████████████████░░] 88%',
  'Automation            [███████████████████░] 90%',
  'Chrome Extensions     [█████████████████░░░] 85%',
  'Docker                [████████████████░░░░] 80%',
];

const ASCII_ART = [
  '            __  ___      _         ___   _   _           _    _   _ ',
  '    /\\     /_ |/ _ \\    /\\ \\      / _ \\ | \\ | |   /\\   | |  | \\ | |',
  '   /  \\     | | | | |  /  \\ \\    | | | ||  \\| |  /  \\  | |  |  \\| |',
  '  / /\\ \\    | | | | | / /\\ \\ \\   | | | || . ` | / /\\ \\ | |  | . ` |',
  ' / ____ \\   | | |_| |/ ____ \\ \\  | |_| || |\\  |/ ____ \\| |  | |\\  |',
  '/_/    \\_\\  |_|\\___//_/    \\_\\ \\  \\___/ |_| \\_/_/    \\_\\_|  |_| \\_|',
  '                                                                     ',
  '        ╔══════════════════════════════════════════════════╗         ',
  '        ║  Full-Stack Developer  ·  AI Engineer  ·  Morocco ║         ',
  '        ╚══════════════════════════════════════════════════╝         ',
].join('\n');

function register(name, fn, desc) {
  commands[name] = { fn, desc };
}

export function initTerminal() {
  if (!window._pageLoad) window._pageLoad = Date.now();
  const term = document.getElementById('terminal');
  const toggle = document.getElementById('terminal-toggle');
  const output = document.getElementById('term-output');
  const input = document.getElementById('term-input');
  if (!term || !toggle) return;

  let history = [];
  let historyIndex = -1;

  registerCommands(output, input);

  function toggleTerminal() {
    const hidden = term.classList.toggle('terminal--hidden');
    toggle.classList.toggle('active', !hidden);
    if (!hidden) setTimeout(() => input?.focus(), 100);
    else deactivateMatrix();
  }

  toggle.addEventListener('click', toggleTerminal);

  document.getElementById('term-close')?.addEventListener('click', toggleTerminal);
  document.getElementById('term-clear')?.addEventListener('click', () => {
    if (output) { output.innerHTML = ''; input?.focus(); }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !term.classList.contains('terminal--hidden')) {
      toggleTerminal();
    }
    if (e.key === 'k' && e.ctrlKey && e.metaKey) {
      e.preventDefault();
      toggleTerminal();
    }
  });

  input?.addEventListener('keydown', e => {
    if (e.key === 'Enter' && input.value.trim()) {
      const cmd = input.value.trim();
      addLine(output, '$ ' + cmd);
      history.push(cmd);
      historyIndex = history.length;
      execute(output, cmd);
      input.value = '';
      scrollBottom(output);
    }
    if (e.key === 'ArrowUp') {
      if (historyIndex > 0) {
        historyIndex--;
        input.value = history[historyIndex];
      }
      e.preventDefault();
    }
    if (e.key === 'ArrowDown') {
      if (historyIndex < history.length - 1) {
        historyIndex++;
        input.value = history[historyIndex];
      } else {
        historyIndex = history.length;
        input.value = '';
      }
      e.preventDefault();
    }
  });

  // Welcome message
  addLine(output, BANNER);
  addLine(output, '');
  addLine(output, 'Type "help" to see available commands. Type "clear" to clear.');
  addLine(output, '');
}

function registerCommands(output, input) {
  register('help', () => {
    const lines = ['Available commands:', ''];
    for (const [name, cmd] of Object.entries(commands)) {
      lines.push('  ' + name.padEnd(16) + cmd.desc);
    }
    return lines.join('\n');
  }, 'Show this help');

  register('banner', () => ASCII_ART, 'Show ASCII art');

  register('ls', () => {
    return ['sections/',
      '  about/       skills/      projects/    experience/',
      '  ai-workflow/ testimonials/ blog/        contact/',
      '',
      'Try: cat [section]  —  cd [section]'].join('\n');
  }, 'List sections');

  register('cd', (args) => {
    if (!args.length) return 'Usage: cd [section]';
    const section = args[0];
    const el = document.getElementById(section) || document.getElementById(section.replace(/[^a-z]/g, ''));
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      return 'Navigated to ' + section;
    }
    return 'Section not found: ' + section;
  }, 'Navigate to a section');

  register('cat', (args) => {
    if (!args.length) return 'Usage: cat [file]';
    const file = args[0].toLowerCase();
    switch (file) {
      case 'skills':
        return 'Skills:\n' + skillsData.join('\n');
      case 'projects':
        return 'Projects:\n  1. Dynamic Restaurant Menu\n  2. Product Photo Gallery\n  3. Social Platform (19.75/20)\n  4. AI Automation Tools\n  5. Chrome Extensions\n  6. AI Research\n\nTry: cat project-[n] for details';
      case 'project-1':
        return 'Dynamic Restaurant Menu:\n  Interactive tablet-based menu for restaurants.\n  Real-time updates, bilingual FR/AR, touch UI.';
      case 'project-2':
        return 'Product Photo Gallery:\n  Professional gallery with masonry layout,\n  lightbox viewer, lazy loading, responsive.';
      case 'project-3':
        return 'Social Platform Service:\n  Full startup concept. Scored 19.75/20.\n  Architecture, business model, prototype.';
      case 'project-4':
        return 'AI Automation Tools:\n  Document processing, data extraction,\n  automated testing, LLM pipelines.';
      case 'project-5':
        return 'Chrome Extensions:\n  Manifest V3 extensions for productivity,\n  web scraping, form automation.';
      case 'project-6':
        return 'AI Research:\n  ML/NLP research in Master 2 STIQ.\n  Arabic text processing, computer vision.';
      case 'experience':
        return 'Experience:\n  1. Freelance Developer & AI Specialist (2023-Present)\n  2. Master 2 — STIQ (2024-2025)\n  3. Licence — Software Engineering (2021-2024)';
      case 'education':
        return 'Education:\n  • Master 2 — STIQ (ICT Sciences) — 2024-2025\n  • Licence — Génie Informatique — 2021-2024';
      case 'contact':
        return 'Contact:\n  Email:   naceramine49@gmail.com\n  WhatsApp: +212 6 62 34 70 15\n  GitHub:  github.com/jackghay';
      case 'about':
        return 'Amine Nasser Allah is a Full-Stack Developer & AI Engineer.\nHe builds clean, secure, high-performance applications\nwith solid architecture. He applies AI with precision\nand high productivity — not just prompting, but engineering.';
      default:
        return 'cat: ' + file + ': No such file';
    }
  }, 'Display file contents (skills, projects, experience, education, contact, about)');

  register('theme', (args) => {
    if (!args.length) {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      return 'Current theme: ' + current + '\nAvailable: dark, light, neon, chrome, hologram\nUsage: theme [name]';
    }
    const theme = args[0];
    const themes = ['dark', 'light', 'neon', 'chrome', 'hologram'];
    if (themes.includes(theme)) {
      document.documentElement.setAttribute('data-theme', theme);
      try { localStorage.setItem('theme', theme); } catch {}
      document.querySelector('.theme-btn').textContent = { dark: '🌙', light: '☀️', neon: '💜', chrome: '🔩', hologram: '🌈' } [theme] || '🎨';
      return 'Theme set to ' + theme;
    }
    return 'Theme not found. Available: ' + themes.join(', ');
  }, 'Show/change theme');

  register('clear', () => {
    if (output) output.innerHTML = '';
    return null;
  }, 'Clear terminal');

  register('matrix', () => {
    if (matrixActive) { deactivateMatrix(); return 'Matrix deactivated.'; }
    activateMatrix();
    return 'Matrix activated. Type "matrix" again to deactivate.';
  }, 'Toggle Matrix rain');

  register('contact', () => {
    return '📧 naceramine49@gmail.com\n📱 +212 6 62 34 70 15\n🐙 github.com/jackghay\n🌐 Available for freelance worldwide';
  }, 'Show contact info');

  register('github', () => {
    window.open('https://github.com/jackghay', '_blank', 'noopener');
    return 'Opening github.com/jackghay...';
  }, 'Open GitHub profile');

  register('email', () => {
    window.location.href = 'mailto:naceramine49@gmail.com';
    return 'Opening mail client...';
  }, 'Send email');

  register('date', () => new Date().toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }), 'Show current date & time');

  register('fortune', () => FORTUNES[Math.floor(Math.random() * FORTUNES.length)], 'Random developer wisdom');

  register('neofetch', () => {
    const theme = document.documentElement.getAttribute('data-theme') || 'dark';
    const lang = document.documentElement.lang || 'en';
    return [
      '       ████████████   Amine@portfolio',
      '     ██            ██  -----------------',
      '    ██   ████████   ██  OS:     Browser',
      '   ██   ██      ██   ██  Shell:  Terminal v1.0',
      '   ██   ██      ██   ██  Theme:  ' + theme,
      '   ██   ██      ██   ██  Lang:   ' + lang,
      '    ██   ████████   ██   Stack:  Vanilla JS + Vite 6',
      '     ██            ██    AI:     Transformers.js',
      '       ████████████     3D:      Three.js',
    ].join('\n');
  }, 'System info (like neofetch)');

  register('ping', () => 'pong! Response time: 0.4ms', 'Ping the portfolio');

  register('uptime', () => {
    const seconds = Math.floor((Date.now() - window._pageLoad || 0) / 1000);
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return 'up ' + m + 'm ' + s + 's (since page load)';
  }, 'Show terminal uptime');

  register('echo', (args) => args.join(' ') || '', 'Echo text');

  register('sudo', () => {
    const insults = [
      'Nice try. 😏',
      'You are not in the sudoers file. This incident will be reported.',
      'Permission denied. Ask Amine.',
      'Even root doesn\'t have that power here.',
      'sudo: unable to resolve host: who-do-you-think-you-are',
    ];
    return insults[Math.floor(Math.random() * insults.length)];
  }, 'Pretend to be root');

  register('whoami', () => 'Amine Nasser Allah\nFull-Stack Developer & AI Engineer\nMorocco · Worldwide Remote', 'Display current user');
  register('about', () => 'Amine Nasser Allah — Full-Stack Developer & AI Engineer.\nBased in Morocco. Available worldwide remotely.', 'More about me');

  register('projects', () => {
    return [
      '📂 Projects (6):',
      '',
      '  [1] Dynamic Restaurant Menu     web',
      '  [2] Product Photo Gallery       web',
      '  [3] Social Platform (19.75/20)  web',
      '  [4] AI Automation Tools          ai',
      '  [5] Chrome Extensions           extensions',
      '  [6] AI Research                  ai',
      '',
      '  Try: cat project-[n] for details',
    ].join('\n');
  }, 'List all projects');

  register('skills', () => 'Skills:\n' + skillsData.join('\n'), 'List all skills');

  register('education', () => {
    return [
      '🎓 Education:',
      '',
      '  Master 2 — STIQ',
      '  Sciences & Technologies de l\'Information',
      '  et de la Communication',
      '  2024 — 2025',
      '',
      '  Licence — Génie Informatique',
      '  Génie des Systèmes d\'Information',
      '  et du Logiciel',
      '  2021 — 2024',
    ].join('\n');
  }, 'Show education');

  register('experience', () => {
    return [
      '💼 Experience:',
      '',
      '  Freelance Developer & AI Specialist',
      '  Self-Employed · 2023 — Present',
      '',
      '  Master 2 — STIQ',
      '  2024 — 2025',
      '',
      '  Licence — Génie Informatique',
      '  2021 — 2024',
    ].join('\n');
  }, 'Show experience');
}

function execute(output, cmd) {
  const parts = cmd.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) || [cmd];
  const name = parts[0].toLowerCase();
  const args = parts.slice(1).map(a => a.replace(/^["']|["']$/g, ''));

  if (commands[name]) {
    const result = commands[name].fn(args);
    if (result !== null) {
      if (name === 'banner') {
        // Type out the banner slowly
        const lines = result.split('\n');
        let i = 0;
        function typeNext() {
          if (i < lines.length) {
            addLine(output, lines[i]);
            scrollBottom(output);
            i++;
            setTimeout(typeNext, 20);
          }
        }
        typeNext();
        return;
      }
      addLine(output, result);
    }
  } else {
    addLine(output, 'bash: ' + name + ': command not found. Type "help" for available commands.');
  }
  scrollBottom(output);
}

function addLine(container, text) {
  if (!container) return;
  const line = document.createElement('div');
  line.className = 'term-line';
  line.textContent = text;
  container.appendChild(line);
}

function scrollBottom(container) {
  if (!container) return;
  requestAnimationFrame(() => {
    container.scrollTop = container.scrollHeight;
  });
}

function activateMatrix() {
  if (matrixActive) return;
  matrixActive = true;
  canvas = document.createElement('canvas');
  canvas.className = 'matrix-canvas';
  canvas.style.cssText = 'position:fixed;inset:0;z-index:9998;pointer-events:none;opacity:0.4';
  document.body.appendChild(canvas);
  ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンー';
  const fontSize = 14;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array.from({ length: columns }, () => Math.random() * canvas.height / fontSize);

  function draw() {
    if (!matrixActive) return;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0f0';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
    matrixInterval = requestAnimationFrame(draw);
  }
  draw();
}

function deactivateMatrix() {
  matrixActive = false;
  if (matrixInterval) { cancelAnimationFrame(matrixInterval); matrixInterval = null; }
  if (canvas) { canvas.remove(); canvas = null; ctx = null; }
}
