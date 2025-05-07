
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import { getWordById } from '@/data/wordData';
import WordCard from '@/components/WordCard';
import ConversationExamples from '@/components/ConversationExamples';
import { Button } from '@/components/ui/button';
import { ChevronLeft, BookOpen } from 'lucide-react';
import ModernCard from '@/components/ModernCard';
import VoiceButton from '@/components/VoiceButton';
import { motion } from 'framer-motion';

const WordDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const word = getWordById(id ? parseInt(id) : 0);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (!word) {
    return (
      <div className="min-h-screen bg-transparent backdrop-blur-sm bg-white/30 dark:bg-black/20 bg-dotted-pattern">
        <Header />
        <motion.main 
          className="container mx-auto px-4 py-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Word Not Found</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Sorry, we couldn't find the word you're looking for.</p>
            <Button asChild className="bg-vocab-primary hover:bg-vocab-primary/90">
              <Link to="/words">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Word List
              </Link>
            </Button>
          </motion.div>
        </motion.main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent backdrop-blur-sm bg-white/30 dark:bg-black/20 bg-dotted-pattern">
      <Header />
      
      <motion.main 
        className="container mx-auto px-4 py-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="mb-6">
          <Button asChild variant="outline">
            <Link to="/words">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Word List
            </Link>
          </Button>
        </motion.div>
        
        <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
          <motion.div variants={itemVariants} className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">{word.word}</h1>
            <VoiceButton text={word.word} size="default" />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <WordCard word={word} showFullDetails={true} />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <ConversationExamples word={word} />
          </motion.div>
          
          <motion.div variants={itemVariants} className="mt-8 space-y-6">
            {word.synonyms && word.synonyms.length > 0 && (
              <ModernCard colorScheme="light">
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-3">Similar Words</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {word.synonyms.map((synonym, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md flex justify-between items-center">
                        <span>{synonym}</span>
                        <VoiceButton text={synonym} size="sm" />
                      </div>
                    ))}
                  </div>
                </div>
              </ModernCard>
            )}
            
            <ModernCard colorScheme="primary" gradient>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-3 text-white dark:text-white">Study this Word</h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild variant="outline" className="flex-1 bg-white/20 text-white border-white/30 hover:bg-white/30">
                    <Link to="/flashcards">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Practice with Flashcards
                    </Link>
                  </Button>
                  <Button asChild className="flex-1 bg-white/20 text-white border-white/30 hover:bg-white/30">
                    <Link to="/quiz">
                      Take a Quiz
                    </Link>
                  </Button>
                </div>
              </div>
            </ModernCard>
          </motion.div>
        </motion.div>
      </motion.main>
    </div>
  );
};

export default WordDetail;
