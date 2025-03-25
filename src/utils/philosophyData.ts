
export interface Philosopher {
  id: string;
  name: string;
  era: string;
  movement: string;
  profile: PhilosopherProfile;
  contextRespondedTo?: string[]; // Historical context they were responding to
}

export interface PhilosopherProfile {
  openness: number;     // 0-100
  conscientiousness: number;  // 0-100
  extraversion: number;  // 0-100
  agreeableness: number;  // 0-100
  neuroticism: number;  // 0-100
  keywords: string[];
  themes: string[];
  // New philosophical attributes
  tone: 'optimistic' | 'pessimistic' | 'neutral'; // Overall tone of their work
  practicality: number; // 0-100 (theoretical to practical)
  dogmaSkeptic: number; // 0-100 (dogmatic to skeptical)
  acceptanceAction: number; // 0-100 (acceptance to action-oriented)
}

export interface Book {
  id: string;
  title: string;
  author: string;
  philosopher: string;
  year: string;
  description: string;
  shortSummary?: string; // Brief summary for quick display
  coverImage: string;
  affiliateLink: string;
  publicDomainLink?: string; // Link to full text if public domain
  movement: string;
  era: string; // Historical era
  profile: PhilosopherProfile;
  contextRespondedTo?: string[]; // Historical context this book addresses
  matchPercentage?: number;  // Optional property for recommendation engine
  isPublicDomain?: boolean; // Whether this is a public domain work
  source?: 'manual' | 'gutenberg' | 'other'; // Source of the book data
}

export interface EnhancedUserProfile {
  currentChallenges: string;
  personalityVariability: string;
  lifeBackground: string;
  seekingType: 'practical' | 'theoretical' | 'both';
  preferenceType: 'align' | 'contrast' | 'both';
  personalityTraits?: Partial<PhilosopherProfile>;
  extractedContexts?: string[];
}

export interface UserProfile {
  introspectionText: string;
  wantsContrast: boolean;
  environment: string;
  experienceWithPhilosophy: 'beginner' | 'intermediate' | 'advanced';
  personalityTraits: Partial<PhilosopherProfile>;
  enhancedProfile?: EnhancedUserProfile;
}

export interface QuizQuestion {
  id: string;
  question: string;
  description?: string;
  options: {
    value: string;
    label: string;
    trait: keyof PhilosopherProfile;
    score: number;
  }[];
  type?: 'multiple-choice' | 'text-input' | 'multi-select';
}

