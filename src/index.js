import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { authRouter } from './routes/authRouter.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(express.json());
app.use(authRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`);
});