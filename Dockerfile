# Production Dockerfile for Zenith Application
FROM node:22-alpine AS base

# Set default port and allow override via build arg
ARG PORT=8080
ENV PORT=$PORT


# Install system dependencies
RUN apk add --no-cache \
    dumb-init

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY frontend/package*.json ./frontend/

# Dependencies stage
FROM base AS dependencies

# Install production dependencies
RUN npm ci --only=production && npm cache clean --force
RUN cd frontend && npm ci --only=production && npm cache clean --force

# Build stage
FROM base AS build

# Install all dependencies (including dev)
RUN npm ci
RUN cd frontend && npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build
RUN cd frontend && npm run build

# Production stage
FROM node:22-alpine AS production

# Install dumb-init and curl for proper signal handling and health checks
RUN apk add --no-cache dumb-init curl

# Create app user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Set working directory
WORKDIR /app

# Copy production dependencies
COPY --from=dependencies --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=dependencies --chown=nodejs:nodejs /app/package*.json ./

# Copy built application
COPY --from=build --chown=nodejs:nodejs /app/dist ./dist
COPY --from=build --chown=nodejs:nodejs /app/public ./public

# Create logs directory
RUN mkdir -p logs && chown nodejs:nodejs logs

# Set environment
ENV NODE_ENV=production
ENV PORT=$PORT

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE $PORT

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:$PORT/health || exit 1

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["npm", "start"] 