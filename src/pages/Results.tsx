
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PhilosophyBook from '@/components/PhilosophyBook';
import DonationModal from '@/components/DonationModal';
import BookDatabaseStatus from '@/components/BookDatabaseStatus';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { UserProfile, Book, getRecommendations, extractContextsFromText, initializeBookDatabase } from '@/utils/philosophyData';
import { ArrowLeft, Share2, Heart, BookOpen, Bookmark, Download, RotateCw } from 'lucide-react';
import { cn } from '@/lib/utils';

const Results = () => {
  const [recommendations, setRecommendations] = useState<Book[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showPublicDomain, setShowPublicDomain] = useState(false);
  const [filterMode, setFilterMode] = useState<'all' | 'publicDomain' | 'modern'>('all');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has completed the quiz
    const userProfileString = localStorage.getItem('userProfile');
    if (!userProfileString) {
      navigate('/quiz');
      return;
    }

    // Show loading state
    setLoading(true);
    
    // Initialize book database first, then generate recommendations
    initializeBookDatabase()
      .then(() => {
        try {
          const profile = JSON.parse(userProfileString) as UserProfile;
          setUserProfile(profile);
          const matchedBooks = getRecommendations(profile, 12); // Increase to 12 books
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
      })
      .catch(error => {
        console.error('Error initializing book database:', error);
        setLoading(false);
      });
  }, [navigate]);

  const regenerateRecommendations = () => {
    if (!userProfile) return;
    
    setLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      try {
        // Create a slightly modified profile to get different recommendations
        const modifiedProfile = {
          ...userProfile,
          personalityTraits: {
            ...userProfile.personalityTraits,
            // Slightly modify a trait to get different but still relevant recommendations
            openness: Math.min(100, Math.max(0, (userProfile.personalityTraits.openness || 50) + (Math.random() * 20 - 10)))
          }
        };
        
        const matchedBooks = getRecommendations(modifiedProfile, 12);
        setRecommendations(matchedBooks);
      } catch (error) {
        console.error('Error regenerating recommendations:', error);
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

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
    return userProfile.enhancedProfile?.extractedContexts || 
           extractContextsFromText(userProfile.introspectionText);
  };

  const getFilteredBooks = () => {
    switch (filterMode) {
      case 'publicDomain':
        return recommendations.filter(book => book.isPublicDomain);
      case 'modern':
        return recommendations.filter(book => !book.isPublicDomain);
      default:
        return recommendations;
    }
  };

  const dominantPhilosophy = getDominantPhilosophy();
  const contextKeywords = getContextKeywords();
  const filteredBooks = getFilteredBooks();
  
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
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="md:col-span-3">
                <Card className="p-6 bg-retro-black/50 border border-retro-sand/30">
                  <h2 className="font-mono text-xl text-retro-gold mb-3">Your Philosophical Profile</h2>
                  
                  {contextKeywords.length > 0 && (
                    <div className="mb-4">
                      <h3 className="font-mono text-sm text-retro-sand mb-2">Key themes from your introspection:</h3>
                      <div className="flex flex-wrap gap-2">
                        {contextKeywords.slice(0, 8).map((keyword, index) => (
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
                    Based on your responses, we've identified philosophical works that 
                    {userProfile?.wantsContrast ? ' challenge' : ' align with'} your perspective. 
                    These books offer insights that may resonate with your current situation and personality variations.
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setFilterMode('all')}
                      className={cn(
                        "font-mono text-xs border-retro-sand rounded-none",
                        filterMode === 'all' 
                          ? "bg-retro-gold text-retro-black hover:bg-retro-sand border-retro-gold" 
                          : "text-retro-sand hover:text-retro-gold hover:bg-retro-black/50"
                      )}
                    >
                      All Books
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setFilterMode('publicDomain')}
                      className={cn(
                        "font-mono text-xs border-retro-sand rounded-none",
                        filterMode === 'publicDomain' 
                          ? "bg-retro-gold text-retro-black hover:bg-retro-sand border-retro-gold" 
                          : "text-retro-sand hover:text-retro-gold hover:bg-retro-black/50"
                      )}
                    >
                      Free Public Domain
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setFilterMode('modern')}
                      className={cn(
                        "font-mono text-xs border-retro-sand rounded-none",
                        filterMode === 'modern' 
                          ? "bg-retro-gold text-retro-black hover:bg-retro-sand border-retro-gold" 
                          : "text-retro-sand hover:text-retro-gold hover:bg-retro-black/50"
                      )}
                    >
                      Modern Works
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={regenerateRecommendations}
                      className="font-mono text-xs border-retro-sand text-retro-sand hover:text-retro-gold hover:bg-retro-black/50 rounded-none ml-auto"
                    >
                      <RotateCw size={14} className="mr-1" />
                      Refresh Results
                    </Button>
                  </div>
                </Card>
              </div>
              
              <div className="md:col-span-1">
                <BookDatabaseStatus />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBooks.map((book) => (
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
            
            {filteredBooks.length === 0 && (
              <div className="text-center p-12 border border-retro-sand/30">
                <p className="text-retro-gold font-mono">No matching books found. Please try again with different responses or try a different filter.</p>
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
