import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

export const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
          🌟 Zenith
        </h1>
        <p className="mt-2 text-xl font-medium text-primary">Peak Development Experience</p>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          A modern, modular, and scalable fullstack project template built with Node.js, React 19, TypeScript, and industry-standard best practices.
        </p>
        
        <div className="mt-10 flex items-center justify-center gap-x-6">
          {user ? (
            <Link to="/dashboard">
              <Button size="lg">Go to Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link to="/register">
                <Button size="lg">Get Started</Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg">Sign In</Button>
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="mt-20">
        <h2 className="text-2xl font-bold text-foreground mb-8">🚀 Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 border border-border rounded-lg bg-card">
            <h3 className="text-lg font-semibold mb-2">⚡ Backend</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Node.js + Express.js</li>
              <li>• TypeScript with strict mode</li>
              <li>• Drizzle ORM with PostgreSQL</li>
              <li>• Redis for caching & rate limiting</li>
              <li>• JWT Authentication</li>
              <li>• Zod validation</li>
            </ul>
          </div>
          
          <div className="p-6 border border-border rounded-lg bg-card">
            <h3 className="text-lg font-semibold mb-2">🎨 Frontend</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• React 19 with TypeScript</li>
              <li>• Tailwind CSS v4</li>
              <li>• Vite for fast builds</li>
              <li>• React Router for navigation</li>
              <li>• Zustand for state management</li>
              <li>• React Query for data fetching</li>
            </ul>
          </div>
          
          <div className="p-6 border border-border rounded-lg bg-card">
            <h3 className="text-lg font-semibold mb-2">🏗️ Architecture</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Modular design</li>
              <li>• Centralized error handling</li>
              <li>• Security middleware</li>
              <li>• Event-driven lifecycle</li>
              <li>• Guard clauses</li>
              <li>• Type-safe configuration</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}; 