
import React from 'react';
import Header from '@/components/Header';
import { useVocab } from '@/contexts/VocabContext';
import WordCard from '@/components/WordCard';
import { Button } from '@/components/ui/button';
import { Star, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getWordById } from '@/data/wordData';

const Favorites: React.FC = () => {
  const { favorites, toggleFavorite } = useVocab();
  
  const favoriteWords = favorites.map(id => getWordById(id)).filter(Boolean);

  const clearAllFavorites = () => {
    favorites.forEach(id => toggleFavorite(id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <Star className="h-6 w-6 mr-2 text-yellow-500" fill="currentColor" />
            <h2 className="text-2xl font-bold">Favorite Words</h2>
          </div>
          
          {favoriteWords.length > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearAllFavorites}
              className="text-red-500 border-red-200 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Clear All Favorites
            </Button>
          )}
        </div>
        
        {favoriteWords.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {favoriteWords.map(word => (
              <WordCard key={word.id} word={word} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-yellow-50 inline-block p-4 rounded-full mb-4">
              <Star className="h-12 w-12 text-yellow-300" />
            </div>
            <h3 className="text-xl font-bold mb-2">No Favorite Words Yet</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Add words to your favorites by clicking the star icon on any word.
            </p>
            <Button asChild>
              <Link to="/words">
                <Plus className="h-4 w-4 mr-2" />
                Browse Word List
              </Link>
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Favorites;
