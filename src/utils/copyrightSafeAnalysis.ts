import { AIService } from './aiService';

export interface CopyrightSafeText {
  id: string;
  title: string;
  author: string;
  text: string;
  source: 'gutenberg' | 'archive' | 'hathitrust' | 'creative-commons';
  license: string;
  year: string;
  isPublicDomain: boolean;
  ccLicense?: string;
}

export interface TextAnalysisResult {
  philosophicalThemes: string[];
  complexityLevel: number;
  targetAudience: string[];
  keyInsights: string[];
  emotionalTone: 'optimistic' | 'pessimistic' | 'neutral' | 'complex';
  philosophicalApproach: string;
  readingPrerequisites: string[];
  copyrightStatus: 'public-domain' | 'creative-commons' | 'fair-use' | 'unknown';
  usageRights: string[];
}

export class CopyrightSafeAnalysis {
  /**
   * Analyze only copyright-safe philosophical texts
   */
  static async analyzePublicDomainText(
    text: CopyrightSafeText
  ): Promise<TextAnalysisResult> {
    // Verify copyright status before analysis
    if (!this.isCopyrightSafe(text)) {
      throw new Error('Text is not copyright-safe for analysis');
    }

    try {
      const analysis = await AIService.analyzeBook(
        text.title,
        text.text.substring(0, 2000), // Use excerpt for analysis
        text.author,
        'philosophy',
        text.text.substring(0, 500) // Additional context
      );

      return {
        ...analysis,
        copyrightStatus: this.getCopyrightStatus(text),
        usageRights: this.getUsageRights(text)
      };
    } catch (error) {
      console.error('Error analyzing text:', error);
      throw new Error('Failed to analyze text');
    }
  }

  /**
   * Check if text is safe for analysis
   */
  static isCopyrightSafe(text: CopyrightSafeText): boolean {
    // Public domain works (before 1928 in US)
    if (text.isPublicDomain) return true;
    
    // Creative Commons licenses
    if (text.ccLicense && this.isCreativeCommonsSafe(text.ccLicense)) return true;
    
    // Fair use for educational analysis
    if (this.isFairUse(text)) return true;
    
    return false;
  }

  /**
   * Check if Creative Commons license allows analysis
   */
  static isCreativeCommonsSafe(license: string): boolean {
    const safeLicenses = [
      'CC-BY',
      'CC-BY-SA', 
      'CC-0',
      'CC-BY-NC',
      'CC-BY-NC-SA'
    ];
    
    return safeLicenses.some(safe => license.includes(safe));
  }

  /**
   * Determine if text qualifies for fair use analysis
   */
  static isFairUse(text: CopyrightSafeText): boolean {
    // Educational purpose
    const isEducational = true;
    
    // Transformative use (creating new insights)
    const isTransformative = true;
    
    // Limited excerpt (using small portions)
    const isLimitedExcerpt = text.text.length < 10000; // 10k characters
    
    return isEducational && isTransformative && isLimitedExcerpt;
  }

  /**
   * Get copyright status for display
   */
  static getCopyrightStatus(text: CopyrightSafeText): TextAnalysisResult['copyrightStatus'] {
    if (text.isPublicDomain) return 'public-domain';
    if (text.ccLicense) return 'creative-commons';
    if (this.isFairUse(text)) return 'fair-use';
    return 'unknown';
  }

  /**
   * Get usage rights for the text
   */
  static getUsageRights(text: CopyrightSafeText): string[] {
    const rights: string[] = [];
    
    if (text.isPublicDomain) {
      rights.push('Full text available for analysis');
      rights.push('Can be freely reproduced and distributed');
    } else if (text.ccLicense) {
      rights.push('Creative Commons licensed');
      if (text.ccLicense.includes('BY')) {
        rights.push('Attribution required');
      }
      if (text.ccLicense.includes('NC')) {
        rights.push('Non-commercial use only');
      }
      if (text.ccLicense.includes('SA')) {
        rights.push('Share-alike terms apply');
      }
    } else if (this.isFairUse(text)) {
      rights.push('Fair use for educational analysis');
      rights.push('Limited excerpt only');
      rights.push('Transformative use');
    }
    
    return rights;
  }

  /**
   * Get recommended public domain sources
   */
  static getPublicDomainSources(): Array<{
    name: string;
    url: string;
    description: string;
    apiAvailable: boolean;
  }> {
    return [
      {
        name: 'Project Gutenberg',
        url: 'https://www.gutenberg.org/',
        description: 'Classic literature and philosophy in public domain',
        apiAvailable: true
      },
      {
        name: 'Internet Archive',
        url: 'https://archive.org/',
        description: 'Digital library with public domain texts',
        apiAvailable: true
      },
      {
        name: 'HathiTrust',
        url: 'https://www.hathitrust.org/',
        description: 'Academic digital library with public domain works',
        apiAvailable: false
      },
      {
        name: 'Google Books (Public Domain)',
        url: 'https://books.google.com/',
        description: 'Public domain books from Google',
        apiAvailable: false
      }
    ];
  }

  /**
   * Extract safe excerpts for analysis
   */
  static extractSafeExcerpt(text: CopyrightSafeText, maxLength: number = 2000): string {
    if (text.isPublicDomain) {
      // Can use larger excerpts for public domain
      return text.text.substring(0, Math.min(maxLength * 2, text.text.length));
    } else if (text.ccLicense) {
      // Use moderate excerpts for CC works
      return text.text.substring(0, Math.min(maxLength, text.text.length));
    } else {
      // Use small excerpts for fair use
      return text.text.substring(0, Math.min(500, text.text.length));
    }
  }

  /**
   * Generate attribution for analyzed text
   */
  static generateAttribution(text: CopyrightSafeText): string {
    let attribution = `Analysis based on "${text.title}" by ${text.author}`;
    
    if (text.ccLicense) {
      attribution += ` (${text.ccLicense})`;
    }
    
    if (text.source) {
      attribution += ` - Source: ${text.source}`;
    }
    
    return attribution;
  }
} 