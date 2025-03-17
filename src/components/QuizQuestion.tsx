
import React from 'react';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export interface QuizQuestionProps {
  id: string;
  question: string;
  description?: string;
  options: {
    value: string;
    label: string;
  }[];
  selectedValue: string;
  onChange: (value: string) => void;
  isActive: boolean;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  id,
  question,
  description,
  options,
  selectedValue,
  onChange,
  isActive
}) => {
  return (
    <Card 
      className={cn(
        "p-6 transition-all duration-500 border border-border",
        isActive 
          ? "glass-panel shadow-lg transform scale-100 opacity-100" 
          : "bg-background/50 transform scale-95 opacity-50"
      )}
    >
      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-xl font-light text-primary">{question}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        
        <RadioGroup
          id={id}
          value={selectedValue}
          onValueChange={onChange}
          className="space-y-3"
          disabled={!isActive}
        >
          {options.map((option) => (
            <div 
              key={option.value}
              className={cn(
                "flex items-center space-x-3 p-3 rounded-md transition-all duration-300",
                selectedValue === option.value 
                  ? "bg-secondary" 
                  : "hover:bg-secondary/50"
              )}
            >
              <RadioGroupItem 
                value={option.value} 
                id={`${id}-${option.value}`}
              />
              <Label 
                htmlFor={`${id}-${option.value}`}
                className="flex-grow cursor-pointer"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </Card>
  );
};

export default QuizQuestion;
