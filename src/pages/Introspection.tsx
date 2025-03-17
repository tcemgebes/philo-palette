
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import IntrospectionForm from '@/components/IntrospectionForm';

const Introspection = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="page-container">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h1 className="heading-lg mb-4">Personal Reflection</h1>
            <p className="body-text">
              Take a moment to reflect on the philosophical questions or personal challenges you're currently facing. Your honest introspection will help us find the philosophical perspectives that best resonate with your situation.
            </p>
          </div>
          
          <IntrospectionForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Introspection;
