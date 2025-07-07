# 🌟 Zenith: Peak Development Experience

A modern, modular, and scalable fullstack project template built with Node.js, React 19, TypeScript, and industry-standard best practices. Reach the zenith of your development workflow.

## 🚀 Features

### Backend
- **Node.js + Express.js** - Fast, unopinionated web framework
- **TypeScript** - Full type safety with strict mode
- **Drizzle ORM** - Type-safe database queries with PostgreSQL
- **Redis** - Caching, session management, and rate limiting
- **JWT Authentication** - Secure token-based authentication
- **Rate Limiting** - Scalable rate limiting with Redis backend
- **Zod Validation** - Runtime schema validation
- **Helmet** - Security headers and best practices
- **Winston Logging** - Structured logging with multiple transports
- **Graceful Shutdown** - Proper cleanup on process termination

### Frontend
- **React 19** - Latest React with server components support
- **TypeScript** - Full type safety throughout the frontend
- **Tailwind CSS v4** - Utility-first CSS framework
- **Vite** - Lightning-fast build tool and dev server
- **React Router** - Declarative routing for React
- **Zustand** - Lightweight state management
- **React Hook Form** - Performant forms with validation
- **React Query** - Powerful data fetching and caching
- **Lucide React** - Beautiful icons

### Architecture
- **Modular Design** - Separation of concerns with clear boundaries
- **Error Handling** - Centralized error handling with custom error types
- **Middleware Stack** - Comprehensive middleware for security and validation
- **Event-Driven** - Application lifecycle managed with events
- **Guard Clauses** - Early returns and defensive programming
- **Environment Config** - Type-safe configuration management

## 📁 Project Structure

```
zenith/
├── src/                          # Backend source code
│   ├── application/              # Application lifecycle & services
│   │   └── application.ts        # Central application class
│   ├── config/                   # Configuration files
│   │   ├── env.ts               # Environment variables (Zod validated)
│   │   ├── database.ts          # Database configuration
│   │   └── redis.ts             # Redis configuration
│   ├── db/                      # Database layer
│   │   └── schema.ts            # Drizzle ORM schema
│   ├── http/                    # HTTP layer
│   │   ├── server/              # Server classes
│   │   │   ├── http-server.ts   # HTTP server class
│   │   │   └── http-server-process.ts # Server process manager
│   │   ├── middleware/          # Express middleware
│   │   │   ├── auth.ts          # Authentication middleware
│   │   │   ├── rate-limit.ts    # Rate limiting middleware
│   │   │   └── validate.ts      # Validation middleware
│   │   ├── routes/              # API routes
│   │   │   └── auth.routes.ts   # Authentication routes
│   │   ├── controllers/         # Route controllers
│   │   │   └── auth.controller.ts # Authentication controller
│   │   └── validators/          # Zod schemas
│   │       └── auth.ts          # Authentication schemas
│   ├── services/                # Business logic services
│   │   └── auth.service.ts      # Authentication service
│   ├── types/                   # TypeScript type definitions
│   ├── utils/                   # Utility functions
│   │   ├── errors.ts            # Custom error classes
│   │   ├── helpers.ts           # Helper functions
│   │   └── logger.ts            # Winston logger
│   └── main.ts                  # Application entry point
├── client/                      # React frontend
│   ├── src/
│   │   ├── components/          # React components
│   │   │   └── Layout.tsx       # Layout component
│   │   ├── contexts/            # React contexts
│   │   │   └── AuthContext.tsx  # Authentication context
│   │   ├── hooks/               # Custom hooks
│   │   ├── pages/               # Page components
│   │   ├── services/            # API services
│   │   │   └── auth.ts          # Authentication service
│   │   ├── types/               # TypeScript types
│   │   │   └── auth.ts          # Authentication types
│   │   ├── utils/               # Utility functions
│   │   ├── App.tsx              # Main App component
│   │   ├── main.tsx             # React entry point
│   │   └── index.css            # Global styles
│   ├── package.json             # Frontend dependencies
│   └── vite.config.ts           # Vite configuration
├── tests/                       # Test files
├── .env.example                 # Environment variables template
├── drizzle.config.ts            # Drizzle Kit configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Backend dependencies
└── README.md                    # This file
```

## 🛠️ Prerequisites

- **Node.js** (v18 or higher)
- **PostgreSQL** (v14 or higher)
- **Redis** (v6 or higher)
- **npm** or **yarn**

## ⚡ Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd zenith
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Setup database**
   ```bash
   # Create PostgreSQL database
   createdb zenith_db
   
   # Run migrations
   npm run migrate
   ```

5. **Start Redis**
   ```bash
   redis-server
   ```

6. **Start the application**
   ```bash
   npm run dev
   ```

The application will be available at:
- **Backend**: http://localhost:3001
- **Frontend**: http://localhost:3000

## 🔧 Configuration

