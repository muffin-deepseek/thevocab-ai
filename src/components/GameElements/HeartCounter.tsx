
import React from 'react';
import { Heart } from 'lucide-react';

interface HeartCounterProps {
  hearts: number;
  maxHearts?: number;
}

const HeartCounter: React.FC<HeartCounterProps> = ({ hearts, maxHearts = 5 }) => {
  return (
    <div className="flex items-center gap-1 bg-red-100 px-3 py-1 rounded-full">
      {Array.from({ length: maxHearts }).map((_, i) => (
        <Heart 
          key={i} 
          className={`h-4 w-4 ${i < hearts ? 'text-red-500 fill-red-500' : 'text-gray-300'}`} 
        />
      ))}
    </div>
  );
};

export default HeartCounter;
