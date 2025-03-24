
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { BookOpen, RefreshCw } from 'lucide-react';
import { updateBookDatabase, books } from '@/utils/philosophyData';

const BookDatabaseStatus: React.FC = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [bookCount, setBookCount] = useState(books.length);
  const [progress, setProgress] = useState(0);
  const [updateSuccess, setUpdateSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    // Update book count when component mounts
    setBookCount(books.length);
  }, []);

  const handleUpdateDatabase = async () => {
    setIsUpdating(true);
    setProgress(10);
    setUpdateSuccess(null);
    
    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 10;
          return newProgress < 90 ? newProgress : prev;
        });
      }, 500);
      
      // Perform the actual update
      await updateBookDatabase();
      
      // Update book count and complete progress
      clearInterval(progressInterval);
      setProgress(100);
      setBookCount(books.length);
      setUpdateSuccess(true);
      
      // Reset progress after showing 100%
      setTimeout(() => {
        setIsUpdating(false);
        setProgress(0);
      }, 1500);
      
    } catch (error) {
      console.error("Failed to update book database:", error);
      setUpdateSuccess(false);
      setIsUpdating(false);
    }
  };

  return (
    <Card className="p-4 bg-retro-black/50 border border-retro-sand/30">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <BookOpen size={18} className="text-retro-gold mr-2" />
          <h3 className="text-sm font-mono text-retro-gold">Book Database</h3>
        </div>
        <span className="text-xs font-mono text-retro-sand/70">{bookCount} books available</span>
      </div>
      
      {isUpdating && (
        <div className="mb-4">
          <Progress value={progress} className="h-1 mb-2" />
          <p className="text-xs text-retro-sand/70 font-mono">
            Importing books from Project Gutenberg...
          </p>
        </div>
      )}
      
      {updateSuccess === true && (
        <p className="text-xs text-green-400 font-mono mb-2">
          Successfully updated book database.
        </p>
      )}
      
      {updateSuccess === false && (
        <p className="text-xs text-red-400 font-mono mb-2">
          Failed to update book database. Please try again.
        </p>
      )}
      
      <Button
        variant="outline"
        size="sm"
        className="w-full text-xs font-mono border-retro-sand/50 text-retro-sand hover:text-retro-gold rounded-none"
        onClick={handleUpdateDatabase}
        disabled={isUpdating}
      >
        <RefreshCw size={14} className={`mr-2 ${isUpdating ? 'animate-spin' : ''}`} />
        <span>{isUpdating ? 'Updating...' : 'Refresh Book Database'}</span>
      </Button>
    </Card>
  );
};

export default BookDatabaseStatus;
