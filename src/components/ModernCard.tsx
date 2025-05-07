
import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

type ColorScheme = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'light';

interface ModernCardProps extends Omit<HTMLMotionProps<"div">, "onDrag"> {
  children: React.ReactNode;
  gradient?: boolean;
  hoverEffect?: boolean;
  colorScheme?: ColorScheme;
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
  
  const colorClasses = {
    default: "bg-white dark:bg-gray-800",
    primary: "bg-vocab-primary text-white",
    secondary: "bg-vocab-secondary text-white",
    success: "bg-green-500 text-white",
    warning: "bg-orange-500 text-white",
    error: "bg-red-500 text-white",
    light: "bg-gray-50 dark:bg-gray-800"
  };
  
  const gradientClasses = {
    default: "bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900",
    primary: "bg-gradient-to-br from-vocab-primary to-purple-800",
    secondary: "bg-gradient-to-br from-vocab-secondary to-purple-600",
    success: "bg-gradient-to-br from-green-500 to-green-700",
    warning: "bg-gradient-to-br from-orange-500 to-orange-700",
    error: "bg-gradient-to-br from-red-500 to-red-700",
    light: "bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900"
  };
  
  return (
    <motion.div
      className={cn(
        "rounded-2xl border border-transparent shadow-xl overflow-hidden",
        gradient ? gradientClasses[colorScheme] : colorClasses[colorScheme],
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
