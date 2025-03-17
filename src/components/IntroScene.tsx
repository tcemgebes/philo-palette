
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Motion, Presence } from '@motionone/dom';
import { cn } from '@/lib/utils';

const INTRO_SCENES = [
  {
    id: 1,
    text: "Throughout history, individuals have turned to philosophy to address life's deepest challenges.",
    image: "/images/ancient-philosophy.jpg"
  },
  {
    id: 2,
    text: "From the Stoics seeking tranquility in chaotic times to Existentialists finding meaning in uncertainty.",
    image: "/images/stoic-statue.jpg"
  },
  {
    id: 3,
    text: "Philosophy offers us frameworks to understand ourselves and our place in the world.",
    image: "/images/modern-contemplation.jpg"
  },
  {
    id: 4,
    text: "Today, we'll help you discover which philosophical perspective resonates with your unique challenges.",
    image: "/images/reading-philosophy.jpg"
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
        // Last scene, prepare to navigate
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

  // Placeholder images for development
  const placeholderImage = "https://images.unsplash.com/photo-1531959870249-9f9b729efcf4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80";

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background image */}
      <div 
        className={cn(
          "absolute inset-0 bg-cover bg-center transition-opacity duration-2000",
          isTransitioning ? "opacity-0" : "opacity-40"
        )}
        style={{ 
          backgroundImage: `url(${INTRO_SCENES[currentScene]?.image || placeholderImage})` 
        }}
      />
      
      {/* Text overlay */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div 
          className={cn(
            "max-w-3xl text-center transition-all duration-2000",
            isTransitioning ? "opacity-0 transform translate-y-10" : "opacity-100 transform translate-y-0"
          )}
        >
          <p className="text-2xl sm:text-3xl md:text-4xl font-light text-white leading-relaxed">
            {INTRO_SCENES[currentScene]?.text}
          </p>
        </div>
        
        <div className="absolute bottom-10 flex flex-col items-center space-y-6">
          <div className="flex space-x-2">
            {INTRO_SCENES.map((_, index) => (
              <div 
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full",
                  currentScene === index ? "bg-white" : "bg-white/30"
                )}
              />
            ))}
          </div>
          
          <button
            onClick={skipIntro}
            className="text-sm text-white/70 hover:text-white transition-colors duration-300"
          >
            Skip Introduction
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntroScene;
