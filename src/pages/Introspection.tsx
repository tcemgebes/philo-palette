
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EnhancedIntrospection from '@/components/EnhancedIntrospection';
import { EnhancedUserProfile } from '@/utils/philosophyData';

const Introspection = () => {
  const navigate = useNavigate();

  const handleIntrospectionComplete = (enhancedProfile: EnhancedUserProfile) => {
    // Store the enhanced introspection data
    localStorage.setItem('enhancedProfile', JSON.stringify(enhancedProfile));
    localStorage.setItem('introspection', enhancedProfile.currentChallenges);
    localStorage.setItem('experienceLevel', 'beginner');
    localStorage.setItem('preferenceType', enhancedProfile.preferenceType);
    
    // Navigate to the quiz for additional personality insights
    navigate('/quiz');
  };

  return (
    <div className="min-h-screen flex flex-col bg-retro-black text-retro-sand">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="page-container">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h1 className="font-mono text-xl sm:text-2xl text-retro-gold mb-4">Personal Reflection</h1>
            <p className="text-sm sm:text-base text-retro-sand/80 font-light mb-8">
              Take a moment to reflect on your current situation, personality variations, and background.
              These insights will help us match you with philosophical works that resonate with your unique circumstances.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <EnhancedIntrospection onComplete={handleIntrospectionComplete} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Introspection;
