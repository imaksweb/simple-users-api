import jwt from 'jsonwebtoken';

function generateAccessToken(user) {
  return jwt.sign(user, process.env.JWT_ACCESS_SECRET, {
    expiresIn: '30m',
  });
}

function generateRefreshToken(user) {
  return jwt.sign(user, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '10d',
  });
}

function validateAccessToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch (err) {
    return null;
  }
}

function validateRefreshToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (err) {
    return null;
  }
}

export const jwtService = {
  generateAccessToken,
  generateRefreshToken,
  validateAccessToken,
  validateRefreshToken,
}
