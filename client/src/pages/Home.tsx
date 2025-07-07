import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { useAuth } from '../contexts/AuthContext';
import { SparklesText } from "../components/magicui/sparkles-text";
import { FlickeringGrid } from "../components/magicui/flickering-grid";

import { 
  ArrowRight, 
  Zap, 
  Shield, 
  Code, 
  Database, 
  Globe, 
  Sparkles,
  Star,
  CheckCircle,
  ArrowUpRight
} from 'lucide-react';

export const Home: React.FC = () => {
  const { user } = useAuth();
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

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
                <Link to="/register">
                  <Button size="lg" className="group">
                    Get Started
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg">
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
            <motion.div 
              className="group relative p-8 bg-card border-2 border-blue-200 dark:border-blue-800 rounded-2xl hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2"
              animate={{
                y: [0, -8, 0],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0
                }
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50 dark:from-blue-900/10 dark:via-cyan-900/10 dark:to-indigo-900/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                  <Zap className="w-7 h-7 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-semibold mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">⚡ Lightning Fast Backend</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center group-hover:translate-x-1 transition-transform duration-300">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-3" />
                    Node.js + Express.js
                  </li>
                  <li className="flex items-center group-hover:translate-x-1 transition-transform duration-300 delay-75">
                    <CheckCircle className="w-4 h-4 text-cyan-500 mr-3" />
                    TypeScript with strict mode
                  </li>
                  <li className="flex items-center group-hover:translate-x-1 transition-transform duration-300 delay-150">
                    <CheckCircle className="w-4 h-4 text-indigo-500 mr-3" />
                    Drizzle ORM + PostgreSQL
                  </li>
                  <li className="flex items-center group-hover:translate-x-1 transition-transform duration-300 delay-225">
                    <CheckCircle className="w-4 h-4 text-sky-500 mr-3" />
                    Redis for caching & rate limiting
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Frontend Card */}
            <motion.div 
              className="group relative p-8 bg-card border-2 border-purple-200 dark:border-purple-800 rounded-2xl hover:border-purple-400 dark:hover:border-purple-600 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2"
              animate={{
                y: [0, -8, 0],
                transition: {
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 dark:from-purple-900/10 dark:via-pink-900/10 dark:to-rose-900/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                  <Code className="w-7 h-7 text-purple-500 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-semibold mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">🎨 Modern Frontend</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center group-hover:translate-x-1 transition-transform duration-300">
                    <CheckCircle className="w-4 h-4 text-purple-500 mr-3" />
                    React 19 with TypeScript
                  </li>
                  <li className="flex items-center group-hover:translate-x-1 transition-transform duration-300 delay-75">
                    <CheckCircle className="w-4 h-4 text-pink-500 mr-3" />
                    Tailwind CSS v4
                  </li>
                  <li className="flex items-center group-hover:translate-x-1 transition-transform duration-300 delay-150">
                    <CheckCircle className="w-4 h-4 text-rose-500 mr-3" />
                    Vite for fast builds
                  </li>
                  <li className="flex items-center group-hover:translate-x-1 transition-transform duration-300 delay-225">
                    <CheckCircle className="w-4 h-4 text-fuchsia-500 mr-3" />
                    React Query for data fetching
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Architecture Card */}
            <motion.div 
              className="group relative p-8 bg-card border-2 border-green-200 dark:border-green-800 rounded-2xl hover:border-green-400 dark:hover:border-green-600 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/20 hover:-translate-y-2"
              animate={{
                y: [0, -8, 0],
                transition: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-900/10 dark:via-emerald-900/10 dark:to-teal-900/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                  <Shield className="w-7 h-7 text-green-500 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-semibold mb-4 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">🏗️ Enterprise Architecture</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center group-hover:translate-x-1 transition-transform duration-300">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                    Modular design patterns
                  </li>
                  <li className="flex items-center group-hover:translate-x-1 transition-transform duration-300 delay-75">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mr-3" />
                    Centralized error handling
                  </li>
                  <li className="flex items-center group-hover:translate-x-1 transition-transform duration-300 delay-150">
                    <CheckCircle className="w-4 h-4 text-teal-500 mr-3" />
                    Security middleware stack
                  </li>
                  <li className="flex items-center group-hover:translate-x-1 transition-transform duration-300 delay-225">
                    <CheckCircle className="w-4 h-4 text-lime-500 mr-3" />
                    Type-safe configuration
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 via-background to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
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
            ].map((stat, index) => (
              <motion.div 
                key={index} 
                className="group"
                animate={{
                  y: [0, -6, 0],
                  transition: {
                    duration: 2 + index * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2
                  }
                }}
              >
                <motion.div 
                  className={`w-16 h-16 ${stat.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-xl`}
                  animate={{
                    rotate: [0, 5, 0, -5, 0],
                    transition: {
                      duration: 4 + index,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                >
                  <stat.icon className={`w-8 h-8 ${stat.iconColor} group-hover:scale-110 transition-transform duration-300`} />
                </motion.div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
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
                  <Link to="/register">
                    <Button size="lg" className="group">
                      Get Started Now
                      <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline" size="lg">
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