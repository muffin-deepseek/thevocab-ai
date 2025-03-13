
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import { getWordById } from '@/data/wordData';
import WordCard from '@/components/WordCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const WordDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const word = getWordById(id ? parseInt(id) : 0);

  if (!word) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Word Not Found</h2>
            <p className="text-gray-600 mb-8">Sorry, we couldn't find the word you're looking for.</p>
            <Button asChild>
              <Link to="/words">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Word List
              </Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button asChild variant="outline">
            <Link to="/words">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Word List
            </Link>
          </Button>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <WordCard word={word} showFullDetails={true} />
          
          <div className="mt-8 space-y-6">
            {word.synonyms && word.synonyms.length > 0 && (
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-3">Similar Words</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {word.synonyms.map((synonym, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-md">
                        {synonym}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-3">Study this Word</h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild variant="outline" className="flex-1">
                    <Link to="/flashcards">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Practice with Flashcards
                    </Link>
                  </Button>
                  <Button asChild className="flex-1">
                    <Link to="/quiz">
                      Take a Quiz
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WordDetail;
