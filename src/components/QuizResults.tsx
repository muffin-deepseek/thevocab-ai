
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Eye, EyeOff, Trophy } from 'lucide-react';
import { Word } from '@/data/wordData';
import { Badge } from '@/components/ui/badge';

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  timeTaken: string;
  quizWords: Word[];
  onRestartQuiz: () => void;
  incorrectAnswers?: { question: Word; selectedAnswer: Word; correctAnswer: Word }[];
  streak?: number;
}

const QuizResults: React.FC<QuizResultsProps> = ({
  score,
  totalQuestions,
  timeTaken,
  quizWords,
  onRestartQuiz,
  incorrectAnswers = [],
  streak = 0
}) => {
  const [showIncorrectAnswers, setShowIncorrectAnswers] = useState(false);
  
  // Generate conversation examples for the words in the quiz
  const generateConversationExamples = () => {
    // Use all available quiz words
    const wordsToUse = quizWords;
    
    return wordsToUse.map(word => {
      const wordInSentence = word.word.charAt(0).toLowerCase() + word.word.slice(1);
      
      // Custom examples based on the word's level
      let example = '';
      
      switch (word.level) {
        case 'basic':
          example = `"${word.word} is a useful word to describe everyday situations. For example, '${word.example}'"`;
          break;
        case 'intermediate':
          example = `"Using '${wordInSentence}' in conversation shows nuanced understanding. Try saying, '${word.example}'"`;
          break;
        case 'advanced':
          example = `"Impress others by correctly using '${wordInSentence}' in context: '${word.example}'"`;
          break;
        default:
          example = `"Practice using '${wordInSentence}' in a sentence like: '${word.example}'"`;
      }
      
      return { word, example };
    });
  };

  const conversationExamples = generateConversationExamples();

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl text-center">Quiz Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <div className="mb-6">
            <div className="text-5xl font-bold text-vocab-primary">
              {score} / {totalQuestions}
            </div>
            <p className="text-gray-500 mt-2">
              {Math.round((score / totalQuestions) * 100)}% Correct
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-500">Time Taken</p>
              <p className="text-xl font-semibold">{timeTaken}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-500">Words Learned</p>
              <p className="text-xl font-semibold">{score}</p>
            </div>
          </div>
          
          {/* Streak display */}
          {streak > 0 && (
            <div className="bg-amber-50 p-4 rounded-md mb-6 flex items-center justify-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              <p className="text-amber-700 font-medium">Current streak: {streak} quizzes</p>
            </div>
          )}
          
          <Button onClick={onRestartQuiz} className="w-full mb-6">
            <RefreshCw className="h-4 w-4 mr-2" />
            Start New Quiz
          </Button>
          
          {/* Incorrect Answers Section */}
          {incorrectAnswers.length > 0 && (
            <div className="mt-8 border-t pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Review Missed Questions</h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowIncorrectAnswers(!showIncorrectAnswers)}
                >
                  {showIncorrectAnswers ? (
                    <><EyeOff className="h-4 w-4 mr-2" /> Hide</>
                  ) : (
                    <><Eye className="h-4 w-4 mr-2" /> Show</>
                  )}
                </Button>
              </div>
              
              {showIncorrectAnswers && (
                <div className="space-y-4 text-left">
                  {incorrectAnswers.map((item, index) => (
                    <div key={index} className="p-3 bg-red-50 border border-red-100 rounded-md">
                      <p className="font-medium">
                        {item.question.word}: <span className="font-normal">{item.question.definition}</span>
                      </p>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                        <div className="p-2 bg-red-100 rounded">
                          <Badge variant="outline" className="bg-red-50 text-red-700 mb-1">Your answer</Badge>
                          <p>{item.selectedAnswer.word}</p>
                        </div>
                        <div className="p-2 bg-green-100 rounded">
                          <Badge variant="outline" className="bg-green-50 text-green-700 mb-1">Correct answer</Badge>
                          <p>{item.correctAnswer.word}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {/* Conversation Examples Section */}
          <div className="mt-8 border-t pt-6">
            <h3 className="text-xl font-semibold mb-4">Use These Words in Conversation</h3>
            <p className="text-sm text-gray-600 mb-4">
              Practice using these words from the quiz in your daily conversations:
            </p>
            
            <div className="space-y-4 text-left max-h-80 overflow-y-auto">
              {conversationExamples.map((item, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-md">
                  <p className="font-medium text-vocab-primary">{item.word.word}</p>
                  <p className="text-sm italic text-gray-700 mt-1">{item.example}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizResults;
