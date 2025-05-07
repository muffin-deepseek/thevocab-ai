
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StreakCounterProps {
  days: number;
  large?: boolean;
}

const StreakCounter: React.FC<StreakCounterProps> = ({ days, large = false }) => {
  return (
    <motion.div 
      className={cn(
        "bg-gradient-to-r from-orange-400 to-red-500 rounded-xl p-2 flex items-center",
        large ? "px-4 py-3" : ""
      )}
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="bg-orange-300/20 rounded-lg p-1.5">
        <Calendar className={cn("text-white", large ? "h-6 w-6" : "h-4 w-4")} />
      </div>
      <div className="ml-2">
        <p className={cn("text-white font-bold", large ? "text-xl" : "text-sm")}>{days}</p>
        <p className="text-white/80 text-xs">day streak</p>
      </div>
    </motion.div>
  );
};

export default StreakCounter;
