/**
 * Copywriting Configuration
 * Benefit-focused copy for all major sections and CTAs
 * Based on copywriting best practices: AIDA, PAS, and USP frameworks
 */

export const SECTION_COPY = {
  // Casino section
  casinos: {
    heading: 'קזינו אונליין להשוואה — בדיקה לפי תנאים גלויים',
    subheading: 'השוו רישוי, תשלומים, בונוסים ותמיכה',
    cta: 'השוו את בתי הקזינו',
    description: 'מידע על רישוי, תשלומים, בונוסים, תמיכה וכלי משחק אחראי',
  },

  // Categories section
  categories: {
    heading: 'מצאו משחק שמתאים לתקציב ולניסיון',
    subheading: 'סוגי משחקים עבור כל שחקן',
    description: 'מדריכים לפי סוג משחק, קצב, חוקים ורמת סיכון',
  },

  // Blog section
  blog: {
    heading: 'מדריכים לבדיקת קזינו ותנאי משחק 2026',
    subheading: 'מידע ברור לפני הרשמה והפקדה',
    cta: 'קראו את המדריכים',
    description: 'תנאים, בונוסים, תשלומים ומשחק אחראי',
  },

  // Software providers section
  softwareProviders: {
    heading: 'ספקי תוכנה ומשחקים להשוואה',
    subheading: 'הטכנולוגיה שמאחורי חוויית המשחק',
    description: 'מידע על ספקים, מובייל, משחקי לייב ושקיפות',
  },
};

/**
 * Improved CTAs with benefit statements
 * These should replace generic "Learn More" type buttons
 */
export const CTA_COPY = {
  // Casino CTAs
  casino: {
    primary: 'בדקו תנאים לפני הרשמה',
    secondary: 'קרא ביקורת מלאה',
    viewAll: 'השוו את כל בתי הקזינו',
  },

  // Blog CTAs
  blog: {
    primary: 'קראו מדריך',
    secondary: 'שמרו את זה',
    viewAll: 'קראו מאמרים נוספים',
  },

  // Software provider CTAs
  softwareProvider: {
    primary: 'בדקו משחקים',
    secondary: 'למדו עוד',
  },

  // Navigation CTAs
  navigation: {
    allCasinos: 'השוו בתי קזינו',
    allPosts: 'קראו את המדריכים',
    allCategories: 'בחרו משחק',
  },
};

/**
 * Hero Section Copy
 * Main value proposition with emotional resonance
 */
export const HERO_COPY = {
  headline: 'קזינו אונליין בישראל — השוואה לפני הרשמה',
  subheading:
    'אנחנו בודקים רישוי, תשלומים, תנאי בונוס, תמיכה וכלים למשחק אחראי כדי לעזור לכם להשוות לפני החלטה.',
  cta1: 'השוו בתי קזינו',
  cta2: 'קראו מדריכי בדיקה',
};

/**
 * Power Words & Emotional Triggers
 * Use these in copy to increase resonance
 */
export const POWER_WORDS = {
  // Trust & Safety
  trust: ['שקוף', 'נבדק', 'מאומת', 'ברור', 'אחראי'],
  // Winning & Results
  winning: ['בדיקה', 'השוואה', 'תנאים', 'שיקול דעת', 'שליטה'],
  // Exclusivity
  exclusive: ['מידע ברור', 'תנאים גלויים', 'בדיקה עצמאית', 'גילוי נאות', 'עדכני'],
  // Urgency
  urgency: ['לפני הרשמה', 'לפני הפקדה', 'בדקו מראש', 'קראו תנאים', 'השוו קודם'],
};

/**
 * Copy Scoring Framework
 * Use this to evaluate existing copy
 * Scale: 0-10 for each dimension
 */
export interface CopyScore {
  attention: number; // Does it stop scrollers?
  clarity: number; // Can they understand it in 5 seconds?
  persuasiveness: number; // Does it create desire/urgency?
  emotionalResonance: number; // Does it feel relatable?
  ctaStrength: number; // Is action clear and compelling?
  overall: number; // Average of above
}

/**
 * Copy Testing Variations
 * A/B test these to find winners
 */
export const AB_TEST_VARIATIONS = {
  heroHeadline: {
    control: 'קזינו אונליין בישראל להשוואה',
    curiosity: 'מה לבדוק לפני הרשמה לקזינו',
    benefit: 'השוו תנאים לפני שבוחרים קזינו',
    urgency: 'בדקו רישוי ותנאי בונוס לפני הפקדה',
  },

  casinoCTA: {
    control: 'בדקו תנאים',
    benefit: 'השוו לפני הרשמה',
    outcome: 'קראו ביקורת מלאה',
    urgency: 'בדקו לפני הפקדה',
  },

  blogHeading: {
    control: 'מאמרים אחרונים',
    curiosity: 'מה חשוב לבדוק לפני הרשמה',
    benefit: 'מדריכים לתנאי קזינו',
    emotion: 'מדריכים למשחק אחראי',
  },
};

/**
 * Messaging Framework for Different Channels
 */
export const CHANNEL_MESSAGING = {
  // Homepage - Lead with benefit & safety
  homepage: {
    primaryMessage: 'השוואה, שקיפות ומשחק אחראי',
    emotionalHook: 'לא בוחרים לפני שקוראים את התנאים',
    cta: 'השוו בתי קזינו',
  },

  // Email campaigns - Add urgency
  email: {
    subject: '[Variation 1] מה לבדוק לפני שמממשים בונוס קזינו',
    subject2: '[Variation 2] תנאי בונוס שכדאי לקרוא לפני הפקדה',
    primaryMessage: 'המדריכים החדשים שלנו עוזרים להשוות תנאים',
  },

  // Social media - Emotional & urgent
  social: {
    hook: 'מה כדאי לבדוק לפני הרשמה לקזינו אונליין?',
    benefit: 'קזינו משווים לפי רישוי, תשלומים ותנאים',
    cta: 'קראו את המדריך',
  },
};
