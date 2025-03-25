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

// Ensure this function is exported
export function extractContextsFromText(text: string): string[] {
  const keywords = [
    'anxiety', 'meaning', 'purpose', 'death', 'morality', 'ethics', 'freedom',
    'responsibility', 'relationships', 'love', 'work', 'career', 'identity',
    'religion', 'spirituality', 'politics', 'society', 'technology', 'nature',
    'happiness', 'success', 'failure', 'depression', 'isolation', 'community',
    'decision', 'choice', 'future', 'past', 'present', 'time', 'existence',
    'knowledge', 'truth', 'beauty', 'art', 'science', 'education', 'learning',
    'change', 'uncertainty', 'certainty', 'doubt', 'belief', 'faith', 'reason',
    'emotion', 'mind', 'body', 'consciousness', 'self', 'other', 'conflict',
    'harmony', 'justice', 'injustice', 'suffering', 'joy', 'pain', 'pleasure'
  ];
  
  const extractedKeywords = new Set<string>();
  const lowerText = text.toLowerCase();
  
  keywords.forEach(keyword => {
    if (lowerText.includes(keyword)) {
      extractedKeywords.add(keyword);
    }
  });
  
  return Array.from(extractedKeywords);
}

export function createUserProfile(
  answers: Record<string, string>,
  introspectionText: string,
  experienceLevel: string,
  enhancedProfile?: EnhancedUserProfile
): UserProfile {
  const personalityTraits: Partial<PhilosopherProfile> = {};
  
  Object.keys(answers).forEach(questionId => {
    const answer = answers[questionId];
    
    const allQuestions = [...quizQuestions, ...enhancedQuizQuestions];
    const question = allQuestions.find(q => q.id === questionId);
    
    if (question) {
      const selectedOption = question.options.find(opt => opt.value === answer);
      if (selectedOption) {
        personalityTraits[selectedOption.trait] = selectedOption.score;
      }
    }
  });
  
  const extractedContexts = extractContextsFromText(introspectionText);
  
  const userProfile: UserProfile = {
    introspectionText,
    wantsContrast: false,
    environment: '',
    experienceWithPhilosophy: experienceLevel as 'beginner' | 'intermediate' | 'advanced',
    personalityTraits,
    enhancedProfile: enhancedProfile
  };
  
  if (enhancedProfile) {
    userProfile.enhancedProfile = {
      ...enhancedProfile,
      extractedContexts: enhancedProfile.extractedContexts || extractedContexts
    };
  }
  
  return userProfile;
}

export function calculatePhilosopherMatch(
  userProfile: Partial<PhilosopherProfile>,
  userContext?: string[],
  wantsContrast: boolean = false,
  seekingType?: 'practical' | 'theoretical' | 'both',
  variabilityProfile?: Partial<PhilosopherProfile>
): Book[] {
  const compatibilityScores = books.map(book => {
    let score = 0;
    let factors = 0;
    
    if (userContext && userContext.length > 0 && book.contextRespondedTo) {
      const contextMatch = userContext.some(context => 
        book.contextRespondedTo?.some(bookContext => 
          bookContext.toLowerCase
