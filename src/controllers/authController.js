import { v4 as uuidv4 } from 'uuid';
import { User } from '../models/User.js';
import { emailService } from '../services/emailService.js';
import { jwtService } from '../services/jwtService.js';
import { userService } from '../services/userService.js';

async function register(req, res, next) {
  const { email, password } = req.body;

  const activationToken = uuidv4();
  const user = await User.create({ email, password, activationToken });

  await emailService.sendActivationLink(email, activationToken);
  
  res.send(user);
}

async function login(req, res, next) {
  const { email, password } = req.body;
  const user = await userService.getByEmail(email);

  if (password !== user.password) {
    res.sendStatus(401);
    return;
  }

  const userData = userService.normalize(user);
  const accessToken = jwtService.generateAccessToken(userData);

  res.send({
    user: userData,
    accessToken,
  });
}

async function activate(req, res, next) {
  const { activationToken } = req.params;

  const user = await User.findOne({
    where: { activationToken }
  });

  if (!user) {
    res.sendStatus(404);
    return;
  }

  user.activationToken = null;
  await user.save();

  res.send(user);
}

export const authController = { register, activate, login };
