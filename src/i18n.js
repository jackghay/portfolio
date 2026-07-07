const translations = {
  en: {
    nav: { home: 'Home', about: 'About', skills: 'Skills', projects: 'Projects', experience: 'Experience', ai: 'AI Workflow', process: 'How I Work', contact: 'Contact' },
    hero: { greeting: 'Hello, I\'m', role: ['Full-Stack Developer', 'AI Engineer', 'Software Architect', 'Automation Expert', 'Tech Innovator'], subtitle: 'I build secure web apps & smart automation that save you time and grow your business — serving clients in Morocco, France, and worldwide', cta: 'See My Work', ctaAlt: 'Book a Free Call' },
    about: { label: 'About Me', title: 'From Code to Business Solutions', desc: 'I build applications that solve real business problems. With a Master\'s in ICT (STIQ) and years of freelance delivery, I help businesses in Morocco, France, and beyond — from restaurant digitalization to AI automation — delivering clean, secure, and high-performance solutions.', stats: { projects: 'Projects', experience: 'Experience', clients: 'Clients', technologies: 'Technologies' } },
    skills: { label: 'Skills & Expertise', title: 'Technology Stack', desc: 'Modern tools and frameworks I use to build exceptional digital experiences with precision and high productivity' },
    projects: { label: 'Case Studies', title: 'Real Projects, Real Results', desc: 'Each project solved a real business problem. Here is how I delivered measurable impact.', all: 'All', web: 'Web Apps', ai: 'AI/ML', extensions: 'Extensions' },
    experience: { label: 'Experience', title: 'Academic & Professional Journey', desc: 'A foundation in software engineering, advanced ICT studies, and hands-on freelance delivery for clients across multiple countries' },
    aiworkflow: { label: 'AI Workflow', title: 'How I Leverage AI', desc: 'Integrating artificial intelligence at every stage of development', step1: 'Ideation', step2: 'Architecture', step3: 'Development', step4: 'Testing', step5: 'Deploy' },
    process: { label: 'How I Work', title: 'From Conversation to Launch', desc: 'A clear, transparent process designed to minimize risk and maximize results for your project', step1: 'Discovery Call', step1desc: '30-minute free call to understand your needs, your goals, and whether we are a good fit. No commitment, no pressure.', step2: 'Architecture & Proposal', step2desc: 'I design the solution, choose the right tech stack, and deliver a fixed-price proposal with a clear timeline.', step3: 'Development Sprint', step3desc: 'I build your solution in focused 2-4 week sprints with regular demos. You see progress every step of the way.', step4: 'Deploy & Support', step4desc: 'I deploy to production, hand over documentation, and provide 30 days of free support. Your project runs smoothly from day one.' },
    testimonials: { label: 'Testimonials', title: 'What Clients Say', desc: 'Feedback from business owners, collaborators, and academic evaluators' },
    contact: { label: 'Let\'s Talk', title: 'Ready to Start Your Project?', desc: 'The first step is a free 30-minute call. We discuss your needs, I answer your questions, and you decide if you want to move forward. No obligation.', name: 'Your Name', email: 'Your Email', message: 'Tell me about your project', send: 'Send Message', sent: 'Message Sent!', error: 'Something went wrong', booking: 'Book a Free 30-min Call', or: 'or send a message below' },
    blog: { label: 'Technical Writing', title: 'Articles & Insights', desc: 'Deep dives into system architecture, AI engineering, and software craftsmanship' },
    chatbot: { placeholder: 'Ask me anything...', thinking: 'Thinking...', suggestions: ['What projects have you built?', 'How fast can you deliver?', 'Do you work with clients in France?'], ready: 'Ask me about his projects, process, or how he can help your business!' },
  },
  ar: {
    nav: { home: 'الرئيسية', about: 'عني', skills: 'المهارات', projects: 'المشاريع', experience: 'الخبرة', ai: 'سير العمل بالذكاء', process: 'كيف أشتغل', contact: 'اتصل بي' },
    hero: { greeting: 'مرحباً، أنا', role: ['مطور Full-Stack', 'مهندس ذكاء اصطناعي', 'مهندس برمجيات', 'خبير أتمتة', 'مبتكر تقني'], subtitle: 'أبني تطبيقات ويب آمنة وأدوات أتمتة ذكية توفر وقتك وتنمي أعمالك — أخدم زبائن في المغرب، فرنسا، وحول العالم', cta: 'شوف أعمالي', ctaAlt: 'احجز مكالمة مجانية' },
    about: { label: 'عني', title: 'من الكود إلى حلول عملية', desc: 'أبني تطبيقات تحل مشاكل حقيقية للشركات. حاصل على ماستر 2 في STIQ وسنوات من الخبرة العملية، أساعد الشركات في المغرب وفرنسا وما بعدها — من رقمنة المطاعم إلى أتمتة الذكاء الاصطناعي — بتطبيقات نظيفة وآمنة وعالية الأداء.', stats: { projects: 'مشروع', experience: 'خبرة', clients: 'عميل', technologies: 'تقنية' } },
    skills: { label: 'المهارات', title: 'التقنيات التي أستخدمها', desc: 'أدوات وأطر عمل حديثة لبناء تجارب رقمية استثنائية بدقة وإنتاجية عالية' },
    projects: { label: 'دراسات حالة', title: 'مشاريع حقيقية، نتائج ملموسة', desc: 'كل مشروع حل مشكلة حقيقية. إليك كيف حققت أثراً قابلاً للقياس.', all: 'الكل', web: 'تطبيقات ويب', ai: 'ذكاء اصطناعي', extensions: 'إضافات' },
    experience: { label: 'الخبرة', title: 'الرحلة الأكاديمية والمهنية', desc: 'أساس قوي في هندسة البرمجيات، دراسات عليا في ICT، وتسليم مشاريع عملية لعملاء في عدة دول' },
    aiworkflow: { label: 'سير العمل بالذكاء', title: 'كيف أستفيد من الذكاء الاصطناعي', desc: 'دمج الذكاء الاصطناعي في كل مرحلة من مراحل التطوير', step1: 'التفكير', step2: 'الهندسة', step3: 'التطوير', step4: 'الاختبار', step5: 'النشر' },
    process: { label: 'كيف أشتغل', title: 'من المحادثة إلى الإطلاق', desc: 'عملية واضحة وشفافة تصمم لتقليل المخاطر وتعظيم النتائج لمشروعك', step1: 'مكالمة استكشاف', step1desc: 'مكالمة مجانية 30 دقيقة لفهم احتياجاتك وأهدافك. بدون التزام أو ضغط.', step2: 'الهندسة والعرض', step2desc: 'أصمم الحل، أختار التقنيات المناسبة، وأقدم عرض سعر ثابت بجدول زمني واضح.', step3: 'سباق التطوير', step3desc: 'أبني الحل في سباقات 2-4 أسابيع مع عروض تقديمية منتظمة. تشاهد التقدم خطوة بخطوة.', step4: 'النشر والدعم', step4desc: 'أنشر في الإنتاج، أسلم الوثائق، وأقدم 30 يوماً من الدعم المجاني. مشروعك يعمل بسلاسة من اليوم الأول.' },
    testimonials: { label: 'الشهادات', title: 'ماذا يقول العملاء', desc: 'آراء أصحاب الشركات، الزملاء، والمقيمين الأكاديميين' },
    contact: { label: 'هيا بنا', title: 'مستعد لبدء مشروعك؟', desc: 'الخطوة الأولى مكالمة مجانية 30 دقيقة. نناقش احتياجاتك، أجيب على أسئلتك، وتقرر إذا كنت تريد المتابعة. بدون أي إلتزام.', name: 'اسمك', email: 'بريدك', message: 'حدثني عن مشروعك', send: 'أرسل الرسالة', sent: 'تم الإرسال!', error: 'حدث خطأ', booking: 'احجز مكالمة مجانية 30 دقيقة', or: 'أو أرسل رسالة أدناه' },
    blog: { label: 'كتابة تقنية', title: 'مقالات ورؤى', desc: 'غوص في هندسة النظم، هندسة الذكاء الاصطناعي، وحرفية البرمجيات' },
    chatbot: { placeholder: 'اسألني أي شيء...', thinking: 'جاري التفكير...', suggestions: ['ما هي المشاريع التي بنيتها؟', 'كم وقت التوصيل؟', 'هل تشتغل مع زبائن في فرنسا؟'], ready: 'اسأل عن مشاريعه، طريقته في العمل، أو كيف يقدر يساعد أعمالك!' },
  },
  fr: {
    nav: { home: 'Accueil', about: 'À propos', skills: 'Compétences', projects: 'Projets', experience: 'Expérience', ai: 'IA Workflow', process: 'Comment je travaille', contact: 'Contact' },
    hero: { greeting: 'Bonjour, je suis', role: ['Développeur Full-Stack', 'Ingénieur IA', 'Architecte Logiciel', 'Expert en Automatisation', 'Innovateur Tech'], subtitle: 'Je construis des applications web sécurisées et des outils d\'automatisation intelligents qui vous font gagner du temps et développent votre entreprise — au service de clients au Maroc, en France et dans le monde', cta: 'Voir mes réalisations', ctaAlt: 'Réserver un appel gratuit' },
    about: { label: 'À propos', title: 'Du code aux solutions business', desc: 'Je construis des applications qui résolvent de vrais problèmes métier. Titulaire d\'un Master 2 en STIQ (ICT) et fort de plusieurs années en freelance, j\'aide les entreprises au Maroc, en France et ailleurs — de la digitalisation des restaurants à l\'automatisation par IA — avec des solutions propres, sécurisées et performantes.', stats: { projects: 'Projets', experience: 'Expérience', clients: 'Clients', technologies: 'Technologies' } },
    skills: { label: 'Compétences', title: 'Stack Technologique', desc: 'Outils et frameworks modernes pour créer des expériences numériques exceptionnelles avec précision et productivité' },
    projects: { label: 'Études de cas', title: 'Projets réels, résultats concrets', desc: 'Chaque projet a résolu un vrai problème métier. Voici comment j\'ai deliver un impact mesurable.', all: 'Tous', web: 'Apps Web', ai: 'IA/ML', extensions: 'Extensions' },
    experience: { label: 'Expérience', title: 'Parcours académique et professionnel', desc: 'Une base solide en génie logiciel, des études supérieures en ICT, et des projets freelances pour des clients dans plusieurs pays' },
    aiworkflow: { label: 'Workflow IA', title: 'Comment j\'utilise l\'IA', desc: 'Intégration de l\'intelligence artificielle à chaque étape du développement', step1: 'Idéation', step2: 'Architecture', step3: 'Développement', step4: 'Test', step5: 'Déploiement' },
    process: { label: 'Comment je travaille', title: 'De la conversation au lancement', desc: 'Un processus clair et transparent conçu pour minimiser les risques et maximiser les résultats pour votre projet', step1: 'Appel Découverte', step1desc: 'Appel gratuit de 30 minutes pour comprendre vos besoins, vos objectifs, et voir si nous sommes compatibles. Sans engagement.', step2: 'Architecture & Proposition', step2desc: 'Je conçois la solution, choisis le bon stack technique, et livre une proposition à prix fixe avec un calendrier clair.', step3: 'Sprint de Développement', step3desc: 'Je construis votre solution en sprints de 2 à 4 semaines avec des démos régulières. Vous voyez les progrès à chaque étape.', step4: 'Déploiement & Support', step4desc: 'Je déploie en production, remets la documentation, et offre 30 jours de support gratuit. Votre projet tourne parfaitement dès le premier jour.' },
    testimonials: { label: 'Témoignages', title: 'Ce que disent les clients', desc: 'Retours d\'entrepreneurs, collaborateurs et évaluateurs académiques' },
    contact: { label: 'Parlons-en', title: 'Prêt à démarrer votre projet ?', desc: 'La première étape est un appel gratuit de 30 minutes. Nous discutons de vos besoins, je réponds à vos questions, et vous décidez si vous voulez continuer. Aucune obligation.', name: 'Votre nom', email: 'Votre email', message: 'Parlez-moi de votre projet', send: 'Envoyer', sent: 'Message envoyé !', error: 'Une erreur est survenue', booking: 'Réserver un appel gratuit 30 min', or: 'ou envoyez un message ci-dessous' },
    blog: { label: 'Articles techniques', title: 'Articles & Insights', desc: 'Analyses approfondies sur l\'architecture système, l\'ingénierie IA et le savoir-faire logiciel' },
    chatbot: { placeholder: 'Posez-moi une question...', thinking: 'Réflexion...', suggestions: ['Quels projets avez-vous réalisés ?', 'Quel est le délai de livraison ?', 'Travaillez-vous avec des clients en France ?'], ready: 'Demandez-moi sur ses projets, son processus, ou comment il peut aider votre entreprise !' },
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
