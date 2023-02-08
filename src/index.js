import 'dotenv/config';
import express from 'express';
import { authRouter } from './routes/authRouter.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(authRouter);

app.get('/', (req, res) => {
  res.send('Hello!');
})

app.listen(PORT);