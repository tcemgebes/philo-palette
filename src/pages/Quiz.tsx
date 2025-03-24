
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuizQuestion from '@/components/QuizQuestion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { quizQuestions, PhilosopherProfile, createUserProfile } from '@/utils/philosophyData';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [userProfile, setUserProfile] = useState<Partial<PhilosopherProfile>>({});
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has completed introspection
    const introspection = localStorage.getItem('introspection');
    if (!introspection) {
      navigate('/introspection');
    }
  }, [navigate]);

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
    
    // Update the user profile based on the selected option
    const question = quizQuestions.find(q => q.id === questionId);
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

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Get introspection data from localStorage
      const introspectionText = localStorage.getItem('introspection') || '';
      const experienceLevel = localStorage.getItem('experienceLevel') || 'beginner';
      const preferenceType = localStorage.getItem('preferenceType') || 'align';
      const background = localStorage.getItem('background') || '';

      // Create full user profile
      const fullUserProfile = createUserProfile(answers, introspectionText, experienceLevel);
      
      // Add preference and background info
      fullUserProfile.wantsContrast = preferenceType === 'contrast';
      
      // Map background to dogmaSkeptic trait if not already set by quiz
      if (background && !fullUserProfile.personalityTraits.dogmaSkeptic) {
        switch (background) {
          case 'religious':
            fullUserProfile.personalityTraits.dogmaSkeptic = 30;
            break;
          case 'secular':
            fullUserProfile.personalityTraits.dogmaSkeptic = 60;
            break;
          case 'scientific':
            fullUserProfile.personalityTraits.dogmaSkeptic = 80;
            break;
          case 'skeptical':
            fullUserProfile.personalityTraits.dogmaSkeptic = 90;
            break;
          // Default or 'other' doesn't modify this trait
        }
      }
      
      // Save completed user profile to localStorage
      localStorage.setItem('userProfile', JSON.stringify(fullUserProfile));
      
      // Navigate to results page
      navigate('/results');
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
  const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;
  const canProceed = answers[currentQuestion?.id] !== undefined;

  return (
    <div className="min-h-screen flex flex-col bg-retro-black text-retro-sand">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="page-container">
          <div className="max-w-3xl mx-auto mb-12">
            <div className="flex items-center justify-between mb-8">
              <h1 className="font-mono text-xl sm:text-2xl text-retro-gold">Philosophical Assessment</h1>
              <div className="text-sm text-retro-sand font-mono">
                Question {currentQuestionIndex + 1} of {quizQuestions.length}
              </div>
            </div>
            
            <div className="h-1 bg-retro-sand/30 mb-8">
              <div 
                className="h-full bg-retro-gold transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <div className="space-y-8">
              {quizQuestions.map((question, index) => (
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
                    selectedValue={answers[question.id] || ''}
                    onChange={(value) => handleAnswerChange(question.id, value)}
                    isActive={index === currentQuestionIndex}
                  />
                </div>
              ))}
              
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
                  disabled={!canProceed}
                  className={cn(
                    "font-mono bg-retro-gold text-retro-black hover:bg-retro-sand rounded-none flex items-center",
                    !canProceed ? "opacity-50 cursor-not-allowed" : ""
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
