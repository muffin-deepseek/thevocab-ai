
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface LevelProgressBarProps {
  level: number;
  progress: number;
}

const LevelProgressBar: React.FC<LevelProgressBarProps> = ({ level, progress }) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-xs text-gray-600">
        <span>Level {level}</span>
        <span>{progress}%</span>
      </div>
      <div className="w-full md:w-48">
        <Progress value={progress} className="h-2" />
      </div>
    </div>
  );
};

export default LevelProgressBar;
