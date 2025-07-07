import React from 'react';

interface AnimatedBackgroundProps {
  className?: string;
  particleCount?: number;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ 
  className = "", 
}) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Simple Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900" />
      
      {/* Simple decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl opacity-20" />
    </div>
  );
}; 