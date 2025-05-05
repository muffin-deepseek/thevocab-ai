
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, BookOpen, Check } from 'lucide-react';
import { Word, WordLevel } from '@/data/wordData';
import { useVocab } from '@/contexts/VocabContext';
import { cn } from '@/lib/utils';

interface WordCardProps {
  word: Word;
  showFullDetails?: boolean;
}

export const getLevelColor = (level: WordLevel): string => {
  switch (level) {
    case 'nurture':
      return 'bg-gray-300 text-gray-800';
    case 'basic':
      return 'bg-gray-400 text-gray-800';
    case 'intermediate':
      return 'bg-gray-500 text-white';
    case 'advanced':
      return 'bg-gray-700 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

const WordCard: React.FC<WordCardProps> = ({ word, showFullDetails = false }) => {
  const { toggleFavorite, isFavorite, toggleLearned, isLearned } = useVocab();
  const favorite = isFavorite(word.id);
  const learned = isLearned(word.id);

  return (
    <div className={cn(
      "word-grid-item transition-colors duration-100",
      learned && "bg-gray-100"
    )}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-base font-medium">{word.word}</h3>
        <Button
          variant="ghost"
          size="icon"
          className={cn("h-7 w-7", favorite ? "text-black" : "text-gray-400")}
          onClick={() => toggleFavorite(word.id)}
        >
          <Star className="h-4 w-4" fill={favorite ? "currentColor" : "none"} />
        </Button>
      </div>
      
      {!showFullDetails ? (
        <div className="text-sm text-gray-700 mb-2 truncate">{word.definition}</div>
      ) : (
        <div className="mb-4">
          <p className="text-sm text-gray-700 mb-2">{word.definition}</p>
          
          {word.example && (
            <p className="text-xs text-gray-600 italic mt-2">{word.example}</p>
          )}
          
          {word.mnemonic && (
            <div className="mt-3 bg-gray-100 p-2 rounded-sm">
              <p className="text-xs"><span className="font-medium">Memory Aid:</span> {word.mnemonic}</p>
            </div>
          )}
          
          {word.synonyms && word.synonyms.length > 0 && (
            <div className="mt-3">
              <p className="text-xs font-medium">Synonyms:</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {word.synonyms.map((synonym, index) => (
                  <Badge key={index} variant="outline" className="text-xs bg-gray-100">
                    {synonym}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      
      <div className="flex justify-between items-center pt-2 border-t border-gray-200">
        <Badge className={cn("text-xs", getLevelColor(word.level))}>
          {word.level}
        </Badge>
        
        {!showFullDetails ? (
          <Button asChild size="sm" variant="ghost" className="text-xs p-0 h-6">
            <a href={`/word/${word.id}`} className="flex items-center">
              <BookOpen className="h-3 w-3 mr-1" />
              Details
            </a>
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "text-xs p-0 h-6",
              learned ? "text-black" : "text-gray-500"
            )}
            onClick={() => toggleLearned(word.id)}
          >
            <Check className={cn("h-3 w-3 mr-1")} 
              fill={learned ? "currentColor" : "none"} />
            {learned ? "Learned" : "Mark Learned"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default WordCard;
