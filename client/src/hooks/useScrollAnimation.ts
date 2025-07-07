import { useScroll, useTransform, MotionValue } from 'framer-motion';
import { RefObject } from 'react';

export interface ScrollAnimationConfig {
  target: RefObject<HTMLElement>;
  offset?: ["start start", "end start"] | ["start end", "end start"];
  inputRange?: [number, number];
  outputRange: [string | number, string | number];
}

export const useScrollAnimation = (config: ScrollAnimationConfig): MotionValue => {
  const { scrollYProgress } = useScroll({
    target: config.target,
    offset: config.offset || ["start start", "end start"]
  });

  return useTransform(
    scrollYProgress,
    config.inputRange || [0, 1],
    config.outputRange
  );
};

export const useParallax = (ref: RefObject<HTMLElement>, speed: number = 0.5) => {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return { y, opacity };
};

export const useFadeInOnScroll = (ref: RefObject<HTMLElement>) => {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  return { opacity, y };
}; 