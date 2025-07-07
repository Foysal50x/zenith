import { motion } from 'framer-motion';
import { CheckCircle, LucideIcon } from 'lucide-react';

interface FeatureItem {
  text: string;
  iconColor: 'purple' | 'pink' | 'rose' | 'fuchsia' | 'blue' | 'emerald' | 'orange' | 'teal';
  delay?: number;
}

type ColorTheme = 'purple' | 'blue' | 'emerald' | 'orange' | 'pink' | 'teal';

interface FeatureCardProps {
  title: string;
  icon: LucideIcon;
  features: FeatureItem[];
  animationDelay?: number;
  theme?: ColorTheme;
  className?: string;
}

const colorThemes = {
  purple: {
    border: 'border-purple-200 dark:border-purple-800',
    hoverBorder: 'hover:border-purple-400 dark:hover:border-purple-600',
    shadow: 'hover:shadow-purple-500/20',
    backgroundGradient: 'from-purple-50 via-pink-50 to-rose-50 dark:from-purple-900/10 dark:via-pink-900/10 dark:to-rose-900/10',
    iconBackground: 'from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30',
    iconColor: 'text-purple-500',
    hoverText: 'group-hover:text-purple-600 dark:group-hover:text-purple-400'
  },
  blue: {
    border: 'border-blue-200 dark:border-blue-800',
    hoverBorder: 'hover:border-blue-400 dark:hover:border-blue-600',
    shadow: 'hover:shadow-blue-500/20',
    backgroundGradient: 'from-blue-50 via-cyan-50 to-sky-50 dark:from-blue-900/10 dark:via-cyan-900/10 dark:to-sky-900/10',
    iconBackground: 'from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30',
    iconColor: 'text-blue-500',
    hoverText: 'group-hover:text-blue-600 dark:group-hover:text-blue-400'
  },
  emerald: {
    border: 'border-emerald-200 dark:border-emerald-800',
    hoverBorder: 'hover:border-emerald-400 dark:hover:border-emerald-600',
    shadow: 'hover:shadow-emerald-500/20',
    backgroundGradient: 'from-emerald-50 via-teal-50 to-green-50 dark:from-emerald-900/10 dark:via-teal-900/10 dark:to-green-900/10',
    iconBackground: 'from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30',
    iconColor: 'text-emerald-500',
    hoverText: 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400'
  },
  orange: {
    border: 'border-orange-200 dark:border-orange-800',
    hoverBorder: 'hover:border-orange-400 dark:hover:border-orange-600',
    shadow: 'hover:shadow-orange-500/20',
    backgroundGradient: 'from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-900/10 dark:via-amber-900/10 dark:to-yellow-900/10',
    iconBackground: 'from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30',
    iconColor: 'text-orange-500',
    hoverText: 'group-hover:text-orange-600 dark:group-hover:text-orange-400'
  },
  pink: {
    border: 'border-pink-200 dark:border-pink-800',
    hoverBorder: 'hover:border-pink-400 dark:hover:border-pink-600',
    shadow: 'hover:shadow-pink-500/20',
    backgroundGradient: 'from-pink-50 via-rose-50 to-fuchsia-50 dark:from-pink-900/10 dark:via-rose-900/10 dark:to-fuchsia-900/10',
    iconBackground: 'from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30',
    iconColor: 'text-pink-500',
    hoverText: 'group-hover:text-pink-600 dark:group-hover:text-pink-400'
  },
  teal: {
    border: 'border-teal-200 dark:border-teal-800',
    hoverBorder: 'hover:border-teal-400 dark:hover:border-teal-600',
    shadow: 'hover:shadow-teal-500/20',
    backgroundGradient: 'from-teal-50 via-cyan-50 to-emerald-50 dark:from-teal-900/10 dark:via-cyan-900/10 dark:to-emerald-900/10',
    iconBackground: 'from-teal-100 to-cyan-100 dark:from-teal-900/30 dark:to-cyan-900/30',
    iconColor: 'text-teal-500',
    hoverText: 'group-hover:text-teal-600 dark:group-hover:text-teal-400'
  }
};

const featureIconColors = {
  purple: 'text-purple-500',
  pink: 'text-pink-500',
  rose: 'text-rose-500',
  fuchsia: 'text-fuchsia-500',
  blue: 'text-blue-500',
  emerald: 'text-emerald-500',
  orange: 'text-orange-500',
  teal: 'text-teal-500'
};

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  icon: Icon,
  features,
  animationDelay = 0.5,
  theme = 'purple',
  className = '',
}) => {
  const themeColors = colorThemes[theme];

  return (
    <motion.div 
      className={`group relative p-8 bg-card border-2 ${themeColors.border} rounded-2xl ${themeColors.hoverBorder} transition-all duration-300 hover:shadow-2xl ${themeColors.shadow} hover:-translate-y-2 ${className}`}
      animate={{
        y: [0, -8, 0],
        transition: {
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: animationDelay
        }
      }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${themeColors.backgroundGradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      
      <div className="relative z-10">
        <div className={`w-14 h-14 bg-gradient-to-br ${themeColors.iconBackground} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
          <Icon className={`w-7 h-7 ${themeColors.iconColor} group-hover:scale-110 transition-transform duration-300`} />
        </div>
        
        <h3 className={`text-xl font-semibold mb-4 ${themeColors.hoverText} transition-colors duration-300`}>
          {title}
        </h3>
        
        <ul className="space-y-3 text-muted-foreground">
          {features.map((feature, index) => (
            <li 
              key={index}
              className="flex items-center group-hover:translate-x-1 transition-transform duration-300"
              style={{ 
                transitionDelay: `${(feature.delay || (index * 75))}ms` 
              }}
            >
              <CheckCircle className={`w-4 h-4 ${featureIconColors[feature.iconColor]} mr-3`} />
              {feature.text}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default FeatureCard; 