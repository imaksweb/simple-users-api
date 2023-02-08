import express from 'express';
import { authController } from '../controllers/authController.js';

export const authRouter = new express.Router();

authRouter.post('/registration', authController.register);
authRouter.get('/activation/:activationToken', authController.activate);