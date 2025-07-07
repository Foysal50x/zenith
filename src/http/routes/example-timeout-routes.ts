// import { Router } from 'express';
// import { createRequestTimeoutMiddleware, createResponseTimeoutMiddleware, createConnectionTimeoutMiddleware } from '#http/middleware/timeout.js';
// import { Application } from '#core/application.js';

// export function createExampleTimeoutRoutes(app: Application) {
//   const router = Router();

//   // Route with custom request timeout
//   router.get('/fast', 
//     createRequestTimeoutMiddleware(5000), // 5 seconds
//     (req, res) => {
//       res.json({ message: 'Fast response' });
//     }
//   );

//   // Route with custom response timeout
//   router.get('/slow', 
//     createResponseTimeoutMiddleware(10000), // 10 seconds
//     async (req, res) => {
//       // Simulate slow operation
//       await new Promise(resolve => setTimeout(resolve, 8000));
//       res.json({ message: 'Slow response' });
//     }
//   );

//   // Route with connection timeout
//   router.get('/stream', 
//     createConnectionTimeoutMiddleware(app, 30000), // 30 seconds
//     (req, res) => {
//       res.setHeader('Content-Type', 'text/event-stream');
//       res.setHeader('Cache-Control', 'no-cache');
      
//       const interval = setInterval(() => {
//         res.write(`data: ${JSON.stringify({ time: Date.now() })}\n\n`);
//       }, 1000);

//       req.on('close', () => {
//         clearInterval(interval);
//       });
//     }
//   );

//   // Route with long timeout for file upload
//   router.post('/upload', 
//     createRequestTimeoutMiddleware(300000), // 5 minutes
//     (req, res) => {
//       // Handle file upload
//       res.json({ message: 'Upload completed' });
//     }
//   );

//   // Route with adaptive timeout based on operation
//   router.post('/process', 
//     createRequestTimeoutMiddleware(180000), // 3 minutes
//     async (req, res) => {
//       // Simulate long processing
//       await new Promise(resolve => setTimeout(resolve, 10000));
//       res.json({ message: 'Processing completed' });
//     }
//   );

//   return router;
// } 