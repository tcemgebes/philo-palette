import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CopyrightSafeAnalysis } from '@/utils/copyrightSafeAnalysis';
import { Shield, BookOpen, Info, CheckCircle, AlertTriangle } from 'lucide-react';

interface CopyrightInfoProps {
  copyrightStatus: 'public-domain' | 'creative-commons' | 'fair-use' | 'unknown';
  usageRights: string[];
  source: string;
  author: string;
  title: string;
}

const CopyrightInfo: React.FC<CopyrightInfoProps> = ({
  copyrightStatus,
  usageRights,
  source,
  author,
  title
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'public-domain':
        return 'bg-green-500 text-white';
      case 'creative-commons':
        return 'bg-blue-500 text-white';
      case 'fair-use':
        return 'bg-yellow-500 text-black';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'public-domain':
        return <CheckCircle className="h-4 w-4" />;
      case 'creative-commons':
        return <BookOpen className="h-4 w-4" />;
      case 'fair-use':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getStatusDescription = (status: string) => {
    switch (status) {
      case 'public-domain':
        return 'This work is in the public domain and can be freely used for analysis.';
      case 'creative-commons':
        return 'This work is licensed under Creative Commons and can be analyzed with proper attribution.';
      case 'fair-use':
        return 'This analysis qualifies as fair use for educational purposes.';
      default:
        return 'Copyright status unknown. Please verify before use.';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Copyright & Usage Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Copyright Status */}
        <div className="flex items-center gap-2">
          <Badge className={getStatusColor(copyrightStatus)}>
            {getStatusIcon(copyrightStatus)}
            <span className="ml-1 capitalize">
              {copyrightStatus.replace('-', ' ')}
            </span>
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground">
          {getStatusDescription(copyrightStatus)}
        </p>

        {/* Work Information */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Work Details</h4>
          <div className="text-sm space-y-1">
            <p><strong>Title:</strong> {title}</p>
            <p><strong>Author:</strong> {author}</p>
            <p><strong>Source:</strong> {source}</p>
          </div>
        </div>

        {/* Usage Rights */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Usage Rights</h4>
          <div className="space-y-1">
            {usageRights.map((right, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>{right}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Legal Disclaimer */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription className="text-xs">
            This analysis is provided for educational purposes only. 
            Always verify copyright status before using any text for analysis.
            When in doubt, consult with a legal professional.
          </AlertDescription>
        </Alert>

        {/* Public Domain Sources */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Recommended Public Domain Sources</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {CopyrightSafeAnalysis.getPublicDomainSources().map((source, index) => (
              <div key={index} className="text-xs p-2 border rounded">
                <div className="font-medium">{source.name}</div>
                <div className="text-muted-foreground">{source.description}</div>
                {source.apiAvailable && (
                  <Badge variant="secondary" className="text-xs mt-1">
                    API Available
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CopyrightInfo; 