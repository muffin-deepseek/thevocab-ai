
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import ModernCard from '../ModernCard';

interface XpBadgeProps {
  xp: number;
  showAnimation?: boolean;
}

const XpBadge: React.FC<XpBadgeProps> = ({ xp, showAnimation = false }) => {
  return (
    <motion.div 
      className="relative flex items-center justify-center"
      initial={showAnimation ? { scale: 0.8, opacity: 0 } : {}}
      animate={showAnimation ? { 
        scale: [0.8, 1.2, 1], 
        opacity: 1 
      } : {}}
      transition={{ duration: 0.5 }}
    >
      <ModernCard 
        className="flex items-center justify-center px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-lg border-yellow-300"
      >
        <Star className="h-4 w-4 text-white mr-1 fill-white" />
        <span className="text-white font-bold">{xp} XP</span>
      </ModernCard>
    </motion.div>
  );
};

export default XpBadge;
