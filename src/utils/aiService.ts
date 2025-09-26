import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';

// Initialize AI clients with API keys from environment variables
const openai = new OpenAI({ 
  apiKey: process.env.REACT_APP_OPENAI_API_KEY || '', 
});

const anthropic = new Anthropic({ 
  apiKey: process.env.REACT_APP_ANTHROPIC_API_KEY || '', 
});

// Enhanced logging system for AI analysis transparency
class AILogger {
  private static instance: AILogger;
  private logs: Array<{timestamp: string, type: string, message: string, data?: any}> = [];
  private isEnabled: boolean = true;

  static getInstance(): AILogger {
    if (!AILogger.instance) {
      AILogger.instance = new AILogger();
    }
    return AILogger.instance;
  }

  log(type: string, message: string, data?: any) {
    const timestamp = new Date().toISOString();
    const logEntry = { timestamp, type, message, data };
    this.logs.push(logEntry);
    
    if (this.isEnabled) {
      console.group(`🤖 AI Analysis: ${type}`);
      console.log(`⏰ ${timestamp}`);
      console.log(`📝 ${message}`);
      if (data) {
        console.log('📊 Data:', data);
      }
      console.groupEnd();
    }
  }

  startAnalysis(analysisType: string) {
    this.log('START', `Beginning ${analysisType} analysis`);
  }

  endAnalysis(analysisType: string, result: any) {
    this.log('END', `Completed ${analysisType} analysis`, result);
  }

  error(analysisType: string, error: any) {
    this.log('ERROR', `Error in ${analysisType} analysis`, error);
  }

  getLogs() {
    return this.logs;
  }

  clearLogs() {
    this.logs = [];
  }

  enable() {
    this.isEnabled = true;
  }

  disable() {
    this.isEnabled = false;
  }
}

// Interfaces for AI-generated personality and book analysis
export interface AIPersonalityAnalysis {
  bigFiveTraits: {
    openness: number;
    conscientiousness: number;
    extraversion: number;
    agreeableness: number;
    neuroticism: number;
  };
  philosophicalDimensions: {
    epistemologicalStyle: 'rationalist' | 'empiricist' | 'skeptic' | 'pragmatist';
    ethicalFramework: 'deontological' | 'consequentialist' | 'virtue' | 'care';
    metaphysicalTendency: 'materialist' | 'idealist' | 'dualist' | 'neutral';
  };
  lifeContext: {
    currentChallenges: string[];
    lifeStage: 'student' | 'early-career' | 'mid-career' | 'late-career' | 'retirement';
    emotionalState: 'optimistic' | 'pessimistic' | 'neutral' | 'seeking';
  };
  readingPreferences: {
    complexityLevel: 'beginner' | 'intermediate' | 'advanced';
    preferredTopics: string[];
    readingStyle: 'analytical' | 'emotional' | 'practical' | 'theoretical';
  };
  philosophicalInterests: {
    primaryAreas: string[];
    currentQuestions: string[];
    learningGoals: string[];
  };
  confidenceScore: number;
  analysisNotes: string;
}

export interface BookAnalysis {
  keyThemes: string[];
  complexityLevel: 'beginner' | 'intermediate' | 'advanced';
  targetAudience: string[];
  philosophicalApproach: string;
  practicalApplications: string[];
  potentialChallenges: string[];
  readingRecommendations: string[];
  analysisConfidence: number;
}

export class AIService {
  private static logger = AILogger.getInstance();

