
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';

interface LevelProgressBarProps {
  level: number;
  progress: number;
}

const LevelProgressBar: React.FC<LevelProgressBarProps> = ({ level, progress }) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <motion.div 
          className="bg-vocab-primary text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
        >
          {level}
        </motion.div>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {progress}% to level {level + 1}
        </span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};

export default LevelProgressBar;