// Sample data for development purposes
export const philosophers: Philosopher[] = [
  {
    id: 'marcus-aurelius',
    name: 'Marcus Aurelius',
    era: 'Ancient Rome',
    movement: 'Stoicism',
    contextRespondedTo: ['Roman Empire politics', 'war', 'disease', 'mortality'],
    profile: {
      openness: 65,
      conscientiousness: 90,
      extraversion: 40,
      agreeableness: 75,
      neuroticism: 20,
      keywords: ['duty', 'virtue', 'resilience', 'acceptance', 'discipline'],
      themes: ['adversity', 'acceptance', 'self-control', 'mortality'],
      tone: 'neutral',
      practicality: 85, // Very practical
      dogmaSkeptic: 60, // Moderately skeptical
      acceptanceAction: 70 // Balanced but leans toward acceptance
    }
  },
  {
    id: 'friedrich-nietzsche',
    name: 'Friedrich Nietzsche',
    era: 'Modern',
    movement: 'Existentialism',
    contextRespondedTo: ['Christian morality', 'nihilism', 'European culture', 'herd mentality'],
    profile: {
      openness: 95,
      conscientiousness: 70,
      extraversion: 30,
      agreeableness: 20,
      neuroticism: 60,
      keywords: ['will', 'power', 'overcoming', 'transvaluation', 'nihilism'],
      themes: ['meaning', 'struggle', 'creativity', 'individual'],
      tone: 'pessimistic',
      practicality: 40, // More theoretical
      dogmaSkeptic: 90, // Highly skeptical
      acceptanceAction: 85 // Very action-oriented
    }
  },
  {
    id: 'simone-de-beauvoir',
    name: 'Simone de Beauvoir',
    era: 'Contemporary',
    movement: 'Existentialism',
    contextRespondedTo: ['patriarchy', 'gender roles', 'post-war France', 'existential freedom'],
    profile: {
      openness: 85,
      conscientiousness: 75,
      extraversion: 55,
      agreeableness: 60,
      neuroticism: 45,
      keywords: ['freedom', 'situation', 'transcendence', 'oppression', 'authenticity'],
      themes: ['gender', 'freedom', 'ethics', 'relationships'],
      tone: 'neutral',
      practicality: 65, // Balanced
      dogmaSkeptic: 75, // Moderately skeptical
      acceptanceAction: 70 // Balanced but action-oriented
    }
  },
  {
    id: 'albert-camus',
    name: 'Albert Camus',
    era: 'Contemporary',
    movement: 'Absurdism',
    contextRespondedTo: ['World War II', 'nihilism', 'totalitarianism', 'search for meaning'],
    profile: {
      openness: 80,
      conscientiousness: 60,
      extraversion: 50,
      agreeableness: 65,
      neuroticism: 40,
      keywords: ['absurd', 'rebellion', 'authenticity', 'meaning', 'suicide'],
      themes: ['meaning', 'rebellion', 'absurdity', 'happiness'],
      tone: 'optimistic',
      practicality: 70, // Fairly practical
      dogmaSkeptic: 85, // Very skeptical
      acceptanceAction: 75 // Action-oriented
    }
  },
  {
    id: 'epictetus',
    name: 'Epictetus',
    era: 'Ancient Rome',
    movement: 'Stoicism',
    contextRespondedTo: ['slavery', 'Roman society', 'personal adversity', 'human suffering'],
    profile: {
      openness: 60,
      conscientiousness: 95,
      extraversion: 30,
      agreeableness: 70,
      neuroticism: 15,
      keywords: ['control', 'acceptance', 'perception', 'discipline', 'freedom'],
      themes: ['freedom', 'control', 'rationality', 'emotions'],
      tone: 'neutral',
      practicality: 90, // Extremely practical
      dogmaSkeptic: 55, // Moderately dogmatic
      acceptanceAction: 60 // Balanced but leans toward acceptance
    }
  },
  {
    id: 'socrates',
    name: 'Socrates',
    era: 'Ancient Greece',
    movement: 'Socratic Method',
    contextRespondedTo: ['Sophists', 'Athenian democracy', 'moral relativism', 'intellectual arrogance'],
    profile: {
      openness: 90,
      conscientiousness: 75,
      extraversion: 70,
      agreeableness: 50,
      neuroticism: 30,
      keywords: ['question', 'dialogue', 'wisdom', 'ignorance', 'virtue'],
      themes: ['knowledge', 'self-examination', 'ethics', 'virtue'],
      tone: 'neutral',
      practicality: 65, // Balanced
      dogmaSkeptic: 95, // Extremely skeptical
      acceptanceAction: 50 // Balanced
    }
  },
  {
    id: 'plato',
    name: 'Plato',
    era: 'Ancient Greece',
    movement: 'Platonism',
    contextRespondedTo: ['death of Socrates', 'Athenian politics', 'relativism', 'materialism'],
    profile: {
      openness: 85,
      conscientiousness: 80,
      extraversion: 60,
      agreeableness: 65,
      neuroticism: 40,
      keywords: ['forms', 'ideal', 'republic', 'justice', 'knowledge'],
      themes: ['reality', 'knowledge', 'politics', 'ethics'],
      tone: 'optimistic',
      practicality: 40, // More theoretical
      dogmaSkeptic: 60, // Moderately skeptical
      acceptanceAction: 45 // Slightly more acceptance-oriented
    }
  }
];

