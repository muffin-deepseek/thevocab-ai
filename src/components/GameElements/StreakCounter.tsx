
import React from 'react';
import { Flame } from 'lucide-react';

interface StreakCounterProps {
  days: number;
}

const StreakCounter: React.FC<StreakCounterProps> = ({ days }) => {
  return (
    <div className="flex items-center gap-2 bg-orange-100 px-3 py-1 rounded-full">
      <Flame className="h-4 w-4 text-orange-500 fill-orange-500" />
      <span className="text-orange-800 font-medium">{days} {days === 1 ? 'day' : 'days'}</span>
    </div>
  );
};

export default StreakCounter;
