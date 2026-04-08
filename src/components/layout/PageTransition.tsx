
import React, { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
  transitionType?: 'fade' | 'slide-up' | 'slide-down' | 'scale' | 'none';
  duration?: 'fast' | 'normal' | 'slow';
}

const PageTransition: React.FC<PageTransitionProps> = ({ 
  children, 
  className,
  transitionType = 'fade',
  duration = 'normal'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);
  
  const getTransitionClass = () => {
    const durationClass = {
      fast: 'duration-200',
      normal: 'duration-300',
      slow: 'duration-500'
    }[duration];
    
    if (transitionType === 'none') return '';
    
    const baseClasses = `transition-all ${durationClass} ease-in-out`;
    
    const typeClasses = {
      'fade': `${baseClasses} ${isVisible ? 'opacity-100' : 'opacity-0'}`,
      'slide-up': `${baseClasses} transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`,
      'slide-down': `${baseClasses} transform ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`,
      'scale': `${baseClasses} transform ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`
    }[transitionType];
    
    return typeClasses;
  };

  return (
    <div className={cn(getTransitionClass(), className)}>
      {children}
    </div>
  );
};

export default PageTransition;