export const books: Book[] = [
  {
    id: 'meditations',
    title: 'Meditations',
    author: 'Marcus Aurelius',
    philosopher: 'marcus-aurelius',
    year: '180 CE',
    description: 'Written as a source for his own guidance and self-improvement, Meditations is a series of personal writings by Marcus Aurelius, Roman Emperor from 161 to 180 CE, recording his private notes to himself and ideas on Stoic philosophy.',
    shortSummary: 'A Roman emperor\'s personal journal on finding tranquility in a chaotic world through stoic principles.',
    coverImage: '/images/meditations.jpg',
    affiliateLink: 'https://www.amazon.com/Meditations-Marcus-Aurelius/dp/0140449337/',
    publicDomainLink: 'https://www.gutenberg.org/ebooks/2680',
    movement: 'Stoicism',
    era: 'Ancient Rome',
    isPublicDomain: true,
    source: 'gutenberg',
    profile: philosophers.find(p => p.id === 'marcus-aurelius')?.profile || philosophers[0].profile,
    contextRespondedTo: ['personal grief', 'burden of leadership', 'war', 'mortality']
  },
  {
    id: 'beyond-good-evil',
    title: 'Beyond Good and Evil',
    author: 'Friedrich Nietzsche',
    philosopher: 'friedrich-nietzsche',
    year: '1886',
    description: 'Beyond Good and Evil confirmed Nietzsche\'s position as the towering European philosopher of his age. The work dramatically rejects the tradition of Western thought with its notions of truth and God, good and evil.',
    shortSummary: 'A radical critique of traditional morality and a call to move "beyond good and evil" to create new values.',
    coverImage: '/images/beyond-good-evil.jpg',
    affiliateLink: 'https://www.amazon.com/Beyond-Good-Evil-Friedrich-Nietzsche/dp/0140449235/',
    publicDomainLink: 'https://www.gutenberg.org/ebooks/4363',
    movement: 'Existentialism',
    era: 'Modern',
    isPublicDomain: true,
    source: 'gutenberg',
    profile: philosophers.find(p => p.id === 'friedrich-nietzsche')?.profile || philosophers[1].profile,
    contextRespondedTo: ['Christian morality', 'European philosophy', 'nihilism', 'social conformity']
  },
  {
    id: 'second-sex',
    title: 'The Second Sex',
    author: 'Simone de Beauvoir',
    philosopher: 'simone-de-beauvoir',
    year: '1949',
    description: 'A powerful analysis of the Western notion of "woman," and a groundbreaking exploration of inequality and otherness. De Beauvoir\'s revolutionary work examines the oppression of women from a philosophical perspective.',
    shortSummary: 'A foundational text of feminism examining how women have been defined as "other" in relation to men throughout history.',
    coverImage: '/images/second-sex.jpg',
    affiliateLink: 'https://www.amazon.com/Second-Sex-Simone-Beauvoir/dp/030727778X/',
    movement: 'Existentialism',
    era: 'Contemporary',
    isPublicDomain: false,
    source: 'manual',
    profile: philosophers.find(p => p.id === 'simone-de-beauvoir')?.profile || philosophers[2].profile,
    contextRespondedTo: ['patriarchy', 'gender inequality', 'post-war France', 'existential freedom']
  },
  {
    id: 'myth-of-sisyphus',
    title: 'The Myth of Sisyphus',
    author: 'Albert Camus',
    philosopher: 'albert-camus',
    year: '1942',
    description: 'One of the most influential works of this century, this is a crucial exposition of existentialist thought. Influenced by works such as Don Juan and the novels of Kafka, these essays begin with a meditation on suicide.',
    shortSummary: 'An exploration of the absurdity of life and the question of suicide, concluding we must embrace the absurd and find meaning anyway.',
    coverImage: '/images/myth-of-sisyphus.jpg',
    affiliateLink: 'https://www.amazon.com/Myth-Sisyphus-Other-Essays/dp/0679733736/',
    movement: 'Absurdism',
    era: 'Contemporary',
    isPublicDomain: false,
    source: 'manual',
    profile: philosophers.find(p => p.id === 'albert-camus')?.profile || philosophers[3].profile,
    contextRespondedTo: ['existential crisis', 'meaninglessness', 'World War II', 'suicide']
  },
  {
    id: 'enchiridion',
    title: 'Enchiridion',
    author: 'Epictetus',
    philosopher: 'epictetus',
    year: '135 CE',
    description: 'The Enchiridion or Handbook of Epictetus is a short manual of Stoic ethical advice compiled by Arrian, a 2nd-century disciple of the Greek philosopher Epictetus. The work consists of fifty-three short chapters.',
    shortSummary: 'A practical handbook for daily living based on Stoic principles, focusing on what we can and cannot control.',
    coverImage: '/images/enchiridion.jpg',
    affiliateLink: 'https://www.amazon.com/Enchiridion-Dover-Thrift-Editions-Epictetus/dp/0486433595/',
    publicDomainLink: 'https://www.gutenberg.org/ebooks/45109',
    movement: 'Stoicism',
    era: 'Ancient Rome',
    isPublicDomain: true,
    source: 'gutenberg',
    profile: philosophers.find(p => p.id === 'epictetus')?.profile || philosophers[4].profile,
    contextRespondedTo: ['slavery', 'personal freedom', 'social adversity', 'emotional control']
  },
  {
    id: 'republic',
    title: 'The Republic',
    author: 'Plato',
    philosopher: 'plato',
    year: '380 BCE',
    description: 'The Republic is a Socratic dialogue, authored by Plato around 375 BCE, concerning justice, the order and character of the just city-state, and the just man.',
    shortSummary: 'A foundational work exploring the nature of justice, the ideal society, and the role of the philosopher.',
    coverImage: '/images/republic.jpg',
    affiliateLink: 'https://www.amazon.com/Republic-Plato/dp/0465094082/',
    publicDomainLink: 'https://www.gutenberg.org/ebooks/1497',
    movement: 'Platonism',
    era: 'Ancient Greece',
    isPublicDomain: true,
    source: 'gutenberg',
    profile: philosophers.find(p => p.id === 'plato')?.profile || {
      openness: 85,
      conscientiousness: 80,
      extraversion: 60,
      agreeableness: 65,
      neuroticism: 40,
      keywords: ['justice', 'ideal', 'state', 'philosopher-king', 'reality'],
      themes: ['justice', 'education', 'governance', 'reality'],
      tone: 'optimistic',
      practicality: 40,
      dogmaSkeptic: 60,
      acceptanceAction: 45
    },
    contextRespondedTo: ['Athenian democracy failure', 'sophistry', 'moral relativism', 'societal corruption']
  }
];

