import express from 'express';
import { userController } from '../controllers/userController.js';
import { catchError } from '../utils/catchError.js';
import { authMiddleware } from '../middlewares/authMiddleware.js'

export const userRouter = new express.Router();

userRouter.get('/', catchError(authMiddleware), catchError(userController.getAll));
// userRouter.get('/', catchError(userController.getAll));