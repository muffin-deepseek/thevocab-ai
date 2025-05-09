
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, LockIcon, ChevronRight } from 'lucide-react';
import { WordLevel } from '@/data/wordData';

export type LearningUnitStatus = 'mastered' | 'completed' | 'available' | 'locked';

export interface LearningUnit {
  id: number;
  name: string;
  status: LearningUnitStatus;
  level: WordLevel;
  wordsCount: number;
}

interface LearningPathProps {
  units: LearningUnit[];
  onUnitClick: (unitId: number) => void;
}

const LearningPath: React.FC<LearningPathProps> = ({ units, onUnitClick }) => {
  // Status styling
  const getStatusClass = (status: LearningUnitStatus) => {
    switch (status) {
      case 'mastered':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'available':
        return 'bg-white text-vocab-primary border-vocab-primary';
      case 'locked':
        return 'bg-gray-100 text-gray-500 border-gray-300';
    }
  };
  
  // Level styling
  const getLevelClass = (level: WordLevel) => {
    switch (level) {
      case 'basic':
        return 'bg-teal-100 text-teal-800';
      case 'intermediate':
        return 'bg-vocab-primary/20 text-vocab-primary';
      case 'advanced':
        return 'bg-pink-100 text-pink-800';
    }
  };
  
  // Status icon
  const getStatusIcon = (status: LearningUnitStatus) => {
    switch (status) {
      case 'mastered':
      case 'completed':
        return <CheckCircle className="h-5 w-5" />;
      case 'locked':
        return <LockIcon className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <h3 className="text-xl font-bold mb-6">Learning Path</h3>
      
      <div className="flex flex-wrap items-center gap-3">
        {units.map((unit, index) => (
          <React.Fragment key={unit.id}>
            <motion.div
              whileHover={unit.status !== 'locked' ? { scale: 1.05 } : {}}
              className={`
                px-6 py-3 rounded-lg border-2 flex items-center gap-3 min-w-48
                ${getStatusClass(unit.status)}
                ${unit.status !== 'locked' ? 'cursor-pointer' : 'cursor-not-allowed'}
              `}
              onClick={() => unit.status !== 'locked' && onUnitClick(unit.id)}
            >
              <div className="flex-1">
                <div className="font-bold text-lg">{unit.name}</div>
                <div className="flex items-center text-xs gap-2">
                  <span className={`${getLevelClass(unit.level)} px-2 py-0.5 rounded-full`}>
                    {unit.level}
                  </span>
                  <span>{unit.wordsCount} words</span>
                </div>
              </div>
              <div>
                {getStatusIcon(unit.status) || 
                  <ChevronRight className="h-5 w-5 text-vocab-primary" />
                }
              </div>
            </motion.div>
            
            {/* Connector between units */}
            {index < units.length - 1 && (
              <div className="hidden md:block w-6 h-0.5 bg-gray-300"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default LearningPath;
