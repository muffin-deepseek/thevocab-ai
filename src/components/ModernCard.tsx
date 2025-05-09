
import React from 'react';
import { cn } from '@/lib/utils';

interface ModernCardProps {
  children: React.ReactNode;
  className?: string;
  colorScheme?: 'primary' | 'secondary' | 'accent' | 'neutral';
  gradient?: boolean;
  hover?: boolean;
}

const ModernCard: React.FC<ModernCardProps> = ({
  children,
  className,
  colorScheme = 'neutral',
  gradient = false,
  hover = true,
}) => {
  const baseClasses = "rounded-xl shadow-sm overflow-hidden";
  
  const colorClasses = {
    primary: gradient 
      ? "bg-gradient-to-br from-primary/80 to-primary text-white" 
      : "bg-white border-2 border-primary/20",
    secondary: gradient 
      ? "bg-gradient-to-br from-secondary/80 to-secondary text-secondary-foreground" 
      : "bg-white border-2 border-secondary/20",
    accent: gradient 
      ? "bg-gradient-to-br from-accent/80 to-accent text-accent-foreground" 
      : "bg-white border-2 border-accent/20",
    neutral: "bg-white border border-gray-200"
  };
  
  const hoverClasses = hover 
    ? "transition-all duration-200 hover:shadow-md" 
    : "";
  
  return (
    <div className={cn(
      baseClasses,
      colorClasses[colorScheme],
      hoverClasses,
      className
    )}>
      {children}
    </div>
  );
};

export default ModernCard;
