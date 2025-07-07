import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface DotPatternProps {
  className?: string;
  width?: number;
  height?: number;
  spacing?: number;
  dotSize?: number;
  dotColor?: string;
  interactive?: boolean;
}

export const DotPattern: React.FC<DotPatternProps> = ({
  className = "",
  width = 1200,
  height = 800,
  spacing = 40,
  dotSize = 2,
  dotColor = "rgba(59, 130, 246, 0.5)",
  interactive = true,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        setMousePosition({ x, y });
      }
    };

    const handleMouseLeave = () => {
      setMousePosition({ x: -1000, y: -1000 });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [interactive]);

  // Generate dots
  const dots = [];
  const cols = Math.floor(width / spacing);
  const rows = Math.floor(height / spacing);

  for (let i = 0; i <= cols; i++) {
    for (let j = 0; j <= rows; j++) {
      const x = i * spacing;
      const y = j * spacing;
      const distance = Math.sqrt(
        Math.pow(x - mousePosition.x, 2) + Math.pow(y - mousePosition.y, 2)
      );
      
      let scale = 1;
      let opacity = 0.5;
      
      if (interactive && distance < 100) {
        const factor = 1 - (distance / 100);
        scale = 1 + factor * 1.5;
        opacity = 0.5 + factor * 0.5;
      }

      dots.push(
        <div
          key={`${i}-${j}`}
          className="absolute rounded-full transition-all duration-200 ease-out"
          style={{
            left: x,
            top: y,
            width: dotSize,
            height: dotSize,
            backgroundColor: dotColor,
            transform: `translate(-50%, -50%) scale(${scale})`,
            opacity: opacity,
          }}
        />
      );
    }
  }

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ width: '100%', height: '100%' }}
    >
      {dots}
    </div>
  );
}; 