import { AIService } from './aiService';

// Developer tools for AI analysis oversight
export class AIDeveloperTools {
  
  // Monitor AI analysis in real-time
  static startMonitoring() {
    console.group('🔍 AI Analysis Monitor Started');
    console.log('📊 All AI analysis will be logged to console');
    console.log('💡 Use AIDeveloperTools.showLogs() to view all logs');
    console.log('🧪 Use AIDeveloperTools.testAnalysis(text) to test analysis');
    console.groupEnd();
    
    AIService.enableLogging();
  }

  // Stop monitoring
  static stopMonitoring() {
    AIService.disableLogging();
    console.log('🔍 AI Analysis Monitor Stopped');
  }

  // Show all analysis logs
  static showLogs() {
    const logs = AIService.getAnalysisLogs();
    
    console.group('📋 AI Analysis Logs');
    console.log(`Total logs: ${logs.length}`);
    
    logs.forEach((log, index) => {
      console.group(`📝 Log ${index + 1} - ${log.type}`);
      console.log(`⏰ Time: ${log.timestamp}`);
      console.log(`📝 Message: ${log.message}`);
      if (log.data) {
        console.log('📊 Data:', log.data);
      }
      console.groupEnd();
    });
    
    console.groupEnd();
    return logs;
  }

  // Clear all logs
  static clearLogs() {
    AIService.clearAnalysisLogs();
    console.log('🗑️ All AI analysis logs cleared');
  }

  // Test analysis with sample text
  static async testAnalysis(text: string) {
    console.group('🧪 AI Analysis Test');
    console.log('Testing with text:', text.substring(0, 100) + '...');
    
    try {
      const result = await AIService.testAnalysis(text);
      console.log('✅ Test completed successfully');
      return result;
    } catch (error) {
      console.error('❌ Test failed:', error);
      throw error;
    } finally {
      console.groupEnd();
    }
  }

  // Test specific analysis functions
  static async testContextExtraction(text: string) {
    console.group('🔍 Testing Context Extraction');
    console.log('Input text length:', text.length);
    
    try {
      const contexts = await AIService.extractPhilosophicalContexts(text);
      console.log('✅ Extracted contexts:', contexts);
      return contexts;
    } catch (error) {
      console.error('❌ Context extraction failed:', error);
      throw error;
    } finally {
      console.groupEnd();
    }
  }

  static async testPersonalityAnalysis(introspectionText: string, quizAnswers: Record<string, string> = {}) {
    console.group('🧠 Testing Personality Analysis');
    console.log('Introspection length:', introspectionText.length);
    console.log('Quiz answers:', quizAnswers);
    
    try {
      const analysis = await AIService.analyzePersonality(introspectionText, quizAnswers);
      console.log('✅ Personality analysis:', analysis);
      return analysis;
    } catch (error) {
      console.error('❌ Personality analysis failed:', error);
      throw error;
    } finally {
      console.groupEnd();
    }
  }

  static async testBookAnalysis(bookTitle: string, bookDescription: string, author: string, movement: string) {
    console.group('📚 Testing Book Analysis');
    console.log('Book:', bookTitle, 'by', author);
    console.log('Movement:', movement);
    
    try {
      const analysis = await AIService.analyzeBook(bookTitle, bookDescription, author, movement);
      console.log('✅ Book analysis:', analysis);
      return analysis;
    } catch (error) {
      console.error('❌ Book analysis failed:', error);
      throw error;
    } finally {
      console.groupEnd();
    }
  }

  // Performance monitoring
  static async measurePerformance(analysisFunction: () => Promise<any>, functionName: string) {
    console.group(`⚡ Performance Test: ${functionName}`);
    const startTime = performance.now();
    
    try {
      const result = await analysisFunction();
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      console.log(`✅ ${functionName} completed in ${duration.toFixed(2)}ms`);
      return { result, duration };
    } catch (error) {
      const endTime = performance.now();
      const duration = endTime - startTime;
      console.error(`❌ ${functionName} failed after ${duration.toFixed(2)}ms:`, error);
      throw error;
    } finally {
      console.groupEnd();
    }
  }

  // Batch testing
  static async batchTest(sampleTexts: string[]) {
    console.group('🧪 Batch Analysis Test');
    console.log(`Testing ${sampleTexts.length} samples`);
    
    const results = [];
    
    for (let i = 0; i < sampleTexts.length; i++) {
      console.log(`\n📝 Sample ${i + 1}/${sampleTexts.length}`);
      try {
        const result = await this.testAnalysis(sampleTexts[i]);
        results.push({ sample: i + 1, success: true, result });
      } catch (error) {
        results.push({ sample: i + 1, success: false, error });
      }
    }
    
    const successCount = results.filter(r => r.success).length;
    console.log(`\n📊 Batch test completed: ${successCount}/${sampleTexts.length} successful`);
    console.groupEnd();
    
    return results;
  }

  // Export logs for external analysis
  static exportLogs() {
    const logs = AIService.getAnalysisLogs();
    const exportData = {
      timestamp: new Date().toISOString(),
      totalLogs: logs.length,
      logs: logs
    };
    
    console.log('📤 Exporting logs:', exportData);
    return exportData;
  }

  // Load sample data for testing
  static getSampleData() {
    return {
      introspectionText: `I've been struggling with questions about the meaning of life and my purpose in the world. 
      I find myself questioning whether my actions have any real significance in the grand scheme of things. 
      I'm particularly interested in understanding how to find meaning in a seemingly indifferent universe, 
      and whether there are objective values or if everything is subjective. I'm also curious about 
      the nature of consciousness and how we can know anything with certainty.`,
      
      quizAnswers: {
        "meaning": "seeking",
        "knowledge": "skeptical", 
        "ethics": "deontological",
        "reality": "materialist",
        "politics": "individualist"
      },
      
      sampleBooks: [
        {
          title: "Meditations",
          author: "Marcus Aurelius",
          description: "Personal writings of the Roman Emperor on Stoic philosophy",
          movement: "Stoicism"
        },
        {
          title: "Thus Spoke Zarathustra", 
          author: "Friedrich Nietzsche",
          description: "Philosophical novel exploring themes of eternal recurrence and the Übermensch",
          movement: "Existentialism"
        }
      ]
    };
  }
}

// Make tools available globally for easy access
declare global {
  interface Window {
    AIDevTools: typeof AIDeveloperTools;
    AIService: typeof AIService;
  }
}

// Expose to window for browser console access
if (typeof window !== 'undefined') {
  window.AIDevTools = AIDeveloperTools;
  window.AIService = AIService;
  
  console.log('🔧 AI Developer Tools loaded!');
  console.log('💡 Available commands:');
  console.log('  - AIDevTools.startMonitoring()');
  console.log('  - AIDevTools.showLogs()');
  console.log('  - AIDevTools.testAnalysis(text)');
  console.log('  - AIDevTools.getSampleData()');
} 