
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Star, List, Zap, BarChart, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useVocab } from '@/contexts/VocabContext';
import Header from '@/components/Header';
import { words } from '@/data/wordData';
import ModernCard from '@/components/ModernCard';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  const { progress, favorites, learned, resetProgress } = useVocab();

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
        <motion.h2 
          className="text-2xl font-bold mb-6"
          variants={itemVariants}
        >
          Your Learning Dashboard
        </motion.h2>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          variants={containerVariants}
        >
          {/* Overall Progress */}
          <motion.div variants={itemVariants}>
            <ModernCard>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <BarChart className="h-5 w-5 mr-2 text-vocab-primary" />
                  Overall Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Words Learned</span>
                    <span className="font-medium">{progress.learned}/{progress.total}</span>
                  </div>
                  <Progress value={progress.percentage} className="h-2" />
                  <p className="text-sm text-gray-500 mt-2">
                    You've learned {progress.percentage}% of all vocabulary words
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2 w-full text-xs"
                    onClick={resetProgress}
                  >
                    Reset Progress
                  </Button>
                </div>
              </CardContent>
            </ModernCard>
          </motion.div>

          {/* Quick Stats */}
          <motion.div variants={itemVariants}>
            <ModernCard>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-vocab-primary" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 mr-2 text-yellow-500" />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="text-sm">Favorite Words</span>
                        <span className="text-sm font-medium">{favorites.length}</span>
                      </div>
                      <Progress value={(favorites.length / progress.total) * 100} className="h-1 mt-1" />
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Award className="h-5 w-5 mr-2 text-purple-500" />
                    <span className="text-sm">Streak: 1 day</span>
                  </div>
                  
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-blue-500" />
                    <span className="text-sm">Last studied: Today</span>
                  </div>
                </div>
              </CardContent>
            </ModernCard>
          </motion.div>

          {/* Level Progress */}
          <motion.div variants={itemVariants}>
            <ModernCard>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <List className="h-5 w-5 mr-2 text-vocab-primary" />
                  Progress by Level
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Basic</span>
                      <span className="font-medium">{levelStats.basic.learned}/{levelStats.basic.total}</span>
                    </div>
                    <Progress 
                      value={(levelStats.basic.learned / levelStats.basic.total) * 100} 
                      className="h-2 bg-gray-200" 
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Intermediate</span>
                      <span className="font-medium">{levelStats.intermediate.learned}/{levelStats.intermediate.total}</span>
                    </div>
                    <Progress 
                      value={(levelStats.intermediate.learned / levelStats.intermediate.total) * 100} 
                      className="h-2 bg-gray-200" 
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Advanced</span>
                      <span className="font-medium">{levelStats.advanced.learned}/{levelStats.advanced.total}</span>
                    </div>
                    <Progress 
                      value={(levelStats.advanced.learned / levelStats.advanced.total) * 100} 
                      className="h-2 bg-gray-200" 
                    />
                  </div>
                </div>
              </CardContent>
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
              <ModernCard className="transition-all hover:shadow-md h-full">
                <CardContent className="flex items-center p-6">
                  <List className="h-10 w-10 mr-4 text-vocab-primary" />
                  <div>
                    <h3 className="text-lg font-semibold">Word List</h3>
                    <p className="text-sm text-gray-500">Browse the complete word list</p>
                  </div>
                </CardContent>
              </ModernCard>
            </Link>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Link to="/flashcards" className="block">
              <ModernCard className="transition-all hover:shadow-md h-full">
                <CardContent className="flex items-center p-6">
                  <BookOpen className="h-10 w-10 mr-4 text-vocab-primary" />
                  <div>
                    <h3 className="text-lg font-semibold">Flashcards</h3>
                    <p className="text-sm text-gray-500">Study with interactive flashcards</p>
                  </div>
                </CardContent>
              </ModernCard>
            </Link>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Link to="/quiz" className="block">
              <ModernCard className="transition-all hover:shadow-md h-full">
                <CardContent className="flex items-center p-6">
                  <Zap className="h-10 w-10 mr-4 text-vocab-primary" />
                  <div>
                    <h3 className="text-lg font-semibold">Quiz</h3>
                    <p className="text-sm text-gray-500">Test your knowledge</p>
                  </div>
                </CardContent>
              </ModernCard>
            </Link>
          </motion.div>
        </motion.div>
      </motion.main>
    </div>
  );
};

export default Dashboard;
