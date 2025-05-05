
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Book, BookOpen, Home, List, Search, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useVocab } from '@/contexts/VocabContext';
import { Progress } from '@/components/ui/progress';
import UserProfile from '@/components/UserProfile';

const Header: React.FC = () => {
  const location = useLocation();
  const { progress } = useVocab();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Book className="h-6 w-6 text-vocab-primary" />
            <h1 className="text-2xl font-bold text-vocab-primary">Vocabu.AI</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-full md:w-64">
              <div className="flex flex-col">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{progress.learned}/{progress.total} words</span>
                </div>
                <Progress value={progress.percentage} className="h-2" />
              </div>
            </div>
            
            <UserProfile />
          </div>
        </div>
        
        <nav className="mt-4">
          <div className="flex overflow-x-auto gap-2 pb-2">
            <Button
              variant={location.pathname === '/' ? 'default' : 'ghost'}
              size="sm"
              asChild
              className="whitespace-nowrap"
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
              className="whitespace-nowrap"
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
              className="whitespace-nowrap"
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
              className="whitespace-nowrap"
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
              className="whitespace-nowrap"
            >
              <Link to="/favorites">
                <Star className="h-4 w-4 mr-2" />
                Favorites
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
