
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { useVocab } from '@/contexts/VocabContext';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Check, X, Zap, RefreshCw } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import LevelFilter from '@/components/LevelFilter';
import { useToast } from '@/hooks/use-toast';
import { Word } from '@/data/wordData';
import QuizResults from '@/components/QuizResults';

type QuizMode = 'definition' | 'word';
type QuizStatus = 'active' | 'completed';

interface QuizQuestion {
  questionWord: Word;
  options: Word[];
  correctIndex: number;
}

const QuizPage: React.FC = () => {
  const { filteredWords, toggleLearned } = useVocab();
  const { toast } = useToast();
  const [quizMode, setQuizMode] = useState<QuizMode>('definition');
  const [quizStatus, setQuizStatus] = useState<QuizStatus>('active');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [quizWords, setQuizWords] = useState<Word[]>([]);
  const [quizActive, setQuizActive] = useState(false);

  // Generate new quiz when filteredWords change AND not during an active quiz
  useEffect(() => {
    if (filteredWords.length >= 4 && !quizActive && quizStatus !== 'completed') {
      generateQuiz();
    }
  }, [filteredWords]);

  // Start timer when quiz starts
  useEffect(() => {
    if (questions.length > 0 && quizStatus === 'active' && currentQuestionIndex === 0) {
      setStartTime(new Date());
      setQuizActive(true);
    }
  }, [questions, quizStatus, currentQuestionIndex]);

  const generateQuiz = () => {
    if (filteredWords.length < 4) {
      toast({
        title: "Not enough words",
        description: "You need at least 4 words to start a quiz.",
        variant: "destructive"
      });
      return;
    }

    // Generate 10 questions (or fewer if not enough words)
    const numberOfQuestions = Math.min(10, filteredWords.length);
    const shuffledWords = [...filteredWords].sort(() => Math.random() - 0.5);
    const newQuestions: QuizQuestion[] = [];
    const usedWords: Word[] = [];

    for (let i = 0; i < numberOfQuestions; i++) {
      const questionWord = shuffledWords[i];
      usedWords.push(questionWord);
      
      // Generate 3 incorrect options
      const incorrectOptions: Word[] = shuffledWords
        .filter(word => word.id !== questionWord.id)
        .slice(0, 3);
      
      // Combine correct and incorrect options and shuffle
      const allOptions = [questionWord, ...incorrectOptions].sort(() => Math.random() - 0.5);
      
      // Find the index of the correct answer
      const correctIndex = allOptions.findIndex(option => option.id === questionWord.id);
      
      newQuestions.push({
        questionWord,
        options: allOptions,
        correctIndex
      });
    }

    setQuizWords(usedWords);
    setQuestions(newQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizStatus('active');
    setIsAnswered(false);
    setSelectedOption(null);
    setStartTime(new Date());
    setEndTime(null);
  };

  const handleAnswer = (optionIndex: number) => {
    if (isAnswered) return;
    
    setSelectedOption(optionIndex);
    setIsAnswered(true);
    
    const isCorrect = optionIndex === questions[currentQuestionIndex].correctIndex;
    if (isCorrect) {
      setScore(score + 1);
      // Mark word as learned if answer is correct
      toggleLearned(questions[currentQuestionIndex].questionWord.id);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsAnswered(false);
      setSelectedOption(null);
    } else {
      // Quiz completed
      setQuizStatus('completed');
      setEndTime(new Date());
      setQuizActive(false); // Reset flag when quiz completes
    }
  };

  const restartQuiz = () => {
    setQuizActive(false); // Reset flag to allow a new quiz
    generateQuiz();
  };

  // Calculate time taken
  const calculateTimeTaken = (): string => {
    if (!startTime || !endTime) return "00:00";
    
    const seconds = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="kindle-container">
          <div className="kindle-header border-b border-gray-300">
            <h2 className="text-base font-medium">Practice Quiz</h2>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setQuizMode('definition')}
                disabled={quizStatus === 'active' && currentQuestionIndex > 0}
                className={`text-xs border-gray-300 ${quizMode === 'definition' ? 'bg-gray-100' : 'bg-white'}`}
              >
                Word → Definition
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setQuizMode('word')}
                disabled={quizStatus === 'active' && currentQuestionIndex > 0}
                className={`text-xs border-gray-300 ${quizMode === 'word' ? 'bg-gray-100' : 'bg-white'}`}
              >
                Definition → Word
              </Button>
            </div>
          </div>
          
          <div className="kindle-content">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-4">
                <LevelFilter />
                
                <Button 
                  className="w-full bg-gray-900 hover:bg-black text-white"
                  disabled={filteredWords.length < 4 || (quizStatus === 'active' && currentQuestionIndex > 0)}
                  onClick={generateQuiz}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Start New Quiz
                </Button>
                
                {quizStatus === 'active' && questions.length > 0 && (
                  <div className="border border-gray-300 rounded-sm p-4 bg-white">
                    <h3 className="text-base font-medium mb-2">Quiz Progress</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Question</span>
                        <span>{currentQuestionIndex + 1} of {questions.length}</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-sm">
                        <div 
                          className="bg-gray-800 h-2 rounded-sm" 
                          style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex justify-between text-sm mt-4">
                        <span>Score</span>
                        <span>{score} / {currentQuestionIndex + (isAnswered ? 1 : 0)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {quizStatus === 'active' && questions.length > 0 ? (
                <div className="border border-gray-300 rounded-sm bg-white">
                  <div className="border-b border-gray-300 p-4">
                    <h3 className="text-base font-medium">
                      Question {currentQuestionIndex + 1}: 
                      {quizMode === 'definition' 
                        ? ` What is the definition of "${currentQuestion.questionWord.word}"?`
                        : ` Which word means "${currentQuestion.questionWord.definition}"?`}
                    </h3>
                  </div>
                  <div className="p-4">
                    <RadioGroup value={selectedOption?.toString()} className="space-y-3">
                      {currentQuestion.options.map((option, index) => (
                        <div 
                          key={option.id}
                          className={`
                            flex items-center space-x-2 p-3 border rounded-sm
                            ${isAnswered && index === currentQuestion.correctIndex ? 'bg-gray-100 border-gray-400' : 'border-gray-300'}
                            ${isAnswered && selectedOption === index && index !== currentQuestion.correctIndex ? 'bg-gray-100 border-gray-400' : ''}
                            ${!isAnswered ? 'hover:bg-gray-50 cursor-pointer' : ''}
                          `}
                          onClick={() => !isAnswered && handleAnswer(index)}
                        >
                          <RadioGroupItem 
                            value={index.toString()} 
                            id={`option-${index}`}
                            disabled={isAnswered}
                            className="flex-shrink-0"
                          />
                          <label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">
                            {quizMode === 'definition' ? option.definition : option.word}
                          </label>
                          {isAnswered && index === currentQuestion.correctIndex && (
                            <Check className="h-5 w-5 text-gray-700" />
                          )}
                          {isAnswered && selectedOption === index && index !== currentQuestion.correctIndex && (
                            <X className="h-5 w-5 text-gray-700" />
                          )}
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                  <div className="flex justify-between p-4 border-t border-gray-300">
                    {isAnswered && (
                      <div>
                        {selectedOption === currentQuestion.correctIndex ? (
                          <p className="text-gray-700">Correct!</p>
                        ) : (
                          <p className="text-gray-700">Incorrect!</p>
                        )}
                      </div>
                    )}
                    <Button
                      onClick={isAnswered ? handleNextQuestion : () => {}}
                      disabled={!isAnswered}
                      className="bg-gray-900 hover:bg-black text-white"
                    >
                      {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'View Results'}
                    </Button>
                  </div>
                </div>
              ) : quizStatus === 'completed' ? (
                <QuizResults 
                  score={score}
                  totalQuestions={questions.length}
                  timeTaken={calculateTimeTaken()}
                  quizWords={quizWords}
                  onRestartQuiz={restartQuiz}
                />
              ) : (
                <div className="border border-gray-300 rounded-sm bg-white">
                  <div className="text-center py-10 px-4">
                    {filteredWords.length < 4 ? (
                      <div>
                        <p className="text-lg text-gray-700 mb-4">
                          You need at least 4 words to start a quiz.
                        </p>
                        <p className="text-gray-500">
                          Try selecting a different difficulty level or adding more words.
                        </p>
                      </div>
                    ) : (
                      <div>
                        <h3 className="text-xl font-medium mb-4">Ready to Test Your Vocabulary?</h3>
                        <p className="text-gray-600 mb-6">
                          This quiz will test your knowledge of the selected words. 
                          Choose the correct definition for each word to improve your vocabulary.
                        </p>
                        <Button 
                          size="lg" 
                          onClick={generateQuiz}
                          className="bg-gray-900 hover:bg-black text-white"
                        >
                          <Zap className="h-5 w-5 mr-2" />
                          Start Quiz
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuizPage;
