
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { Word, WordLevel, words } from '@/data/wordData';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

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
  session: Session | null;
  setSession: (session: Session | null) => void;
  profile: any;
}

const VocabContext = createContext<VocabContextType | undefined>(undefined);

export const VocabProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [studyMode, setStudyMode] = useState<StudyMode>('list');
  const [selectedLevel, setSelectedLevel] = useState<WordLevel | 'all'>('all');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [learned, setLearned] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Check for active session on initial load
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        setSession(data.session);
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        setSession(currentSession);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fetch user profile when session changes
  useEffect(() => {
    const fetchProfile = async () => {
      if (!session) {
        setProfile(null);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (error) throw error;
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [session]);

  // Fetch user words (favorites and learned) when session changes
  useEffect(() => {
    const fetchUserWords = async () => {
      if (!session) {
        // If not logged in, load from localStorage
        const savedFavorites = localStorage.getItem('vocab-favorites');
        const savedLearned = localStorage.getItem('vocab-learned');
        
        setFavorites(savedFavorites ? JSON.parse(savedFavorites) : []);
        setLearned(savedLearned ? JSON.parse(savedLearned) : []);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('user_words')
          .select('*')
          .eq('user_id', session.user.id);

        if (error) throw error;
        
        if (data) {
          const favIds = data.filter(item => item.is_favorite).map(item => item.word_id);
          const learnedIds = data.filter(item => item.is_learned).map(item => item.word_id);
          
          setFavorites(favIds);
          setLearned(learnedIds);
        }
      } catch (error) {
        console.error('Error fetching user words:', error);
        // Fallback to localStorage if API fails
        const savedFavorites = localStorage.getItem('vocab-favorites');
        const savedLearned = localStorage.getItem('vocab-learned');
        
        setFavorites(savedFavorites ? JSON.parse(savedFavorites) : []);
        setLearned(savedLearned ? JSON.parse(savedLearned) : []);
      }
    };

    fetchUserWords();
  }, [session]);

  const syncWithSupabase = async (wordId: number, isFav: boolean, isLearn: boolean) => {
    if (!session) return;

    try {
      // Check if this word is already in the user's list
      const { data, error: fetchError } = await supabase
        .from('user_words')
        .select('*')
        .eq('user_id', session.user.id)
        .eq('word_id', wordId)
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (data) {
        // Update existing record
        const { error: updateError } = await supabase
          .from('user_words')
          .update({
            is_favorite: isFav,
            is_learned: isLearn,
            updated_at: new Date().toISOString()
          })
          .eq('id', data.id);

        if (updateError) throw updateError;
      } else {
        // Insert new record
        const { error: insertError } = await supabase
          .from('user_words')
          .insert({
            user_id: session.user.id,
            word_id: wordId,
            is_favorite: isFav,
            is_learned: isLearn
          });

        if (insertError) throw insertError;
      }
    } catch (error: any) {
      console.error('Error syncing with Supabase:', error);
      toast({
        title: "Sync Error",
        description: "Failed to save your progress. Please try again.",
        variant: "destructive"
      });
    }
  };

  const toggleFavorite = async (wordId: number) => {
    const newFavorites = favorites.includes(wordId)
      ? favorites.filter(id => id !== wordId)
      : [...favorites, wordId];
    
    setFavorites(newFavorites);
    
    // Save to localStorage as fallback
    localStorage.setItem('vocab-favorites', JSON.stringify(newFavorites));
    
    // If logged in, sync with Supabase
    const isFav = newFavorites.includes(wordId);
    const isLearn = learned.includes(wordId);
    await syncWithSupabase(wordId, isFav, isLearn);
  };

  const isFavorite = (wordId: number): boolean => {
    return favorites.includes(wordId);
  };

  const toggleLearned = async (wordId: number) => {
    const newLearned = learned.includes(wordId)
      ? learned.filter(id => id !== wordId)
      : [...learned, wordId];
    
    setLearned(newLearned);
    
    // Save to localStorage as fallback
    localStorage.setItem('vocab-learned', JSON.stringify(newLearned));
    
    // If logged in, sync with Supabase
    const isFav = favorites.includes(wordId);
    const isLearn = newLearned.includes(wordId);
    await syncWithSupabase(wordId, isFav, isLearn);
  };

  const isLearned = (wordId: number): boolean => {
    return learned.includes(wordId);
  };

  const resetProgress = async () => {
    setLearned([]);
    localStorage.removeItem('vocab-learned');
    
    // If logged in, reset progress in Supabase
    if (session) {
      try {
        const { error } = await supabase
          .from('user_words')
          .update({ is_learned: false })
          .eq('user_id', session.user.id);
        
        if (error) throw error;
      } catch (error) {
        console.error('Error resetting progress:', error);
        toast({
          title: "Reset Error",
          description: "Failed to reset your progress. Please try again.",
          variant: "destructive"
        });
      }
    }
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
      word.example?.toLowerCase().includes(query) ||
      word.synonyms?.some(syn => syn.toLowerCase().includes(query))
    );
  });

  if (loading) {
    return null; // or a loading spinner
  }

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
      setSearchQuery,
      session,
      setSession,
      profile
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
