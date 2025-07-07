# 🌟 Zenith: Peak Development Experience

<div align="center">
  <img src="art/zenith-cover.jpg" alt="Zenith - Peak Development Experience" width="100%" style="border-radius: 10px; margin: 20px 0;"/>
</div>

A modern, modular, and scalable fullstack project template built with Node.js, React 19, TypeScript, and industry-standard best practices. Reach the zenith of your development workflow.

## ⚠️ **Development Status Warning**

**🚧 This project is currently in active development - Early Release 🚧**

**Please note that this is an early release and many features are still being developed and refined:**

- **Database Integration**: Drizzle ORM setup is in progress, schema migrations may not be fully functional
- **Redis Configuration**: Redis client and caching features are being implemented
- **Authentication System**: API routes under `/api/auth` are not fully implemented and may not work as expected
- **Backend Services**: Some service integrations are incomplete or under development
- **Error Handling**: Error management system is being refined
- **Testing Suite**: Test coverage is being expanded

**Timeline**: I am actively working on completing all pending features and fixing remaining issues. **By the end of this week**, I expect all major features to be working perfectly and the project to be production-ready.

**Current Status**: 
- ✅ Project structure and architecture
- ✅ Frontend components and UI system
- ✅ Build configuration and deployment setup
- ✅ Development environment setup
- 🚧 Backend API implementation (in progress)
- 🚧 Database and Redis integration (in progress)
- 🚧 Authentication flow (in progress)

