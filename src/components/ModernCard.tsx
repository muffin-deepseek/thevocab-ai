
import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ModernCardProps extends Omit<HTMLMotionProps<"div">, "onDrag"> {
  children: React.ReactNode;
  gradient?: boolean;
  hoverEffect?: boolean;
  colorScheme?: 'default' | 'primary' | 'success' | 'warning' | 'error';
}

export const ModernCard: React.FC<ModernCardProps> = ({
  children,
  className,
  gradient = false,
  hoverEffect = true,
  colorScheme = 'default',
  ...props
}) => {
  const hoverAnimation = hoverEffect ? { scale: 1.02, translateY: -5 } : {};
  
  const getColorClasses = () => {
    switch (colorScheme) {
      case 'primary':
        return 'bg-vocab-primary/10 dark:bg-vocab-primary/20 border-vocab-primary/30';
      case 'success':
        return 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700';
      case 'warning':
        return 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700';
      case 'error':
        return 'bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700';
      default:
        return 'bg-white dark:bg-gray-800 border-transparent';
    }
  };
  
  return (
    <motion.div
      className={cn(
        "rounded-2xl border shadow-xl overflow-hidden",
        getColorClasses(),
        gradient && colorScheme === 'default' && "bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900",
        gradient && colorScheme === 'primary' && "bg-gradient-to-br from-vocab-primary/10 to-vocab-secondary/20",
        hoverEffect && "transition-all duration-300 hover:shadow-2xl",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={hoverAnimation}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default ModernCard;
