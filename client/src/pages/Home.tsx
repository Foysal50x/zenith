import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
// import { AnimatedBackground } from '../components/AnimatedBackground';
import { useAuth } from '../contexts/AuthContext';
import { SparklesText } from "../components/magicui/sparkles-text";
import { FlickeringGrid } from "../components/magicui/flickering-grid";
import { FeatureCard } from '../components/FeatureCard';
import { StatCard } from '../components/StatCard';

import { 
  ArrowRight, 
  Zap, 
  Shield, 
  Code,  
  Globe, 
  Sparkles,
  Star,
  ArrowUpRight
} from 'lucide-react';

export const Home: React.FC = () => {
  const { user } = useAuth();
  const containerRef = useRef(null);
  
  // const { scrollYProgress } = useScroll({
  //   target: containerRef,
  //   offset: ["start start", "end start"]
  // });

  // const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* Hero Section with Parallax - Full Width */}
      <section className="relative h-[60vh] flex items-center justify-center w-full">
        {/* Animated Background */}
        {/* <AnimatedBackground /> */}
        <FlickeringGrid className='absolute inset-0 overflow-hidden'/>
        
        {/* Parallax Effect - Simplified */}
        {/* <motion.div 
          className="absolute inset-0"
          style={{ y }}
        /> */}

        {/* Hero Content - Simplified animations */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 w-full">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Peak Development Experience</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-foreground mb-6">
              <SparklesText>🌟 Zenith</SparklesText>
            </h1>
            
            <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-5xl mx-auto leading-relaxed">
              A modern, modular, and scalable fullstack project template built with Node.js, React 19, TypeScript, and industry-standard best practices.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {user ? (
              <Link to="/dashboard">
                <Button size="lg" className="group">
                  Go to Dashboard
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            ) : (
              <>
                <Link to="https://github.com/foysal50x/zenith">
                  <Button size="lg" className="group cursor-pointer">
                    Get Started
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="cursor-pointer">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Simple Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
            <motion.div animate={{
                y: [8, -3, 8],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }} className="w-1 h-3 bg-muted-foreground/50 rounded-full mt-2" />
          </div>
        </div>
      </section>

      {/* Features Section - Animated */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-foreground mb-6"
            >
              🚀 Built for the Future
            </motion.h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the next generation of fullstack development with cutting-edge technologies and best practices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Backend Card */}
            <FeatureCard
              title="⚡ Lightning Fast Backend"
              icon={Zap}
              theme="blue"
              animationDelay={0}
              features={[
                { text: "Node.js + Express.js", iconColor: "blue" },
                { text: "TypeScript with strict mode", iconColor: "blue" },
                { text: "Drizzle ORM + PostgreSQL", iconColor: "blue" },
                { text: "Redis for caching & rate limiting", iconColor: "blue" }
              ]}
            />

            {/* Frontend Card */}
            <FeatureCard
              title="🎨 Modern Frontend"
              icon={Code}
              theme="purple"
              animationDelay={0.5}
              features={[
                { text: "React 19 with TypeScript", iconColor: "purple" },
                { text: "Tailwind CSS v4", iconColor: "pink" },
                { text: "Vite for fast builds", iconColor: "rose" },
                { text: "React Query for data fetching", iconColor: "fuchsia" }
              ]}
            />

            {/* Architecture Card */}
            <FeatureCard
              title="🏗️ Enterprise Architecture"
              icon={Shield}
              theme="emerald"
              animationDelay={1}
              features={[
                { text: "Modular design patterns", iconColor: "emerald" },
                { text: "Centralized error handling", iconColor: "emerald" },
                { text: "Security middleware stack", iconColor: "emerald" },
                { text: "Type-safe configuration", iconColor: "emerald" }
              ]}
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 via-background to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {getStats().map((stat, index) => (
              <StatCard
                key={index}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                bgColor={stat.bgColor}
                iconColor={stat.iconColor}
                animationDelay={index * 0.2}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            animate={{
              y: [0, -4, 0],
              transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Ready to Reach the Zenith?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start building your next-generation application with the most modern and scalable fullstack template available.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {!user && (
                <>
                  <Link to="https://github.com/foysal50x/zenith">
                    <Button size="lg" className="group cursor-pointer">
                      Get Started Now
                      <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline" size="lg" className="cursor-pointer">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
              {user && (
                <Link to="/dashboard">
                  <Button size="lg" className="group">
                    Continue to Dashboard
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}; 


function getStats() {
  return [
    { 
      icon: Star, 
      value: "100%", 
      label: "Type Safe",
      bgColor: "bg-gradient-to-br from-yellow-100 to-amber-100 dark:from-yellow-900/20 dark:to-amber-900/20",
      iconColor: "text-yellow-500"
    },
    { 
      icon: Zap, 
      value: "10x", 
      label: "Faster Development",
      bgColor: "bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20",
      iconColor: "text-blue-500"
    },
    { 
      icon: Shield, 
      value: "Enterprise", 
      label: "Ready",
      bgColor: "bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20",
      iconColor: "text-green-500"
    },
    { 
      icon: Globe, 
      value: "Modern", 
      label: "Stack",
      bgColor: "bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20",
      iconColor: "text-purple-500"
    },
  ]
}