// Modified questions to include the new philosophical attributes and background
export const quizQuestions: QuizQuestion[] = [
  {
    id: 'question-1',
    question: 'How do you typically approach new ideas or concepts?',
    options: [
      {
        value: 'a',
        label: 'I embrace them enthusiastically and want to explore their possibilities',
        trait: 'openness',
        score: 90
      },
      {
        value: 'b',
        label: 'I consider them carefully and evaluate them against established knowledge',
        trait: 'openness',
        score: 60
      },
      {
        value: 'c',
        label: "I'm skeptical of new ideas until they prove their worth",
        trait: 'openness',
        score: 30
      },
      {
        value: 'd',
        label: 'I prefer to stick with traditional approaches that have stood the test of time',
        trait: 'openness',
        score: 10
      }
    ],
    type: 'multiple-choice'
  },
  {
    id: 'question-2',
    question: 'When faced with a difficult situation, you typically:',
    options: [
      {
        value: 'a',
        label: 'Plan methodically and follow through with discipline',
        trait: 'conscientiousness',
        score: 90
      },
      {
        value: 'b',
        label: 'Make a general plan but adapt as circumstances change',
        trait: 'conscientiousness',
        score: 70
      },
      {
        value: 'c',
        label: 'Handle things as they come without much advance planning',
        trait: 'conscientiousness',
        score: 40
      },
      {
        value: 'd',
        label: 'Trust that things will work out and focus on the present moment',
        trait: 'conscientiousness',
        score: 20
      }
    ],
    type: 'multiple-choice'
  },
  {
    id: 'question-3',
    question: 'In social situations, you are more likely to:',
    options: [
      {
        value: 'a',
        label: 'Energize the room and engage with many people',
        trait: 'extraversion',
        score: 90
      },
      {
        value: 'b',
        label: 'Enjoy conversation with a smaller group of people',
        trait: 'extraversion',
        score: 70
      },
      {
        value: 'c',
        label: 'Listen more than speak, offering thoughts when relevant',
        trait: 'extraversion',
        score: 40
      },
      {
        value: 'd',
        label: 'Prefer one-on-one interactions or observing from the sidelines',
        trait: 'extraversion',
        score: 10
      }
    ],
    type: 'multiple-choice'
  },
  {
    id: 'question-4',
    question: 'When someone disagrees with you on an important issue:',
    options: [
      {
        value: 'a',
        label: 'I try to understand their perspective and find common ground',
        trait: 'agreeableness',
        score: 90
      },
      {
        value: 'b',
        label: 'I listen to their view but defend my position firmly',
        trait: 'agreeableness',
        score: 60
      },
      {
        value: 'c',
        label: 'I focus on the logical flaws in their argument',
        trait: 'agreeableness',
        score: 30
      },
      {
        value: 'd',
        label: 'I find it difficult to respect positions I fundamentally disagree with',
        trait: 'agreeableness',
        score: 10
      }
    ],
    type: 'multiple-choice'
  },
  {
    id: 'question-5',
    question: 'How do you typically respond to stress or setbacks?',
    options: [
      {
        value: 'a',
        label: 'I remain calm and look for practical solutions',
        trait: 'neuroticism',
        score: 10
      },
      {
        value: 'b',
        label: 'I feel the initial anxiety but then regain my composure',
        trait: 'neuroticism',
        score: 40
      },
      {
        value: 'c',
        label: 'I worry significantly about the implications',
        trait: 'neuroticism',
        score: 70
      },
      {
        value: 'd',
        label: 'I tend to feel overwhelmed and dwell on the negative possibilities',
        trait: 'neuroticism',
        score: 90
      }
    ],
    type: 'multiple-choice'
  },
  {
    id: 'question-6',
    question: 'Which statement best describes your view on personal responsibility?',
    options: [
      {
        value: 'a',
        label: 'We are entirely responsible for our own choices and their outcomes',
        trait: 'conscientiousness',
        score: 90
      },
      {
        value: 'b',
        label: "We're largely responsible for our choices, though circumstances play a role",
        trait: 'conscientiousness',
        score: 70
      },
      {
        value: 'c',
        label: 'Our choices are significantly shaped by social and environmental factors',
        trait: 'conscientiousness',
        score: 40
      },
      {
        value: 'd',
        label: 'Free will is largely an illusion; we\'re products of forces beyond our control',
        trait: 'conscientiousness',
        score: 10
      }
    ],
    type: 'multiple-choice'
  },
  {
    id: 'question-7',
    question: 'When seeking meaning in life, which approach resonates most?',
    options: [
      {
        value: 'a',
        label: 'Finding purpose through duty and contribution to society',
        trait: 'acceptanceAction',
        score: 50
      },
      {
        value: 'b',
        label: 'Creating your own meaning through authentic personal choices',
        trait: 'acceptanceAction',
        score: 90
      },
      {
        value: 'c',
        label: 'Accepting that life has no inherent meaning but finding joy regardless',
        trait: 'acceptanceAction',
        score: 30
      },
      {
        value: 'd',
        label: 'Connecting to traditional or spiritual frameworks that provide guidance',
        trait: 'acceptanceAction',
        score: 10
      }
    ],
    type: 'multiple-choice'
  },
  {
    id: 'question-8',
    question: 'How do you view human suffering?',
    options: [
      {
        value: 'a',
        label: 'An opportunity for growth and developing strength of character',
        trait: 'tone',
        score: 80
      },
      {
        value: 'b',
        label: 'A natural part of existence that should be accepted with equanimity',
        trait: 'tone',
        score: 50
      },
      {
        value: 'c',
        label: 'Something to be analyzed and understood to reduce its impact',
        trait: 'tone',
        score: 30
      },
      {
        value: 'd',
        label: 'A profound problem that reveals the tragic nature of human existence',
        trait: 'tone',
        score: 10
      }
    ],
    type: 'multiple-choice'
  },
  {
    id: 'question-9',
    question: 'What kind of philosophical approach do you prefer?',
    options: [
      {
        value: 'a',
        label: 'Practical wisdom I can apply to my daily life',
        trait: 'practicality',
        score: 90
      },
      {
        value: 'b',
        label: 'A balance of theory and practical application',
        trait: 'practicality',
        score: 60
      },
      {
        value: 'c',
        label: 'Deep theoretical frameworks that explain the world',
        trait: 'practicality',
        score: 30
      },
      {
        value: 'd',
        label: 'Abstract concepts that challenge conventional thinking',
        trait: 'practicality',
        score: 10
      }
    ],
    type: 'multiple-choice'
  },
  {
    id: 'question-10',
    question: 'What is your background or current worldview?',
    options: [
      {
        value: 'a',
        label: 'Religious or spiritual tradition',
        trait: 'dogmaSkeptic',
        score: 30
      },
      {
        value: 'b',
        label: 'Secular humanism',
        trait: 'dogmaSkeptic',
        score: 60
      },
      {
        value: 'c',
        label: 'Scientific materialism',
        trait: 'dogmaSkeptic',
        score: 80
      },
      {
        value: 'd',
        label: 'Philosophical skepticism or questioning',
        trait: 'dogmaSkeptic',
        score: 90
      }
    ],
    type: 'multiple-choice'
  }
];

