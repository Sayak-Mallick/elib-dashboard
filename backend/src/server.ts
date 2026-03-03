import express, { Application, Request, Response, NextFunction } from 'express';
import globalErrorHandler from './middlewares/globalErrorHandlers';
import userRouter from './routes/user.router';

const app: Application = express();
app.use(express.json());

// Routes
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: 'Welcome to the eLib Dashboard API',
  });
});

app.use('/api/users', userRouter);

// Global error handler
app.use(globalErrorHandler);

export default app;