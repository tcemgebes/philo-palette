
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowRight } from 'lucide-react';

interface EnhancedIntrospectionProps {
  onComplete: (introspection: {
    currentChallenges: string;
    personalityVariability: string;
    lifeBackground: string;
    seekingType: 'practical' | 'theoretical' | 'both';
    preferenceType: 'align' | 'contrast' | 'both';
  }) => void;
}

const EnhancedIntrospection: React.FC<EnhancedIntrospectionProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [currentChallenges, setCurrentChallenges] = useState('');
  const [personalityVariability, setPersonalityVariability] = useState('');
  const [lifeBackground, setLifeBackground] = useState('');
  const [seekingType, setSeekingType] = useState<'practical' | 'theoretical' | 'both'>('both');
  const [preferenceType, setPreferenceType] = useState<'align' | 'contrast' | 'both'>('both');

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    } else {
      onComplete({
        currentChallenges,
        personalityVariability,
        lifeBackground,
        seekingType,
        preferenceType
      });
    }
  };

  const isCurrentStepValid = () => {
    switch (step) {
      case 1:
        return currentChallenges.trim().length >= 30;
      case 2:
        return personalityVariability.trim().length >= 30;
      case 3:
        return lifeBackground.trim().length >= 30;
      case 4:
        return !!seekingType;
      case 5:
        return !!preferenceType;
      default:
        return false;
    }
  };

  return (
    <div className="space-y-8">
      {step === 1 && (
        <Card className="p-6 glass-panel">
          <h3 className="text-xl text-primary mb-4 font-light">What challenges or questions are you currently facing?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Describe your current situation, concerns, or philosophical questions. The more detail you provide, 
            the better we can match you with relevant philosophical works.
          </p>
          <Textarea
            value={currentChallenges}
            onChange={(e) => setCurrentChallenges(e.target.value)}
            placeholder="I've been questioning the meaning of my work lately. I feel like I'm just going through the motions..."
            className="min-h-32 mb-4"
          />
          <div className="flex justify-end">
            <Button 
              onClick={handleNext} 
              disabled={!isCurrentStepValid()}
              className="font-mono bg-retro-gold text-retro-black hover:bg-retro-sand rounded-none flex items-center"
            >
              <span>Continue</span>
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </Card>
      )}

      {step === 2 && (
        <Card className="p-6 glass-panel">
          <h3 className="text-xl text-primary mb-4 font-light">How does your personality vary in different contexts?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Many of us behave differently in various situations. Describe how your personality, mood, or behavior 
            might change depending on the circumstances or environment.
          </p>
          <Textarea
            value={personalityVariability}
            onChange={(e) => setPersonalityVariability(e.target.value)}
            placeholder="In professional settings I'm analytical and reserved, but with close friends I'm much more emotional and expressive..."
            className="min-h-32 mb-4"
          />
          <div className="flex justify-end">
            <Button 
              onClick={handleNext} 
              disabled={!isCurrentStepValid()}
              className="font-mono bg-retro-gold text-retro-black hover:bg-retro-sand rounded-none flex items-center"
            >
              <span>Continue</span>
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </Card>
      )}

      {step === 3 && (
        <Card className="p-6 glass-panel">
          <h3 className="text-xl text-primary mb-4 font-light">What is your background or life experience?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Your cultural, educational, or religious background can influence how you connect with different philosophical traditions. 
            This helps us find philosophers who addressed similar contexts.
          </p>
          <Textarea
            value={lifeBackground}
            onChange={(e) => setLifeBackground(e.target.value)}
            placeholder="I was raised in a religious household but became more skeptical in college. I studied biology and now work in healthcare..."
            className="min-h-32 mb-4"
          />
          <div className="flex justify-end">
            <Button 
              onClick={handleNext} 
              disabled={!isCurrentStepValid()}
              className="font-mono bg-retro-gold text-retro-black hover:bg-retro-sand rounded-none flex items-center"
            >
              <span>Continue</span>
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </Card>
      )}

      {step === 4 && (
        <Card className="p-6 glass-panel">
          <h3 className="text-xl text-primary mb-4 font-light">Are you seeking practical wisdom or theoretical understanding?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Some philosophical traditions focus on practical advice for daily living, while others explore 
            abstract theoretical questions about existence, knowledge, and reality.
          </p>
          <RadioGroup value={seekingType} onValueChange={(value) => setSeekingType(value as 'practical' | 'theoretical' | 'both')}>
            <div className="flex items-center space-x-3 p-3 rounded-md hover:bg-secondary/50 transition-all">
              <RadioGroupItem value="practical" id="practical" />
              <Label htmlFor="practical" className="cursor-pointer">Practical wisdom I can apply to my life</Label>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-md hover:bg-secondary/50 transition-all">
              <RadioGroupItem value="theoretical" id="theoretical" />
              <Label htmlFor="theoretical" className="cursor-pointer">Theoretical exploration of deep questions</Label>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-md hover:bg-secondary/50 transition-all">
              <RadioGroupItem value="both" id="both-types" />
              <Label htmlFor="both-types" className="cursor-pointer">A balance of both practical and theoretical</Label>
            </div>
          </RadioGroup>
          <div className="flex justify-end mt-6">
            <Button 
              onClick={handleNext} 
              disabled={!isCurrentStepValid()}
              className="font-mono bg-retro-gold text-retro-black hover:bg-retro-sand rounded-none flex items-center"
            >
              <span>Continue</span>
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </Card>
      )}

      {step === 5 && (
        <Card className="p-6 glass-panel">
          <h3 className="text-xl text-primary mb-4 font-light">Do you prefer perspectives that align with or challenge your current thinking?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Some readers seek validation and refinement of their existing views, while others prefer 
            to encounter challenging perspectives that push their boundaries.
          </p>
          <RadioGroup value={preferenceType} onValueChange={(value) => setPreferenceType(value as 'align' | 'contrast' | 'both')}>
            <div className="flex items-center space-x-3 p-3 rounded-md hover:bg-secondary/50 transition-all">
              <RadioGroupItem value="align" id="align" />
              <Label htmlFor="align" className="cursor-pointer">Perspectives that align with and deepen my current thinking</Label>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-md hover:bg-secondary/50 transition-all">
              <RadioGroupItem value="contrast" id="contrast" />
              <Label htmlFor="contrast" className="cursor-pointer">Perspectives that challenge my assumptions and offer new viewpoints</Label>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-md hover:bg-secondary/50 transition-all">
              <RadioGroupItem value="both" id="both-preferences" />
              <Label htmlFor="both-preferences" className="cursor-pointer">A mix of both confirming and challenging perspectives</Label>
            </div>
          </RadioGroup>
          <div className="flex justify-end mt-6">
            <Button 
              onClick={handleNext} 
              disabled={!isCurrentStepValid()}
              className="font-mono bg-retro-gold text-retro-black hover:bg-retro-sand rounded-none flex items-center"
            >
              <span>Complete Introspection</span>
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default EnhancedIntrospection;
