import { userService } from '../services/userService.js';
import { jwtService } from '../services/jwtService.js';

async function getAll(req, res, next) {
  const { refreshToken } = req.cookies;

  const userData = await jwtService.validateRefreshToken(refreshToken);

  if (!userData) {
    throw ApiError.Unauthorized();
  }

  const users = await userService.getAll(userData);

  res.send(
    users.map(userService.normalize)
  );
}

export const userController = { getAll };