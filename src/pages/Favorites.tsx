
import React from 'react';
import Header from '@/components/Header';
import { useVocab } from '@/contexts/VocabContext';
import WordCard from '@/components/WordCard';
import { Button } from '@/components/ui/button';
import { Star, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getWordById } from '@/data/wordData';
import { motion } from 'framer-motion';
import ModernCard from '@/components/ModernCard';

const Favorites: React.FC = () => {
  const { favorites, toggleFavorite } = useVocab();
  
  const favoriteWords = favorites.map(id => getWordById(id)).filter(Boolean);

  const clearAllFavorites = () => {
    favorites.forEach(id => toggleFavorite(id));
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
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
      >
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <Star className="h-6 w-6 mr-2 text-yellow-500" fill="currentColor" />
            <h2 className="text-2xl font-bold">Favorite Words</h2>
          </div>
          
          {favoriteWords.length > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearAllFavorites}
              className="text-red-500 border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Clear All Favorites
            </Button>
          )}
        </motion.div>
        
        {favoriteWords.length > 0 ? (
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {favoriteWords.map(word => (
              <motion.div key={word.id} variants={itemVariants}>
                <WordCard word={word} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div variants={itemVariants}>
            <ModernCard className="py-12 flex flex-col items-center text-center">
              <div className="bg-yellow-50 dark:bg-yellow-900/20 inline-block p-4 rounded-full mb-4">
                <Star className="h-12 w-12 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">No Favorite Words Yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                Add words to your favorites by clicking the star icon on any word.
              </p>
              <Button asChild className="bg-vocab-primary hover:bg-vocab-primary/90">
                <Link to="/words">
                  <Plus className="h-4 w-4 mr-2" />
                  Browse Word List
                </Link>
              </Button>
            </ModernCard>
          </motion.div>
        )}
      </motion.main>
    </div>
  );
};

export default Favorites;
