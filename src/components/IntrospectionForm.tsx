
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Check, HelpCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

const minWords = 30;
const recommendedWords = 200;

const IntrospectionForm: React.FC = () => {
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Count words
    const words = text.trim().split(/\s+/);
    setWordCount(text.trim() === '' ? 0 : words.length);
    
    // Check if user is typing
    const typingTimer = setTimeout(() => {
      setIsTyping(false);
    }, 1000);
    
    return () => clearTimeout(typingTimer);
  }, [text]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setIsTyping(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Store the introspection text in localStorage
    localStorage.setItem('introspection', text);
    
    // Navigate to quiz page
    navigate('/quiz');
  };

  const getProgressColor = () => {
    if (wordCount < minWords) return 'text-red-500';
    if (wordCount < recommendedWords) return 'text-yellow-500';
    return 'text-green-500';
  };

  const calculateProgress = () => {
    if (wordCount >= recommendedWords) return 100;
    return (wordCount / recommendedWords) * 100;
  };

  const introspectionTips = [
    "Focus on a specific personal challenge or question you're facing",
    "Describe how this issue affects your daily life and relationships",
    "Reflect on what solutions you've already tried and their outcomes",
    "Consider what an ideal resolution would look like for you",
    "Be honest about your feelings and thoughts - this is private"
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-light text-primary">Your Philosophical Inquiry</h2>
            <button
              onClick={() => setShowTips(!showTips)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Show writing tips"
            >
              <HelpCircle size={20} />
            </button>
          </div>
          <p className="text-muted-foreground text-sm">
            Write about the personal challenge, question, or issue you'd like philosophy to help you address.
            The more specific and honest you are, the more tailored your recommendations will be.
          </p>
        </div>

        {showTips && (
          <Card className="p-4 bg-secondary/50 border border-border">
            <div className="flex items-start space-x-3">
              <Info size={20} className="text-accent shrink-0 mt-0.5" />
              <div className="space-y-2">
                <h3 className="font-medium text-sm">Writing Tips</h3>
                <ul className="space-y-1">
                  {introspectionTips.map((tip, index) => (
                    <li key={index} className="text-sm text-foreground/80 flex items-start space-x-2">
                      <span className="text-accent">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Textarea
              value={text}
              onChange={handleTextChange}
              className="w-full min-h-[300px] p-4 resize-y bg-white dark:bg-black border border-border rounded-lg shadow-sm focus:ring-1 focus:ring-accent"
              placeholder="Begin your introspection here..."
              aria-label="Introspection text"
            />
            
            <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
              <span className={cn("font-medium", getProgressColor())}>
                {wordCount}
              </span>
              <span> / {recommendedWords} words</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="w-full bg-secondary h-1 rounded-full overflow-hidden">
              <div 
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  wordCount < minWords ? "bg-red-500" : 
                  wordCount < recommendedWords ? "bg-yellow-500" : "bg-green-500"
                )}
                style={{ width: `${calculateProgress()}%` }}
              />
            </div>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Minimum: {minWords} words</span>
              <span>Recommended: {recommendedWords}+ words</span>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button
              type="submit"
              className={cn(
                "btn-primary flex items-center space-x-2 transition-all duration-300",
                wordCount < minWords ? "opacity-50 cursor-not-allowed" : "hover:translate-y-[-2px]"
              )}
              disabled={wordCount < minWords}
            >
              <span>Continue to Personality Quiz</span>
              {wordCount >= recommendedWords && (
                <Check size={16} className="text-primary-foreground" />
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IntrospectionForm;
