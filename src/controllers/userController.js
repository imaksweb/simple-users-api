import { userService } from '../services/userService.js';
import { jwtService } from '../services/jwtService.js';
import { User } from '../models/User.js';
import { ApiError } from '../exceptions/ApiError.js';

function validateBossId(value) {
  if (!value) {
    return 'Provide id of new boss';
  }

  if (typeof value !== 'number') {
    return 'id should be a number'
  }
}

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

async function changeBoss(req, res, next) {
  const { id } = req.params;
  const { bossId: newBossId } = req.body;

  const errors = {
    bossId: validateBossId(newBossId),
  };

  if (errors.bossId) {
    throw ApiError.BadRequest('Validation error', errors);
  }

  const user = await User.findOne({
    where: { id },
  });

  if (!user) {
    throw ApiError.NotFound();
  }

  const { refreshToken } = req.cookies;

  const bossData = await jwtService.validateRefreshToken(refreshToken);

  if (!bossData) {
    throw ApiError.Unauthorized();
  }

  if (bossData.id !== user.bossId) {
    throw ApiError.Forbidden(`Only user's boss can do this`);
  }

  await userService.updateBoss(newBossId, id);

  res.send({
    success: 'true',
    message: `User's boss with id=${id} is changed`
  });
}

export const userController = { getAll, changeBoss };