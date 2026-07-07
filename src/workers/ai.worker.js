let pipeline;
let embedder;
let generator;
let isReady = false;

const portfolioData = [
  { id: 'intro', text: 'Amine Nasser Allah is a Full-Stack Developer and AI Engineer based in Morocco, available worldwide remotely. Holds a Master 2 in STIQ (ICT Sciences) and a Licence in Software Engineering.' },
  { id: 'skills-frontend', text: 'Expert in JavaScript, React, HTML/CSS, and building dynamic UIs for tablets, web, and browser extensions.' },
  { id: 'skills-backend', text: 'Proficient in Node.js, Python, PHP, SQL/PostgreSQL, and REST API design for clean, secure backend systems.' },
  { id: 'skills-ai', text: 'Experienced with AI and Machine Learning, OpenAI API, automation tools, and applying AI with precision and high productivity in real projects.' },
  { id: 'skills-arch', text: 'Strong understanding of system architecture, security best practices, and programming fundamentals. Builds stable, secure, and high-performance applications.' },
  { id: 'extensions', text: 'Develops Chrome extensions using JavaScript and Chrome APIs to enhance browser productivity and automate tasks.' },
  { id: 'exp-current', text: 'Freelance Developer & AI Specialist (2023-Present): Building web apps, dynamic restaurant menus, product galleries, automation tools, and Chrome extensions for clients.' },
  { id: 'exp-master', text: 'Master 2 in STIQ — Sciences et Technologies de l\'Information et de la Communication. Advanced studies in ICT, AI, and system architecture.' },
  { id: 'exp-licence', text: 'Licence in Génie des Systèmes d\'Information et du Logiciel — Information Systems Engineering and Software Engineering. Strong foundation in programming and databases.' },
  { id: 'project-1', text: 'Dynamic Restaurant Menu: Interactive tablet-based menu for restaurants with real-time updates and bilingual support.' },
  { id: 'project-2', text: 'Product Photo Gallery: Professional product showcase website with smooth navigation and responsive design for a client.' },
  { id: 'project-3', text: 'Social Platform Service: Complete startup concept scored 19.75/20. Full project architecture, business model, and implementation.' },
  { id: 'project-4', text: 'AI-Powered Automation: Multiple automation tools leveraging AI for maximum productivity and precision in repetitive tasks.' },
  { id: 'project-5', text: 'Chrome Extensions: Several browser extensions for enhancing web productivity and user experience.' },
  { id: 'project-6', text: 'AI Research Projects: ML and AI projects developed during academic studies, applying machine learning and intelligent systems.' },
  { id: 'contact', text: 'Contact Amine via email at naceramine49@gmail.com or WhatsApp at +212662347015, or check GitHub at github.com/jackghay.' },
];

let embeddings = [];
let embedModelLoaded = false;

async function loadEmbedder() {
  try {
    const { pipeline: createPipeline } = await import('@xenova/transformers');
    embedder = await createPipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
    embedModelLoaded = true;

    for (const item of portfolioData) {
      const result = await embedder(item.text, { pooling: 'mean', normalize: true });
      embeddings.push({ id: item.id, text: item.text, embedding: Array.from(result.data) });
    }
    return true;
  } catch (e) {
    postMessage({ type: 'error', data: 'Failed to load embedding model: ' + e.message });
    return false;
  }
}

function cosineSimilarity(a, b) {
  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  return dot / (Math.sqrt(magA) * Math.sqrt(magB) + 1e-10);
}

function findRelevantContext(query) {
  if (!embedder || embeddings.length === 0) return '';

  return new Promise(async (resolve) => {
    try {
      const result = await embedder(query, { pooling: 'mean', normalize: true });
      const queryEmbed = Array.from(result.data);

      let best = { similarity: -1, text: '' };
      for (const item of embeddings) {
        const sim = cosineSimilarity(queryEmbed, item.embedding);
        if (sim > best.similarity) {
          best = { similarity: sim, text: item.text };
        }
      }

      if (best.similarity > 0.3) {
        resolve(best.text);
      } else {
        resolve('');
      }
    } catch {
      resolve('');
    }
  });
}

