import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Star, Check, Volume2, ArrowLeft, ArrowRight } from 'lucide-react';
import { Word } from '@/data/wordData';
import { useVocab } from '@/contexts/VocabContext';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { getLevelColor } from './WordCard';

interface FlashcardProps {
  word: Word;
  onNext: () => void;
  onPrevious: () => void;
}

const Flashcard: React.FC<FlashcardProps> = ({ word, onNext, onPrevious }) => {
  const [showDefinition, setShowDefinition] = useState(false);
  const { toggleFavorite, isFavorite, toggleLearned, isLearned } = useVocab();
  const favorite = isFavorite(word.id);
  const learned = isLearned(word.id);

  const playPronunciation = () => {
    const utterance = new SpeechSynthesisUtterance(word.word);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between items-center w-full mb-4">
        <div className="flex items-center">
          <Button
            variant="ghost"
            className="p-0 h-8 w-8"
            onClick={() => toggleFavorite(word.id)}
          >
            <Star 
              className={cn("h-5 w-5", favorite ? "text-black" : "text-gray-400")} 
              fill={favorite ? "currentColor" : "none"} 
            />
          </Button>
          
          <Button
            variant="ghost"
            className="p-0 h-8 w-8 ml-2"
            onClick={playPronunciation}
          >
            <Volume2 className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
        
        <div className="text-sm text-gray-600">
          {/* Page counter */}
          see definition
        </div>
        
        <Button
          variant="ghost"
          className={cn("p-0 h-8 w-8", learned ? "text-black" : "text-gray-400")}
          onClick={() => toggleLearned(word.id)}
        >
          <Check className="h-5 w-5" fill={learned ? "currentColor" : "none"} />
        </Button>
      </div>

      <div 
        className="kindle-flashcard w-full border border-gray-300 mb-4 cursor-pointer"
        onClick={() => setShowDefinition(!showDefinition)}
      >
        {!showDefinition ? (
          <div className="text-center">
            <h2 className="text-3xl font-normal mb-4">{word.word}</h2>
            <p className="text-sm text-gray-500">Tap to see definition</p>
          </div>
        ) : (
          <div className="text-left">
            <h3 className="text-lg font-medium mb-3">{word.word}</h3>
            <p className="text-base mb-4">{word.definition}</p>
            
            {word.example && (
              <div className="mb-4">
                <p className="text-sm italic">{word.example}</p>
                <p className="text-xs text-gray-500 mt-1">The Ocean at the End of the Lane: A Novel</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between w-full">
        <Button 
          variant="outline" 
          className="border-gray-300"
          onClick={onPrevious}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>

        <Button 
          variant="outline" 
          className="border-gray-300"
          onClick={onNext}
        >
          Next
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default Flashcard;
