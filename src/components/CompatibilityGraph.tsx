import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AIPersonalityAnalysis } from '@/utils/aiService';
import { PhilosopherProfile } from '@/utils/philosophyData';
import { Brain, Target, TrendingUp, Users } from 'lucide-react';

interface CompatibilityGraphProps {
  userProfile: AIPersonalityAnalysis;
  philosopherProfile: PhilosopherProfile;
  philosopherName: string;
  matchPercentage: number;
}

const CompatibilityGraph: React.FC<CompatibilityGraphProps> = ({
  userProfile,
  philosopherProfile,
  philosopherName,
  matchPercentage
}) => {
  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-500';
    if (percentage >= 60) return 'text-yellow-500';
    if (percentage >= 40) return 'text-blue-500';
    return 'text-red-500';
  };

  const getMatchBadgeVariant = (percentage: number) => {
    if (percentage >= 80) return 'default';
    if (percentage >= 60) return 'secondary';
    if (percentage >= 40) return 'outline';
    return 'destructive';
  };

  const compareTraits = () => {
    const traits = ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'neuroticism'];
    return traits.map(trait => {
      const userValue = userProfile.bigFive[trait as keyof typeof userProfile.bigFive];
      const philosopherValue = philosopherProfile[trait as keyof PhilosopherProfile] as number;
      const difference = Math.abs(userValue - philosopherValue);
      const similarity = 100 - difference;
      
      return {
        trait,
        userValue,
        philosopherValue,
        similarity,
        difference
      };
    });
  };

  const traitComparisons = compareTraits();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          Compatibility with {philosopherName}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Match Score */}
        <div className="text-center space-y-2">
          <div className="text-3xl font-bold">
            <span className={getMatchColor(matchPercentage)}>{matchPercentage}%</span>
          </div>
          <Badge variant={getMatchBadgeVariant(matchPercentage)}>
            {matchPercentage >= 80 ? 'Excellent Match' : 
             matchPercentage >= 60 ? 'Good Match' : 
             matchPercentage >= 40 ? 'Moderate Match' : 'Poor Match'}
          </Badge>
        </div>

        {/* Trait Comparison */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm flex items-center gap-2">
            <Users className="h-4 w-4" />
            Personality Trait Comparison
          </h4>
          <div className="space-y-3">
            {traitComparisons.map((comparison) => (
              <div key={comparison.trait} className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="capitalize">
                    {comparison.trait.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className={`font-bold ${getMatchColor(comparison.similarity)}`}>
                    {comparison.similarity}% Similar
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>You: {comparison.userValue}%</span>
                      <span>{philosopherName}: {comparison.philosopherValue}%</span>
                    </div>
                    <div className="relative h-2 bg-gray-200 rounded">
                      <div 
                        className="absolute h-2 bg-primary rounded"
                        style={{ 
                          width: `${comparison.similarity}%`,
                          backgroundColor: comparison.similarity >= 80 ? '#10b981' : 
                                         comparison.similarity >= 60 ? '#f59e0b' : 
                                         comparison.similarity >= 40 ? '#3b82f6' : '#ef4444'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Philosophical Alignment */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm flex items-center gap-2">
            <Target className="h-4 w-4" />
            Philosophical Alignment
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h5 className="text-xs font-medium text-muted-foreground">Your Approach</h5>
              <div className="space-y-1">
                <Badge variant="outline" className="text-xs">
                  {userProfile.philosophicalDimensions.epistemologicalStyle}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {userProfile.philosophicalDimensions.ethicalFramework}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {userProfile.philosophicalDimensions.metaphysicalTendency}
                </Badge>
              </div>
            </div>
            <div className="space-y-2">
              <h5 className="text-xs font-medium text-muted-foreground">Philosopher's Approach</h5>
              <div className="space-y-1">
                <Badge variant="secondary" className="text-xs">
                  {philosopherProfile.tone}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {philosopherProfile.practicality > 70 ? 'Practical' : 
                   philosopherProfile.practicality < 30 ? 'Theoretical' : 'Balanced'}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {philosopherProfile.dogmaSkeptic > 70 ? 'Skeptical' : 
                   philosopherProfile.dogmaSkeptic < 30 ? 'Dogmatic' : 'Moderate'}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Life Context Match */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Life Context Relevance
          </h4>
          <div className="space-y-2">
            <div>
              <h5 className="text-xs font-medium text-muted-foreground mb-2">Your Current Challenges</h5>
              <div className="flex flex-wrap gap-1">
                {userProfile.lifeContext.currentChallenges.map((challenge, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {challenge}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h5 className="text-xs font-medium text-muted-foreground mb-2">Philosopher's Themes</h5>
              <div className="flex flex-wrap gap-1">
                {philosopherProfile.themes.slice(0, 3).map((theme, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {theme}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Match Explanation */}
        <div className="p-4 bg-muted rounded-lg">
          <h4 className="font-medium text-sm mb-2">Why This Match Works</h4>
          <p className="text-sm text-muted-foreground">
            {matchPercentage >= 80 ? 
              `You and ${philosopherName} share similar approaches to life's fundamental questions. Their perspective on ${philosopherProfile.themes[0]} aligns well with your current challenges and philosophical interests.` :
             matchPercentage >= 60 ?
              `${philosopherName}'s work offers valuable insights that complement your current perspective. While you may differ in some areas, their approach to ${philosopherProfile.themes[0]} could provide fresh perspectives.` :
             matchPercentage >= 40 ?
              `${philosopherName} represents a contrasting viewpoint that could challenge and expand your thinking. Their focus on ${philosopherProfile.themes[0]} offers an alternative perspective to consider.` :
              `${philosopherName}'s approach differs significantly from your current perspective, which could provide valuable contrasting viewpoints and intellectual growth opportunities.`
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompatibilityGraph; 