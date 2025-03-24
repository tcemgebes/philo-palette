
import { Book, PhilosopherProfile } from './philosophyData';

// Interface for Gutenberg API responses
interface GutenbergBook {
  id: number;
  title: string;
  authors: {
    name: string;
    birth_year?: number;
    death_year?: number;
  }[];
  translators?: {
    name: string;
    birth_year?: number;
    death_year?: number;
  }[];
  subjects?: string[];
  bookshelves?: string[];
  languages?: string[];
  copyright?: boolean;
  media_type: string;
  formats: Record<string, string>;
  download_count: number;
}

interface GutenbergResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: GutenbergBook[];
}

// Known philosophy works in Project Gutenberg
const PHILOSOPHY_TOPICS = [
  'philosophy', 'ethics', 'metaphysics', 'epistemology', 'logic',
  'aesthetics', 'political philosophy', 'stoicism', 'existentialism',
  'phenomenology', 'idealism', 'materialism', 'empiricism', 'rationalism',
  'skepticism', 'nihilism', 'absurdism', 'humanism'
];

// Famous philosophers to search for
const KNOWN_PHILOSOPHERS = [
  'Plato', 'Aristotle', 'Socrates', 'Kant', 'Hegel', 'Nietzsche',
  'Schopenhauer', 'Kierkegaard', 'Sartre', 'Camus', 'Simone de Beauvoir',
  'Hannah Arendt', 'John Locke', 'Thomas Hobbes', 'Jean-Jacques Rousseau',
  'David Hume', 'John Stuart Mill', 'Bertrand Russell', 'Ludwig Wittgenstein',
  'Martin Heidegger', 'Edmund Husserl', 'Michel Foucault', 'Søren Kierkegaard',
  'Marcus Aurelius', 'Epictetus', 'Seneca', 'Confucius', 'Lao Tzu',
  'Avicenna', 'Averroes', 'Maimonides', 'Thomas Aquinas', 'Voltaire'
];

// Keys for our API client options
const PHILOSOPHY_SEARCH_TERMS = [
  ...PHILOSOPHY_TOPICS,
  ...KNOWN_PHILOSOPHERS
];

// Function to fetch books from Project Gutenberg API
export async function fetchGutenbergBooks(page = 1, topic: string = 'philosophy'): Promise<GutenbergResponse> {
  try {
    const response = await fetch(
      `https://gutendex.com/books/?page=${page}&search=${encodeURIComponent(topic)}`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }
    
    return await response.json() as GutenbergResponse;
  } catch (error) {
    console.error('Error fetching from Gutenberg API:', error);
    return {
      count: 0,
      next: null,
      previous: null,
      results: []
    };
  }
}