// Enhanced additional questions to better understand personality variations
export const enhancedQuizQuestions: QuizQuestion[] = [
  {
    id: 'enhanced-question-1',
    question: 'How does your personality change in different social situations?',
    options: [
      {
        value: 'a',
        label: 'I remain consistent regardless of who I\'m with',
        trait: 'extraversion',
        score: 50
      },
      {
        value: 'b',
        label: 'I become more extraverted in comfortable settings, introverted in unfamiliar ones',
        trait: 'extraversion',
        score: 60
      },
      {
        value: 'c',
        label: 'I adapt significantly to match the energy of those around me',
        trait: 'extraversion',
        score: 70
      },
      {
        value: 'd',
        label: 'My personality varies dramatically in different contexts',
        trait: 'extraversion',
        score: 80
      }
    ],
    type: 'multiple-choice'
  },
  {
    id: 'enhanced-question-2',
    question: 'How do you respond to intellectual disagreements?',
    options: [
      {
        value: 'a',
        label: 'I enjoy vigorous debate and often play devil\'s advocate',
        trait: 'dogmaSkeptic',
        score: 85
      },
      {
        value: 'b',
        label: 'I like to ask probing questions to understand different perspectives',
        trait: 'dogmaSkeptic',
        score: 70
      },
      {
        value: 'c',
        label: 'I prefer to find common ground and areas of agreement',
        trait: 'dogmaSkeptic',
        score: 50
      },
      {
        value: 'd',
        label: 'I rely on established authorities and principles to resolve disagreements',
        trait: 'dogmaSkeptic',
        score: 30
      }
    ],
    type: 'multiple-choice'
  },
  {
    id: 'enhanced-question-3',
    question: 'During challenging times in your life, do you tend to:',
    options: [
      {
        value: 'a',
        label: 'Take immediate action to address the problem',
        trait: 'acceptanceAction',
        score: 90
      },
      {
        value: 'b',
        label: 'Analyze the situation before determining a course of action',
        trait: 'acceptanceAction',
        score: 70
      },
      {
        value: 'c',
        label: 'Seek to understand and accept what cannot be changed',
        trait: 'acceptanceAction',
        score: 40
      },
      {
        value: 'd',
        label: 'Find meaning in difficult experiences without trying to change them',
        trait: 'acceptanceAction',
        score: 20
      }
    ],
    type: 'multiple-choice'
  },
  {
    id: 'enhanced-question-4',
    question: 'How do you approach moral or ethical dilemmas?',
    options: [
      {
        value: 'a',
        label: 'I follow consistent principles regardless of the situation',
        trait: 'conscientiousness',
        score: 85
      },
      {
        value: 'b',
        label: 'I consider the unique circumstances of each situation',
        trait: 'conscientiousness',
        score: 65
      },
      {
        value: 'c',
        label: 'I prioritize compassion and care for those affected',
        trait: 'agreeableness',
        score: 80
      },
      {
        value: 'd',
        label: 'I weigh the practical consequences of different choices',
        trait: 'practicality',
        score: 75
      }
    ],
    type: 'multiple-choice'
  },
  {
    id: 'enhanced-question-5',
    question: 'How important is tradition in your worldview?',
    options: [
      {
        value: 'a',
        label: 'Very important - traditions contain accumulated wisdom',
        trait: 'dogmaSkeptic',
        score: 30
      },
      {
        value: 'b',
        label: 'Somewhat important - I respect tradition but question it',
        trait: 'dogmaSkeptic',
        score: 50
      },
      {
        value: 'c',
        label: 'Not very important - I evaluate ideas on their merits',
        trait: 'dogmaSkeptic',
        score: 70
      },
      {
        value: 'd',
        label: 'Unimportant - I\'m interested in creating new possibilities',
        trait: 'dogmaSkeptic',
        score: 90
      }
    ],
    type: 'multiple-choice'
  }
];

