import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, BookOpen, Check } from 'lucide-react';
import { Word, WordLevel } from '@/data/wordData';
import { useVocab } from '@/contexts/VocabContext';
import { cn } from '@/lib/utils';
import VoiceButton from './VoiceButton';

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
    <Card className={cn(
      "transition-all duration-200 h-full flex flex-col",
      learned && "border-green-300 bg-green-50"
    )}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold">{word.word}</h3>
            <Badge className={cn("mt-1", getLevelColor(word.level))}>
              {word.level}
            </Badge>
          </div>
          <div className="flex">
            <VoiceButton text={word.word} />
            <Button
              variant="ghost"
              size="icon"
              className={cn(favorite ? "text-yellow-500" : "text-gray-400")}
              onClick={() => toggleFavorite(word.id)}
            >
              <Star className="h-5 w-5" fill={favorite ? "currentColor" : "none"} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-700 mb-2"><span className="font-semibold">Definition:</span> {word.definition}</p>
        
        {(showFullDetails || word.example) && (
          <p className="text-gray-600 text-sm mt-2 italic"><span className="font-semibold not-italic">Example:</span> {word.example}</p>
        )}
        
        {showFullDetails && word.mnemonic && (
          <div className="mt-3 bg-vocab-light p-2 rounded-md">
            <p className="text-sm"><span className="font-semibold">Memory Aid:</span> {word.mnemonic}</p>
          </div>
        )}
        
        {showFullDetails && word.synonyms && word.synonyms.length > 0 && (
          <div className="mt-3">
            <p className="text-sm font-semibold">Synonyms:</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {word.synonyms.map((synonym, index) => (
                <Badge key={index} variant="outline" className="bg-gray-100">
                  {synonym}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2 justify-between">
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "text-xs",
            learned ? "bg-green-100 border-green-300" : ""
          )}
          onClick={() => toggleLearned(word.id)}
        >
          <Check className={cn(
            "h-4 w-4 mr-1", 
            learned ? "text-green-600" : "text-gray-400"
          )} />
          {learned ? "Learned" : "Mark as Learned"}
        </Button>
        
        {!showFullDetails && (
          <Button asChild size="sm" variant="ghost" className="text-xs">
            <a href={`/word/${word.id}`}>
              <BookOpen className="h-4 w-4 mr-1" />
              Details
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default WordCard;
