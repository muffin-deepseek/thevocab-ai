
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { useVocab } from '@/contexts/VocabContext';
import Flashcard from '@/components/Flashcard';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, RefreshCw, Check, X } from 'lucide-react';
import LevelFilter from '@/components/LevelFilter';
import ModernCard from '@/components/ModernCard';
import { motion, AnimatePresence } from 'framer-motion';

const FlashcardPage: React.FC = () => {
  const { filteredWords, toggleLearned } = useVocab();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [carouselKey, setCarouselKey] = useState(0); // Key for forcing re-render
  
  useEffect(() => {
    // Reset to first card when filtered words change
    setCurrentIndex(0);
    setShowBack(false);
    setCarouselKey(prevKey => prevKey + 1);
  }, [filteredWords]);
  
  const handleNext = () => {
    if (currentIndex < filteredWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowBack(false);
    }
  };
  
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowBack(false);
    }
  };
  
  const handleCardClick = () => {
    setShowBack(!showBack);
  };
  
  const handleShuffle = () => {
    setCurrentIndex(0);
    setShowBack(false);
    setCarouselKey(prevKey => prevKey + 1);
  };
  
  const handleMarkLearned = () => {
    if (filteredWords.length > 0) {
      toggleLearned(filteredWords[currentIndex].id);
    }
  };

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

  return (
    <div className="min-h-screen bg-transparent backdrop-blur-sm bg-white/30 dark:bg-black/20 bg-dotted-pattern">
      <Header />
      
      <motion.main 
        className="container mx-auto px-4 py-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        key={carouselKey}
      >
        <motion.div variants={itemVariants} className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Flashcards</h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <motion.div variants={itemVariants}>
              <ModernCard>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Filter Words</h3>
                  <LevelFilter />
                  
                  <div className="mt-6">
                    <Button 
                      onClick={handleShuffle} 
                      variant="outline" 
                      className="w-full"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Shuffle Cards
                    </Button>
                  </div>
                </div>
              </ModernCard>
            </motion.div>
          </div>
          
          <div className="md:col-span-2">
            <motion.div variants={itemVariants} className="flex flex-col items-center">
              <AnimatePresence mode="wait">
                {filteredWords.length > 0 ? (
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="w-full mb-6"
                  >
                    <Flashcard 
                      word={filteredWords[currentIndex]} 
                      flipped={showBack}
                      onClick={handleCardClick}
                    />
                  </motion.div>
                ) : (
                  <motion.div 
                    variants={itemVariants}
                    className="text-center py-12 w-full"
                  >
                    <p className="text-gray-500">No flashcards available with the selected filters.</p>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {filteredWords.length > 0 && (
                <motion.div variants={itemVariants} className="w-full">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Card {currentIndex + 1} of {filteredWords.length}
                    </span>
                    
                    <div className="flex space-x-2">
                      <Button 
                        onClick={handleMarkLearned} 
                        variant="outline"
                        size="sm"
                        className="flex items-center"
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Mark as Learned
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-4 gap-4">
                    <Button 
                      onClick={handlePrev}
                      disabled={currentIndex === 0}
                      variant="outline"
                      className="flex-1"
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>
                    
                    <Button 
                      onClick={handleNext}
                      disabled={currentIndex === filteredWords.length - 1}
                      className="flex-1 bg-vocab-primary hover:bg-vocab-primary/90"
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.main>
    </div>
  );
};

export default FlashcardPage;
