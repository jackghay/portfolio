export const skills = [
  { name: 'JavaScript/TypeScript', level: 95, category: 'frontend', icon: 'js' },
  { name: 'React', level: 90, category: 'frontend', icon: 'react' },
  { name: 'HTML/CSS', level: 95, category: 'frontend', icon: 'html' },
  { name: 'Node.js', level: 88, category: 'backend', icon: 'node' },
  { name: 'Python', level: 92, category: 'backend', icon: 'python' },
  { name: 'PHP', level: 80, category: 'backend', icon: 'php' },
  { name: 'SQL/PostgreSQL', level: 85, category: 'backend', icon: 'db' },
  { name: 'System Architecture', level: 87, category: 'backend', icon: 'arch' },
  { name: 'AI & Machine Learning', level: 88, category: 'ai', icon: 'tf' },
  { name: 'Automation', level: 90, category: 'ai', icon: 'auto' },
  { name: 'Chrome Extensions', level: 85, category: 'ai', icon: 'ext' },
  { name: 'OpenAI API', level: 88, category: 'ai', icon: 'openai' },
  { name: 'Git', level: 92, category: 'tools', icon: 'git' },
  { name: 'Docker', level: 80, category: 'tools', icon: 'docker' },
  { name: 'REST APIs', level: 90, category: 'tools', icon: 'api' },
  { name: 'Security Best Practices', level: 85, category: 'tools', icon: 'secure' },
];

export const projects = [
  {
    title: 'Dynamic Restaurant Menu',
    desc: 'Interactive dynamic menu displayed on tablet for restaurants. Real-time updates, bilingual support, and seamless ordering experience with a clean, modern UI.',
    tags: ['HTML/CSS', 'JavaScript', 'Dynamic UI', 'Tablet'],
    category: 'web',
    image: '',
    fullDesc: 'A fully interactive digital menu system designed for tablet deployment in restaurants. Features real-time menu updates, bilingual (FR/AR) support with RTL, category-based browsing, and a clean card-based UI optimized for touch interaction.',
    features: ['Real-time menu sync', 'Bilingual FR/AR + RTL', 'Touch-optimized UI', 'Category-based browsing', 'QR code table linking'],
    challenges: 'Ensuring seamless RTL switching without layout breaking while maintaining touch responsiveness on various tablet sizes.',
    demo: null,
    source: null,
  },
  {
    title: 'Product Photo Gallery',
    desc: 'Professional product showcase gallery for a client\'s personal project. Elegant image presentation with smooth navigation, lightbox viewer, and responsive design.',
    tags: ['JavaScript', 'CSS', 'Gallery', 'Responsive'],
    category: 'web',
    image: '',
    fullDesc: 'A premium product gallery website built for a client\'s personal collection. Features a masonry grid layout, lightbox viewer with keyboard navigation, lazy loading for performance, and a fully responsive design that looks stunning on all devices.',
    features: ['Masonry grid layout', 'Lightbox with keyboard nav', 'Lazy loading images', 'Responsive design', 'Smooth transitions'],
    challenges: 'Building a masonry layout that maintains visual balance across screen sizes while keeping image loading performant.',
    demo: null,
    source: null,
  },
  {
    title: 'Social Platform Service',
    desc: 'Complete startup concept for a social services platform. Scored 19.75/20 as an innovative startup idea. Full project architecture, business model, and technical implementation.',
    tags: ['Startup', 'Full-Stack', 'Architecture', 'UI/UX'],
    category: 'web',
    image: '',
    fullDesc: 'A comprehensive startup concept for a social services platform that connects service providers with customers. Includes full system architecture, business model canvas, UML diagrams, database schema, and a working prototype. Awarded 19.75/20 for innovation and execution.',
    features: ['User authentication & profiles', 'Service listing & search', 'Real-time messaging', 'Review & rating system', 'Payment integration design'],
    challenges: 'Designing a scalable architecture that handles both real-time messaging and service discovery efficiently while maintaining data consistency.',
    demo: null,
    source: null,
  },
  {
    title: 'AI-Powered Automation Tools',
    desc: 'Multiple automation solutions leveraging AI for maximum productivity and precision. Workflows that save time and reduce manual effort while maintaining high quality output.',
    tags: ['AI', 'Python', 'Automation', 'Productivity'],
    category: 'ai',
    image: '',
    fullDesc: 'A collection of AI-powered automation tools built to eliminate repetitive tasks. Includes document processing pipelines, data extraction and transformation tools, automated testing frameworks, and smart scheduling systems — all leveraging LLMs and traditional ML for precision.',
    features: ['Document processing pipeline', 'Data extraction & transformation', 'Automated testing frameworks', 'Smart scheduling & alerts', 'LLM-powered content generation'],
    challenges: 'Balancing automation speed with output accuracy — implementing fallback mechanisms when AI confidence is low.',
    demo: null,
    source: null,
  },
  {
    title: 'Chrome Extensions',
    desc: 'Several Chrome browser extensions for enhancing web productivity, automating repetitive tasks, and improving user experience across different websites.',
    tags: ['JavaScript', 'Chrome API', 'Manifest V3', 'Extension'],
    category: 'extensions',
    image: '',
    fullDesc: 'A portfolio of Chrome extensions built with Manifest V3. Includes productivity enhancers, web scraper helpers, form auto-fillers, and UI customization tools. All built with security best practices and minimal permission scoping.',
    features: ['Manifest V3 compliance', 'Minimal permission model', 'Background service workers', 'Content script injection', 'Storage sync across devices'],
    challenges: 'Adapting legacy Manifest V2 patterns to the strict security model of V3 while maintaining feature parity.',
    demo: null,
    source: null,
  },
  {
    title: 'AI Research Projects',
    desc: 'Various AI and ML projects developed during academic studies in STIQ (Master 2). Applied machine learning, data processing, and intelligent systems design.',
    tags: ['Python', 'ML', 'TensorFlow', 'Research'],
    category: 'ai',
    image: '',
    fullDesc: 'Academic research projects conducted during Master 2 STIQ. Covers applied machine learning (classification, regression, clustering), natural language processing for Arabic text, computer vision experiments, and intelligent systems design with published methodology.',
    features: ['ML model implementation', 'NLP for Arabic text', 'Computer vision experiments', 'Data preprocessing pipelines', 'Research methodology documentation'],
    challenges: 'Preprocessing Arabic text for NLP tasks given the limited availability of well-maintained Arabic NLP libraries compared to English.',
    demo: null,
    source: null,
  },
];

