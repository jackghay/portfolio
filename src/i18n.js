const translations = {
  en: {
    nav: { home: 'Home', about: 'About', skills: 'Skills', projects: 'Projects', experience: 'Experience', ai: 'AI Workflow', contact: 'Contact' },
    hero: { greeting: 'Hello, I\'m', role: ['Full-Stack Developer', 'AI Engineer', 'Software Architect', 'Automation Expert', 'Tech Innovator'], subtitle: 'Building clean, secure, high-performance applications with precision AI', cta: 'Explore My Work', ctaAlt: 'Get in Touch' },
    about: { label: 'About Me', title: 'From Code to Complete Solutions', desc: 'I build clean, stable, and secure applications with solid architecture. With a Master\'s in ICT (STIQ) and deep knowledge of programming fundamentals, I deliver high-quality web apps, automation tools, and AI-powered solutions that are both innovative and production-ready.', stats: { projects: 'Projects', experience: 'Experience', clients: 'Clients', technologies: 'Technologies' } },
    skills: { label: 'Skills & Expertise', title: 'Technology Stack', desc: 'Modern tools and frameworks I use to build exceptional digital experiences with precision and high productivity' },
    projects: { label: 'Portfolio', title: 'Featured Projects', desc: 'From restaurant menus to social platforms — each project is built with clean architecture and attention to detail', all: 'All', web: 'Web Apps', ai: 'AI/ML', extensions: 'Extensions' },
    experience: { label: 'Experience', title: 'Academic & Professional Journey', desc: 'A foundation in software engineering, advanced ICT studies, and hands-on freelance delivery' },
    aiworkflow: { label: 'AI Workflow', title: 'How I Leverage AI', desc: 'Integrating artificial intelligence at every stage of development', step1: 'Ideation', step2: 'Architecture', step3: 'Development', step4: 'Testing', step5: 'Deploy' },
    testimonials: { label: 'Testimonials', title: 'What People Say', desc: 'Feedback from clients and collaborators around the world' },
    contact: { label: 'Contact', title: 'Let\'s Work Together', desc: 'Have a project in mind? Let\'s turn your vision into reality', name: 'Your Name', email: 'Your Email', message: 'Your Message', send: 'Send Message', sent: 'Message Sent!', error: 'Something went wrong' },
    chatbot: { placeholder: 'Ask me anything...', thinking: 'Thinking...', suggestions: ['What technologies do you use?', 'What is your education?', 'Tell me about your projects'], ready: 'Ask me about his skills, projects, education, or experience!' },
  },
  ar: {
    nav: { home: 'الرئيسية', about: 'عني', skills: 'المهارات', projects: 'المشاريع', experience: 'الخبرة', ai: 'سير العمل بالذكاء', contact: 'اتصل بي' },
    hero: { greeting: 'مرحباً، أنا', role: ['مطور Full-Stack', 'مهندس ذكاء اصطناعي', 'مهندس برمجيات', 'خبير أتمتة', 'مبتكر تقني'], subtitle: 'أبني تطبيقات نظيفة وآمنة وعالية الأداء باستخدام الذكاء الاصطناعي بدقة', cta: 'استكشف أعمالي', ctaAlt: 'تواصل معي' },
    about: { label: 'عني', title: 'من الكود إلى حلول متكاملة', desc: 'أبني تطبيقات نظيفة ومستقرة وآمنة بهندسة صلبة. حاصل على ماستر 2 في STIQ ومعرفة عميقة بأساسيات البرمجة، أقدم تطبيقات ويب عالية الجودة، أدوات أتمتة، وحلول ذكاء اصطناعي مبتكرة وجاهزة للإنتاج.', stats: { projects: 'مشروع', experience: 'خبرة', clients: 'عميل', technologies: 'تقنية' } },
    skills: { label: 'المهارات', title: 'التقنيات التي أستخدمها', desc: 'أدوات وأطر عمل حديثة لبناء تجارب رقمية استثنائية بدقة وإنتاجية عالية' },
    projects: { label: 'أعمالي', title: 'مشاريع مميزة', desc: 'من مينيو مطعم إلى منصة اجتماعية — كل مشروع مبني بهندسة نظيفة واهتمام بالتفاصيل', all: 'الكل', web: 'تطبيقات ويب', ai: 'ذكاء اصطناعي', extensions: 'إضافات' },
    experience: { label: 'الخبرة', title: 'الرحلة الأكاديمية والمهنية', desc: 'أساس قوي في هندسة البرمجيات، دراسات عليا في ICT، وتسليم مشاريع عملية للعملاء' },
    aiworkflow: { label: 'سير العمل بالذكاء', title: 'كيف أستفيد من الذكاء الاصطناعي', desc: 'دمج الذكاء الاصطناعي في كل مرحلة من مراحل التطوير', step1: 'التفكير', step2: 'الهندسة', step3: 'التطوير', step4: 'الاختبار', step5: 'النشر' },
    testimonials: { label: 'الشهادات', title: 'ماذا يقول عني الآخرون', desc: 'آراء العملاء والزملاء من حول العالم' },
    contact: { label: 'اتصل بي', title: 'لنعمل معاً', desc: 'لديك مشروع في ذهني؟ حول رؤيتك إلى واقع', name: 'اسمك', email: 'بريدك', message: 'رسالتك', send: 'أرسل الرسالة', sent: 'تم الإرسال!', error: 'حدث خطأ' },
    chatbot: { placeholder: 'اسألني أي شيء...', thinking: 'جاري التفكير...', suggestions: ['ما هي التقنيات التي تستخدمها؟', 'ما هي شهاداتك؟', 'حدثني عن مشاريعك'], ready: 'اسأل عن مهاراته، مشاريعه، شهاداته، أو خبرته!' },
  },
};

let currentLang = localStorage.getItem('lang') || 'en';

export function getLang() { return currentLang; }

export function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;
  updatePageContent();
  document.dispatchEvent(new CustomEvent('langchange'));
}

export function t(path) {
  const keys = path.split('.');
  let val = translations[currentLang];
  for (const key of keys) {
    if (val == null || typeof val !== 'object') return path;
    val = val[key];
  }
  return val ?? path;
}

function updatePageContent() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
}

export function initI18n() {
  setLang(currentLang);
}