**For Contributors**: If you encounter issues or want to contribute, please check the [Issues](https://github.com/your-repo/issues) section or create new issues. Your feedback is valuable for improving this template.

---

## 🚀 Features

### 🔥 **Backend Architecture**
- **Node.js + Express.js** - High-performance server with modular architecture
- **TypeScript** - Strict type safety with subpath imports (`#core/*`, `#config/*`)
- **Drizzle ORM** - Type-safe database queries with PostgreSQL
- **Redis Integration** - Caching, session management, and rate limiting
- **JWT Authentication** - Secure token-based authentication system
- **Advanced Rate Limiting** - Redis-backed, customizable rate limiting
- **Zod Validation** - Runtime schema validation for all inputs
- **Helmet Security** - Comprehensive security headers and CSP
- **Winston Logging** - Structured logging with multiple transports
- **Graceful Shutdown** - Proper cleanup and connection management
- **Application Lifecycle** - Event-driven application management with hooks

### 🎨 **Frontend Excellence**
- **React 19** - Latest React with server components support
- **TypeScript** - Full type safety throughout the frontend
- **Tailwind CSS v4** - Modern utility-first CSS framework
- **Vite** - Lightning-fast build tool with HMR
- **Framer Motion** - Smooth animations and micro-interactions
- **React Router** - Declarative client-side routing
- **Zustand** - Lightweight state management
- **React Query** - Powerful data fetching and caching
- **Lucide React** - Beautiful, customizable icons
- **Responsive Design** - Mobile-first, adaptive UI components

### 🧩 **Reusable Component System**
- **FeatureCard** - Animated feature cards with 6 color themes
- **StatCard** - Animated statistics display components
- **Button** - Versatile button component with multiple variants
- **Layout** - Responsive navigation and layout structure
- **ProtectedRoute** - Authentication-aware route protection
- **MagicUI Components** - Advanced UI elements (SparklesText, FlickeringGrid)

### 🏗️ **Enterprise Architecture**
- **Modular Design** - Clear separation of concerns with domain-driven structure
- **Error Handling** - Centralized error management with custom error types
- **Middleware Stack** - Comprehensive middleware for security and validation
- **Event-Driven** - Application lifecycle managed with hooks and events
- **Guard Clauses** - Early returns and defensive programming patterns
- **Configuration Management** - Type-safe, environment-aware configuration
- **Connection Management** - Optimized HTTP connection handling
- **Memory Monitoring** - Built-in memory usage tracking and warnings

## 📁 Project Structure

```
zenith/
├── src/                          # Backend source code
│   ├── core/                     # Core application classes
│   │   ├── application.ts        # Central application with lifecycle hooks
│   │   └── http-server-process.ts # HTTP server process manager
│   ├── config/                   # Configuration management
│   │   ├── env.ts               # Environment variables (Zod validated)
│   │   ├── database.ts          # Database configuration
│   │   └── redis.ts             # Redis client configuration
│   ├── db/                      # Database layer
│   │   └── schema.ts            # Drizzle ORM schema definitions
│   ├── http/                    # HTTP layer
│   │   ├── server/              # Server infrastructure
│   │   │   └── http-kernal.ts   # HTTP kernel with middleware stack
│   │   ├── middleware/          # Express middleware
│   │   │   ├── global.ts        # Global middleware (CORS, Helmet, Vite)
│   │   │   ├── auth.ts          # Authentication middleware
│   │   │   ├── rate-limit.ts    # Rate limiting middleware
│   │   │   ├── validate.ts      # Zod validation middleware
│   │   │   └── health-check.ts  # Health check endpoint
│   │   ├── routes/              # API route definitions
│   │   │   └── auth.routes.ts   # Authentication routes
│   │   ├── controllers/         # Route controllers
│   │   │   └── auth.controller.ts # Authentication controller
│   │   └── validators/          # Zod validation schemas
│   │       └── auth.ts          # Authentication schemas
│   ├── services/                # Business logic services
│   │   └── auth.service.ts      # Authentication service
│   ├── types/                   # TypeScript type definitions
│   │   └── types.ts             # Shared type definitions
│   ├── utils/                   # Utility functions
│   │   ├── errors.ts            # Custom error classes
│   │   ├── helpers.ts           # Helper functions
│   │   └── logger.ts            # Winston logger configuration
│   └── main.ts                  # Application entry point
├── client/                      # React frontend
│   ├── src/
│   │   ├── components/          # Reusable React components
│   │   │   ├── ui/              # Base UI components
│   │   │   │   └── Button.tsx   # Versatile button component
│   │   │   ├── magicui/         # Advanced UI components
│   │   │   │   ├── sparkles-text.tsx    # Animated sparkles text
│   │   │   │   └── flickering-grid.tsx  # Animated background grid
│   │   │   ├── FeatureCard.tsx  # Animated feature display cards
│   │   │   ├── StatCard.tsx     # Animated statistics cards
│   │   │   ├── Layout.tsx       # Main layout component
│   │   │   └── ProtectedRoute.tsx # Route protection
│   │   ├── contexts/            # React contexts
│   │   │   └── AuthContext.tsx  # Authentication context
│   │   ├── hooks/               # Custom React hooks
│   │   ├── pages/               # Page components
│   │   │   └── Home.tsx         # Landing page with reusable components
│   │   ├── services/            # API communication services
│   │   ├── types/               # Frontend TypeScript types
│   │   ├── utils/               # Frontend utility functions
│   │   ├── App.tsx              # Main App component
│   │   ├── main.tsx             # React entry point
│   │   └── index.css            # Global styles with Tailwind
│   ├── package.json             # Frontend dependencies
│   ├── vite.config.ts           # Dynamic Vite configuration
│   └── index.html               # HTML template
├── public/                      # Static assets and build output
│   └── dist/                    # Frontend build output (production)
├── scripts/                     # Utility scripts
│   └── setup-env.js             # Dynamic environment setup
├── .env.example                 # Environment variables template
├── drizzle.config.ts            # Drizzle Kit configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Backend dependencies and scripts
└── README.md                    # This file
```

## 🛠️ Prerequisites

- **Node.js** (v20 or higher)
- **PostgreSQL** (v14 or higher)
- **Redis** (v6 or higher)
- **npm** or **yarn**

## ⚡ Quick Start

### 1. **Clone and Install**
```bash
git clone <repository-url>
cd zenith
npm install
```

### 2. **Environment Setup**
```bash
# Quick setup with defaults
npm run setup:env:dev

# Or copy and customize manually
cp .env.example .env
# Edit .env with your configuration
```

### 3. **Database Setup**
```bash
# Create PostgreSQL database
createdb zenith_db

# Run migrations
npm run migrate
```

### 4. **Start Services**
```bash
# Start Redis
redis-server

# Start development servers (backend + frontend)
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173 (Vite dev server)
- **Backend API**: http://localhost:8080 (Express server)
- **Health Check**: http://localhost:8080/health

## 🔧 Configuration

### **Dynamic Environment Setup**

Zenith includes an intelligent environment configuration system that adapts to different deployment scenarios:

```bash
# Environment-specific setup
npm run setup:env:dev     # Development with debug logging
npm run setup:env:prod    # Production with optimizations
npm run setup:env:test    # Testing with minimal logging
```

### **Environment Variables**

**Core Configuration:**
```env
NODE_ENV=development
PORT=8080
HOST=0.0.0.0
```

**Database & Caching:**
```env
DB_URL=postgresql://username:password@localhost:5432/zenith_db
REDIS_URL=redis://localhost:6379
```

**Authentication & Security:**
```env
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
JWT_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=12
```

**Rate Limiting:**
```env
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100
```

**Frontend Configuration:**
```env
VITE_SERVER_PORT=5173
VITE_SERVER_HOST=localhost
VITE_SERVER_SSL=false
CORS_ORIGIN=http://localhost:5173
```

### **Vite Dynamic Configuration**

The frontend automatically adapts to environment variables:
- **Development**: Proxy to backend API, HMR enabled
- **Production**: Serve static files, optimized builds
- **SSL Support**: Automatic HTTPS configuration
- **Environment Detection**: Automatic port and host configuration

## 🏗️ **Build & Deployment**

### **Development Workflow**
```bash
npm run dev              # Start both backend and frontend
npm run dev:server       # Backend only (API development)
npm run dev:client       # Frontend only (UI development)
```

### **Production Build**
```bash
npm run build           # Build both backend and frontend
npm run build:server    # TypeScript compilation
npm run build:client    # Vite production build → public/dist/
```

### **Production Deployment**
```bash
npm run start:prod      # Start in production mode
npm run preview         # Build and test production locally
```

### **Build Output Structure**
- **Backend**: `dist/` - Compiled TypeScript
- **Frontend**: `public/dist/` - Vite production build
- **Static Serving**: Automatic in production mode

### **Docker Deployment**
```dockerfile
FROM node:18-alpine
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy built application
COPY dist ./dist
COPY public/dist ./public/dist

EXPOSE 8080
CMD ["npm", "start"]
```

## 📚 API Documentation

### **Authentication Endpoints**

#### **Register User**
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123",
  "name": "John Doe"
}
```

#### **Login User**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

#### **Get Profile**
```http
GET /api/auth/profile
Authorization: Bearer <access_token>
```

#### **Update Profile**
```http
PUT /api/auth/profile
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "Updated Name",
  "email": "updated@example.com"
}
```

#### **Change Password**
```http
POST /api/auth/change-password
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

#### **Refresh Token**
```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "<refresh_token>"
}
```

#### **Logout**
```http
POST /api/auth/logout
Authorization: Bearer <access_token>
```

### **System Endpoints**

#### **Health Check**
```http
GET /health
```

Returns:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 12345,
  "environment": "development"
}
```