export const experience = [
  {
    role: 'Freelance Developer & AI Specialist',
    company: 'Self-Employed',
    period: '2023 — Present',
    desc: 'Building custom web applications, dynamic menus, product galleries, automation tools, and Chrome extensions for clients. Delivering clean, secure, and high-performance solutions.',
    tags: ['Freelance', 'Full-Stack', 'AI', 'Automation'],
  },
  {
    role: 'Master 2 — STIQ',
    company: 'Sciences & Technologies de l\'Information et de la Communication',
    period: '2024 — 2025',
    desc: 'Advanced studies in information and communication technologies. Deepened expertise in AI, system architecture, and software engineering. Applied AI with precision and high productivity in academic projects.',
    tags: ['AI', 'ICT', 'Research', 'System Design'],
  },
  {
    role: 'Licence — Génie Informatique',
    company: 'Génie des Systèmes d\'Information et du Logiciel',
    period: '2021 — 2024',
    desc: 'Bachelor\'s degree in Information Systems Engineering and Software Engineering. Strong foundation in programming fundamentals, database design, and software development methodologies.',
    tags: ['Software Engineering', 'Databases', 'Algorithms', 'Web'],
  },
];

export const testimonials = [
  {
    name: 'Client — Restaurant',
    role: 'Restaurant Owner',
    text: 'The dynamic menu completely transformed how our customers interact with our offerings. Clean design, easy updates, and our customers love the tablet experience.',
    avatar: '',
  },
  {
    name: 'Client — Product Gallery',
    role: 'Business Owner',
    text: 'Amine built a stunning gallery for my products. The attention to detail and the smooth user interface really made my products stand out. Highly professional work.',
    avatar: '',
  },
  {
    name: 'Academic Jury — STIQ',
    role: 'Master\'s Program Evaluator',
    text: 'The social platform project scored 19.75/20 for its innovative approach, complete architecture, and polished execution. Exceptional work that demonstrates mastery of the full development lifecycle.',
    avatar: '',
  },
  {
    name: 'Collaborator',
    role: 'Fellow Developer',
    text: 'Amine has deep knowledge of programming fundamentals and AI. He builds clean, stable, secure applications with solid architecture. His use of AI is precise and highly productive.',
    avatar: '',
  },
];

