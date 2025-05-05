
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Book, BookOpen, Home, List, Search, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useVocab } from '@/contexts/VocabContext';
import { Progress } from '@/components/ui/progress';
import UserProfile from '@/components/UserProfile';

const Header: React.FC = () => {
  const location = useLocation();
  const { progress } = useVocab();
  
  // Function to determine the title based on current route
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard';
      case '/words':
        return 'Words';
      case '/flashcards':
        return 'Flashcards';
      case '/quiz':
        return 'Practice Quiz';
      case '/favorites':
        return 'Favorites';
      default:
        if (location.pathname.startsWith('/word/')) {
          return 'Word Details';
        }
        return 'Vocabulary Builder';
    }
  };

  return (
    <header className="bg-white border-b border-gray-300">
      <div className="kindle-header px-4 py-2">
        <div className="flex items-center space-x-2">
          {location.pathname !== '/' && (
            <Link to="/" className="text-gray-700">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          )}
          <h1 className="text-lg font-normal text-gray-900">Vocabulary Builder</h1>
        </div>
        
        <div className="text-sm text-gray-600">
          Words mastered: {progress.learned}/{progress.total}
        </div>
      </div>
      
      {location.pathname === '/words' && (
        <div className="flex border-b border-gray-300">
          <div className="flex-1 text-center py-2 border-r border-gray-300 font-medium">
            Words
          </div>
          <Link to="/flashcards" className="flex-1 text-center py-2 text-gray-500">
            Flashcards
          </Link>
        </div>
      )}
      
      {location.pathname === '/flashcards' && (
        <div className="flex border-b border-gray-300">
          <Link to="/words" className="flex-1 text-center py-2 text-gray-500 border-r border-gray-300">
            Words
          </Link>
          <div className="flex-1 text-center py-2 font-medium">
            Flashcards
          </div>
        </div>
      )}
      
      {location.pathname !== '/words' && location.pathname !== '/flashcards' && (
        <nav className="flex border-b border-gray-300 overflow-x-auto">
          <Link 
            to="/" 
            className={`px-4 py-2 text-sm ${location.pathname === '/' ? 'font-medium' : 'text-gray-500'}`}
          >
            Home
          </Link>
          
          <Link 
            to="/words"
            className={`px-4 py-2 text-sm ${location.pathname === '/words' ? 'font-medium' : 'text-gray-500'}`}
          >
            Words
          </Link>
          
          <Link 
            to="/flashcards"
            className={`px-4 py-2 text-sm ${location.pathname === '/flashcards' ? 'font-medium' : 'text-gray-500'}`}
          >
            Flashcards
          </Link>
          
          <Link 
            to="/quiz"
            className={`px-4 py-2 text-sm ${location.pathname === '/quiz' ? 'font-medium' : 'text-gray-500'}`}
          >
            Quiz
          </Link>
          
          <Link 
            to="/favorites"
            className={`px-4 py-2 text-sm ${location.pathname === '/favorites' ? 'font-medium' : 'text-gray-500'}`}
          >
            Favorites
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
