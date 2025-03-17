
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  
  return (
    <footer className="bg-secondary/50 backdrop-blur-sm border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-light tracking-tight text-primary">
              Philo<span className="font-medium">Palette</span>
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Personalized philosophy book recommendations based on your personality and life challenges.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-accent transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/introduction" className="text-sm text-muted-foreground hover:text-accent transition-colors duration-300">
                  Introduction
                </Link>
              </li>
              <li>
                <Link to="/introspection" className="text-sm text-muted-foreground hover:text-accent transition-colors duration-300">
                  Introspection
                </Link>
              </li>
              <li>
                <Link to="/quiz" className="text-sm text-muted-foreground hover:text-accent transition-colors duration-300">
                  Personality Quiz
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-accent transition-colors duration-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-accent transition-colors duration-300">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} PhiloPalette. All rights reserved.
          </p>
          
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="p-2 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors duration-300"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
