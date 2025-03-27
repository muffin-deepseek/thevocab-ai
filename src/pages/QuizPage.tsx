
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

interface IncorrectAnswer {
  question: Word;
  selectedAnswer: Word;
  correctAnswer: Word;
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
  // Add a flag to prevent regeneration during an active quiz
  const [quizActive, setQuizActive] = useState(false);
  // Track incorrect answers
  const [incorrectAnswers, setIncorrectAnswers] = useState<IncorrectAnswer[]>([]);
  // Track streak
  const [streak, setStreak] = useState(() => {
    const savedStreak = localStorage.getItem('quizStreak');
    return savedStreak ? parseInt(savedStreak, 10) : 0;
  });
  
  // Time of last successful quiz completion
  const [lastQuizTime, setLastQuizTime] = useState(() => {
    const savedTime = localStorage.getItem('lastQuizTime');
    return savedTime ? parseInt(savedTime, 10) : 0;
  });

  // Generate new quiz only when filteredWords change AND not during an active quiz
  useEffect(() => {
    if (filteredWords.length >= 4 && !quizActive && quizStatus !== 'completed') {
      generateQuiz();
    }
  }, [filteredWords]);

  // Start timer when quiz starts
  useEffect(() => {
    if (questions.length > 0 && quizStatus === 'active' && currentQuestionIndex === 0) {
      setStartTime(new Date());
      setQuizActive(true); // Set active when quiz starts
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
    setIncorrectAnswers([]);
  };

  const handleAnswer = (optionIndex: number) => {
    if (isAnswered) return;
    
    setSelectedOption(optionIndex);
    setIsAnswered(true);
    
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = optionIndex === currentQuestion.correctIndex;
    
    if (isCorrect) {
      setScore(score + 1);
      // Mark word as learned if answer is correct
      toggleLearned(currentQuestion.questionWord.id);
    } else {
      // Store incorrect answer for review
      setIncorrectAnswers(prev => [
        ...prev, 
        {
          question: currentQuestion.questionWord,
          selectedAnswer: currentQuestion.options[optionIndex],
          correctAnswer: currentQuestion.options[currentQuestion.correctIndex]
        }
      ]);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsAnswered(false);
      setSelectedOption(null);
    } else {
      // Quiz completed
      const now = new Date();
      setEndTime(now);
      setQuizStatus('completed');
      setQuizActive(false); // Reset flag when quiz completes
      
      // Update streak logic
      const nowTime = now.getTime();
      const oneDayMs = 24 * 60 * 60 * 1000;
      const passRate = score / questions.length;
      
      if (passRate >= 0.7) { // 70% or better to maintain streak
        // Check if this is within streak timeframe (1 day)
        if (nowTime - lastQuizTime < oneDayMs * 2) { // allow a bit of leeway
          setStreak(prev => prev + 1);
        } else {
          // It's been too long, reset streak but count this one
          setStreak(1);
        }
        
        // Update last successful quiz time
        setLastQuizTime(nowTime);
        localStorage.setItem('lastQuizTime', nowTime.toString());
      } else if (passRate < 0.5) { // Below 50% breaks streak
        setStreak(0);
      }
      
      // Save streak to localStorage
      localStorage.setItem('quizStreak', streak.toString());
      
      // Show appropriate toast based on performance
      if (passRate >= 0.8) {
        toast({
          title: "Excellent work!",
          description: `You scored ${score} out of ${questions.length}!`,
          variant: "default"
        });
      } else if (passRate >= 0.6) {
        toast({
          title: "Good job!",
          description: `You scored ${score} out of ${questions.length}. Keep practicing!`,
          variant: "default"
        });
      } else {
        toast({
          title: "Keep practicing",
          description: `You scored ${score} out of ${questions.length}. Review your mistakes and try again.`,
          variant: "default"
        });
      }
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
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h2 className="text-2xl font-bold mb-4 md:mb-0">Practice Quiz</h2>
          
          <div className="flex gap-2">
            <Button 
              variant={quizMode === 'definition' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setQuizMode('definition')}
              disabled={quizStatus === 'active' && currentQuestionIndex > 0}
            >
              Word → Definition
            </Button>
            <Button 
              variant={quizMode === 'word' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setQuizMode('word')}
              disabled={quizStatus === 'active' && currentQuestionIndex > 0}
            >
              Definition → Word
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <div className="space-y-4">
              <LevelFilter />
              
              <Button 
                className="w-full"
                disabled={filteredWords.length < 4 || (quizStatus === 'active' && currentQuestionIndex > 0)}
                onClick={generateQuiz}
              >
                <Zap className="h-4 w-4 mr-2" />
                Start New Quiz
              </Button>
              
              {quizStatus === 'active' && questions.length > 0 && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Quiz Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Question</span>
                        <span>{currentQuestionIndex + 1} of {questions.length}</span>
                      </div>
                      <Progress 
                        value={((currentQuestionIndex + 1) / questions.length) * 100} 
                        className="h-2" 
                      />
                      
                      <div className="flex justify-between text-sm mt-4">
                        <span>Score</span>
                        <span>{score} / {currentQuestionIndex + (isAnswered ? 1 : 0)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
          
          <div className="md:col-span-3">
            {quizStatus === 'active' && questions.length > 0 ? (
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">
                    Question {currentQuestionIndex + 1}: 
                    {quizMode === 'definition' 
                      ? ` What is the definition of "${currentQuestion.questionWord.word}"?`
                      : ` Which word means "${currentQuestion.questionWord.definition}"?`}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={selectedOption?.toString()} className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                      <div 
                        key={option.id}
                        className={`
                          flex items-center space-x-2 p-3 rounded-md 
                          ${isAnswered && index === currentQuestion.correctIndex ? 'bg-green-50 border border-green-200' : ''}
                          ${isAnswered && selectedOption === index && index !== currentQuestion.correctIndex ? 'bg-red-50 border border-red-200' : ''}
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
                          <Check className="h-5 w-5 text-green-500" />
                        )}
                        {isAnswered && selectedOption === index && index !== currentQuestion.correctIndex && (
                          <X className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
                <CardFooter className="flex justify-between">
                  {isAnswered && (
                    <div>
                      {selectedOption === currentQuestion.correctIndex ? (
                        <p className="text-green-600">Correct!</p>
                      ) : (
                        <p className="text-red-600">Incorrect!</p>
                      )}
                    </div>
                  )}
                  <Button
                    onClick={isAnswered ? handleNextQuestion : () => {}}
                    disabled={!isAnswered}
                  >
                    {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'View Results'}
                  </Button>
                </CardFooter>
              </Card>
            ) : quizStatus === 'completed' ? (
              <QuizResults 
                score={score}
                totalQuestions={questions.length}
                timeTaken={calculateTimeTaken()}
                quizWords={quizWords}
                onRestartQuiz={restartQuiz}
                incorrectAnswers={incorrectAnswers}
                streak={streak}
              />
            ) : (
              <Card className="shadow-sm">
                <CardContent className="text-center py-12">
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
                      <h3 className="text-xl font-bold mb-4">Ready to Test Your Vocabulary?</h3>
                      <p className="text-gray-600 mb-6">
                        This quiz will test your knowledge of the selected words. 
                        Choose the correct definition for each word to improve your GRE vocabulary.
                      </p>
                      <Button 
                        size="lg" 
                        onClick={generateQuiz}
                        className="mx-auto"
                      >
                        <Zap className="h-5 w-5 mr-2" />
                        Start Quiz
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuizPage;
