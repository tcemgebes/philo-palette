
import React from 'react';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
  type?: 'multiple-choice' | 'text-input' | 'multi-select';
  textValue?: string;
  onTextChange?: (text: string) => void;
  multiSelectedValues?: string[];
  onMultiChange?: (values: string[]) => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  id,
  question,
  description,
  options,
  selectedValue,
  onChange,
  isActive,
  type = 'multiple-choice',
  textValue = '',
  onTextChange,
  multiSelectedValues = [],
  onMultiChange
}) => {
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onTextChange) {
      onTextChange(e.target.value);
    }
  };

  const handleMultiSelectChange = (value: string) => {
    if (!onMultiChange || !multiSelectedValues) return;
    
    const newValues = multiSelectedValues.includes(value)
      ? multiSelectedValues.filter(v => v !== value)
      : [...multiSelectedValues, value];
    
    onMultiChange(newValues);
  };

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
        
        {type === 'multiple-choice' && (
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
        )}

        {type === 'text-input' && (
          <Textarea
            id={id}
            value={textValue}
            onChange={handleTextChange}
            placeholder="Share your thoughts here..."
            className="min-h-32"
            disabled={!isActive}
          />
        )}

        {type === 'multi-select' && (
          <div className="space-y-3">
            {options.map((option) => (
              <div 
                key={option.value}
                className={cn(
                  "flex items-center space-x-3 p-3 rounded-md transition-all duration-300 cursor-pointer",
                  multiSelectedValues?.includes(option.value) 
                    ? "bg-secondary" 
                    : "hover:bg-secondary/50"
                )}
                onClick={() => handleMultiSelectChange(option.value)}
              >
                <div 
                  className={cn(
                    "w-5 h-5 rounded-md border flex items-center justify-center",
                    multiSelectedValues?.includes(option.value) 
                      ? "bg-primary border-primary" 
                      : "border-muted-foreground"
                  )}
                >
                  {multiSelectedValues?.includes(option.value) && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </div>
                <Label 
                  className="flex-grow cursor-pointer"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default QuizQuestion;
