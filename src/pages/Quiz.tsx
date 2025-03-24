
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuizQuestion from '@/components/QuizQuestion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { quizQuestions, enhancedQuizQuestions, PhilosopherProfile, createUserProfile, EnhancedUserProfile, initializeBookDatabase } from '@/utils/philosophyData';
import { ArrowLeft, ArrowRight, Check, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [enhancedAnswers, setEnhancedAnswers] = useState<Record<string, string>>({});
  const [textInputs, setTextInputs] = useState<Record<string, string>>({});
  const [multiSelectAnswers, setMultiSelectAnswers] = useState<Record<string, string[]>>({});
  const [userProfile, setUserProfile] = useState<Partial<PhilosopherProfile>>({});
  const [enhancedProfile, setEnhancedProfile] = useState<EnhancedUserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Combine standard and enhanced questions
  const allQuestions = [...quizQuestions, ...enhancedQuizQuestions];

  useEffect(() => {
    // Check if user has completed introspection
    const introspection = localStorage.getItem('introspection');
    const enhancedProfileData = localStorage.getItem('enhancedProfile');
    
    if (!introspection) {
      navigate('/introspection');
    } else if (enhancedProfileData) {
      try {
        const parsedProfile = JSON.parse(enhancedProfileData) as EnhancedUserProfile;
        setEnhancedProfile(parsedProfile);
      } catch (error) {
        console.error("Error parsing enhanced profile:", error);
      }
    }

    // Initialize the book database in the background
    initializeBookDatabase().catch(error => 
      console.error("Failed to initialize book database:", error)
    );
  }, [navigate]);

  const handleAnswerChange = (questionId: string, value: string) => {
    const isEnhancedQuestion = questionId.startsWith('enhanced-');
    
    if (isEnhancedQuestion) {
      setEnhancedAnswers(prev => ({
        ...prev,
        [questionId]: value
      }));
    } else {
      setAnswers(prev => ({
        ...prev,
        [questionId]: value
      }));
    }
    
    // Update the user profile based on the selected option
    const question = allQuestions.find(q => q.id === questionId);
    if (question) {
      const selectedOption = question.options.find(opt => opt.value === value);
      if (selectedOption) {
        setUserProfile(prev => ({
          ...prev,
          [selectedOption.trait]: selectedOption.score
        }));
      }
    }
  };

  const handleTextChange = (questionId: string, text: string) => {
    setTextInputs(prev => ({
      ...prev,
      [questionId]: text
    }));
  };

  const handleMultiSelectChange = (questionId: string, values: string[]) => {
    setMultiSelectAnswers(prev => ({
      ...prev,
      [questionId]: values
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsLoading(true);
      
      // Get introspection data
      let introspectionText = localStorage.getItem('introspection') || '';
      let experienceLevel = localStorage.getItem('experienceLevel') || 'beginner';
      let preferenceType = localStorage.getItem('preferenceType') || 'align';
      
      // Create full user profile
      const fullUserProfile = createUserProfile(
        {...answers, ...enhancedAnswers}, 
        introspectionText, 
        experienceLevel,
        enhancedProfile || undefined
      );
      
      // Save completed user profile to localStorage
      localStorage.setItem('userProfile', JSON.stringify(fullUserProfile));
      
      // Simulate loading for book database initialization
      setTimeout(() => {
        setIsLoading(false);
        navigate('/results');
      }, 1500);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentQuestion = allQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / allQuestions.length) * 100;
  const isLastQuestion = currentQuestionIndex === allQuestions.length - 1;
  
  const canProceed = () => {
    if (!currentQuestion) return false;
    
    const questionId = currentQuestion.id;
    const isEnhancedQuestion = questionId.startsWith('enhanced-');
    
    // Different validation based on question type
    if (currentQuestion.type === 'text-input') {
      return textInputs[questionId]?.trim().length >= 5;
    } else if (currentQuestion.type === 'multi-select') {
      return multiSelectAnswers[questionId]?.length > 0;
    } else {
      // Standard multiple choice
      return isEnhancedQuestion 
        ? enhancedAnswers[questionId] !== undefined 
        : answers[questionId] !== undefined;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-retro-black text-retro-sand">
        <Header />
        
        <main className="flex-grow pt-24 pb-16 flex flex-col items-center justify-center">
          <div className="text-center max-w-md">
            <BookOpen size={48} className="mx-auto mb-6 text-retro-gold animate-pulse" />
            <h2 className="font-mono text-xl text-retro-gold mb-4">Preparing Your Recommendations</h2>
            <p className="text-retro-sand/80 mb-8">
              We're analyzing your responses and matching them with our philosophical library.
              This will only take a moment...
            </p>
            <Progress value={75} className="w-full h-1" />
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-retro-black text-retro-sand">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="page-container">
          <div className="max-w-3xl mx-auto mb-12">
            <div className="flex items-center justify-between mb-8">
              <h1 className="font-mono text-xl sm:text-2xl text-retro-gold">Philosophical Assessment</h1>
              <div className="text-sm text-retro-sand font-mono">
                Question {currentQuestionIndex + 1} of {allQuestions.length}
              </div>
            </div>
            
            <div className="h-1 bg-retro-sand/30 mb-8">
              <div 
                className="h-full bg-retro-gold transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <div className="space-y-8">
              {allQuestions.map((question, index) => {
                const isEnhancedQuestion = question.id.startsWith('enhanced-');
                
                // Determine the appropriate value based on question type
                let selectedValue = isEnhancedQuestion 
                  ? enhancedAnswers[question.id] || '' 
                  : answers[question.id] || '';
                
                let textValue = textInputs[question.id] || '';
                let multiSelectedValues = multiSelectAnswers[question.id] || [];
                
                return (
                  <div 
                    key={question.id}
                    className={cn(
                      "transition-all duration-500",
                      index !== currentQuestionIndex ? 'hidden' : ''
                    )}
                  >
                    <QuizQuestion
                      id={question.id}
                      question={question.question}
                      description={question.description}
                      options={question.options.map(opt => ({
                        value: opt.value,
                        label: opt.label
                      }))}
                      selectedValue={selectedValue}
                      onChange={(value) => handleAnswerChange(question.id, value)}
                      isActive={index === currentQuestionIndex}
                      type={question.type || 'multiple-choice'}
                      textValue={textValue}
                      onTextChange={(text) => handleTextChange(question.id, text)}
                      multiSelectedValues={multiSelectedValues}
                      onMultiChange={(values) => handleMultiSelectChange(question.id, values)}
                    />
                  </div>
                );
              })}
              
              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  className="flex items-center font-mono border-retro-sand text-retro-sand hover:text-retro-gold hover:bg-retro-black/50 rounded-none"
                >
                  <ArrowLeft size={16} className="mr-2" />
                  <span>Previous</span>
                </Button>
                
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className={cn(
                    "font-mono bg-retro-gold text-retro-black hover:bg-retro-sand rounded-none flex items-center",
                    !canProceed() ? "opacity-50 cursor-not-allowed" : ""
                  )}
                >
                  {isLastQuestion ? (
                    <>
                      <span>View Results</span>
                      <Check size={16} className="ml-2" />
                    </>
                  ) : (
                    <>
                      <span>Next</span>
                      <ArrowRight size={16} className="ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Quiz;
