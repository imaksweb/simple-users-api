import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { emailService } from '../services/emailService.js';

import { ApiError } from '../exceptions/ApiError.js';
import { User } from '../models/User.js';

function getAll(user) {
  if (user.role === 'admin') {
    return User.findAll({
      where: { activationToken: null }
    });  
  }

  if (user.role === 'boss') {
    return User.findAll({
      where: {
        bossId: user.id,
        activationToken: null,
      }
    });  
  }

  if (user.role === 'user') {
    return User.findAll({
      where: {
        id: user.id,
        activationToken: null,
      }
    });
  }
}

function getByEmail(email) {
  return User.findOne({
    where: { email }
  })
}

function normalize({ id, name, email, role, bossId }) {
  return { id, name, email, role, bossId };
}

async function register({ name, email, password, role }) {
  const existingUser = await getByEmail(email);

  if (existingUser) {
    throw ApiError.BadRequest('Email is already taken', {
      email: 'Email is already taken',
    })
  }
  
  const activationToken = uuidv4();
  const hash = await bcrypt.hash(password, 10);

  await User.create({
    name,
    email,
    password: hash,
    role,
    activationToken
  });

  await emailService.sendActivationLink(email, activationToken);
}

export const userService = {
  getAll,
  getByEmail,
  normalize,
  register
};