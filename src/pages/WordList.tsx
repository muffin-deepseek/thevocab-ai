
import React from 'react';
import Header from '@/components/Header';
import { useVocab } from '@/contexts/VocabContext';
import WordCard from '@/components/WordCard';
import SearchBar from '@/components/SearchBar';
import LevelFilter from '@/components/LevelFilter';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, List, Grid3X3 } from 'lucide-react';
import { useState } from 'react';

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
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
              className={viewMode === 'list' ? 'bg-gray-100' : ''}
            >
              <List className="h-4 w-4" />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-gray-100' : ''}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="md:col-span-3">
            <SearchBar />
          </div>
          <div className="md:col-span-1">
            <LevelFilter />
          </div>
        </div>
        
        {sortedWords.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No words match your search criteria.</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sortedWords.map(word => (
              <WordCard key={word.id} word={word} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col space-y-3">
            {sortedWords.map(word => (
              <WordCard key={word.id} word={word} />
            ))}
          </div>
        )}
        
        <div className="mt-4 text-center text-sm text-gray-500">
          Showing {sortedWords.length} {sortedWords.length === 1 ? 'word' : 'words'}
        </div>
      </main>
    </div>
  );
};

export default WordList;
