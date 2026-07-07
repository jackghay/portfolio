import { t } from '../i18n.js';

let aiWorker = null;

function getWorker() {
  if (!aiWorker) {
    aiWorker = new Worker(new URL('../workers/ai.worker.js', import.meta.url), { type: 'module' });
    aiWorker.postMessage({ type: 'init' });
  }
  return aiWorker;
}

export function initChatbot() {
  const toggle = document.getElementById('chatbot-toggle');
  const panel = document.getElementById('chatbot');
  const close = document.getElementById('chatbot-close');
  const input = document.getElementById('chat-input');
  const send = document.getElementById('chat-send');
  const messages = document.getElementById('chat-messages');
  const suggestionsEl = document.getElementById('chat-suggestions');
  const backdrop = document.getElementById('chatbot-backdrop');
  if (!toggle || !panel) return;

  let isOpen = false;
  const fabIcon = toggle.querySelector('svg');
  const chatIcon = '<path d="M12 2a10 10 0 0110 10c0 2.5-1 4.8-2.6 6.5L21 22l-4.2-1.8A10 10 0 0112 22 10 10 0 012 12 10 10 0 0112 2z"/><path d="M8 12h8M12 8v8"/>';
  const closeIcon = '<path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" fill="none"/>';

  function open() {
    isOpen = true;
    panel.classList.remove('chatbot--hidden');
    backdrop?.classList.add('visible');
    if (fabIcon) fabIcon.innerHTML = closeIcon;
    toggle.setAttribute('aria-label', 'Close chat');
    setTimeout(() => input?.focus(), 300);
  }

  function closeChat() {
    isOpen = false;
    panel.classList.add('chatbot--hidden');
    backdrop?.classList.remove('visible');
    if (fabIcon) fabIcon.innerHTML = chatIcon;
    toggle.setAttribute('aria-label', 'AI Chat');
  }

  toggle.addEventListener('click', () => isOpen ? closeChat() : open());
  close?.addEventListener('click', closeChat);
  backdrop?.addEventListener('click', closeChat);

  let workerReady = false;

  const worker = getWorker();
  worker.addEventListener('message', e => {
    if (e.data.type === 'status' && e.data.data === 'ready') workerReady = true;
    if (e.data.type === 'response') {
      document.getElementById('chat-thinking')?.remove();
      addMessage('bot', e.data.data);
    }
  });

  const responses = [
    { keywords: ['skill', 'technolog', 'tech', 'قدرات', 'مهارات'], response: 'I specialize in full-stack development (JavaScript, React, Node.js, Python, PHP) and AI engineering. I also build Chrome extensions, automation tools, and dynamic web apps. Strong system architecture and security knowledge.' },
    { keywords: ['experience', 'work', 'career', 'خبرة'], response: 'Currently freelancing as a Developer & AI Specialist. I hold a Master 2 in STIQ (ICT) and a Licence in Software Engineering. I\'ve built restaurant menus, product galleries, automation tools, and a social platform that scored 19.75/20.' },
    { keywords: ['project', 'مشروع', 'عمل'], response: 'I\'ve built: (1) Dynamic restaurant menu for tablets, (2) Product photo gallery, (3) Social platform startup (19.75/20), (4) AI automation tools, (5) Chrome extensions, (6) AI/ML research projects. Check github.com/jackghay!' },
    { keywords: ['education', 'study', 'degree', 'master', 'licence', 'شهادة', 'جامعة'], response: 'I hold a Master 2 in STIQ (Sciences et Technologies de l\'Information et de la Communication) and a Licence in Génie des Systèmes d\'Information et du Logiciel (Software Engineering).' },
    { keywords: ['contact', 'hire', 'اتصل'], response: 'You can reach me via email at naceramine49@gmail.com, WhatsApp at +212662347015, or GitHub at github.com/jackghay. Available for freelance work!' },
    { keywords: ['ai', 'machine learning', 'automation', 'ذكاء', 'تعلم'], response: 'I apply AI with precision and high productivity. I build automation tools, use OpenAI API, and integrate AI into real products. I truly understand what I build — not just using AI but engineering with it.' },
  ];

  function answer(q) {
    const query = q.toLowerCase();
    for (const r of responses) {
      if (r.keywords.some(k => query.includes(k))) return r.response;
    }
    return 'I\'m Amine — a Full-Stack Developer & AI Engineer. I build clean, secure, high-performance applications with solid architecture. Ask me about my projects, skills, education, or experience!';
  }

  function addMessage(role, text) {
    const div = document.createElement('div');
    div.className = 'chat-message ' + role;
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    bubble.textContent = text;
    div.appendChild(bubble);
    messages?.appendChild(div);
    messages?.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' });
  }

  function sendMessage() {
    const text = input?.value.trim();
    if (!text) return;
    input.value = '';
    addMessage('user', text);
    addMessage('bot', 'Thinking...');

    if (workerReady) {
      worker.postMessage({ type: 'query', data: text });
    } else {
      setTimeout(() => {
        document.querySelector('#chat-messages .chat-message:last-child')?.remove();
        addMessage('bot', answer(text));
      }, 500 + Math.random() * 300);
    }
  }

  send?.addEventListener('click', sendMessage);
  input?.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(); });

  if (suggestionsEl) {
    const labels = ['chatbot.suggestions.0', 'chatbot.suggestions.1', 'chatbot.suggestions.2'];
    suggestionsEl.innerHTML = labels.map((k, i) =>
      `<button class="suggestion-btn" data-suggestion="${i}">${t(k)}</button>`
    ).join('');
    suggestionsEl.addEventListener('click', e => {
      const btn = e.target.closest('.suggestion-btn');
      if (!btn || !input) return;
      input.value = btn.textContent || '';
      sendMessage();
    });
  }
}
