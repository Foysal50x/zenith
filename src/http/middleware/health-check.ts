import { env } from "#config/env.js";
import { Application } from "#core/application.js";
import { NextFunction, Request, Response } from "express";

//@ts-ignore
export function createHealthCheckMiddleware(app: Application) {
    //@ts-ignore
    return function (req: Request, res: Response, next: NextFunction) {
      res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: env.NODE_ENV
      });
    }
}