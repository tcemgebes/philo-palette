import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, Book, Brain, Lightbulb, Scroll } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  
  const startJourney = () => {
    navigate('/introduction');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-32 sm:py-40 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background z-0" />
          
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
            <div
              className="max-w-3xl mx-auto space-y-6 animate-fade-in"
            >
              <span className="inline-block px-3 py-1 text-xs font-medium text-accent bg-accent/10 rounded-full">
                Discover Your Philosophical Path
              </span>
              
              <h1 className="heading-xl">
                Philosophy Tailored to Your Personal Challenges
              </h1>
              
              <p className="body-text">
                Discover philosophical works that resonate with your personality and address your unique questions about life, meaning, and personal growth.
              </p>
              
              <Button 
                onClick={startJourney}
                className="btn-primary group mt-8"
              >
                <span>Begin Your Journey</span>
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-1/4 -left-20 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 -right-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl" />
        </section>
        
        {/* How It Works Section */}
        <section className="py-24 bg-secondary/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="heading-lg mb-4">How It Works</h2>
              <p className="body-text">
                Our AI-driven approach matches philosophical perspectives to your personality and challenges.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Lightbulb,
                  title: "Introduction",
                  description: "Explore how philosophy has historically addressed personal problems."
                },
                {
                  icon: Brain,
                  title: "Personality Assessment",
                  description: "Share your challenges and take a brief personality quiz to help us understand your perspective."
                },
                {
                  icon: Book,
                  title: "Tailored Recommendations",
                  description: "Receive a curated list of philosophical works that align with your personality and concerns."
                }
              ].map((step, index) => (
                <div 
                  key={index}
                  className="glass-panel p-6 rounded-lg flex flex-col items-center text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                    <step.icon size={28} className="text-accent" />
                  </div>
                  
                  <h3 className="text-xl font-medium mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Philosophy Traditions Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="heading-lg mb-4">Philosophical Traditions</h2>
              <p className="body-text">
                We analyze texts from diverse philosophical traditions to find what resonates with you.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Stoicism",
                  description: "Focused on personal virtue, resilience, and emotional regulation.",
                  icon: Scroll
                },
                {
                  title: "Existentialism",
                  description: "Explores freedom, authenticity, and creating personal meaning.",
                  icon: Scroll
                },
                {
                  title: "Buddhism",
                  description: "Centered on finding liberation from suffering through mindfulness.",
                  icon: Scroll
                },
                {
                  title: "Analytical Philosophy",
                  description: "Emphasizes clarity, logic, and precision in addressing problems.",
                  icon: Scroll
                }
              ].map((tradition, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-black border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-300"
                >
                  <tradition.icon size={24} className="text-primary mb-4" />
                  <h3 className="text-lg font-medium mb-2">{tradition.title}</h3>
                  <p className="text-sm text-muted-foreground">{tradition.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Button 
                onClick={startJourney}
                variant="outline"
                className="group"
              >
                <span>Explore All Traditions</span>
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="heading-lg">Begin Your Philosophical Journey</h2>
              <p className="text-primary-foreground/80 text-lg">
                Find the philosophical perspectives that resonate with your unique situation.
              </p>
              
              <Button 
                onClick={startJourney}
                className="bg-white text-primary hover:bg-white/90 transition-colors mt-6 group"
              >
                <span>Start Now</span>
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

export default Index;
