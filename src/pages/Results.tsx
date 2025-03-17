
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PhilosophyBook from '@/components/PhilosophyBook';
import DonationModal from '@/components/DonationModal';
import { Button } from '@/components/ui/button';
import { calculatePhilosopherMatch, PhilosopherProfile, Book } from '@/utils/philosophyData';
import { ArrowLeft, Share2, Heart } from 'lucide-react';

const Results = () => {
  const [recommendations, setRecommendations] = useState<Book[]>([]);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has completed the quiz
    const userProfileString = localStorage.getItem('userProfile');
    if (!userProfileString) {
      navigate('/quiz');
      return;
    }

    // Show loading state briefly
    setLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      try {
        const userProfile = JSON.parse(userProfileString) as Partial<PhilosopherProfile>;
        const matchedBooks = calculatePhilosopherMatch(userProfile);
        setRecommendations(matchedBooks);
      } catch (error) {
        console.error('Error calculating recommendations:', error);
      } finally {
        setLoading(false);
        
        // Show donation modal after a delay
        setTimeout(() => {
          setShowDonationModal(true);
        }, 15000);
      }
    }, 1500);
  }, [navigate]);

  const restartJourney = () => {
    navigate('/');
  };

  const shareResults = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Philosophy Recommendations',
        text: `I just discovered my philosophical matches on PhiloPalette! My top recommendation is ${recommendations[0]?.title} by ${recommendations[0]?.author}.`,
        url: window.location.href,
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      console.log('Web Share API not supported');
      // Could implement a custom share modal here
    }
  };

  const getDominantPhilosophy = () => {
    if (recommendations.length === 0) return null;
    
    // Count occurrences of each philosophy movement
    const philosophyCounts: Record<string, number> = {};
    recommendations.slice(0, 3).forEach(book => {
      const movement = book.movement;
      philosophyCounts[movement] = (philosophyCounts[movement] || 0) + 1;
    });
    
    // Find the most frequent philosophy
    let dominantPhilosophy = '';
    let maxCount = 0;
    
    Object.entries(philosophyCounts).forEach(([philosophy, count]) => {
      if (count > maxCount) {
        maxCount = count;
        dominantPhilosophy = philosophy;
      }
    });
    
    return dominantPhilosophy;
  };

  const dominantPhilosophy = getDominantPhilosophy();
  
  // Skeleton loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-24 pb-16">
          <div className="page-container">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h1 className="heading-lg mb-4">Analyzing Your Results</h1>
              <p className="body-text mb-8">
                We're matching your responses with our philosophical database...
              </p>
              
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-accent animate-pulse rounded-full" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((_, index) => (
                <div key={index} className="rounded-lg overflow-hidden animate-pulse">
                  <div className="h-56 bg-secondary" />
                  <div className="p-4 space-y-3">
                    <div className="h-6 bg-secondary rounded w-3/4" />
                    <div className="h-4 bg-secondary rounded w-1/2" />
                    <div className="h-4 bg-secondary rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="page-container">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h1 className="heading-lg mb-4">Your Philosophical Matches</h1>
            
            {dominantPhilosophy && (
              <div className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
                Philosophy Alignment: {dominantPhilosophy}
              </div>
            )}
            
            <p className="body-text">
              Based on your responses, we've identified philosophical works that align with your personality and concerns. These books offer perspectives that may resonate with your current situation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendations.map((book) => (
              <PhilosophyBook
                key={book.id}
                title={book.title}
                author={book.author}
                description={book.description}
                matchPercentage={book.matchPercentage || 0}
                coverImage={book.coverImage}
                affiliateLink={book.affiliateLink}
                year={book.year}
                philosophy={book.movement}
              />
            ))}
          </div>
          
          <div className="mt-16 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              variant="outline"
              onClick={restartJourney}
              className="flex items-center space-x-2"
            >
              <ArrowLeft size={16} />
              <span>Start Again</span>
            </Button>
            
            <Button
              onClick={shareResults}
              className="flex items-center space-x-2"
            >
              <Share2 size={16} />
              <span>Share Results</span>
            </Button>
            
            <Button
              onClick={() => setShowDonationModal(true)}
              className="btn-accent flex items-center space-x-2"
            >
              <Heart size={16} />
              <span>Support This Project</span>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
      
      <DonationModal
        isOpen={showDonationModal}
        onClose={() => setShowDonationModal(false)}
      />
    </div>
  );
};

export default Results;