// Enhanced matching function that considers the new attributes and personality variations
export function calculatePhilosopherMatch(
  userProfile: Partial<PhilosopherProfile>,
  userContext?: string[],
  wantsContrast: boolean = false,
  seekingType?: 'practical' | 'theoretical' | 'both',
  variabilityProfile?: Partial<PhilosopherProfile>
): Book[] {
  // Compute compatibility scores for each book
  const compatibilityScores = books.map(book => {
    let score = 0;
    let factors = 0;
    
    // Context matching - check if the book addresses similar contexts to the user's concerns
    if (userContext && userContext.length > 0 && book.contextRespondedTo) {
      const contextMatch = userContext.some(context => 
        book.contextRespondedTo?.some(bookContext => 
          bookContext.toLowerCase().includes(context.toLowerCase())
        )
      );
      
      if (contextMatch) {
        score += 100;
        factors++;
      }
    }
    
    // Compare personality traits
    const traits: (keyof PhilosopherProfile)[] = [
      'openness', 'conscientiousness', 'extraversion', 
      'agreeableness', 'neuroticism', 'practicality',
      'dogmaSkeptic', 'acceptanceAction'
    ];
    
    traits.forEach(trait => {
      if (userProfile[trait] !== undefined && typeof book.profile[trait] === 'number') {
        const userValue = userProfile[trait] as number;
        const bookValue = book.profile[trait] as number;
        
        let traitScore: number;
        
        // For contrast-seeking users, we invert the scoring for some traits
        if (wantsContrast && ['practicality', 'dogmaSkeptic', 'acceptanceAction'].includes(trait)) {
          traitScore = 100 - Math.abs(100 - userValue - bookValue);
        } else {
          traitScore = 100 - Math.abs(userValue - bookValue);
        }
        
        score += traitScore;
        factors++;
      }
    });
    
    // Handle practicality preferences if the user has specified a seeking type
    if (seekingType) {
      const practicalityScore = book.profile.practicality;
      if (seekingType === 'practical' && practicalityScore > 70) {
        score += 150; // Bonus for practical books when user wants practical
        factors++;
      } else if (seekingType === 'theoretical' && practicalityScore < 40) {
        score += 150; // Bonus for theoretical books when user wants theoretical
        factors++;
      } else if (seekingType === 'both' && practicalityScore >= 40 && practicalityScore <= 70) {
        score += 150; // Bonus for balanced books when user wants both
        factors++;
      }
    }

    // Handle tone separately since it might be a string enum
    if (userProfile.tone && book.profile.tone) {
      // Simple matching for tone: 100 if exact match, 50 if neutral matches with anything, 0 if mismatch
      if (userProfile.tone === book.profile.tone) {
        score += 100;
      } else if (userProfile.tone === 'neutral' || book.profile.tone === 'neutral') {
        score += 50;
      }
      factors++;
    }
    
    // Calculate final average score (as a percentage)
    const averageScore = factors > 0 ? Math.round((score / factors)) : 0;
    
    return {
      ...book,
      matchPercentage: averageScore
    };
  });
  
  // Sort books by match percentage (highest first)
  return compatibilityScores.sort((a, b) => 
    (b.matchPercentage || 0) - (a.matchPercentage || 0)
  );
}

