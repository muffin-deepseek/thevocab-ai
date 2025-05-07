
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Lock, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export type UnitStatus = 'locked' | 'available' | 'completed' | 'mastered';

interface LearningPathUnitProps {
  name: string;
  status: UnitStatus;
  level: 'basic' | 'intermediate' | 'advanced';
  wordsCount: number;
  onClick: () => void;
}

const LearningPathUnit: React.FC<LearningPathUnitProps> = ({ 
  name, 
  status, 
  level,
  wordsCount, 
  onClick 
}) => {
  
  const getBgColor = () => {
    if (status === 'locked') return 'bg-gray-200 dark:bg-gray-700';
    
    switch (level) {
      case 'basic':
        return 'bg-green-100 dark:bg-green-900';
      case 'intermediate':
        return 'bg-blue-100 dark:bg-blue-900';
      case 'advanced':
        return 'bg-purple-100 dark:bg-purple-900';
      default:
        return 'bg-gray-100 dark:bg-gray-800';
    }
  };
  
  const getBorderColor = () => {
    if (status === 'locked') return 'border-gray-300 dark:border-gray-600';
    
    switch (level) {
      case 'basic':
        return 'border-green-400 dark:border-green-700';
      case 'intermediate':
        return 'border-blue-400 dark:border-blue-700';
      case 'advanced':
        return 'border-purple-400 dark:border-purple-700';
      default:
        return 'border-gray-300 dark:border-gray-600';
    }
  };
  
  const getIcon = () => {
    switch (status) {
      case 'locked':
        return <Lock className="h-6 w-6 text-gray-500" />;
      case 'completed':
        return <Check className="h-6 w-6 text-green-500" />;
      case 'mastered':
        return <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />;
      default:
        return null;
    }
  };
  
  return (
    <motion.div
      whileHover={status !== 'locked' ? { scale: 1.05 } : {}}
      className={cn(
        "rounded-full w-20 h-20 flex items-center justify-center border-4 cursor-pointer relative",
        getBgColor(),
        getBorderColor(),
        status === 'locked' && "opacity-70 cursor-not-allowed"
      )}
      onClick={status !== 'locked' ? onClick : undefined}
    >
      {getIcon() || (
        <div className="text-center px-2">
          <p className="font-bold text-sm">{name}</p>
          <p className="text-xs">{wordsCount} words</p>
        </div>
      )}
    </motion.div>
  );
};

export default LearningPathUnit;