  static async analyzePersonality(
    introspectionText: string, 
    quizAnswers: Record<string, string>, 
    additionalContext?: string
  ): Promise<AIPersonalityAnalysis> {
    this.logger.startAnalysis('Personality Analysis');
    
    try {
      this.logger.log('INPUT', 'Received introspection text', {
        textLength: introspectionText.length,
        wordCount: introspectionText.split(' ').length,
        quizAnswersCount: Object.keys(quizAnswers).length
      });

      // Create detailed prompt for personality analysis
      const prompt = `
You are an expert philosophical counselor and personality analyst. Analyze the following user's introspection and quiz responses to create a comprehensive personality profile.

USER'S INTROSPECTION:
${introspectionText}

QUIZ RESPONSES:
${JSON.stringify(quizAnswers, null, 2)}

ADDITIONAL CONTEXT:
${additionalContext || 'None provided'}

Please provide a detailed analysis in the following JSON format:

{
  "bigFiveTraits": {
    "openness": <0-100 score>,
    "conscientiousness": <0-100 score>,
    "extraversion": <0-100 score>,
    "agreeableness": <0-100 score>,
    "neuroticism": <0-100 score>
  },
  "philosophicalDimensions": {
    "epistemologicalStyle": "<rationalist|empiricist|skeptic|pragmatist>",
    "ethicalFramework": "<deontological|consequentialist|virtue|care>",
    "metaphysicalTendency": "<materialist|idealist|dualist|neutral>"
  },
  "lifeContext": {
    "currentChallenges": ["challenge1", "challenge2"],
    "lifeStage": "<student|early-career|mid-career|late-career|retirement>",
    "emotionalState": "<optimistic|pessimistic|neutral|seeking>"
  },
  "readingPreferences": {
    "complexityLevel": "<beginner|intermediate|advanced>",
    "preferredTopics": ["topic1", "topic2"],
    "readingStyle": "<analytical|emotional|practical|theoretical>"
  },
  "philosophicalInterests": {
    "primaryAreas": ["area1", "area2"],
    "currentQuestions": ["question1", "question2"],
    "learningGoals": ["goal1", "goal2"]
  },
  "confidenceScore": <0-100>,
  "analysisNotes": "Detailed explanation of your analysis process and reasoning"
}

Focus on:
1. Extracting personality traits from the introspection text
2. Identifying philosophical inclinations and interests
3. Understanding current life challenges and context
4. Determining appropriate reading complexity and style
5. Providing specific philosophical areas of interest

Be thorough and analytical in your assessment.
`;

      this.logger.log('PROMPT', 'Sending analysis prompt to OpenAI', {
        promptLength: prompt.length,
        model: 'gpt-4'
      });

      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert philosophical counselor and personality analyst. Provide detailed, accurate analysis in JSON format.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 2000
      });

      this.logger.log('RESPONSE', 'Received response from OpenAI', {
        responseLength: response.choices[0].message.content?.length,
        tokensUsed: response.usage?.total_tokens
      });

      const content = response.choices[0].message.content;
      if (!content) {
        throw new Error('No response content received from OpenAI');
      }

      // Parse the JSON response
      let analysis: AIPersonalityAnalysis;
      try {
        // Extract JSON from the response (in case there's extra text)
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          throw new Error('No JSON found in response');
        }
        
