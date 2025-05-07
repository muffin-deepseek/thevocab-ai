
import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ModernCardProps extends Omit<HTMLMotionProps<"div">, "onDrag"> {
  children: React.ReactNode;
  gradient?: boolean;
  hoverEffect?: boolean;
}

export const ModernCard: React.FC<ModernCardProps> = ({
  children,
  className,
  gradient = false,
  hoverEffect = true,
  ...props
}) => {
  const hoverAnimation = hoverEffect ? { scale: 1.02, translateY: -5 } : {};
  
  return (
    <motion.div
      className={cn(
        "rounded-2xl border border-transparent bg-white dark:bg-gray-800 shadow-xl overflow-hidden",
        gradient && "bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900",
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
