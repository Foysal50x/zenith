import winston from 'winston';
import { Env } from '#config/env.js';
const { combine, timestamp, printf, colorize, json, errors } = winston.format;


const logFormat = printf(({ level, message, timestamp: ts, stack, ...meta }: any) => {
  const metaStr = Object.keys(meta).length ? JSON.stringify(meta) : '';
  if (stack) {
    return `${ts} [${level}]: ${message} ${stack} ${metaStr}`;
  }
  return `${ts} [${level}]: ${message} ${metaStr}`;
});

export function createLogger(env: Env) {
  return winston.createLogger({
    level: env.LOG_LEVEL || 'info',
    format: combine(
      errors({ stack: true }),
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      env.NODE_ENV === 'production' ? json() : combine(colorize(), logFormat)
    ),
    transports: [
      new winston.transports.Console({
        silent: env.NODE_ENV === 'test',
      }),
      ...(env.NODE_ENV === 'production'
        ? [
            new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
            new winston.transports.File({ filename: 'logs/combined.log' }),
          ]
        : []),
    ],
  });
}

export type Logger = ReturnType<typeof createLogger>;