const fallbackResponses = [
  { keywords: ['hi', 'hello', 'hey', 'مرحبا', 'السلام'], response: 'Hello! I\'m Amine\'s AI assistant. Ask me about his skills, projects, education, or anything you\'d like to know!' },
  { keywords: ['skill', 'technolog', 'tech stack', 'stack', 'tools', 'what can', 'قدرات', 'مهارات'], response: 'Amine specializes in full-stack development (JavaScript, React, Node.js, Python, PHP) and AI engineering. He also builds Chrome extensions, automation tools, and dynamic web apps. Strong in system architecture, security, and clean code.' },
  { keywords: ['experience', 'work', 'job', 'career', 'background', 'خبرة'], response: 'Amine is currently a Freelance Developer & AI Specialist. He holds a Master 2 in STIQ (ICT Sciences) and a Licence in Software Engineering. He has built multiple projects including dynamic restaurant menus, product galleries, and a social platform that scored 19.75/20.' },
  { keywords: ['project', 'portfolio', 'build', 'made', 'create', 'مشروع', 'عمل'], response: 'Amine has built: (1) Dynamic restaurant menu for tablets, (2) Product photo gallery for a client, (3) Social platform startup (19.75/20), (4) AI-powered automation tools, (5) Chrome extensions, (6) Various AI/ML research projects.' },
  { keywords: ['contact', 'hire', 'email', 'reach', 'call', 'whatsapp', 'اتصل'], response: 'You can reach Amine via the contact form on this site, or check his GitHub at github.com/jackghay. Available for freelance and collaboration!' },
  { keywords: ['ai', 'machine learning', 'ml', 'automation', 'ذكاء', 'تعلم'], response: 'Amine applies AI with precision and high productivity. He builds automation tools, uses OpenAI API, and integrates AI into real products. He deeply understands what he builds — not just using AI but truly engineering with it.' },
  { keywords: ['education', 'study', 'degree', 'master', 'licence', 'شهادة', 'جامعة'], response: 'Amine holds a Master 2 in STIQ (Sciences et Technologies de l\'Information et de la Communication) and a Licence in Génie des Systèmes d\'Information et du Logiciel (Software Engineering).' },
  { keywords: ['amine', 'about', 'who', 'tell me', 'مين', 'عموشي'], response: 'Amine Nasser Allah is a Full-Stack Developer & AI Engineer based in Morocco. He builds clean, secure, high-performance applications with solid architecture and applies AI with precision and high productivity. Check his work at github.com/jackghay.' },
];

function getFallbackResponse(query) {
  const q = query.toLowerCase();
  for (const fb of fallbackResponses) {
    if (fb.keywords.some(k => q.includes(k))) {
      return fb.response;
    }
  }
  return 'I\'m Amine\'s AI assistant. I can tell you about his skills (frontend, backend, AI/ML, DevOps), projects, professional experience, or how to contact him. What would you like to know?';
}

async function generateResponse(query) {
  if (embedModelLoaded) {
    try {
      const context = await findRelevantContext(query);
      if (context) {
        return `Based on Amine's profile: ${context}`;
      }
    } catch { }
  }
  return getFallbackResponse(query);
}

const ALLOWED_TYPES = ['init', 'query'];

self.addEventListener('message', async (event) => {
  const msg = event.data;
  if (!msg || typeof msg !== 'object') return;
  if (!ALLOWED_TYPES.includes(msg.type)) return;
  if (typeof msg.data !== 'string' && msg.type === 'query') return;

  const { type, data } = msg;

  if (type === 'init') {
    postMessage({ type: 'status', data: 'loading' });
    const success = await loadEmbedder();
    if (success) {
      isReady = true;
      postMessage({ type: 'status', data: 'ready' });
    }
  }

  if (type === 'query' && isReady) {
    postMessage({ type: 'status', data: 'thinking' });
    const response = await generateResponse(data);
    postMessage({ type: 'response', data: response });
  }

  if (type === 'query' && !isReady) {
    const response = getFallbackResponse(data);
    postMessage({ type: 'response', data: response + ' (Note: AI models still loading)' });
  }
});
