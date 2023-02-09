import jwt from 'jsonwebtoken';

function generateAccessToken(user) {
  return jwt.sign(user, process.env.JWT_ACCESS_SECRET);
}

function validateAccessToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch (err) {
    return null;
  }
}

export const jwtService = { generateAccessToken, validateAccessToken };