### Dynamic Environment Setup

The project includes a dynamic environment configuration system that automatically adapts to different environments (development, production, test).

#### Quick Environment Setup

```bash
# Setup development environment (default)
npm run setup:env:dev

# Setup production environment
npm run setup:env:prod

# Setup test environment
npm run setup:env:test

# Or manually specify environment
npm run setup:env development
```

#### Environment Variables

The configuration system supports the following environment variables:

**Core Configuration:**
```env
NODE_ENV=development
PORT=3000
```

**Database & Redis:**
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

**Frontend Configuration (Vite):**
```env
VITE_SERVER_PORT=3001
VITE_SERVER_HOST=localhost
VITE_SERVER_SSL=false
```

**Backend API Configuration (for frontend proxy):**
```env
BACKEND_PORT=3000
BACKEND_HOST=localhost
BACKEND_PROTOCOL=http
```

#### Environment-Specific Overrides

The system automatically applies different configurations based on the environment:

- **Development**: Debug logging, localhost URLs, port 3000/3001
- **Production**: Info logging, HTTPS enabled, port 8080/443
- **Test**: Error-only logging, test ports, minimal configuration

#### Vite Dynamic Configuration

The frontend Vite configuration automatically adapts to environment variables:

- Reads backend API URL from environment
- Configures proxy settings dynamically
- Supports SSL certificates for HTTPS
- Provides detailed logging for debugging
- Optimizes build settings per environment

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123",
  "name": "John Doe"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

#### Get Profile
```http
GET /api/auth/profile
Authorization: Bearer <access_token>
```

#### Update Profile
```http
PUT /api/auth/profile
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "Updated Name",
  "email": "updated@example.com"
}
```

#### Change Password
```http
POST /api/auth/change-password
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

#### Refresh Token
```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "<refresh_token>"
}
```

#### Logout
```http
POST /api/auth/logout
Authorization: Bearer <access_token>
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📈 Monitoring

### Health Check
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

### Logging

The application uses Winston for structured logging:

- **Console**: Development logging with colors
- **File**: Production logging to files
- **Levels**: error, warn, info, debug

## 🔒 Security Features

- **CORS** - Configurable cross-origin resource sharing
- **Helmet** - Security headers and CSP
- **Rate Limiting** - Redis-backed rate limiting
- **JWT Authentication** - Secure token-based auth
- **Input Validation** - Zod schema validation
- **Password Hashing** - bcrypt with configurable rounds
- **SQL Injection Prevention** - Drizzle ORM query builder

## 🚀 Deployment

### Production Build

```bash
# Build backend
npm run build

# Build frontend
npm run build:client

# Start production server
npm start
```

### Docker Deployment

```dockerfile
# Example Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY dist ./dist
COPY client/dist ./client/dist

EXPOSE 3001
CMD ["node", "dist/main.js"]
```

### Environment Variables for Production

```env
NODE_ENV=production
PORT=3001
DB_URL=postgresql://prod_user:prod_password@db:5432/prod_database
REDIS_URL=redis://redis:6379
JWT_SECRET=your-production-secret-key
LOG_LEVEL=warn
```

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev              # Start dev server (backend + frontend)
npm run dev:server       # Start backend only
npm run dev:client       # Start frontend only

# Building
npm run build           # Build both backend and frontend
npm run build:server    # Build backend only
npm run build:client    # Build frontend only

# Testing
npm test               # Run tests
npm run test:watch     # Run tests in watch mode
npm run test:coverage  # Run tests with coverage

# Linting
npm run lint           # Run ESLint
npm run lint:fix       # Fix ESLint issues

# Type Checking
npm run typecheck      # Run TypeScript type checking

# Database
npm run migrate        # Run database migrations
npm run migrate:generate # Generate new migration
npm run migrate:studio # Open Drizzle Studio
```

### Adding New Routes

1. **Create a new route file** in `src/http/routes/`
2. **Add validation schemas** in `src/http/validators/`
3. **Create controller** in `src/http/controllers/`
4. **Add business logic** in `src/services/`
5. **Update the main router** in `src/http/server/http-server.ts`

Example:
```typescript
// src/http/routes/posts.routes.ts
import { Router } from 'express';
import * as postController from '../controllers/post.controller.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { createPostSchema } from '../validators/post.js';

const router = Router();

router.get('/', postController.getPosts);
router.post('/', authenticate, validate(createPostSchema), postController.createPost);

export default router;
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Express.js](https://expressjs.com/) - Fast, unopinionated web framework
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM for SQL databases
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Zod](https://zod.dev/) - TypeScript-first schema validation

## 📞 Support

If you have any questions or need help, please:

1. Check the [documentation](#-api-documentation)
2. Search [existing issues](https://github.com/your-repo/issues)
3. Create a [new issue](https://github.com/your-repo/issues/new)

---

**Happy coding! 🚀** 