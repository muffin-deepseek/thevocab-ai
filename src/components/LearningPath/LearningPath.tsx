
import React from 'react';
import LearningPathUnit, { UnitStatus } from './LearningPathUnit';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export interface LearningUnit {
  id: number;
  name: string;
  status: UnitStatus;
  level: 'basic' | 'intermediate' | 'advanced';
  wordsCount: number;
}

interface LearningPathProps {
  units: LearningUnit[];
  onUnitClick: (unitId: number) => void;
}

const LearningPath: React.FC<LearningPathProps> = ({ units, onUnitClick }) => {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="py-6 px-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-xl font-bold mb-6">Your Learning Journey</h2>
      
      <div className="relative">
        {/* Path line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 transform -translate-y-1/2 z-0"></div>
        
        {/* Units */}
        <div className="flex justify-between items-center relative z-10">
          {units.map((unit, index) => (
            <motion.div 
              key={unit.id} 
              variants={itemVariants}
              className="flex flex-col items-center gap-2"
            >
              <LearningPathUnit
                name={unit.name}
                status={unit.status}
                level={unit.level}
                wordsCount={unit.wordsCount}
                onClick={() => onUnitClick(unit.id)}
              />
              <span className="text-xs font-medium">{unit.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LearningPath;