// Utility functions that would be implemented to:
// 1. Extract contexts from user's introspection text
export function extractContextsFromText(text: string): string[] {
  if (!text) return [];
  
  // A simple keyword extraction approach
  const keywords = [
    'meaning', 'purpose', 'anxiety', 'depression', 'fear', 'death', 
    'religion', 'god', 'spirituality', 'ethics', 'morality', 'virtue',
    'happiness', 'suffering', 'freedom', 'choice', 'responsibility',
    'identity', 'existence', 'nihilism', 'absurdity', 'love',
    'relationships', 'society', 'politics', 'justice', 'knowledge',
    'truth', 'reality', 'beauty', 'art', 'science', 'nature',
    'technology', 'work', 'success', 'failure', 'mindfulness'
  ];
  
  const extractedContexts = keywords.filter(keyword => 
    text.toLowerCase().includes(keyword.toLowerCase())
  );
  
  // Also look for bigrams and common philosophical concerns
  const concerns = [
    'meaning of life', 'fear of death', 'moral dilemma', 
    'ethical choice', 'social anxiety', 'religious doubt',
    'career decision', 'personal identity', 'relationship problem',
    'political views', 'mental health'
  ];
  
  concerns.forEach(concern => {
    if (text.toLowerCase().includes(concern.toLowerCase())) {
      extractedContexts.push(concern);
    }
  });
  
  return extractedContexts;
}

