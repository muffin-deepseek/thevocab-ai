
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { Word } from '@/data/wordData';
import VoiceButton from '@/components/VoiceButton';
import { motion } from 'framer-motion';
import ModernCard from '@/components/ModernCard';

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  timeTaken: string;
  quizWords: Word[];
  onRestartQuiz: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({
  score,
  totalQuestions,
  timeTaken,
  quizWords,
  onRestartQuiz
}) => {
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

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <ModernCard gradient className="shadow-md bg-white rounded-2xl border-0">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl text-center text-vocab-primary font-bold">Quiz Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <motion.div 
            className="mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <motion.div 
              className="text-6xl font-bold text-vocab-primary"
              whileHover={{ scale: 1.05 }}
            >
              {score} / {totalQuestions}
            </motion.div>
            <p className="text-gray-500 mt-2">
              {Math.round((score / totalQuestions) * 100)}% Correct
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <motion.div 
              className="bg-secondary/10 p-5 rounded-xl"
              whileHover={{ translateY: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <p className="text-sm text-gray-600">Time Taken</p>
              <p className="text-xl font-semibold text-vocab-primary">{timeTaken}</p>
            </motion.div>
            <motion.div 
              className="bg-secondary/10 p-5 rounded-xl"
              whileHover={{ translateY: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <p className="text-sm text-gray-600">Words Learned</p>
              <p className="text-xl font-semibold text-vocab-primary">{score}</p>
            </motion.div>
          </div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              onClick={onRestartQuiz} 
              className="w-full mb-10 bg-vocab-primary hover:bg-vocab-primary/90 text-white"
              size="lg"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Start New Quiz
            </Button>
          </motion.div>
          
          {/* Conversation Examples Section */}
          <div className="mt-8 border-t pt-8">
            <h3 className="text-xl font-bold mb-4 text-vocab-primary">Use These Words in Conversation</h3>
            <p className="text-sm text-gray-600 mb-6">
              Practice using these words from the quiz in your daily conversations:
            </p>
            
            <motion.div 
              className="space-y-4 text-left max-h-96 overflow-y-auto pr-2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {conversationExamples.map((item, index) => (
                <motion.div 
                  key={index} 
                  className={`p-5 rounded-xl backdrop-blur-sm ${
                    item.word.level === 'basic' ? 'bg-teal-500/10' : 
                    item.word.level === 'intermediate' ? 'bg-vocab-primary/10' : 'bg-pink-500/10'
                  }`}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.02, 
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                  }}
                >
                  <div className="flex items-center justify-between">
                    <p className={`font-bold ${
                      item.word.level === 'basic' ? 'text-teal-600' : 
                      item.word.level === 'intermediate' ? 'text-vocab-primary' : 'text-pink-600'
                    }`}>{item.word.word}</p>
                    <VoiceButton 
                      text={item.word.word} 
                      size="sm" 
                      variant="ghost"
                      className={
                        item.word.level === 'basic' ? 'text-teal-600' : 
                        item.word.level === 'intermediate' ? 'text-vocab-primary' : 'text-pink-600'
                      }
                    />
                  </div>
                  <p className="text-gray-700 mt-2">{item.example}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </CardContent>
    </ModernCard>
  );
};

export default QuizResults;
