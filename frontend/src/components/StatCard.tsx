import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  bgColor: string;
  iconColor: string;
  animationDelay?: number;
  index: number;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  value,
  label,
  bgColor,
  iconColor,
  animationDelay = 0,
  index
}) => {
  return (
    <motion.div 
      className="group"
      animate={{
        y: [0, -6, 0],
        transition: {
          duration: 2 + index * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: animationDelay
        }
      }}
    >
      <motion.div 
        className={`w-16 h-16 ${bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-xl`}
        animate={{
          rotate: [0, 5, 0, -5, 0],
          transition: {
            duration: 4 + index,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        <Icon className={`w-8 h-8 ${iconColor} group-hover:scale-110 transition-transform duration-300`} />
      </motion.div>
      <div className="text-3xl font-bold text-foreground mb-2">{value}</div>
      <div className="text-muted-foreground">{label}</div>
    </motion.div>
  );
};

export default StatCard; 