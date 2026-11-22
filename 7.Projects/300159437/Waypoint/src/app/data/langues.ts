/**
 * Langues proposées au premier lancement.
 * Les plus parlées par les nouveaux arrivants au Canada.
 * `voix` = code de langue pour la voix du téléphone (synthèse vocale).
 */
export interface Langue {
  code: string;
  nom: string; // dans la langue elle-même
  anglais: string; // nom anglais (envoyé à l'IA)
  voix: string;
  rtl?: boolean; // écrit de droite à gauche
  choisir: string;
  continuer: string;
  accueil: string; // ce que l'assistant dit au premier lancement
  retour: (reste: number) => string; // ce qu'il dit aux ouvertures suivantes
}

export const LANGUES: Langue[] = [
  {
    code: 'fr', nom: 'Français', anglais: 'French', voix: 'fr-CA',
    choisir: 'Choisis ta langue', continuer: 'Continuer',
    accueil: "Bonjour et bienvenue au Canada ! Je suis l'assistant Waypoint. Je vais te guider étape par étape pendant tes premières semaines. On commence ?",
    retour: (n) => (n > 0 ? `Bon retour ! Il te reste ${n} étapes. Ta prochaine étape t'attend.` : 'Bon retour ! Ton parcours est terminé. Bravo !'),
  },
  {
    code: 'en', nom: 'English', anglais: 'English', voix: 'en-CA',
    choisir: 'Choose your language', continuer: 'Continue',
    accueil: "Hello and welcome to Canada! I'm the Waypoint assistant. I'll guide you step by step through your first weeks. Shall we begin?",
    retour: (n) => (n > 0 ? `Welcome back! You have ${n} steps left. Your next step is waiting.` : 'Welcome back! Your journey is complete. Well done!'),
  },
  {
    code: 'es', nom: 'Español', anglais: 'Spanish', voix: 'es-MX',
    choisir: 'Elige tu idioma', continuer: 'Continuar',
    accueil: '¡Hola y bienvenido a Canadá! Soy el asistente de Waypoint. Te guiaré paso a paso durante tus primeras semanas. ¿Empezamos?',
    retour: (n) => (n > 0 ? `¡Bienvenido de nuevo! Te quedan ${n} pasos. Tu próximo paso te espera.` : '¡Bienvenido de nuevo! Completaste tu recorrido. ¡Felicidades!'),
  },
  {
    code: 'ar', nom: 'العربية', anglais: 'Arabic', voix: 'ar', rtl: true,
    choisir: 'اختر لغتك', continuer: 'متابعة',
    accueil: 'مرحبًا بك في كندا! أنا مساعد Waypoint. سأرشدك خطوة بخطوة خلال أسابيعك الأولى. هل نبدأ؟',
    retour: (n) => (n > 0 ? `مرحبًا بعودتك! تبقّى لك ${n} خطوات. خطوتك التالية في انتظارك.` : 'مرحبًا بعودتك! لقد أكملت رحلتك. أحسنت!'),
  },
  {
    code: 'zh', nom: '中文', anglais: 'Simplified Chinese', voix: 'zh-CN',
    choisir: '选择你的语言', continuer: '继续',
    accueil: '你好，欢迎来到加拿大！我是 Waypoint 助手。在你最初的几周里，我会一步一步地指导你。我们开始吧？',
    retour: (n) => (n > 0 ? `欢迎回来！你还有 ${n} 个步骤。下一步正在等你。` : '欢迎回来！你已完成所有步骤，太棒了！'),
  },
  {
    code: 'pt', nom: 'Português', anglais: 'Portuguese', voix: 'pt-BR',
    choisir: 'Escolha o seu idioma', continuer: 'Continuar',
    accueil: 'Olá e bem-vindo ao Canadá! Eu sou o assistente Waypoint. Vou te guiar passo a passo nas suas primeiras semanas. Vamos começar?',
    retour: (n) => (n > 0 ? `Bem-vindo de volta! Faltam ${n} etapas. A sua próxima etapa está esperando.` : 'Bem-vindo de volta! Você concluiu o seu percurso. Parabéns!'),
  },
  {
    code: 'uk', nom: 'Українська', anglais: 'Ukrainian', voix: 'uk-UA',
    choisir: 'Обери свою мову', continuer: 'Продовжити',
    accueil: 'Вітаю і ласкаво просимо до Канади! Я помічник Waypoint. Я допомагатиму тобі крок за кроком у перші тижні. Почнемо?',
    retour: (n) => (n > 0 ? `З поверненням! Залишилося кроків: ${n}. Наступний крок чекає на тебе.` : 'З поверненням! Ти пройшов увесь шлях. Чудово!'),
  },
  {
    code: 'tl', nom: 'Tagalog', anglais: 'Tagalog (Filipino)', voix: 'fil-PH',
    choisir: 'Piliin ang iyong wika', continuer: 'Magpatuloy',
    accueil: 'Kumusta at maligayang pagdating sa Canada! Ako ang assistant ng Waypoint. Gagabayan kita hakbang-hakbang sa iyong mga unang linggo. Magsimula na tayo?',
    retour: (n) => (n > 0 ? `Maligayang pagbabalik! May ${n} hakbang ka pang natitira. Naghihintay na ang susunod mong hakbang.` : 'Maligayang pagbabalik! Natapos mo na ang lahat. Magaling!'),
  },
  {
    code: 'hi', nom: 'हिन्दी', anglais: 'Hindi', voix: 'hi-IN',
    choisir: 'अपनी भाषा चुनें', continuer: 'आगे बढ़ें',
    accueil: 'नमस्ते, कनाडा में आपका स्वागत है! मैं Waypoint सहायक हूँ। शुरुआती हफ़्तों में मैं आपको कदम-दर-कदम मार्गदर्शन दूँगा। क्या हम शुरू करें?',
    retour: (n) => (n > 0 ? `वापसी पर स्वागत है! आपके ${n} कदम बाकी हैं। आपका अगला कदम तैयार है।` : 'वापसी पर स्वागत है! आपने सभी कदम पूरे कर लिए। शाबाश!'),
  },
  {
    code: 'fa', nom: 'فارسی', anglais: 'Persian (Farsi)', voix: 'fa-IR', rtl: true,
    choisir: 'زبانت را انتخاب کن', continuer: 'ادامه',
    accueil: 'سلام، به کانادا خوش آمدی! من دستیار Waypoint هستم. در هفته‌های اول، قدم به قدم راهنمایی‌ات می‌کنم. شروع کنیم؟',
    retour: (n) => (n > 0 ? `خوش برگشتی! ${n} مرحله باقی مانده. مرحلهٔ بعدی منتظر توست.` : 'خوش برگشتی! همهٔ مراحل را تمام کردی. آفرین!'),
  },
];

export function trouverLangue(code: string | null | undefined): Langue {
  return LANGUES.find((l) => l.code === code) ?? LANGUES[0];
}
