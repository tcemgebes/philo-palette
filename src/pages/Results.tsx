
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PhilosophyBook from '@/components/PhilosophyBook';
import DonationModal from '@/components/DonationModal';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { UserProfile, Book, getRecommendations, extractContextsFromText } from '@/utils/philosophyData';
import { ArrowLeft, Share2, Heart, BookOpen, Bookmark, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

const Results = () => {
  const [recommendations, setRecommendations] = useState<Book[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showPublicDomain, setShowPublicDomain] = useState(false);
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
        const profile = JSON.parse(userProfileString) as UserProfile;
        setUserProfile(profile);
        const matchedBooks = getRecommendations(profile, 6);
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
      alert('Copy this link to share your results: ' + window.location.href);
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

  const getContextKeywords = () => {
    if (!userProfile) return [];
    return extractContextsFromText(userProfile.introspectionText);
  };

  const dominantPhilosophy = getDominantPhilosophy();
  const contextKeywords = getContextKeywords();
  
  // Skeleton loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-retro-black text-retro-sand">
        <Header />
        
        <main className="flex-grow pt-24 pb-16">
          <div className="page-container">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h1 className="font-mono text-2xl md:text-3xl text-retro-gold mb-4">Analyzing Your Results</h1>
              <p className="font-mono text-retro-sand mb-8">
                We're matching your responses with our philosophical database...
              </p>
              
              <div className="w-full h-2 bg-retro-sand/30">
                <div className="h-full bg-retro-gold animate-pulse" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((_, index) => (
                <div key={index} className="border border-retro-sand/30 animate-pulse">
                  <div className="h-56 bg-retro-sand/10" />
                  <div className="p-4 space-y-3">
                    <div className="h-6 bg-retro-sand/10 w-3/4" />
                    <div className="h-4 bg-retro-sand/10 w-1/2" />
                    <div className="h-4 bg-retro-sand/10 w-full" />
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
    <div className="min-h-screen flex flex-col bg-retro-black text-retro-sand">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="page-container">
          <div className="max-w-4xl mx-auto mb-12">
            <div className="text-center mb-8">
              <h1 className="font-mono text-2xl md:text-3xl text-retro-gold mb-4">Your Philosophical Matches</h1>
              
              {dominantPhilosophy && (
                <div className="inline-block px-4 py-2 bg-retro-black border border-retro-gold text-retro-gold font-mono mb-4">
                  Philosophical Alignment: {dominantPhilosophy}
                </div>
              )}
            </div>
            
            <Card className="p-6 bg-retro-black/50 border border-retro-sand/30 mb-8">
              <h2 className="font-mono text-xl text-retro-gold mb-3">Your Philosophical Profile</h2>
              
              {contextKeywords.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-mono text-sm text-retro-sand mb-2">Key themes from your introspection:</h3>
                  <div className="flex flex-wrap gap-2">
                    {contextKeywords.map((keyword, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 bg-retro-black border border-retro-sand/50 text-retro-gold text-xs font-mono"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <p className="font-mono text-sm text-retro-sand mb-4">
                Based on your responses, we've identified philosophical works that {userProfile?.wantsContrast ? 'challenge' : 'align with'} your perspective. 
                These books offer insights that may resonate with your current situation.
              </p>
              
              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => setShowPublicDomain(!showPublicDomain)}
                  className="font-mono text-xs border-retro-sand text-retro-sand hover:text-retro-gold hover:bg-retro-black/50 rounded-none"
                >
                  {showPublicDomain ? (
                    <>Show Paid Books</>
                  ) : (
                    <>Show Public Domain Works</>
                  )}
                </Button>
              </div>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recommendations
                .filter(book => showPublicDomain ? book.isPublicDomain : true)
                .map((book) => (
                  <PhilosophyBook
                    key={book.id}
                    title={book.title}
                    author={book.author}
                    description={book.description}
                    shortSummary={book.shortSummary}
                    matchPercentage={book.matchPercentage || 0}
                    coverImage={book.coverImage}
                    affiliateLink={book.affiliateLink}
                    publicDomainLink={book.publicDomainLink}
                    year={book.year}
                    philosophy={book.movement}
                    isPublicDomain={book.isPublicDomain}
                    era={book.era}
                    context={book.contextRespondedTo?.join(', ')}
                  />
                ))}
            </div>
            
            {recommendations.length === 0 && (
              <div className="text-center p-12 border border-retro-sand/30">
                <p className="text-retro-gold font-mono">No matching books found. Please try again with different responses.</p>
              </div>
            )}
            
            <div className="mt-16 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                variant="outline"
                onClick={restartJourney}
                className="flex items-center space-x-2 font-mono border-retro-sand text-retro-sand hover:text-retro-gold hover:bg-retro-black/50 rounded-none"
              >
                <ArrowLeft size={16} />
                <span>Start Again</span>
              </Button>
              
              <Button
                onClick={shareResults}
                className="flex items-center space-x-2 font-mono bg-retro-sand text-retro-black hover:bg-retro-gold rounded-none"
              >
                <Share2 size={16} />
                <span>Share Results</span>
              </Button>
              
              <Button
                onClick={() => setShowDonationModal(true)}
                className="flex items-center space-x-2 font-mono bg-retro-gold text-retro-black hover:bg-retro-sand rounded-none"
              >
                <Heart size={16} />
                <span>Support This Project</span>
              </Button>
            </div>
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
