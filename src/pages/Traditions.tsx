import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft, ArrowRight, Book, Brain, Lightbulb, Scroll, TestTube, Users, Globe, Heart, Shield, Zap, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Traditions = () => {
  const navigate = useNavigate();

  const traditions = [
    {
      id: 'stoicism',
      title: 'Stoicism',
      description: 'Focused on personal virtue, resilience, and emotional regulation through acceptance of what we cannot control.',
      icon: Shield,
      era: 'Ancient Greece & Rome',
      keyPhilosophers: ['Marcus Aurelius', 'Epictetus', 'Seneca'],
      themes: ['Virtue', 'Resilience', 'Emotional Control', 'Acceptance'],
      color: 'from-blue-900 to-blue-700'
    },
    {
      id: 'existentialism',
      title: 'Existentialism',
      description: 'Explores freedom, authenticity, and creating personal meaning in an apparently meaningless universe.',
      icon: Brain,
      era: '19th-20th Century',
      keyPhilosophers: ['Jean-Paul Sartre', 'Simone de Beauvoir', 'Albert Camus', 'Friedrich Nietzsche'],
      themes: ['Freedom', 'Authenticity', 'Meaning', 'Responsibility'],
      color: 'from-purple-900 to-purple-700'
    },
    {
      id: 'buddhism',
      title: 'Buddhism',
      description: 'Centered on finding liberation from suffering through mindfulness, compassion, and understanding the nature of reality.',
      icon: Heart,
      era: 'Ancient India',
      keyPhilosophers: ['Siddhartha Gautama', 'Nagarjuna', 'Dogen'],
      themes: ['Suffering', 'Mindfulness', 'Compassion', 'Enlightenment'],
      color: 'from-orange-900 to-orange-700'
    },
    {
      id: 'analytical',
      title: 'Analytical Philosophy',
      description: 'Emphasizes clarity, logic, and precision in addressing philosophical problems through rigorous analysis.',
      icon: TestTube,
      era: '20th Century',
      keyPhilosophers: ['Bertrand Russell', 'Ludwig Wittgenstein', 'G.E. Moore'],
      themes: ['Logic', 'Language', 'Clarity', 'Analysis'],
      color: 'from-green-900 to-green-700'
    },
    {
      id: 'platonism',
      title: 'Platonism',
      description: 'Explores the nature of reality, knowledge, and the ideal through the theory of Forms and the allegory of the cave.',
      icon: Lightbulb,
      era: 'Ancient Greece',
      keyPhilosophers: ['Plato', 'Plotinus', 'Augustine of Hippo'],
      themes: ['Forms', 'Knowledge', 'Justice', 'Ideal'],
      color: 'from-indigo-900 to-indigo-700'
    },
    {
      id: 'pragmatism',
      title: 'Pragmatism',
      description: 'Focuses on practical consequences and real-world applications of ideas, emphasizing what works in practice.',
      icon: Zap,
      era: '19th-20th Century',
      keyPhilosophers: ['William James', 'John Dewey', 'Charles Sanders Peirce'],
      themes: ['Practicality', 'Consequences', 'Experience', 'Action'],
      color: 'from-red-900 to-red-700'
    },
    {
      id: 'phenomenology',
      title: 'Phenomenology',
      description: 'Studies the structures of consciousness and experience, focusing on how things appear to us.',
      icon: Eye,
      era: '20th Century',
      keyPhilosophers: ['Edmund Husserl', 'Martin Heidegger', 'Maurice Merleau-Ponty'],
      themes: ['Consciousness', 'Experience', 'Being', 'Phenomena'],
      color: 'from-teal-900 to-teal-700'
    },
    {
      id: 'feminism',
      title: 'Feminist Philosophy',
      description: 'Examines gender, power, and social structures from women\'s perspectives, challenging traditional philosophical assumptions.',
      icon: Users,
      era: '20th-21st Century',
      keyPhilosophers: ['Simone de Beauvoir', 'Judith Butler', 'bell hooks', 'Martha Nussbaum'],
      themes: ['Gender', 'Power', 'Equality', 'Social Justice'],
      color: 'from-pink-900 to-pink-700'
    },
    {
      id: 'confucianism',
      title: 'Confucianism',
      description: 'Emphasizes moral cultivation, social harmony, and the importance of relationships and proper conduct.',
      icon: Book,
      era: 'Ancient China',
      keyPhilosophers: ['Confucius', 'Mencius', 'Xunzi'],
      themes: ['Harmony', 'Relationships', 'Moral Cultivation', 'Social Order'],
      color: 'from-yellow-900 to-yellow-700'
    },
    {
      id: 'taoism',
      title: 'Taoism',
      description: 'Focuses on living in harmony with the Tao (the Way), emphasizing naturalness, simplicity, and non-action.',
      icon: Globe,
      era: 'Ancient China',
      keyPhilosophers: ['Lao Tzu', 'Chuang Tzu'],
      themes: ['Naturalness', 'Simplicity', 'Balance', 'Non-action'],
      color: 'from-emerald-900 to-emerald-700'
    },
    {
      id: 'utilitarianism',
      title: 'Utilitarianism',
      description: 'Focuses on maximizing happiness and well-being for the greatest number, emphasizing consequences over intentions.',
      icon: Heart,
      era: '18th-19th Century',
      keyPhilosophers: ['Jeremy Bentham', 'John Stuart Mill', 'Peter Singer'],
      themes: ['Happiness', 'Consequences', 'Greatest Good', 'Well-being'],
      color: 'from-cyan-900 to-cyan-700'
    }
  ];

  console.log('Traditions page rendering...', traditions.length);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-16 sm:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background -z-10" />
          
          <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <Button 
                onClick={() => navigate('/')}
                variant="outline"
                className="mb-8 group"
              >
                <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                <span>Back to Home</span>
              </Button>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-mono tracking-wide text-[#e8da99] mb-6">Philosophical Traditions</h1>
              <p className="text-base md:text-lg leading-relaxed text-[#e8da99]/90 font-mono text-lg">
                Explore the rich diversity of philosophical thought across cultures and centuries. 
                Each tradition offers unique insights into life's fundamental questions.
              </p>
            </div>
          </div>
        </section>
        
        {/* Traditions Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {traditions.map((tradition) => (
                <div 
                  key={tradition.id}
                  className="bg-black/80 backdrop-blur-sm border border-[#c3b17f] shadow-lg p-6 rounded-lg hover:shadow-lg transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${tradition.color} flex items-center justify-center mr-4`}>
                      <tradition.icon size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-[#e8da99]">{tradition.title}</h3>
                      <p className="text-sm text-[#c3b17f]">{tradition.era}</p>
                    </div>
                  </div>
                  
                  <p className="text-[#e8da99]/90 mb-4 leading-relaxed">
                    {tradition.description}
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-[#e8da99] mb-2">Key Philosophers</h4>
                      <p className="text-sm text-[#c3b17f]">{tradition.keyPhilosophers.join(', ')}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-[#e8da99] mb-2">Core Themes</h4>
                      <div className="flex flex-wrap gap-1">
                        {tradition.themes.map((theme, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 text-xs bg-[#c3b17f]/20 text-[#c3b17f] rounded"
                          >
                            {theme}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-mono tracking-wide text-[#e8da99]">Ready to Find Your Philosophical Path?</h2>
              <p className="text-base md:text-lg leading-relaxed text-[#e8da99]/90 font-mono">
                Discover which philosophical traditions resonate with your unique perspective and challenges.
              </p>
              
              <Button 
                onClick={() => navigate('/introduction')}
                className="px-6 py-3 border border-[#c3b17f] bg-transparent text-[#e8da99] hover:bg-[#c3b17f]/20 transition-all duration-300 font-mono uppercase tracking-wider group"
              >
                <span>Begin Your Journey</span>
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Traditions;