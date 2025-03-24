
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Info, X, Download, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PhilosophyBookProps {
  title: string;
  author: string;
  description: string;
  shortSummary?: string;
  matchPercentage: number;
  coverImage: string;
  affiliateLink: string;
  publicDomainLink?: string;
  year?: string;
  philosophy?: string;
  era?: string;
  isPublicDomain?: boolean;
  context?: string;
}

const PhilosophyBook: React.FC<PhilosophyBookProps> = ({
  title,
  author,
  description,
  shortSummary,
  matchPercentage,
  coverImage,
  affiliateLink,
  publicDomainLink,
  year,
  philosophy,
  era,
  isPublicDomain,
  context
}) => {
  const [showDetails, setShowDetails] = useState(false);

  // Placeholder image for development
  const placeholderImage = "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80";
  
  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-500 bg-retro-black border-retro-sand/50 hover:border-retro-gold",
      matchPercentage >= 90 ? "ring-1 ring-retro-gold" : ""
    )}>
      <div className="relative">
        <div 
          className="w-full h-48 bg-cover bg-center"
          style={{ backgroundImage: `url(${coverImage || placeholderImage})` }}
        />
        
        {isPublicDomain && (
          <div className="absolute top-2 left-2 px-3 py-1 bg-retro-black border border-retro-sand text-retro-sand text-xs font-mono">
            Public Domain
          </div>
        )}
        
        {matchPercentage >= 85 && (
          <div className="absolute top-2 right-2 px-3 py-1 bg-retro-gold text-retro-black text-xs font-mono">
            Top Match
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-retro-black to-transparent" />
        
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <div>
            <h3 className="text-retro-gold text-lg font-mono line-clamp-1">{title}</h3>
            <p className="text-retro-sand text-sm font-mono">{author}</p>
          </div>
          
          <div className="bg-retro-black border border-retro-sand text-retro-gold px-2 py-1 text-sm font-mono">
            {matchPercentage}% Match
          </div>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              {year && <p className="text-xs text-retro-sand/70 font-mono">Published: {year}</p>}
              {philosophy && <p className="text-xs text-retro-sand/70 font-mono">School: {philosophy}</p>}
              {era && <p className="text-xs text-retro-sand/70 font-mono">Era: {era}</p>}
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowDetails(!showDetails)}
              className="text-retro-sand hover:text-retro-gold"
            >
              {showDetails ? <X size={16} /> : <Info size={16} />}
            </Button>
          </div>
          
          {!showDetails && shortSummary && (
            <p className="text-sm text-retro-sand/80 font-mono line-clamp-2">
              {shortSummary}
            </p>
          )}
          
          {showDetails && (
            <div className="animate-fade-in space-y-3">
              <p className="text-sm text-retro-sand/80 font-mono">
                {description}
              </p>
              
              {context && (
                <div>
                  <h4 className="text-xs font-mono text-retro-gold mb-1">Historical Context:</h4>
                  <p className="text-xs text-retro-sand/70 font-mono">{context}</p>
                </div>
              )}
              
              <div>
                <h4 className="text-xs font-mono text-retro-gold mb-1">Why This Book Matches:</h4>
                <p className="text-xs text-retro-sand/70 font-mono">
                  This {era} work from the {philosophy} tradition 
                  {matchPercentage > 80 
                    ? " strongly aligns with your reflections on " 
                    : " offers perspective on "}
                  {context?.split(',')[0] || "philosophical questions"}.
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between">
        <a 
          href={affiliateLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 text-sm text-retro-gold hover:text-retro-sand transition-colors duration-300 font-mono"
        >
          <span>Amazon</span>
          <ExternalLink size={14} />
        </a>
        
        {publicDomainLink && (
          <a 
            href={publicDomainLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-sm text-retro-sand hover:text-retro-gold transition-colors duration-300 font-mono"
          >
            <span>Read Free</span>
            <BookOpen size={14} />
          </a>
        )}
      </CardFooter>
    </Card>
  );
};

export default PhilosophyBook;
