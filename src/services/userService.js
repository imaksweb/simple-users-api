import { User } from '../models/User.js';

function getByEmail(email) {
  return User.findOne({
    where: { email }
  })
}

function normalize({ id, email }) {
  return { id, email };
}

export const userService = { getByEmail, normalize };