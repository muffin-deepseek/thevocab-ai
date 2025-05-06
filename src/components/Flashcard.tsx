
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Check, MessageCircle } from 'lucide-react';
import { Word } from '@/data/wordData';
import { useVocab } from '@/contexts/VocabContext';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { getLevelColor } from './WordCard';
import VoiceButton from './VoiceButton';
import { motion } from 'framer-motion';

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
      <motion.div 
        className="w-full max-w-md perspective-1000"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className={cn(
            "cursor-pointer relative w-full min-h-[350px] rounded-2xl shadow-lg",
          )}
          animate={{ 
            rotateY: flipped ? 180 : 0,
          }}
          transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
          onClick={handleFlip}
          style={{ perspective: 1000 }}
        >
          {/* Front of card */}
          <motion.div 
            className={cn(
              "absolute inset-0 backface-hidden rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700",
              "flex flex-col items-center justify-center p-6",
              "shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
            )}
            style={{ backfaceVisibility: "hidden" }}
            animate={{ opacity: flipped ? 0 : 1 }}
          >
            <div className="absolute top-2 right-2">
              <Badge className={getLevelColor(word.level)}>
                {word.level}
              </Badge>
            </div>
            <motion.h2 
              className="text-3xl font-bold text-center mb-4"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            >
              {word.word}
            </motion.h2>
            <p className="text-center text-gray-500 text-sm">Tap to reveal definition</p>
          </motion.div>

          {/* Back of card */}
          <motion.div 
            className={cn(
              "absolute inset-0 backface-hidden rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700",
              "flex flex-col p-6",
              "shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
            )}
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            animate={{ opacity: flipped ? 1 : 0 }}
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
                <motion.div 
                  className="bg-vocab-light dark:bg-purple-900/30 p-3 rounded-md mt-2"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-sm font-semibold">Memory Aid:</h3>
                  <p className="text-sm">{word.mnemonic}</p>
                </motion.div>
              )}
              
              {/* Add conversation example */}
              <motion.div 
                className="border-t mt-4 pt-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center text-sm text-vocab-dark font-medium mb-1">
                  <MessageCircle className="h-3.5 w-3.5 mr-1" />
                  <span>Try in conversation:</span>
                </div>
                <p className="text-sm italic text-gray-600">{getConversationExample()}</p>
              </motion.div>
            </div>
            
            <p className="text-center text-gray-500 text-sm mt-4">Tap to see the word</p>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div 
        className="flex items-center justify-between w-full max-w-md mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="outline" onClick={onPrevious}>
            Previous
          </Button>
        </motion.div>

        <div className="flex gap-2">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleFavorite(word.id)}
              className={favorite ? "text-yellow-500" : "text-gray-400"}
            >
              <Star className="h-5 w-5" fill={favorite ? "currentColor" : "none"} />
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <VoiceButton text={word.word} />
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleLearned(word.id)}
              className={learned ? "text-green-500" : "text-gray-400"}
            >
              <Check className="h-5 w-5" fill={learned ? "currentColor" : "none"} />
            </Button>
          </motion.div>
        </div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="outline" onClick={onNext}>
            Next
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Flashcard;
