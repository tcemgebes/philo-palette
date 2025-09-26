
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

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
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);
  const [transitionTimeout, setTransitionTimeout] = useState<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  // Auto-advance timer (only when autoAdvance is true)
  useEffect(() => {
    if (!autoAdvance) return;
    
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
  }, [currentScene, navigate, autoAdvance]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && currentScene > 0) {
        goToPrevious();
      } else if (e.key === 'ArrowRight' && currentScene < INTRO_SCENES.length - 1) {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentScene]);

  // Scroll navigation (insensitive)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      // Clear existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      // Set new timeout to prevent too sensitive scrolling
      const timeout = setTimeout(() => {
        if (e.deltaY > 0 && currentScene < INTRO_SCENES.length - 1) {
          goToNext();
        } else if (e.deltaY < 0 && currentScene > 0) {
          goToPrevious();
        }
      }, 150);
      
      setScrollTimeout(timeout);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [currentScene, scrollTimeout]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (transitionTimeout) clearTimeout(transitionTimeout);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [transitionTimeout, scrollTimeout]);

  const goToNext = () => {
    if (currentScene < INTRO_SCENES.length - 1 && !isTransitioning) {
      setAutoAdvance(false); // Disable auto-advance when user takes control
      setIsTransitioning(true);
      
      // Clear any existing transition timeout
      if (transitionTimeout) {
        clearTimeout(transitionTimeout);
      }
      
      const timeout = setTimeout(() => {
        setCurrentScene(prev => prev + 1);
        setIsTransitioning(false);
      }, 1000);
      
      setTransitionTimeout(timeout);
    }
  };

  const goToPrevious = () => {
    if (currentScene > 0 && !isTransitioning) {
      setAutoAdvance(false); // Disable auto-advance when user takes control
      setIsTransitioning(true);
      
      // Clear any existing transition timeout
      if (transitionTimeout) {
        clearTimeout(transitionTimeout);
      }
      
      const timeout = setTimeout(() => {
        setCurrentScene(prev => prev - 1);
        setIsTransitioning(false);
      }, 1000);
      
      setTransitionTimeout(timeout);
    }
  };

  const goToScene = (sceneIndex: number) => {
    if (sceneIndex !== currentScene && !isTransitioning) {
      setAutoAdvance(false); // Disable auto-advance when user takes control
      setIsTransitioning(true);
      
      // Clear any existing transition timeout
      if (transitionTimeout) {
        clearTimeout(transitionTimeout);
      }
      
      const timeout = setTimeout(() => {
        setCurrentScene(sceneIndex);
        setIsTransitioning(false);
      }, 1000);
      
      setTransitionTimeout(timeout);
    }
  };

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
          {/* Navigation arrows */}
          <div className="flex justify-between items-center w-full mb-8">
            <button
              onClick={goToPrevious}
              disabled={currentScene === 0}
              className={cn(
                "p-3 border border-retro-gold transition-all duration-300",
                currentScene === 0 
                  ? "opacity-30 cursor-not-allowed" 
                  : "hover:bg-retro-gold/10 cursor-pointer"
              )}
            >
              <ChevronLeft size={24} className="text-retro-gold" />
            </button>
            
            <div className="border-2 border-retro-sand bg-retro-black/80 p-8 flex-1 mx-4">
              <p className="text-2xl sm:text-3xl md:text-4xl font-pixel text-retro-gold leading-relaxed tracking-wider">
                {INTRO_SCENES[currentScene]?.text}
              </p>
            </div>
            
            <button
              onClick={goToNext}
              disabled={currentScene === INTRO_SCENES.length - 1}
              className={cn(
                "p-3 border border-retro-gold transition-all duration-300",
                currentScene === INTRO_SCENES.length - 1 
                  ? "opacity-30 cursor-not-allowed" 
                  : "hover:bg-retro-gold/10 cursor-pointer"
              )}
            >
              <ChevronRight size={24} className="text-retro-gold" />
            </button>
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
              <button
                key={index}
                onClick={() => goToScene(index)}
                className={cn(
                  "w-3 h-3 transition-all duration-300 hover:scale-110",
                  currentScene === index ? "bg-retro-gold" : "bg-retro-gold/30 hover:bg-retro-gold/60"
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
      
    </div>
  );
};

export default IntroScene;
