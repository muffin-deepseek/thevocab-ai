
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Check, VolumeX, Volume2, MessageCircle } from 'lucide-react';
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
  const [flipped, setFlipped] = useState(false);
  const { toggleFavorite, isFavorite, toggleLearned, isLearned } = useVocab();
  const favorite = isFavorite(word.id);
  const learned = isLearned(word.id);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const playPronunciation = () => {
    // In a real app, this would use a text-to-speech API or pre-recorded audio
    const utterance = new SpeechSynthesisUtterance(word.word);
    window.speechSynthesis.speak(utterance);
  };

  // Generate a simple conversation example
  const getConversationExample = () => {
    const examples = [
      `"I'll try to ${word.word.toLowerCase()} my approach to this problem."`,
      `"Can you explain how to ${word.word.toLowerCase()} this concept?"`,
      `"That's an excellent example of ${word.word.toLowerCase()}."`,
    ];
    return examples[Math.floor(Math.random() * examples.length)];
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-md perspective-1000">
        <Card 
          className={cn(
            "cursor-pointer transition-all duration-500 relative transform-style-3d min-h-[300px]",
            flipped ? "rotate-y-180" : ""
          )}
          onClick={handleFlip}
        >
          {/* Front of card */}
          <CardContent 
            className={cn(
              "absolute inset-0 backface-hidden flex flex-col items-center justify-center p-6",
              flipped ? "invisible" : "visible"
            )}
          >
            <div className="absolute top-2 right-2">
              <Badge className={getLevelColor(word.level)}>
                {word.level}
              </Badge>
            </div>
            <h2 className="text-3xl font-bold text-center mb-4">{word.word}</h2>
            <p className="text-center text-gray-500 text-sm">Tap to reveal definition</p>
          </CardContent>

          {/* Back of card */}
          <CardContent 
            className={cn(
              "absolute inset-0 backface-hidden rotate-y-180 flex flex-col p-6",
              !flipped ? "invisible" : "visible"
            )}
          >
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">Definition:</h3>
              <p className="text-gray-700 mb-4">{word.definition}</p>
              
              {word.example && (
                <>
                  <h3 className="text-lg font-semibold mb-1">Example:</h3>
                  <p className="text-gray-600 italic mb-4">{word.example}</p>
                </>
              )}
              
              {word.mnemonic && (
                <div className="bg-vocab-light p-3 rounded-md mt-2">
                  <h3 className="text-sm font-semibold">Memory Aid:</h3>
                  <p className="text-sm">{word.mnemonic}</p>
                </div>
              )}
              
              {/* Add conversation example */}
              <div className="border-t mt-4 pt-3">
                <div className="flex items-center text-sm text-vocab-dark font-medium mb-1">
                  <MessageCircle className="h-3.5 w-3.5 mr-1" />
                  <span>Try in conversation:</span>
                </div>
                <p className="text-sm italic text-gray-600">{getConversationExample()}</p>
              </div>
            </div>
            
            <p className="text-center text-gray-500 text-sm mt-4">Tap to see the word</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between w-full max-w-md mt-4">
        <Button variant="outline" onClick={onPrevious}>
          Previous
        </Button>

        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleFavorite(word.id)}
            className={favorite ? "text-yellow-500" : "text-gray-400"}
          >
            <Star className="h-5 w-5" fill={favorite ? "currentColor" : "none"} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={playPronunciation}
          >
            <Volume2 className="h-5 w-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleLearned(word.id)}
            className={learned ? "text-green-500" : "text-gray-400"}
          >
            <Check className="h-5 w-5" fill={learned ? "currentColor" : "none"} />
          </Button>
        </div>

        <Button variant="outline" onClick={onNext}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Flashcard;
