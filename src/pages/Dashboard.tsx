
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, List, Zap, Award, Star, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useVocab } from '@/contexts/VocabContext';
import Header from '@/components/Header';
import { words } from '@/data/wordData';
import ModernCard from '@/components/ModernCard';
import { motion } from 'framer-motion';
import XpBadge from '@/components/GameElements/XpBadge';
import StreakCounter from '@/components/GameElements/StreakCounter';
import LevelProgressBar from '@/components/GameElements/LevelProgressBar';
import HeartCounter from '@/components/GameElements/HeartCounter';
import LearningPath, { LearningUnit } from '@/components/LearningPath/LearningPath';

const Dashboard: React.FC = () => {
  const { progress, favorites, learned, resetProgress } = useVocab();
  const [xp] = useState(120); // Mock XP data, in a real app would come from context/API
  const [streak] = useState(1); // Mock streak data
  const [hearts] = useState(4); // Mock hearts data
  const [level] = useState(3); // Mock user level
  const [levelProgress] = useState(60); // Mock level progress percentage
  
  // Sample learning path data - in a real app this would come from context/API
  const [learningUnits] = useState<LearningUnit[]>([
    { id: 1, name: "Basics", status: 'mastered', level: 'basic', wordsCount: 5 },
    { id: 2, name: "Common", status: 'completed', level: 'basic', wordsCount: 10 },
    { id: 3, name: "Advanced", status: 'available', level: 'intermediate', wordsCount: 15 },
    { id: 4, name: "Expert", status: 'locked', level: 'advanced', wordsCount: 20 },
    { id: 5, name: "Master", status: 'locked', level: 'advanced', wordsCount: 25 }
  ]);

  // Handle unit click
  const handleUnitClick = (unitId: number) => {
    console.log(`Unit ${unitId} clicked`);
    // In a real app, this would navigate to the specific unit or show a modal
  };

  // Calculate level stats
  const levelStats = {
    basic: {
      total: words.filter(w => w.level === 'basic').length,
      learned: words.filter(w => w.level === 'basic' && learned.includes(w.id)).length
    },
    intermediate: {
      total: words.filter(w => w.level === 'intermediate').length,
      learned: words.filter(w => w.level === 'intermediate' && learned.includes(w.id)).length
    },
    advanced: {
      total: words.filter(w => w.level === 'advanced').length,
      learned: words.filter(w => w.level === 'advanced' && learned.includes(w.id)).length
    }
  };

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-transparent backdrop-blur-sm bg-white/30 dark:bg-black/20">
      <Header />

      <motion.main 
        className="container mx-auto px-4 py-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* User Stats Row */}
        <motion.div 
          className="flex flex-wrap justify-between items-center gap-4 mb-6"
          variants={itemVariants}
        >
          <div className="flex items-center gap-3">
            <XpBadge xp={xp} />
            <StreakCounter days={streak} />
            <HeartCounter hearts={hearts} />
          </div>
          
          <div className="w-full md:w-auto">
            <LevelProgressBar level={level} progress={levelProgress} />
          </div>
        </motion.div>
        
        {/* Learning Path */}
        <motion.div 
          className="mb-8"
          variants={itemVariants}
        >
          <ModernCard colorScheme="primary" gradient>
            <LearningPath units={learningUnits} onUnitClick={handleUnitClick} />
          </ModernCard>
        </motion.div>
        
        <motion.h2 
          className="text-2xl font-bold mb-6"
          variants={itemVariants}
        >
          Today's Goals
        </motion.h2>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <ModernCard className="h-full relative overflow-hidden border-2 border-green-400">
              <div className="absolute top-0 right-0 bg-green-400 px-2 py-1 text-xs text-white font-bold">
                DAILY GOAL
              </div>
              <div className="p-6 flex flex-col items-center text-center gap-4">
                <div className="bg-green-100 rounded-full p-4">
                  <Award className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-bold">Learn 5 New Words</h3>
                <p className="text-sm text-gray-500">2/5 completed</p>
                <div className="w-full bg-gray-200 h-3 rounded-full">
                  <div className="bg-green-500 h-3 rounded-full" style={{ width: '40%' }}></div>
                </div>
                <Button asChild className="w-full bg-green-500 hover:bg-green-600">
                  <Link to="/flashcards">Continue</Link>
                </Button>
              </div>
            </ModernCard>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <ModernCard className="h-full relative overflow-hidden border-2 border-blue-400">
              <div className="absolute top-0 right-0 bg-blue-400 px-2 py-1 text-xs text-white font-bold">
                +20 XP
              </div>
              <div className="p-6 flex flex-col items-center text-center gap-4">
                <div className="bg-blue-100 rounded-full p-4">
                  <Zap className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold">Complete a Quiz</h3>
                <p className="text-sm text-gray-500">Test your knowledge</p>
                <Button asChild className="w-full bg-blue-500 hover:bg-blue-600">
                  <Link to="/quiz">Start Quiz</Link>
                </Button>
              </div>
            </ModernCard>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <ModernCard className="h-full relative overflow-hidden border-2 border-purple-400">
              <div className="absolute top-0 right-0 bg-purple-400 px-2 py-1 text-xs text-white font-bold">
                STREAK
              </div>
              <div className="p-6 flex flex-col items-center text-center gap-4">
                <div className="bg-purple-100 rounded-full p-4">
                  <Calendar className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold">Maintain Your Streak</h3>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <p className="text-sm text-gray-500">{streak} day streak</p>
                </div>
                <Button asChild className="w-full bg-purple-500 hover:bg-purple-600">
                  <Link to="/words">Practice Now</Link>
                </Button>
              </div>
            </ModernCard>
          </motion.div>
        </motion.div>

        <motion.h2 
          className="text-xl font-bold mb-4"
          variants={itemVariants}
        >
          Continue Learning
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Link to="/words" className="block">
              <ModernCard className="transition-all h-full border-2 border-gray-200 hover:border-vocabulary-primary">
                <div className="flex items-center p-6">
                  <List className="h-10 w-10 mr-4 text-vocab-primary" />
                  <div>
                    <h3 className="text-lg font-semibold">Word List</h3>
                    <p className="text-sm text-gray-500">Browse the complete word list</p>
                  </div>
                </div>
              </ModernCard>
            </Link>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Link to="/flashcards" className="block">
              <ModernCard className="transition-all h-full border-2 border-gray-200 hover:border-vocabulary-primary">
                <div className="flex items-center p-6">
                  <BookOpen className="h-10 w-10 mr-4 text-vocab-primary" />
                  <div>
                    <h3 className="text-lg font-semibold">Flashcards</h3>
                    <p className="text-sm text-gray-500">Study with interactive flashcards</p>
                  </div>
                </div>
              </ModernCard>
            </Link>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Link to="/quiz" className="block">
              <ModernCard className="transition-all h-full border-2 border-gray-200 hover:border-vocabulary-primary">
                <div className="flex items-center p-6">
                  <Zap className="h-10 w-10 mr-4 text-vocab-primary" />
                  <div>
                    <h3 className="text-lg font-semibold">Quiz</h3>
                    <p className="text-sm text-gray-500">Test your knowledge</p>
                  </div>
                </div>
              </ModernCard>
            </Link>
          </motion.div>
        </motion.div>
      </motion.main>
    </div>
  );
};

export default Dashboard;
