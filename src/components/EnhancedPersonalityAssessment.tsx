import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { AIService, AIPersonalityAnalysis } from '@/utils/aiService';
import { Brain, Lightbulb, BookOpen, Target, TrendingUp, Users, Zap } from 'lucide-react';

interface EnhancedPersonalityAssessmentProps {
  onAnalysisComplete: (analysis: AIPersonalityAnalysis) => void;
  introspectionText: string;
  quizAnswers: Record<string, string>;
  isLoading?: boolean;
}

const EnhancedPersonalityAssessment: React.FC<EnhancedPersonalityAssessmentProps> = ({
  onAnalysisComplete,
  introspectionText,
  quizAnswers,
  isLoading = false
}) => {
  const [analysis, setAnalysis] = useState<AIPersonalityAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (introspectionText && Object.keys(quizAnswers).length > 0) {
      performAnalysis();
    }
  }, [introspectionText, quizAnswers]);

  const performAnalysis = async () => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const aiAnalysis = await AIService.analyzePersonality(
        introspectionText,
        quizAnswers
      );
      
      setAnalysis(aiAnalysis);
      onAnalysisComplete(aiAnalysis);
    } catch (err) {
      setError('Failed to analyze personality. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'bg-green-500';
    if (confidence >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getTraitColor = (value: number) => {
    if (value >= 80) return 'text-green-500';
    if (value >= 60) return 'text-yellow-500';
    if (value >= 40) return 'text-blue-500';
    return 'text-gray-500';
  };

  if (isLoading || isAnalyzing) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Personality Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              <span>Analyzing your responses with AI...</span>
            </div>
            <Progress value={isAnalyzing ? 75 : 25} className="w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent>
          <div className="text-center space-y-4">
            <div className="text-red-500">⚠️ {error}</div>
            <Button onClick={performAnalysis} variant="outline">
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!analysis) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Confidence Score */}
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Analysis Confidence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className={`w-4 h-4 rounded-full ${getConfidenceColor(analysis.confidence)}`}></div>
            <span className="text-lg font-semibold">{analysis.confidence}% Confidence</span>
            <Badge variant="secondary">
              {analysis.confidence >= 80 ? 'High' : analysis.confidence >= 60 ? 'Medium' : 'Low'}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            This indicates how confident our AI is in understanding your philosophical profile.
          </p>
        </CardContent>
      </Card>

      {/* Big Five Personality */}
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Personality Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(analysis.bigFive).map(([trait, value]) => (
              <div key={trait} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium capitalize">
                    {trait.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className={`text-sm font-bold ${getTraitColor(value)}`}>
                    {value}%
                  </span>
                </div>
                <Progress value={value} className="w-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Philosophical Dimensions */}
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Philosophical Dimensions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Epistemological Style</h4>
              <Badge variant="outline" className="w-full justify-center">
                {analysis.philosophicalDimensions.epistemologicalStyle}
              </Badge>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Ethical Framework</h4>
              <Badge variant="outline" className="w-full justify-center">
                {analysis.philosophicalDimensions.ethicalFramework}
              </Badge>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Metaphysical Tendency</h4>
              <Badge variant="outline" className="w-full justify-center">
                {analysis.philosophicalDimensions.metaphysicalTendency}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Life Context */}
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Life Context
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-sm mb-2">Current Challenges</h4>
              <div className="flex flex-wrap gap-2">
                {analysis.lifeContext.currentChallenges.map((challenge, index) => (
                  <Badge key={index} variant="secondary">
                    {challenge}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-sm mb-2">Life Stage</h4>
                <Badge variant="outline">
                  {analysis.lifeContext.lifeStage.replace('-', ' ')}
                </Badge>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-2">Emotional State</h4>
                <Badge variant="outline">
                  {analysis.lifeContext.emotionalState}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reading Preferences */}
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Reading Preferences
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-sm mb-2">Complexity Level</h4>
                <Badge variant="outline">
                  {analysis.readingPreferences.complexityLevel}
                </Badge>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-2">Reading Style</h4>
                <Badge variant="outline">
                  {analysis.readingPreferences.readingStyle}
                </Badge>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-2">Preferred Themes</h4>
              <div className="flex flex-wrap gap-2">
                {analysis.readingPreferences.preferredThemes.map((theme, index) => (
                  <Badge key={index} variant="secondary">
                    {theme}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Philosophical Interests */}
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Philosophical Interests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {analysis.philosophicalInterests.map((interest, index) => (
              <Badge key={index} variant="default">
                {interest}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedPersonalityAssessment; 