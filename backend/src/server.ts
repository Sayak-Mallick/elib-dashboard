import express, { Application } from 'express';

const app: Application = express();

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the eLib Dashboard API',
  });
});

export default app;