## 🧩 **Component Library**

### **FeatureCard**
Animated cards for showcasing features with multiple color themes:

```tsx
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
```

**Available Themes**: `purple`, `blue`, `emerald`, `orange`, `pink`, `teal`

### **StatCard**
Animated statistics display with rotating icons:

```tsx
<StatCard
  icon={Star}
  value="100%"
  label="Type Safe"
  bgColor="bg-gradient-to-br from-yellow-100 to-amber-100"
  iconColor="text-yellow-500"
  index={0}
/>
```

### **Button Component**
Versatile button with multiple variants and sizes:

```tsx
<Button variant="default" size="lg">
  Get Started
</Button>
```

**Variants**: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`
**Sizes**: `default`, `sm`, `lg`, `icon`

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Type checking
npm run typecheck
```

## 📈 Monitoring & Observability

### **Built-in Monitoring**
- **Memory Usage Tracking** - Automatic memory monitoring with warnings
- **Connection Monitoring** - Active connection tracking and limits
- **Performance Metrics** - Request timing and throughput monitoring
- **Error Tracking** - Structured error logging with context

### **Logging Levels**
- **Development**: Debug level with detailed request logging
- **Production**: Info level with structured JSON logging
- **Test**: Error level only for clean test output

### **Health Monitoring**
```bash
curl http://localhost:8080/health
```

## 🔒 Security Features