// Map a Gutenberg book to our Book interface
export function mapGutenbergToBook(gutenbergBook: GutenbergBook): Book {
  // Extract author name
  const authorName = gutenbergBook.authors?.[0]?.name || 'Unknown';
  
  // Determine the appropriate era based on author birth year
  let era = 'Unknown';
  const birthYear = gutenbergBook.authors?.[0]?.birth_year;
  if (birthYear) {
    if (birthYear < 500) era = 'Ancient';
    else if (birthYear < 1500) era = 'Medieval';
    else if (birthYear < 1800) era = 'Early Modern';
    else if (birthYear < 1900) era = 'Modern';
    else era = 'Contemporary';
  }
  
  // Identify philosophical movement based on subject tags
  let movement = 'Unknown';
  if (gutenbergBook.subjects) {
    if (gutenbergBook.subjects.some(s => /stoic/i.test(s))) movement = 'Stoicism';
    else if (gutenbergBook.subjects.some(s => /existential/i.test(s))) movement = 'Existentialism';
    else if (gutenbergBook.subjects.some(s => /ideal/i.test(s))) movement = 'Idealism';
    else if (gutenbergBook.subjects.some(s => /pragmat/i.test(s))) movement = 'Pragmatism';
    else if (gutenbergBook.subjects.some(s => /rational/i.test(s))) movement = 'Rationalism';
    else if (gutenbergBook.subjects.some(s => /empiri/i.test(s))) movement = 'Empiricism';
    else if (gutenbergBook.subjects.some(s => /phenomen/i.test(s))) movement = 'Phenomenology';
    else if (gutenbergBook.subjects.some(s => /ethic/i.test(s))) movement = 'Ethics';
    else if (gutenbergBook.subjects.some(s => /politic/i.test(s))) movement = 'Political Philosophy';
    else if (gutenbergBook.subjects.some(s => /metaphys/i.test(s))) movement = 'Metaphysics';
    else if (gutenbergBook.subjects.some(s => /epistem/i.test(s))) movement = 'Epistemology';
    else if (gutenbergBook.subjects.some(s => /logic/i.test(s))) movement = 'Logic';
  }

  // Find a suitable text format
  const textUrl = gutenbergBook.formats['text/plain'] || 
                 gutenbergBook.formats['text/plain; charset=utf-8'] ||
                 gutenbergBook.formats['text/html'] ||
                 '';
                 
  // Assign a philosophical profile based on era and movement
  const profile: PhilosopherProfile = {
    openness: movement === 'Existentialism' ? 85 : movement === 'Stoicism' ? 60 : 70,
    conscientiousness: movement === 'Stoicism' ? 85 : 65,
    extraversion: 50,
    agreeableness: movement === 'Stoicism' ? 70 : 60,
    neuroticism: movement === 'Stoicism' ? 20 : 50,
    keywords: gutenbergBook.subjects?.slice(0, 5).map(s => s.toLowerCase()) || [],
    themes: gutenbergBook.bookshelves?.slice(0, 5) || [],
    tone: movement === 'Existentialism' ? 'pessimistic' : 
          movement === 'Stoicism' ? 'neutral' : 'neutral',
    practicality: movement === 'Stoicism' ? 85 : movement === 'Ethics' ? 75 : 50,
    dogmaSkeptic: movement === 'Stoicism' ? 60 : 70,
    acceptanceAction: movement === 'Stoicism' ? 70 : 50
  };

  return {
    id: `gutenberg-${gutenbergBook.id}`,
    title: gutenbergBook.title,
    author: authorName,
    philosopher: authorName.toLowerCase().replace(/\s+/g, '-'),
    year: gutenbergBook.authors?.[0]?.birth_year ? 
          `${gutenbergBook.authors[0].birth_year}-${gutenbergBook.authors[0].death_year || '?'}` : 
          'Unknown',
    description: `A work of ${movement} philosophy by ${authorName}. Part of the Project Gutenberg collection.`,
    shortSummary: `${authorName}'s exploration of ${movement.toLowerCase()} philosophy.`,
    coverImage: gutenbergBook.formats['image/jpeg'] || '/images/default-book.jpg',
    affiliateLink: `https://www.amazon.com/s?k=${encodeURIComponent(gutenbergBook.title)}+${encodeURIComponent(authorName)}`,
    publicDomainLink: textUrl,
    movement,
    era,
    profile,
    isPublicDomain: true,
    source: 'gutenberg',
    contextRespondedTo: gutenbergBook.subjects?.slice(0, 3) || []
  };
}

// Function to fetch and process all philosophy books
export async function importPhilosophyBooks(): Promise<Book[]> {
  const allBooks: Book[] = [];
  
  // For each search term, fetch the first 3 pages of results (max 30 books per term)
  for (const term of PHILOSOPHY_SEARCH_TERMS) {
    let nextPage = 1;
    let hasMorePages = true;
    
    while (hasMorePages && nextPage <= 3) {
      const response = await fetchGutenbergBooks(nextPage, term);
      
      // Map and add books
      const books = response.results.map(mapGutenbergToBook);
      allBooks.push(...books);
      
      // Check if there are more pages
      hasMorePages = !!response.next;
      nextPage++;
    }
  }
  
  // Remove duplicates based on book id
  const uniqueBooks = Array.from(
    new Map(allBooks.map(book => [book.id, book])).values()
  );
  
  return uniqueBooks;
}
