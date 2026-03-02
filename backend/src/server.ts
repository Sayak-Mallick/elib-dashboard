import express, { Application, Request, Response, NextFunction } from 'express';
import globalErrorHandler from './middlewares/globalErrorHandlers';

const app: Application = express();

// Routes
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: 'Welcome to the eLib Dashboard API',
  });
});

// Global error handler
app.use(globalErrorHandler);

export default app;