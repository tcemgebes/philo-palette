import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { AIDeveloperTools } from '@/utils/aiDeveloperTools';
import { AIService } from '@/utils/aiService';
import { Brain, TestTube, FileText, BookOpen, Download, Trash2, Play, Square } from 'lucide-react';

const AITestPanel = () => {
  const [testText, setTestText] = useState('');
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [logs, setLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const startMonitoring = () => {
    AIDeveloperTools.startMonitoring();
    setIsMonitoring(true);
  };

  const stopMonitoring = () => {
    AIDeveloperTools.stopMonitoring();
    setIsMonitoring(false);
  };

  const showLogs = () => {
    const currentLogs = AIDeveloperTools.showLogs();
    setLogs(currentLogs);
  };

  const clearLogs = () => {
    AIDeveloperTools.clearLogs();
    setLogs([]);
  };

  const testAnalysis = async () => {
    if (!testText.trim()) {
      alert('Please enter some text to test');
      return;
    }

    setIsLoading(true);
    try {
      await AIDeveloperTools.testAnalysis(testText);
    } catch (error) {
      console.error('Test failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadSampleData = () => {
    const sampleData = AIDeveloperTools.getSampleData();
    setTestText(sampleData.introspectionText);
  };

  const exportLogs = () => {
    const exportData = AIDeveloperTools.exportLogs();
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-analysis-logs-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="h-6 w-6 text-blue-500" />
        <h2 className="text-xl font-semibold">AI Analysis Test Panel</h2>
      </div>

      {/* Monitoring Controls */}
      <Card className="p-4">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <TestTube className="h-4 w-4" />
          Monitoring Controls
        </h3>
        <div className="flex gap-2">
          <Button
            onClick={isMonitoring ? stopMonitoring : startMonitoring}
            variant={isMonitoring ? "destructive" : "default"}
            size="sm"
          >
            {isMonitoring ? <Square className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
            {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
          </Button>
          <Button onClick={showLogs} variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Show Logs
          </Button>
          <Button onClick={clearLogs} variant="outline" size="sm">
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Logs
          </Button>
          <Button onClick={exportLogs} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          {isMonitoring 
            ? '✅ AI analysis is being logged to console' 
            : '⏸️ Monitoring is paused'
          }
        </p>
      </Card>

      {/* Test Input */}
      <Card className="p-4">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          Test Analysis
        </h3>
        <div className="space-y-3">
          <Textarea
            placeholder="Enter text to analyze (introspection, philosophical questions, etc.)"
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            rows={6}
          />
          <div className="flex gap-2">
            <Button onClick={testAnalysis} disabled={isLoading || !testText.trim()}>
              {isLoading ? 'Analyzing...' : 'Test Analysis'}
            </Button>
            <Button onClick={loadSampleData} variant="outline">
              Load Sample Data
            </Button>
          </div>
        </div>
      </Card>

      {/* Logs Display */}
      {logs.length > 0 && (
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Recent Logs ({logs.length})</h3>
          <div className="max-h-60 overflow-y-auto space-y-2">
            {logs.slice(-10).map((log, index) => (
              <div key={index} className="text-sm border-l-2 border-blue-500 pl-3">
                <div className="font-mono text-xs text-muted-foreground">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </div>
                <div className="font-medium">{log.type}</div>
                <div className="text-muted-foreground">{log.message}</div>
                {log.data && (
                  <details className="mt-1">
                    <summary className="cursor-pointer text-xs">View Data</summary>
                    <pre className="text-xs bg-muted p-2 mt-1 rounded overflow-x-auto">
                      {JSON.stringify(log.data, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Instructions */}
      <Card className="p-4 bg-blue-50 dark:bg-blue-950">
        <h3 className="font-semibold mb-2">How to Use</h3>
        <div className="text-sm space-y-2">
          <p>1. <strong>Start Monitoring</strong> to see AI analysis logs in the browser console</p>
          <p>2. <strong>Enter text</strong> and click "Test Analysis" to see the AI process</p>
          <p>3. <strong>Open browser console</strong> (F12) to see detailed logs</p>
          <p>4. <strong>Use console commands:</strong></p>
          <ul className="ml-4 space-y-1 font-mono text-xs">
            <li>• AIDevTools.startMonitoring()</li>
            <li>• AIDevTools.showLogs()</li>
            <li>• AIDevTools.testAnalysis("your text")</li>
            <li>• AIDevTools.getSampleData()</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default AITestPanel; 