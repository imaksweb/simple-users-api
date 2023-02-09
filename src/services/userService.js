import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { emailService } from '../services/emailService.js';

import { ApiError } from '../exceptions/ApiError.js';
import { User } from '../models/User.js';

function getByEmail(email) {
  return User.findOne({
    where: { email }
  })
}

function normalize({ id, email }) {
  return { id, email };
}

async function register({ email, password }) {
  const existingUser = await getByEmail(email);
  console.log(existingUser);

  if (existingUser) {
    throw ApiError.BadRequest('Email is already taken', {
      email: 'Email is already taken',
    })
  }
  
  const activationToken = uuidv4();
  const hash = await bcrypt.hash(password, 10);

  await User.create({
    email,
    password: hash,
    activationToken
  });

  await emailService.sendActivationLink(email, activationToken);
}

export const userService = {
  getByEmail,
  normalize,
  register
};