- **Helmet Integration** - Comprehensive security headers and CSP
- **CORS Configuration** - Configurable cross-origin resource sharing
- **Rate Limiting** - Redis-backed, adaptive rate limiting
- **JWT Authentication** - Secure token-based authentication
- **Input Validation** - Zod schema validation for all inputs
- **Password Security** - bcrypt hashing with configurable rounds
- **SQL Injection Prevention** - Drizzle ORM with parameterized queries
- **XSS Protection** - Content Security Policy and input sanitization

## 🛠️ **Development Tools**

### **Available Scripts**
```bash
# Development
npm run dev              # Start both servers with hot reload
npm run dev:server       # Backend development with tsx watch
npm run dev:client       # Frontend development with Vite HMR

# Building
npm run build           # Production build (server + client)
npm run clean           # Clean all build directories

# Production
npm run start:prod      # Start in production mode
npm run preview         # Build and test production locally

# Code Quality
npm run lint            # ESLint checking
npm run lint:fix        # Auto-fix ESLint issues
npm run typecheck       # TypeScript type checking

# Database
npm run migrate         # Apply database migrations
npm run migrate:generate # Generate new migration
npm run migrate:studio  # Open Drizzle Studio (GUI)

# Environment
npm run setup:env:dev   # Setup development environment
npm run setup:env:prod  # Setup production environment
npm run setup:env:test  # Setup testing environment
```

### **Adding New Features**

#### **1. Backend Route**
```typescript
// src/http/routes/posts.routes.ts
import { Router } from 'express';
import * as postController from '../controllers/post.controller.js';

const router = Router();
router.get('/', postController.getPosts);
export default router;
```

#### **2. Validation Schema**
```typescript
// src/http/validators/post.ts
import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().min(1).max(100),
  content: z.string().min(1).max(1000),
});
```

#### **3. Frontend Component**
```tsx
// client/src/components/PostCard.tsx
import { FeatureCard } from './FeatureCard';

export const PostCard = ({ post }) => (
  <FeatureCard
    title={post.title}
    icon={FileText}
    theme="blue"
    features={[
      { text: post.excerpt, iconColor: "blue" }
    ]}
  />
);
```

### **Customizing Components**

#### **Creating New Themes**
```typescript
// Add to FeatureCard.tsx colorThemes
newTheme: {
  border: 'border-indigo-200 dark:border-indigo-800',
  hoverBorder: 'hover:border-indigo-400 dark:hover:border-indigo-600',
  shadow: 'hover:shadow-indigo-500/20',
  // ... other properties
}
```

## 🚀 **Performance Optimizations**

### **Backend Optimizations**
- **Connection Pooling** - Optimized database connection management
- **Memory Monitoring** - Built-in memory usage tracking and warnings
- **Request Timeouts** - Configurable timeouts for different route types
- **Compression** - Gzip compression for all responses
- **Rate Limiting** - Prevent abuse with Redis-backed limiting

### **Frontend Optimizations**
- **Code Splitting** - Automatic route-based code splitting
- **Tree Shaking** - Dead code elimination in production builds
- **Asset Optimization** - Automatic image and CSS optimization
- **Lazy Loading** - Dynamic imports for non-critical components
- **Bundle Analysis** - Built-in bundle size analysis

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Follow the coding standards** (ESLint + Prettier)
4. **Add tests for new features**
5. **Commit your changes** (`git commit -m 'Add amazing feature'`)
6. **Push to the branch** (`git push origin feature/amazing-feature`)
7. **Open a Pull Request**

### **Code Standards**
- **TypeScript strict mode** - Full type safety required
- **ESLint configuration** - Consistent code formatting
- **Modular architecture** - Clear separation of concerns
- **Test coverage** - All new features must include tests

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[Express.js](https://expressjs.com/)** - Fast, unopinionated web framework
- **[React](https://reactjs.org/)** - A JavaScript library for building user interfaces  
- **[Drizzle ORM](https://orm.drizzle.team/)** - TypeScript ORM for SQL databases
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Vite](https://vitejs.dev/)** - Next generation frontend tooling
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready motion library

## 📞 Support

If you have any questions or need help:

1. **Check the documentation** above
2. **Search existing issues** on GitHub
3. **Create a new issue** with detailed information
4. **Join the community discussions**

---

**Made with ❤️ for the developer community. Happy coding! 🚀** 