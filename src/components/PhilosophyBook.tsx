
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PhilosophyBookProps {
  title: string;
  author: string;
  description: string;
  matchPercentage: number;
  coverImage: string;
  affiliateLink: string;
  year?: string;
  philosophy?: string;
}

const PhilosophyBook: React.FC<PhilosophyBookProps> = ({
  title,
  author,
  description,
  matchPercentage,
  coverImage,
  affiliateLink,
  year,
  philosophy
}) => {
  const [showDetails, setShowDetails] = useState(false);

  // Placeholder image for development
  const placeholderImage = "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80";
  
  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-500 hover:shadow-lg bg-white dark:bg-black border-border",
      matchPercentage >= 90 ? "ring-2 ring-accent" : ""
    )}>
      <div className="relative">
        <div 
          className="w-full h-56 bg-cover bg-center"
          style={{ backgroundImage: `url(${coverImage || placeholderImage})` }}
        />
        
        {matchPercentage >= 85 && (
          <div className="absolute top-2 right-2 px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
            Top Match
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
        
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <div>
            <h3 className="text-white text-lg font-medium line-clamp-1">{title}</h3>
            <p className="text-white/80 text-sm">{author}</p>
          </div>
          
          <div className="bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-full text-sm font-medium">
            {matchPercentage}% Match
          </div>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              {year && <p className="text-xs text-muted-foreground">Published: {year}</p>}
              {philosophy && <p className="text-xs text-muted-foreground">School: {philosophy}</p>}
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowDetails(!showDetails)}
              className="text-muted-foreground hover:text-foreground"
            >
              {showDetails ? <X size={16} /> : <Info size={16} />}
            </Button>
          </div>
          
          {showDetails && (
            <div className="animate-fade-in">
              <p className="text-sm text-foreground/80 line-clamp-4">
                {description}
              </p>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-end">
        <a 
          href={affiliateLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 text-sm text-accent hover:text-accent/80 transition-colors duration-300"
        >
          <span>View on Amazon</span>
          <ExternalLink size={14} />
        </a>
      </CardFooter>
    </Card>
  );
};

export default PhilosophyBook;
