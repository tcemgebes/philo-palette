
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const INTRO_SCENES = [
  {
    id: 1,
    text: "Throughout history, individuals have turned to philosophy to address life's deepest challenges.",
    image: "/lovable-uploads/9ff07881-6aa2-49b8-aa4f-0b22115fc5fd.png"
  },
  {
    id: 2,
    text: "From the Stoics seeking tranquility in chaotic times to Existentialists finding meaning in uncertainty.",
    image: "/lovable-uploads/9ff07881-6aa2-49b8-aa4f-0b22115fc5fd.png"
  },
  {
    id: 3,
    text: "Philosophy offers us frameworks to understand ourselves and our place in the world.",
    image: "/lovable-uploads/9ff07881-6aa2-49b8-aa4f-0b22115fc5fd.png"
  },
  {
    id: 4,
    text: "Today, we'll help you discover which philosophical perspective resonates with your unique challenges.",
    image: "/lovable-uploads/9ff07881-6aa2-49b8-aa4f-0b22115fc5fd.png"
  }
];

const IntroScene: React.FC = () => {
  const [currentScene, setCurrentScene] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentScene < INTRO_SCENES.length - 1) {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentScene(prev => prev + 1);
          setIsTransitioning(false);
        }, 1000);
      } else {
        setIsTransitioning(true);
        setTimeout(() => {
          navigate('/introspection');
        }, 1000);
      }
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [currentScene, navigate]);

  const skipIntro = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate('/introspection');
    }, 1000);
  };

  const handleStart = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate('/introspection');
    }, 1000);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-retro-black">
      {/* Main content area */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div 
          className={cn(
            "max-w-3xl text-center transition-all duration-2000",
            isTransitioning ? "opacity-0 transform translate-y-10" : "opacity-100 transform translate-y-0"
          )}
        >
          <div className="mb-8 border-2 border-retro-sand bg-retro-black/80 p-8">
            <p className="text-2xl sm:text-3xl md:text-4xl font-pixel text-retro-gold leading-relaxed tracking-wider">
              {INTRO_SCENES[currentScene]?.text}
            </p>
          </div>
          
          {/* Stats display inspired by the image */}
          <div className="flex justify-center gap-12 mb-12">
            <div className="flex flex-col items-center">
              <span className="text-retro-gold text-5xl font-mono">†</span>
              <span className="text-retro-gold font-mono">{55 - currentScene * 10}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-retro-gold text-5xl font-mono">🗡️</span>
              <span className="text-retro-gold font-mono">{60 - currentScene * 5}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-retro-gold text-5xl font-mono">$</span>
              <span className="text-retro-gold font-mono">{currentScene * 15}</span>
            </div>
          </div>
          
          {/* Start button for the last scene */}
          {currentScene === INTRO_SCENES.length - 1 && (
            <Button
              onClick={handleStart}
              className="font-mono bg-retro-gold text-retro-black hover:bg-retro-sand rounded-none flex items-center px-8 py-4 mx-auto mt-6 text-lg"
            >
              <span>Begin Your Journey</span>
              <ArrowRight size={20} className="ml-2" />
            </Button>
          )}
        </div>
        
        <div className="absolute bottom-10 flex flex-col items-center space-y-6">
          <div className="flex space-x-4">
            {INTRO_SCENES.map((_, index) => (
              <div 
                key={index}
                className={cn(
                  "w-3 h-3",
                  currentScene === index ? "bg-retro-gold" : "bg-retro-gold/30"
                )}
              />
            ))}
          </div>
          
          <button
            onClick={skipIntro}
            className="font-mono text-sm text-retro-gold border border-retro-gold px-4 py-2 hover:bg-retro-gold/10 transition-colors duration-300"
          >
            SKIP INTRO
          </button>
        </div>
      </div>
      
      {/* Year counter at bottom */}
      <div className="absolute bottom-4 right-4 flex items-center space-x-2 font-mono text-retro-gold">
        <span className="text-xl">{1000 + currentScene * 20}</span>
        <span className="text-sm">YEARS IN POWER</span>
      </div>
    </div>
  );
};

export default IntroScene;
