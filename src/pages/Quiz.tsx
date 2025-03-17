
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuizQuestion from '@/components/QuizQuestion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { quizQuestions, PhilosopherProfile } from '@/utils/philosophyData';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

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
      // Save user profile to localStorage
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
      
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
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="page-container">
          <div className="max-w-3xl mx-auto mb-12">
            <div className="flex items-center justify-between mb-8">
              <h1 className="heading-md">Personality Assessment</h1>
              <div className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} of {quizQuestions.length}
              </div>
            </div>
            
            <Progress value={progress} className="h-1 mb-8" />
            
            <div className="space-y-8">
              {quizQuestions.map((question, index) => (
                <div 
                  key={question.id}
                  className={index !== currentQuestionIndex ? 'hidden' : ''}
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
                  className="flex items-center"
                >
                  <ArrowLeft size={16} className="mr-2" />
                  <span>Previous</span>
                </Button>
                
                <Button
                  onClick={handleNext}
                  disabled={!canProceed}
                  className={`btn-primary flex items-center ${!canProceed ? 'opacity-50' : ''}`}
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
