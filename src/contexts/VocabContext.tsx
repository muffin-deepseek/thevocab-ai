
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Word, WordLevel, words } from '@/data/wordData';

type StudyMode = 'flashcards' | 'quiz' | 'list';

interface VocabContextType {
  studyMode: StudyMode;
  setStudyMode: (mode: StudyMode) => void;
  selectedLevel: WordLevel | 'all';
  setSelectedLevel: (level: WordLevel | 'all') => void;
  favorites: number[];
  toggleFavorite: (wordId: number) => void;
  isFavorite: (wordId: number) => boolean;
  learned: number[];
  toggleLearned: (wordId: number) => void;
  isLearned: (wordId: number) => boolean;
  progress: {
    total: number;
    learned: number;
    percentage: number;
  };
  resetProgress: () => void;
  filteredWords: Word[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const VocabContext = createContext<VocabContextType | undefined>(undefined);

export const VocabProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [studyMode, setStudyMode] = useState<StudyMode>('list');
  const [selectedLevel, setSelectedLevel] = useState<WordLevel | 'all'>('all');
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('vocab-favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [learned, setLearned] = useState<number[]>(() => {
    const saved = localStorage.getItem('vocab-learned');
    return saved ? JSON.parse(saved) : [];
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Save to localStorage when states change
  useEffect(() => {
    localStorage.setItem('vocab-favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('vocab-learned', JSON.stringify(learned));
  }, [learned]);

  const toggleFavorite = (wordId: number) => {
    setFavorites(prev => 
      prev.includes(wordId) 
        ? prev.filter(id => id !== wordId) 
        : [...prev, wordId]
    );
  };

  const isFavorite = (wordId: number): boolean => {
    return favorites.includes(wordId);
  };

  const toggleLearned = (wordId: number) => {
    setLearned(prev => 
      prev.includes(wordId) 
        ? prev.filter(id => id !== wordId) 
        : [...prev, wordId]
    );
  };

  const isLearned = (wordId: number): boolean => {
    return learned.includes(wordId);
  };

  const resetProgress = () => {
    setLearned([]);
    localStorage.removeItem('vocab-learned');
  };

  // Calculate progress
  const progress = {
    total: words.length,
    learned: learned.length,
    percentage: words.length ? Math.round((learned.length / words.length) * 100) : 0
  };

  // Filter words based on selected level and search query
  const filteredWords = words.filter(word => {
    // Filter by level
    const levelMatch = selectedLevel === 'all' || word.level === selectedLevel;
    
    // Filter by search query
    if (!searchQuery) return levelMatch;
    
    const query = searchQuery.toLowerCase();
    return levelMatch && (
      word.word.toLowerCase().includes(query) ||
      word.definition.toLowerCase().includes(query) ||
      word.example.toLowerCase().includes(query) ||
      word.synonyms?.some(syn => syn.toLowerCase().includes(query))
    );
  });

  return (
    <VocabContext.Provider value={{
      studyMode,
      setStudyMode,
      selectedLevel,
      setSelectedLevel,
      favorites,
      toggleFavorite,
      isFavorite,
      learned,
      toggleLearned,
      isLearned,
      progress,
      resetProgress,
      filteredWords,
      searchQuery,
      setSearchQuery
    }}>
      {children}
    </VocabContext.Provider>
  );
};

export const useVocab = (): VocabContextType => {
  const context = useContext(VocabContext);
  if (context === undefined) {
    throw new Error('useVocab must be used within a VocabProvider');
  }
  return context;
};
