
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check, HelpCircle, Info, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createUserProfile } from '@/utils/philosophyData';

const minWords = 30;
const recommendedWords = 200;

const IntrospectionForm: React.FC = () => {
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [step, setStep] = useState(1);
  const [experienceLevel, setExperienceLevel] = useState('beginner');
  const [preferenceType, setPreferenceType] = useState('align');
  const [background, setBackground] = useState('');
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
    localStorage.setItem('experienceLevel', experienceLevel);
    localStorage.setItem('preferenceType', preferenceType);
    localStorage.setItem('background', background);
    
    // Create and store a preliminary user profile
    const prelimUserProfile = createUserProfile(
      {}, // No quiz answers yet
      text,
      experienceLevel
    );
    
    prelimUserProfile.wantsContrast = preferenceType === 'contrast';
    localStorage.setItem('prelimUserProfile', JSON.stringify(prelimUserProfile));
    
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

  const nextStep = () => {
    if (step < 3 && wordCount >= minWords) {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const canProceed = () => {
    if (step === 1) return wordCount >= minWords;
    if (step === 2) return !!experienceLevel && !!preferenceType;
    if (step === 3) return !!background;
    return false;
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
        {/* Step indicator */}
        <div className="w-full flex items-center justify-between mb-8">
          <div className="hidden sm:flex items-center space-x-2">
            {[1, 2, 3].map((s) => (
              <div 
                key={s}
                className={cn(
                  "h-3 w-3 rounded-full transition-colors",
                  s === step ? "bg-retro-gold" : 
                  s < step ? "bg-retro-sand" : "bg-retro-sand/30"
                )}
              />
            ))}
          </div>
          
          <div className="sm:hidden text-sm text-retro-gold">
            Step {step} of 3
          </div>
          
          <div className="text-xs text-retro-sand">
            {step === 1 && "Your Challenge"}
            {step === 2 && "Preferences"}
            {step === 3 && "Background"}
          </div>
        </div>

        {/* Step 1: Introspection */}
        {step === 1 && (
          <>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-mono text-retro-gold">Your Philosophical Inquiry</h2>
                <button
                  onClick={() => setShowTips(!showTips)}
                  className="text-retro-sand hover:text-retro-gold transition-colors"
                  aria-label="Show writing tips"
                >
                  <HelpCircle size={20} />
                </button>
              </div>
              <p className="text-retro-sand text-sm font-mono">
                Write about the personal challenge, question, or issue you'd like philosophy to help you address.
                The more specific and honest you are, the more tailored your recommendations will be.
              </p>
            </div>

            {showTips && (
              <Card className="p-4 bg-retro-black/50 border border-retro-sand/30">
                <div className="flex items-start space-x-3">
                  <Info size={20} className="text-retro-gold shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <h3 className="font-mono text-sm text-retro-gold">Writing Tips</h3>
                    <ul className="space-y-1">
                      {introspectionTips.map((tip, index) => (
                        <li key={index} className="text-sm text-retro-sand flex items-start space-x-2 font-mono">
                          <span className="text-retro-gold">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            )}

            <div className="relative">
              <Textarea
                value={text}
                onChange={handleTextChange}
                className="w-full min-h-[300px] p-4 resize-y bg-retro-black border border-retro-sand/50 rounded-none text-retro-sand font-mono shadow-sm focus:ring-1 focus:ring-retro-gold"
                placeholder="Begin your introspection here..."
                aria-label="Introspection text"
              />
              
              <div className="absolute bottom-3 right-3 text-xs text-retro-sand font-mono">
                <span className={cn("font-medium", getProgressColor())}>
                  {wordCount}
                </span>
                <span> / {recommendedWords} words</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="w-full bg-retro-black h-1 rounded-none overflow-hidden border border-retro-sand/30">
                <div 
                  className={cn(
                    "h-full rounded-none transition-all duration-500",
                    wordCount < minWords ? "bg-retro-red" : 
                    wordCount < recommendedWords ? "bg-retro-sand" : "bg-retro-gold"
                  )}
                  style={{ width: `${calculateProgress()}%` }}
                />
              </div>
              
              <div className="flex items-center justify-between text-xs text-retro-sand font-mono">
                <span>Minimum: {minWords} words</span>
                <span>Recommended: {recommendedWords}+ words</span>
              </div>
            </div>
          </>
        )}

        {/* Step 2: Experience and Preferences */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-mono text-retro-gold">Your Preferences</h2>
              <p className="text-retro-sand text-sm font-mono">
                Tell us about your experience with philosophy and what kind of perspectives you're looking for.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="experience" className="text-sm font-mono text-retro-gold">Your experience with philosophy</Label>
                <Select 
                  value={experienceLevel} 
                  onValueChange={setExperienceLevel}
                >
                  <SelectTrigger id="experience" className="bg-retro-black border-retro-sand/50 text-retro-sand font-mono rounded-none">
                    <SelectValue placeholder="Select your experience level" />
                  </SelectTrigger>
                  <SelectContent className="bg-retro-black border-retro-sand/50 text-retro-sand font-mono rounded-none">
                    <SelectItem value="beginner" className="focus:bg-retro-sand/20 font-mono">Beginner - New to philosophy</SelectItem>
                    <SelectItem value="intermediate" className="focus:bg-retro-sand/20 font-mono">Intermediate - Some familiarity</SelectItem>
                    <SelectItem value="advanced" className="focus:bg-retro-sand/20 font-mono">Advanced - Well-versed in philosophy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-mono text-retro-gold">What kind of philosophical perspectives do you prefer?</Label>
                <RadioGroup 
                  value={preferenceType} 
                  onValueChange={setPreferenceType}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 p-3 border border-retro-sand/30 bg-retro-black/50 hover:bg-retro-black/70">
                    <RadioGroupItem value="align" id="align" className="text-retro-gold border-retro-sand" />
                    <Label htmlFor="align" className="font-mono text-retro-sand cursor-pointer">
                      Perspectives that align with my current thinking
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border border-retro-sand/30 bg-retro-black/50 hover:bg-retro-black/70">
                    <RadioGroupItem value="contrast" id="contrast" className="text-retro-gold border-retro-sand" />
                    <Label htmlFor="contrast" className="font-mono text-retro-sand cursor-pointer">
                      Perspectives that challenge my current thinking
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Background */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-mono text-retro-gold">Your Background</h2>
              <p className="text-retro-sand text-sm font-mono">
                What framework or context best describes your current worldview or background?
              </p>
            </div>
            
            <RadioGroup 
              value={background} 
              onValueChange={setBackground}
              className="space-y-3"
            >
              <div className="flex items-center space-x-3 p-3 border border-retro-sand/30 bg-retro-black/50 hover:bg-retro-black/70">
                <RadioGroupItem value="religious" id="religious" className="text-retro-gold border-retro-sand" />
                <Label htmlFor="religious" className="font-mono text-retro-sand cursor-pointer">
                  Religious or spiritual tradition
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-3 border border-retro-sand/30 bg-retro-black/50 hover:bg-retro-black/70">
                <RadioGroupItem value="secular" id="secular" className="text-retro-gold border-retro-sand" />
                <Label htmlFor="secular" className="font-mono text-retro-sand cursor-pointer">
                  Secular humanism
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-3 border border-retro-sand/30 bg-retro-black/50 hover:bg-retro-black/70">
                <RadioGroupItem value="scientific" id="scientific" className="text-retro-gold border-retro-sand" />
                <Label htmlFor="scientific" className="font-mono text-retro-sand cursor-pointer">
                  Scientific materialism
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-3 border border-retro-sand/30 bg-retro-black/50 hover:bg-retro-black/70">
                <RadioGroupItem value="skeptical" id="skeptical" className="text-retro-gold border-retro-sand" />
                <Label htmlFor="skeptical" className="font-mono text-retro-sand cursor-pointer">
                  Philosophical skepticism
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-3 border border-retro-sand/30 bg-retro-black/50 hover:bg-retro-black/70">
                <RadioGroupItem value="other" id="other" className="text-retro-gold border-retro-sand" />
                <Label htmlFor="other" className="font-mono text-retro-sand cursor-pointer">
                  Other / Not sure
                </Label>
              </div>
            </RadioGroup>
          </div>
        )}
        
        {/* Navigation buttons */}
        <div className="flex justify-between pt-6">
          {step > 1 ? (
            <Button
              type="button"
              onClick={prevStep}
              variant="outline"
              className="font-mono border-retro-sand text-retro-sand hover:text-retro-gold hover:bg-retro-black/50 rounded-none"
            >
              Back
            </Button>
          ) : (
            <div></div> // Empty div for layout
          )}
          
          {step < 3 ? (
            <Button
              type="button"
              onClick={nextStep}
              disabled={!canProceed()}
              className={cn(
                "font-mono bg-retro-gold text-retro-black hover:bg-retro-sand rounded-none flex items-center",
                !canProceed() ? "opacity-50 cursor-not-allowed" : "hover:translate-y-[-2px]"
              )}
            >
              <span>Continue</span>
              <ChevronRight size={16} className="ml-2" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={!canProceed()}
              className={cn(
                "font-mono bg-retro-gold text-retro-black hover:bg-retro-sand rounded-none flex items-center",
                !canProceed() ? "opacity-50 cursor-not-allowed" : "hover:translate-y-[-2px]"
              )}
            >
              <span>Continue to Personality Quiz</span>
              <Check size={16} className="ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default IntrospectionForm;
