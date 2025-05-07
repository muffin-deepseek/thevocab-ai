
import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface HeartCounterProps {
  hearts: number;
  maxHearts?: number;
}

const HeartCounter: React.FC<HeartCounterProps> = ({ hearts, maxHearts = 5 }) => {
  return (
    <div className="flex items-center bg-white/90 dark:bg-gray-800/90 rounded-full px-3 py-1.5 shadow-md">
      {[...Array(maxHearts)].map((_, i) => (
        <motion.div 
          key={i} 
          initial={{ scale: 0.8 }}
          animate={{ scale: i < hearts ? [0.8, 1.2, 1] : 1 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
          className="mx-0.5"
        >
          <Heart 
            className={`h-5 w-5 ${i < hearts ? 'text-red-500 fill-red-500' : 'text-gray-300'}`} 
          />
        </motion.div>
      ))}
    </div>
  );
};

export default HeartCounter;
