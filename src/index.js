import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';

import { authRouter } from './routes/authRouter.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import { userRouter } from './routes/userRouter.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(authRouter);
app.use('/users', userRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`);
});