// 2. Initialize and update book database (placeholder for external API integration)
export async function initializeBookDatabase(): Promise<void> {
  // In a real implementation, this would:
  // 1. Check if we already have books loaded
  // 2. If not, fetch initial books from a local source or API
  // 3. Return a promise that resolves when ready
  
  return Promise.resolve(); // For now, we're just using the static books array
}

export async function updateBookDatabase(): Promise<void> {
  // In a real implementation, this would:
  // 1. Fetch new books from Project Gutenberg or other sources
  // 2. Process them and add to our books array
  // 3. Return a promise that resolves when complete
  
  // Simulate a delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // For demo purposes, let's add a new book
  const newBookExists = books.some(book => book.id === 'ethics');
  
  if (!newBookExists) {
    books.push({
      id: 'ethics',
      title: 'Ethics',
      author: 'Benedict de Spinoza',
      philosopher: 'spinoza',
      year: '1677',
      description: 'Ethics, demonstrated in geometrical order, is a philosophical treatise written by Benedict de Spinoza. In it, Spinoza presents an ethical vision unifying God, nature, and humanity, emphasizing that true human happiness requires a detached devotion to truth.',
      shortSummary: 'A geometric approach to understanding God, nature, and human emotions, advocating for rational understanding as the path to freedom.',
      coverImage: '/images/spinoza-ethics.jpg',
      affiliateLink: 'https://www.amazon.com/Ethics-Penguin-Classics-Benedict-Spinoza/dp/0140435719/',
      publicDomainLink: 'https://www.gutenberg.org/ebooks/3800',
      movement: 'Rationalism',
      era: 'Early Modern',
      isPublicDomain: true,
      source: 'gutenberg',
      profile: {
        openness: 80,
        conscientiousness: 85,
        extraversion: 30,
        agreeableness: 60,
        neuroticism: 20,
        keywords: ['reason', 'god', 'nature', 'emotions', 'freedom'],
        themes: ['determinism', 'pantheism', 'rationality', 'happiness'],
        tone: 'neutral',
        practicality: 50,
        dogmaSkeptic: 70,
        acceptanceAction: 40
      },
      contextRespondedTo: ['religious dogma', 'emotions', 'human freedom', 'determinism', 'nature of God']
    });
  }
  
  return Promise.resolve();
}

// 3. Get recommendations based on user profile
export function getRecommendations(userProfile: UserProfile, limit: number = 6): Book[] {
  // Extract contexts from introspection if not already done
  const contexts = userProfile.enhancedProfile?.extractedContexts || 
                   extractContextsFromText(userProfile.introspectionText);
  
  // Determine if we want to use contrast or alignment
  const wantsContrast = userProfile.wantsContrast;
  
  // Get the seeking type if available from enhanced profile
  const seekingType = userProfile.enhancedProfile?.seekingType;
  
  // Get personality traits from enhanced profile if available, otherwise use basic profile
  const personalityTraits = userProfile.enhancedProfile?.personalityTraits || 
                            userProfile.personalityTraits;
  
  // Match books to the user's profile and context
  const matchedBooks = calculatePhilosopherMatch(
    personalityTraits, 
    contexts,
    wantsContrast,
    seekingType
  );
  
  // Return the top N matches
  return matchedBooks.slice(0, limit);
}