        analysis = JSON.parse(jsonMatch[0]);
        this.logger.log('PARSED', 'Successfully parsed analysis result', {
          hasBigFive: !!analysis.bigFiveTraits,
          hasPhilosophicalDimensions: !!analysis.philosophicalDimensions,
          confidenceScore: analysis.confidenceScore
        });
      } catch (parseError) {
        this.logger.error('Personality Analysis', `JSON parsing failed: ${parseError}`);
        throw new Error(`Failed to parse AI response: ${parseError}`);
      }

      this.logger.endAnalysis('Personality Analysis', analysis);
      return analysis;

    } catch (error) {
      this.logger.error('Personality Analysis', error);
      throw error;
    }
  }

  static async analyzeBook(
    bookTitle: string,
    bookDescription: string,
    author: string,
    movement: string,
    additionalText?: string
  ): Promise<BookAnalysis> {
    this.logger.startAnalysis('Book Analysis');
    
    try {
      this.logger.log('INPUT', 'Analyzing book', {
        title: bookTitle,
        author: author,
        movement: movement,
        hasAdditionalText: !!additionalText
      });

      const prompt = `
You are an expert philosophical book analyst. Analyze the following book to understand its key themes, complexity, and target audience.

BOOK INFORMATION:
Title: ${bookTitle}
Author: ${author}
Philosophical Movement: ${movement}
Description: ${bookDescription}
${additionalText ? `Additional Text: ${additionalText}` : ''}

Please provide a detailed analysis in the following JSON format:

{
  "keyThemes": ["theme1", "theme2", "theme3"],
  "complexityLevel": "<beginner|intermediate|advanced>",
  "targetAudience": ["audience1", "audience2"],
  "philosophicalApproach": "Description of the philosophical approach",
  "practicalApplications": ["application1", "application2"],
  "potentialChallenges": ["challenge1", "challenge2"],
  "readingRecommendations": ["recommendation1", "recommendation2"],
  "analysisConfidence": <0-100>
}

Focus on:
1. Identifying core philosophical themes and arguments
2. Assessing the complexity level for different readers
3. Understanding the target audience and their needs
4. Highlighting practical applications and challenges
5. Providing specific reading recommendations
`;

      this.logger.log('PROMPT', 'Sending book analysis prompt to OpenAI', {
        promptLength: prompt.length,
        model: 'gpt-4'
      });

      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert philosophical book analyst. Provide detailed, accurate analysis in JSON format.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 1500
      });

      this.logger.log('RESPONSE', 'Received book analysis response', {
        responseLength: response.choices[0].message.content?.length,
        tokensUsed: response.usage?.total_tokens
      });

      const content = response.choices[0].message.content;
      if (!content) {
        throw new Error('No response content received from OpenAI');
      }

      // Parse the JSON response
      let analysis: BookAnalysis;
      try {
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          throw new Error('No JSON found in response');
        }
        
        analysis = JSON.parse(jsonMatch[0]);
        this.logger.log('PARSED', 'Successfully parsed book analysis', {
          themesCount: analysis.keyThemes?.length,
          complexityLevel: analysis.complexityLevel,
          confidenceScore: analysis.analysisConfidence
        });
      } catch (parseError) {
        this.logger.error('Book Analysis', `JSON parsing failed: ${parseError}`);
        throw new Error(`Failed to parse book analysis: ${parseError}`);
      }

      this.logger.endAnalysis('Book Analysis', analysis);
      return analysis;

    } catch (error) {
      this.logger.error('Book Analysis', error);
      throw error;
    }
  }

  static async generateRecommendations(
    userProfile: AIPersonalityAnalysis,
    availableBooks: any[],
    maxRecommendations: number = 6
  ): Promise<any[]> {
    this.logger.startAnalysis('Recommendation Generation');
    
    try {
      this.logger.log('INPUT', 'Generating recommendations', {
        userProfileKeys: Object.keys(userProfile),
        availableBooksCount: availableBooks.length,
        maxRecommendations
      });

      const prompt = `
You are an expert philosophical book recommendation system. Based on the user's personality profile, recommend the most suitable books from the available list.

USER PROFILE:
${JSON.stringify(userProfile, null, 2)}

AVAILABLE BOOKS:
${JSON.stringify(availableBooks, null, 2)}

Please provide recommendations in the following JSON format:

{
  "recommendations": [
    {
      "bookId": "book_id",
      "matchPercentage": <0-100>,
      "reasoning": "Detailed explanation of why this book matches the user",
      "expectedImpact": "What the user might gain from this book",
      "readingOrder": <1-6>
    }
  ],
  "overallStrategy": "Explanation of the recommendation strategy used",
  "confidenceScore": <0-100>
}

Consider:
1. Alignment with user's philosophical interests
2. Appropriate complexity level
3. Relevance to current life challenges
4. Balance between aligned and contrasting viewpoints
5. Reading progression and learning path
`;

      this.logger.log('PROMPT', 'Sending recommendation prompt to OpenAI', {
        promptLength: prompt.length,
        model: 'gpt-4'
      });

      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert philosophical book recommendation system. Provide detailed, accurate recommendations in JSON format.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 2000
      });

      this.logger.log('RESPONSE', 'Received recommendation response', {
        responseLength: response.choices[0].message.content?.length,
        tokensUsed: response.usage?.total_tokens
      });

      const content = response.choices[0].message.content;
      if (!content) {
        throw new Error('No response content received from OpenAI');
      }

      // Parse the JSON response
      let recommendations: any;
      try {
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          throw new Error('No JSON found in response');
        }
        
        recommendations = JSON.parse(jsonMatch[0]);
        this.logger.log('PARSED', 'Successfully parsed recommendations', {
          recommendationsCount: recommendations.recommendations?.length,
          confidenceScore: recommendations.confidenceScore
        });
      } catch (parseError) {
        this.logger.error('Recommendation Generation', `JSON parsing failed: ${parseError}`);
        throw new Error(`Failed to parse recommendations: ${parseError}`);
      }

      this.logger.endAnalysis('Recommendation Generation', recommendations);
      return recommendations.recommendations || [];

    } catch (error) {
      this.logger.error('Recommendation Generation', error);
      throw error;
    }
  }

  static async extractPhilosophicalContexts(text: string): Promise<string[]> {
    this.logger.startAnalysis('Context Extraction');
    
    try {
      this.logger.log('INPUT', 'Extracting philosophical contexts', {
        textLength: text.length,
        wordCount: text.split(' ').length
      });

      const prompt = `
Extract key philosophical themes, concepts, and contexts from the following text. Focus on identifying philosophical questions, concerns, and areas of interest.

TEXT:
${text}

Return a JSON array of philosophical contexts, themes, and concepts:

["context1", "context2", "context3"]

Focus on:
1. Philosophical questions being asked
2. Life challenges with philosophical dimensions
3. Areas of intellectual curiosity
4. Ethical or moral concerns
5. Existential questions
6. Epistemological interests
`;

      this.logger.log('PROMPT', 'Sending context extraction prompt to OpenAI', {
        promptLength: prompt.length,
        model: 'gpt-3.5-turbo'
      });

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are an expert at identifying philosophical themes and contexts in text. Return results as a JSON array.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.2,
        max_tokens: 500
      });

      this.logger.log('RESPONSE', 'Received context extraction response', {
        responseLength: response.choices[0].message.content?.length,
        tokensUsed: response.usage?.total_tokens
      });

      const content = response.choices[0].message.content;
      if (!content) {
        throw new Error('No response content received from OpenAI');
      }

      // Parse the JSON response
      let contexts: string[];
      try {
        const jsonMatch = content.match(/\[[\s\S]*\]/);
        if (!jsonMatch) {
          throw new Error('No JSON array found in response');
        }
        
        contexts = JSON.parse(jsonMatch[0]);
        this.logger.log('PARSED', 'Successfully extracted contexts', {
          contextsCount: contexts.length,
          contexts: contexts
        });
      } catch (parseError) {
        this.logger.error('Context Extraction', `JSON parsing failed: ${parseError}`);
        throw new Error(`Failed to parse contexts: ${parseError}`);
      }

      this.logger.endAnalysis('Context Extraction', contexts);
      return contexts;

    } catch (error) {
      this.logger.error('Context Extraction', error);
      throw error;
    }
  }

  // Developer tools for oversight
  static getAnalysisLogs() {
    return AILogger.getInstance().getLogs();
  }

  static clearAnalysisLogs() {
    AILogger.getInstance().clearLogs();
  }

  static enableLogging() {
    AILogger.getInstance().enable();
  }

  static disableLogging() {
    AILogger.getInstance().disable();
  }

  // Test function for manual analysis
  static async testAnalysis(text: string) {
    console.group('🧪 AI Analysis Test');
    console.log('Testing analysis with text:', text.substring(0, 100) + '...');
    
    try {
      const contexts = await this.extractPhilosophicalContexts(text);
      console.log('✅ Extracted contexts:', contexts);
      
      const mockQuizAnswers = { question1: 'answer1', question2: 'answer2' };
      const personality = await this.analyzePersonality(text, mockQuizAnswers);
      console.log('✅ Personality analysis:', personality);
      
      return { contexts, personality };
    } catch (error) {
      console.error('❌ Analysis test failed:', error);
      throw error;
    } finally {
      console.groupEnd();
    }
  }
}