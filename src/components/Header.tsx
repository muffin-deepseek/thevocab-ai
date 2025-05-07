
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Book, BookOpen, Home, List, Search, Star, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useVocab } from '@/contexts/VocabContext';
import { Progress } from '@/components/ui/progress';
import UserProfile from '@/components/UserProfile';
import { useTheme } from '@/hooks/use-theme';
import { motion } from 'framer-motion';
import XpBadge from './GameElements/XpBadge';
import HeartCounter from './GameElements/HeartCounter';
import StreakCounter from './GameElements/StreakCounter';

const Header: React.FC = () => {
  const location = useLocation();
  const { progress } = useVocab();
  const { theme, toggleTheme } = useTheme();
  
  // Mock data - in a real app this would come from context/API
  const xp = 120;
  const hearts = 4;
  const streakDays = 1;

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 shadow-md backdrop-blur-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Book className="h-8 w-8 text-vocab-primary" />
            <motion.h1 
              className="text-2xl font-black text-vocab-primary"
              whileHover={{ scale: 1.05 }}
            >
              Vocabu<span className="text-vocab-success">.AI</span>
            </motion.h1>
          </motion.div>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="hidden md:flex gap-3 items-center">
              <XpBadge xp={xp} />
              <HeartCounter hearts={hearts} />
              <StreakCounter days={streakDays} />
            </div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-gray-600 dark:text-gray-300"
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </motion.div>
            
            <UserProfile />
          </div>
        </div>
        
        <nav className="mt-3">
          <motion.div 
            className="flex overflow-x-auto gap-2 pb-1"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <Button
              variant={location.pathname === '/' ? 'default' : 'ghost'}
              size="sm"
              asChild
              className="whitespace-nowrap rounded-full"
            >
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
            </Button>
            
            <Button
              variant={location.pathname === '/words' ? 'default' : 'ghost'}
              size="sm"
              asChild
              className="whitespace-nowrap rounded-full"
            >
              <Link to="/words">
                <List className="h-4 w-4 mr-2" />
                Word List
              </Link>
            </Button>
            
            <Button
              variant={location.pathname === '/flashcards' ? 'default' : 'ghost'}
              size="sm"
              asChild
              className="whitespace-nowrap rounded-full"
            >
              <Link to="/flashcards">
                <BookOpen className="h-4 w-4 mr-2" />
                Flashcards
              </Link>
            </Button>
            
            <Button
              variant={location.pathname === '/quiz' ? 'default' : 'ghost'}
              size="sm"
              asChild
              className="whitespace-nowrap rounded-full"
            >
              <Link to="/quiz">
                <Search className="h-4 w-4 mr-2" />
                Practice Quiz
              </Link>
            </Button>
            
            <Button
              variant={location.pathname === '/favorites' ? 'default' : 'ghost'}
              size="sm"
              asChild
              className="whitespace-nowrap rounded-full"
            >
              <Link to="/favorites">
                <Star className="h-4 w-4 mr-2" />
                Favorites
              </Link>
            </Button>
          </motion.div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
