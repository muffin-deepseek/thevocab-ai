
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { useVocab } from '@/contexts/VocabContext';
import { Button } from '@/components/ui/button';

const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery } = useVocab();

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        type="text"
        placeholder="Search words, definitions..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10 pr-10"
      />
      {searchQuery && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
          onClick={() => setSearchQuery('')}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default SearchBar;
