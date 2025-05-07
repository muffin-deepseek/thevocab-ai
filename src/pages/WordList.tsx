
import React from 'react';
import Header from '@/components/Header';
import { useVocab } from '@/contexts/VocabContext';
import WordCard from '@/components/WordCard';
import SearchBar from '@/components/SearchBar';
import LevelFilter from '@/components/LevelFilter';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, List, Grid3X3 } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import ModernCard from '@/components/ModernCard';

const WordList: React.FC = () => {
  const { filteredWords } = useVocab();
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const sortedWords = [...filteredWords].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.word.localeCompare(b.word);
    } else {
      return b.word.localeCompare(a.word);
    }
  });

  const toggleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
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
          <h2 className="text-2xl font-bold mb-4 md:mb-0">Word List</h2>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleSort}
              className="flex items-center"
            >
              <ArrowUpDown className="h-4 w-4 mr-1" />
              {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-accent text-accent-foreground' : ''}
            >
              <List className="h-4 w-4" />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-accent text-accent-foreground' : ''}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
        
        <ModernCard className="mb-6">
          <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-3">
              <SearchBar />
            </div>
            <div className="md:col-span-1">
              <LevelFilter />
            </div>
          </div>
        </ModernCard>
        
        {sortedWords.length === 0 ? (
          <motion.div variants={itemVariants} className="text-center py-10">
            <p className="text-gray-500">No words match your search criteria.</p>
          </motion.div>
        ) : viewMode === 'grid' ? (
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {sortedWords.map(word => (
              <motion.div key={word.id} variants={itemVariants}>
                <WordCard word={word} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            variants={containerVariants}
            className="flex flex-col space-y-3"
          >
            {sortedWords.map(word => (
              <motion.div key={word.id} variants={itemVariants}>
                <WordCard word={word} />
              </motion.div>
            ))}
          </motion.div>
        )}
        
        <motion.div variants={itemVariants} className="mt-4 text-center text-sm text-gray-500">
          Showing {sortedWords.length} {sortedWords.length === 1 ? 'word' : 'words'}
        </motion.div>
      </motion.main>
    </div>
  );
};

export default WordList;
