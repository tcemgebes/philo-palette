
export interface Philosopher {
  id: string;
  name: string;
  era: string;
  movement: string;
  profile: PhilosopherProfile;
}

export interface PhilosopherProfile {
  openness: number;     // 0-100
  conscientiousness: number;  // 0-100
  extraversion: number;  // 0-100
  agreeableness: number;  // 0-100
  neuroticism: number;  // 0-100
  keywords: string[];
  themes: string[];
}

export interface Book {
  id: string;
  title: string;
  author: string;
  philosopher: string;
  year: string;
  description: string;
  coverImage: string;
  affiliateLink: string;
  movement: string;
  profile: PhilosopherProfile;
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
}

// Sample data for development purposes
export const philosophers: Philosopher[] = [
  {
    id: 'marcus-aurelius',
    name: 'Marcus Aurelius',
    era: 'Ancient',
    movement: 'Stoicism',
    profile: {
      openness: 65,
      conscientiousness: 90,
      extraversion: 40,
      agreeableness: 75,
      neuroticism: 20,
      keywords: ['duty', 'virtue', 'resilience', 'acceptance', 'discipline'],
      themes: ['adversity', 'acceptance', 'self-control', 'mortality']
    }
  },
  {
    id: 'friedrich-nietzsche',
    name: 'Friedrich Nietzsche',
    era: 'Modern',
    movement: 'Existentialism',
    profile: {
      openness: 95,
      conscientiousness: 70,
      extraversion: 30,
      agreeableness: 20,
      neuroticism: 60,
      keywords: ['will', 'power', 'overcoming', 'transvaluation', 'nihilism'],
      themes: ['meaning', 'struggle', 'creativity', 'individual']
    }
  },
  {
    id: 'simone-de-beauvoir',
    name: 'Simone de Beauvoir',
    era: 'Contemporary',
    movement: 'Existentialism',
    profile: {
      openness: 85,
      conscientiousness: 75,
      extraversion: 55,
      agreeableness: 60,
      neuroticism: 45,
      keywords: ['freedom', 'situation', 'transcendence', 'oppression', 'authenticity'],
      themes: ['gender', 'freedom', 'ethics', 'relationships']
    }
  },
  {
    id: 'albert-camus',
    name: 'Albert Camus',
    era: 'Contemporary',
    movement: 'Absurdism',
    profile: {
      openness: 80,
      conscientiousness: 60,
      extraversion: 50,
      agreeableness: 65,
      neuroticism: 40,
      keywords: ['absurd', 'rebellion', 'authenticity', 'meaning', 'suicide'],
      themes: ['meaning', 'rebellion', 'absurdity', 'happiness']
    }
  },
  {
    id: 'epictetus',
    name: 'Epictetus',
    era: 'Ancient',
    movement: 'Stoicism',
    profile: {
      openness: 60,
      conscientiousness: 95,
      extraversion: 30,
      agreeableness: 70,
      neuroticism: 15,
      keywords: ['control', 'acceptance', 'perception', 'discipline', 'freedom'],
      themes: ['freedom', 'control', 'rationality', 'emotions']
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
    coverImage: '/images/meditations.jpg',
    affiliateLink: 'https://www.amazon.com/Meditations-Marcus-Aurelius/dp/0140449337/',
    movement: 'Stoicism',
    profile: philosophers.find(p => p.id === 'marcus-aurelius')?.profile || philosophers[0].profile
  },
  {
    id: 'beyond-good-evil',
    title: 'Beyond Good and Evil',
    author: 'Friedrich Nietzsche',
    philosopher: 'friedrich-nietzsche',
    year: '1886',
    description: 'Beyond Good and Evil confirmed Nietzsche\'s position as the towering European philosopher of his age. The work dramatically rejects the tradition of Western thought with its notions of truth and God, good and evil.',
    coverImage: '/images/beyond-good-evil.jpg',
    affiliateLink: 'https://www.amazon.com/Beyond-Good-Evil-Friedrich-Nietzsche/dp/0140449235/',
    movement: 'Existentialism',
    profile: philosophers.find(p => p.id === 'friedrich-nietzsche')?.profile || philosophers[1].profile
  },
  {
    id: 'second-sex',
    title: 'The Second Sex',
    author: 'Simone de Beauvoir',
    philosopher: 'simone-de-beauvoir',
    year: '1949',
    description: 'A powerful analysis of the Western notion of "woman," and a groundbreaking exploration of inequality and otherness. De Beauvoir\'s revolutionary work examines the oppression of women from a philosophical perspective.',
    coverImage: '/images/second-sex.jpg',
    affiliateLink: 'https://www.amazon.com/Second-Sex-Simone-Beauvoir/dp/030727778X/',
    movement: 'Existentialism',
    profile: philosophers.find(p => p.id === 'simone-de-beauvoir')?.profile || philosophers[2].profile
  },
  {
    id: 'myth-of-sisyphus',
    title: 'The Myth of Sisyphus',
    author: 'Albert Camus',
    philosopher: 'albert-camus',
    year: '1942',
    description: 'One of the most influential works of this century, this is a crucial exposition of existentialist thought. Influenced by works such as Don Juan and the novels of Kafka, these essays begin with a meditation on suicide.',
    coverImage: '/images/myth-of-sisyphus.jpg',
    affiliateLink: 'https://www.amazon.com/Myth-Sisyphus-Other-Essays/dp/0679733736/',
    movement: 'Absurdism',
    profile: philosophers.find(p => p.id === 'albert-camus')?.profile || philosophers[3].profile
  },
  {
    id: 'enchiridion',
    title: 'Enchiridion',
    author: 'Epictetus',
    philosopher: 'epictetus',
    year: '135 CE',
    description: 'The Enchiridion or Handbook of Epictetus is a short manual of Stoic ethical advice compiled by Arrian, a 2nd-century disciple of the Greek philosopher Epictetus. The work consists of fifty-three short chapters.',
    coverImage: '/images/enchiridion.jpg',
    affiliateLink: 'https://www.amazon.com/Enchiridion-Dover-Thrift-Editions-Epictetus/dp/0486433595/',
    movement: 'Stoicism',
    profile: philosophers.find(p => p.id === 'epictetus')?.profile || philosophers[4].profile
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
  },
  {
    id: 'question-7',
    question: 'When seeking meaning in life, which approach resonates most?',
    options: [
      {
        value: 'a',
        label: 'Finding purpose through duty and contribution to society',
        trait: 'openness',
        score: 50
      },
      {
        value: 'b',
        label: 'Creating your own meaning through authentic personal choices',
        trait: 'openness',
        score: 90
      },
      {
        value: 'c',
        label: 'Accepting that life has no inherent meaning but finding joy regardless',
        trait: 'openness',
        score: 80
      },
      {
        value: 'd',
        label: 'Connecting to traditional or spiritual frameworks that provide guidance',
        trait: 'openness',
        score: 30
      }
    ]
  },
  {
    id: 'question-8',
    question: 'How do you view human suffering?',
    options: [
      {
        value: 'a',
        label: 'An opportunity for growth and developing strength of character',
        trait: 'neuroticism',
        score: 20
      },
      {
        value: 'b',
        label: 'A natural part of existence that should be accepted with equanimity',
        trait: 'neuroticism',
        score: 40
      },
      {
        value: 'c',
        label: 'Something to be analyzed and understood to reduce its impact',
        trait: 'neuroticism',
        score: 60
      },
      {
        value: 'd',
        label: 'A profound problem that reveals the tragic nature of human existence',
        trait: 'neuroticism',
        score: 80
      }
    ]
  }
];

export function calculatePhilosopherMatch(userProfile: Partial<PhilosopherProfile>): Book[] {
  // In a real implementation, this would use a sophisticated algorithm
  // For the prototype, we'll use a simple compatibility score
  
  const compatibilityScores = books.map(book => {
    let score = 0;
    let factors = 0;
    
    // Compare personality traits
    if (userProfile.openness !== undefined) {
      score += 100 - Math.abs(userProfile.openness - book.profile.openness);
      factors++;
    }
    
    if (userProfile.conscientiousness !== undefined) {
      score += 100 - Math.abs(userProfile.conscientiousness - book.profile.conscientiousness);
      factors++;
    }
    
    if (userProfile.extraversion !== undefined) {
      score += 100 - Math.abs(userProfile.extraversion - book.profile.extraversion);
      factors++;
    }
    
    if (userProfile.agreeableness !== undefined) {
      score += 100 - Math.abs(userProfile.agreeableness - book.profile.agreeableness);
      factors++;
    }
    
    if (userProfile.neuroticism !== undefined) {
      score += 100 - Math.abs(userProfile.neuroticism - book.profile.neuroticism);
      factors++;
    }
    
    // Calculate average percentage match
    const matchPercentage = factors > 0 ? Math.round(score / factors) : 50;
    
    return {
      ...book,
      matchPercentage
    };
  });
  
  // Sort by match percentage (highest first)
  return compatibilityScores.sort((a, b) => b.matchPercentage - a.matchPercentage);
}
