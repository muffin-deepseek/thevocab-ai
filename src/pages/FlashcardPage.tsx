
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { useVocab } from '@/contexts/VocabContext';
import Flashcard from '@/components/Flashcard';
import LevelFilter from '@/components/LevelFilter';
import { Button } from '@/components/ui/button';
import { Check, Shuffle, Star } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const FlashcardPage: React.FC = () => {
  const { filteredWords, favorites } = useVocab();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [shuffled, setShuffled] = useState(false);
  const [studyWords, setStudyWords] = useState(filteredWords);

  // Update study words when filters change
  useEffect(() => {
    let words = [...filteredWords];
    
    // Apply favorites filter if needed
    if (showFavoritesOnly) {
      words = words.filter(word => favorites.includes(word.id));
    }
    
    // Apply shuffling if needed
    if (shuffled) {
      words = [...words].sort(() => Math.random() - 0.5);
    }
    
    setStudyWords(words);
    setCurrentIndex(0); // Reset to first card when filters change
  }, [filteredWords, favorites, showFavoritesOnly, shuffled]);

  const handleNext = () => {
    if (currentIndex < studyWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back to the beginning
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(studyWords.length - 1); // Loop to the end
    }
  };

  const toggleShuffle = () => {
    setShuffled(!shuffled);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h2 className="text-2xl font-bold mb-4 md:mb-0">Flashcards</h2>
          
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center space-x-2">
              <Switch 
                id="favorites-only" 
                checked={showFavoritesOnly} 
                onCheckedChange={setShowFavoritesOnly}
              />
              <Label htmlFor="favorites-only" className="flex items-center cursor-pointer">
                <Star className="h-4 w-4 mr-1 text-yellow-500" />
                Favorites Only
              </Label>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleShuffle}
              className={shuffled ? "bg-vocab-light" : ""}
            >
              <Shuffle className="h-4 w-4 mr-1" />
              {shuffled ? "Shuffled" : "Shuffle"}
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="md:col-span-1">
            <div className="space-y-4">
              <LevelFilter />
              
              <div className="bg-white p-4 rounded-lg border shadow-sm">
                <h3 className="font-semibold mb-2">Study Progress</h3>
                <p className="text-sm text-gray-600 mb-1">
                  Card {studyWords.length > 0 ? currentIndex + 1 : 0} of {studyWords.length}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-vocab-primary h-2 rounded-full" 
                    style={{ width: `${studyWords.length > 0 ? ((currentIndex + 1) / studyWords.length) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-3">
            {studyWords.length > 0 ? (
              <Flashcard 
                word={studyWords[currentIndex]} 
                onNext={handleNext} 
                onPrevious={handlePrevious} 
              />
            ) : (
              <div className="bg-white p-8 rounded-lg border shadow text-center">
                <p className="text-lg text-gray-700 mb-4">No flashcards match your current filters.</p>
                <Button 
                  onClick={() => {
                    setShowFavoritesOnly(false);
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default FlashcardPage;