export const aiWorkflowCards = [
  { title: 'AI-Assisted Architecture', desc: 'Using AI to design clean, stable system architectures with security and performance built-in from day one.', icon: 'arch' },
  { title: 'Precision AI Engineering', desc: 'Applying AI with accuracy and high productivity — not just prompting, but truly understanding and controlling every output.', icon: 'rag' },
  { title: 'AI-Automated Pipelines', desc: 'Building smart automation for repetitive tasks, testing, and deployment to maximize efficiency.', icon: 'pipe' },
  { title: 'Intelligent Product Features', desc: 'Integrating AI into real products — from dynamic menus to social platforms — adding genuine value for end users.', icon: 'feature' },
];

export const blogPosts = [
  {
    title: 'Building a RAG Pipeline In-Browser with Transformers.js',
    desc: 'How I built a fully client-side Q&A chatbot using WebGPU, Transformers.js, and cosine similarity search — no server, no API keys, no cost.',
    date: '2026-06',
    readTime: '8 min',
    tags: ['AI', 'WebGPU', 'JavaScript', 'RAG'],
    content: `When I set out to build the AI chatbot on this portfolio, I had a clear constraint: it must run 100% client-side. No server, no API calls, no monthly fees. The solution? A RAG (Retrieval-Augmented Generation) pipeline powered by Transformers.js running in a Web Worker with WebGPU acceleration.

The architecture is simple:
1. Embed portfolio data (projects, skills, experience) using all-MiniLM-L6-v2
2. On user query, embed the question with the same model
3. Compute cosine similarity against all stored embeddings
4. Return the most relevant context + a generated response

The key challenge was performance. Loading a 22MB model in the browser is not trivial. The solution was Web Workers — the model loads and computes in a background thread, keeping the UI responsive. WebGPU provides a 3-5x speedup over WASM for these operations.

The result: a chatbot that understands my work deeply, answers contextually, and costs nothing to run.`,
  },
  {
    title: 'Architecting Scalable Web Applications: Lessons from Production',
    desc: 'Key architectural decisions that made my projects stable, secure, and maintainable — from database design to API layering and security patterns.',
    date: '2026-05',
    readTime: '10 min',
    tags: ['Architecture', 'System Design', 'Best Practices'],
    content: `After building multiple production applications, certain patterns consistently emerged as critical for long-term maintainability.

Separation of Concerns: The most important principle. Each layer — data access, business logic, API — should be independently testable and replaceable. I use a clean three-layer architecture: controller → service → repository.

Database Design: Schema-first approach. Define relationships, indexes, and constraints before writing a single line of application code. This prevents 90% of production bugs.

API Design: Versioned REST with consistent error responses. Every endpoint returns { success: bool, data?: T, error?: string }. This makes client-side error handling predictable.

Security: Apply the principle of least privilege everywhere. Database users get only needed permissions. API tokens have scoped access. Input validation happens at every layer, not just the controller.

The result: applications that scale to thousands of users without architectural changes, and codebases that remain maintainable years later.`,
  },
  {
    title: 'Precision AI Engineering: Beyond Simple Prompting',
    desc: 'How I use AI as an engineering tool — controlled outputs, deterministic pipelines, and quality gates that ensure accuracy at scale.',
    date: '2026-04',
    readTime: '7 min',
    tags: ['AI', 'Automation', 'Engineering'],
    content: `AI is not magic — it's an engineering tool. The difference between a prompt hobbyist and an AI engineer is control, determinism, and quality assurance.

Structured Outputs: Every AI call in my system returns JSON, not free text. I use function calling and output parsers to enforce schema compliance. This makes AI outputs consumeable by traditional software without error-prone parsing.

Quality Gates: Every AI-generated output passes through validation:
- Schema validation (is it valid JSON?)
- Constraint validation (are values in expected ranges?)
- Semantic validation (does it make sense in context?)
If validation fails, the system retries or falls back to a deterministic alternative.

Deterministic Pipelines: For automation tasks, I combine AI with traditional algorithms. AI handles the ambiguous parts (classification, extraction, generation), while deterministic code handles the structured parts (transformation, validation, routing).

The result: AI systems that are reliable enough for production use, not just demos.`,
  },
];

export const toolBadges = ['Claude', 'ChatGPT', 'GitHub Copilot', 'Cursor', 'AI Automation', 'Chrome API', 'Python', 'JavaScript', 'Docker'];

export const stats = [
  { value: 20, label: 'projects', suffix: '+' },
  { value: 4, label: 'experience', suffix: '+ Years' },
  { value: 10, label: 'clients', suffix: '+' },
  { value: 30, label: 'technologies', suffix: '+' },
];
