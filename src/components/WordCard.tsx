
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, BookOpen, Check } from 'lucide-react';
import { Word, WordLevel } from '@/data/wordData';
import { useVocab } from '@/contexts/VocabContext';
import { cn } from '@/lib/utils';
import VoiceButton from './VoiceButton';
import { motion } from 'framer-motion';

interface WordCardProps {
  word: Word;
  showFullDetails?: boolean;
}

export const getLevelColor = (level: WordLevel): string => {
  switch (level) {
    case 'nurture':
      return 'bg-teal-500 text-white';
    case 'basic':
      return 'bg-vocab-basic text-white';
    case 'intermediate':
      return 'bg-vocab-intermediate text-white';
    case 'advanced':
      return 'bg-vocab-advanced text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

const WordCard: React.FC<WordCardProps> = ({ word, showFullDetails = false }) => {
  const { toggleFavorite, isFavorite, toggleLearned, isLearned } = useVocab();
  const favorite = isFavorite(word.id);
  const learned = isLearned(word.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
    >
      <Card className={cn(
        "transition-all duration-200 h-full flex flex-col backdrop-blur-sm",
        "border border-transparent shadow-lg",
        learned ? "border-green-300 bg-green-50/80 dark:bg-green-900/20" : "bg-white/80 dark:bg-gray-800/80"
      )}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <motion.h3 
                className="text-lg font-bold"
                whileHover={{ scale: 1.02 }}
              >
                {word.word}
              </motion.h3>
              <Badge className={cn("mt-1", getLevelColor(word.level))}>
                {word.level}
              </Badge>
            </div>
            <div className="flex">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <VoiceButton text={word.word} />
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(favorite ? "text-yellow-500" : "text-gray-400")}
                  onClick={() => toggleFavorite(word.id)}
                >
                  <Star className="h-5 w-5" fill={favorite ? "currentColor" : "none"} />
                </Button>
              </motion.div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-gray-700 dark:text-gray-200 mb-2"><span className="font-semibold">Definition:</span> {word.definition}</p>
          
          {(showFullDetails || word.example) && (
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 italic"><span className="font-semibold not-italic">Example:</span> {word.example}</p>
          )}
          
          {showFullDetails && word.mnemonic && (
            <motion.div 
              className="mt-3 bg-vocab-light dark:bg-purple-900/30 p-2 rounded-md"
              whileHover={{ scale: 1.01 }}
            >
              <p className="text-sm"><span className="font-semibold">Memory Aid:</span> {word.mnemonic}</p>
            </motion.div>
          )}
          
          {showFullDetails && word.synonyms && word.synonyms.length > 0 && (
            <div className="mt-3">
              <p className="text-sm font-semibold">Synonyms:</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {word.synonyms.map((synonym, index) => (
                  <Badge key={index} variant="outline" className="bg-gray-100 dark:bg-gray-700">
                    {synonym}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="pt-2 justify-between">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "text-xs button-3d",
                learned ? "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700" : ""
              )}
              onClick={() => toggleLearned(word.id)}
            >
              <Check className={cn(
                "h-4 w-4 mr-1", 
                learned ? "text-green-600 dark:text-green-400" : "text-gray-400"
              )} />
              {learned ? "Learned" : "Mark as Learned"}
            </Button>
          </motion.div>
          
          {!showFullDetails && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild size="sm" variant="ghost" className="text-xs">
                <a href={`/word/${word.id}`}>
                  <BookOpen className="h-4 w-4 mr-1" />
                  Details
                </a>
              </Button>
            </motion.div>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default WordCard;
