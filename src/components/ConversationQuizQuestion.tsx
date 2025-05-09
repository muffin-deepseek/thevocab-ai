
import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup } from '@/components/ui/radio-group';
import { Check, X, Volume2 } from 'lucide-react';
import { Word } from '@/data/wordData';
import { formatConversationWithBlank, formatConversationWithWord, splitConversationAtBlank } from '@/utils/conversationGenerator';
import { speak, stop } from '@/utils/textToSpeech';

interface ConversationQuizQuestionProps {
  conversation: string;
  options: Word[];
  correctIndex: number;
  onAnswer: (isCorrect: boolean, optionIndex: number) => void;
  disabled?: boolean;
}

const ConversationQuizQuestion: React.FC<ConversationQuizQuestionProps> = ({
  conversation,
  options,
  correctIndex,
  onAnswer,
  disabled = false
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const cardControls = useAnimation();
  
  // Get parts before and after the blank
  const { beforeBlank, afterBlank } = splitConversationAtBlank(conversation);

  // Format conversation for display (with blanks)
  const displayConversation = formatConversationWithBlank(conversation);

  // Handle option selection
  const handleOptionSelect = (index: number) => {
    if (isAnswered || disabled) return;
    
    setSelectedOption(index);
    setIsAnswered(true);
    
    const isCorrect = index === correctIndex;
    
    if (isCorrect) {
      // Play success animation
      cardControls.start({
        scale: [1, 1.02, 1],
        transition: { duration: 0.3 }
      });
    } else {
      // Play error animation
      cardControls.start({
        x: [0, -10, 10, -10, 10, 0],
        transition: { duration: 0.4 }
      });
    }
    
    onAnswer(isCorrect, index);
  };

  // Play the conversation audio
  const playConversationAudio = () => {
    if (isSpeaking) {
      stop();
      setIsSpeaking(false);
      return;
    }
    
    // Replace blank with the correct word for the audio
    const spokenConversation = formatConversationWithWord(
      conversation,
      options[correctIndex].word
    );
    
    setIsSpeaking(true);
    speak(spokenConversation, {
      rate: 0.9,
      onEnd: () => setIsSpeaking(false)
    });
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stop();
    };
  }, []);

  // Format the conversation with line breaks and speakers
  const formattedLines = displayConversation.split("\n").map((line, i) => {
    const [speaker, ...rest] = line.split(":");
    if (rest.length === 0) return <p key={i} className="mb-2">{line}</p>;
    
    const dialog = rest.join(":");
    
    return (
      <p key={i} className="mb-2">
        <span className="font-bold">{speaker}:</span>
        {dialog}
      </p>
    );
  });

  return (
    <motion.div animate={cardControls}>
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center justify-between">
            <span>Fill in the missing word</span>
            <Button 
              variant="ghost" 
              size="sm" 
              className={isSpeaking ? "text-vocab-primary" : "text-gray-500"} 
              onClick={playConversationAudio}
            >
              <Volume2 className="h-5 w-5" />
              <span className="ml-1 text-sm">{isSpeaking ? "Stop" : "Listen"}</span>
            </Button>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg mb-6">
            {formattedLines}
          </div>
          
          <RadioGroup className="space-y-3">
            {options.map((option, index) => (
              <div
                key={option.id}
                className={`
                  flex items-center space-x-2 p-3 rounded-md cursor-pointer
                  ${isAnswered && index === correctIndex ? 'bg-green-50 border border-green-200' : ''}
                  ${isAnswered && selectedOption === index && index !== correctIndex ? 'bg-red-50 border border-red-200' : ''}
                  ${!isAnswered ? 'hover:bg-gray-50 border border-gray-200' : ''}
                  ${disabled ? 'opacity-70' : ''}
                `}
                onClick={() => handleOptionSelect(index)}
              >
                <div className="flex-1">
                  <p className="font-medium">{option.word}</p>
                </div>
                {isAnswered && index === correctIndex && (
                  <Check className="h-5 w-5 text-green-500" />
                )}
                {isAnswered && selectedOption === index && index !== correctIndex && (
                  <X className="h-5 w-5 text-red-500" />
                )}
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        
        {isAnswered && (
          <CardFooter className="pt-2 pb-4 px-6">
            {selectedOption === correctIndex ? (
              <div className="w-full text-center bg-green-50 p-3 rounded-lg text-green-700">
                <p className="font-medium">Correct!</p>
                <p className="text-sm mt-1">{options[correctIndex].definition}</p>
              </div>
            ) : (
              <div className="w-full text-center bg-red-50 p-3 rounded-lg text-red-700">
                <p className="font-medium">Incorrect!</p>
                <p className="text-sm mt-1">The correct answer is "{options[correctIndex].word}"</p>
              </div>
            )}
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
};

export default ConversationQuizQuestion;
