import { jwtService } from '../services/jwtService.js'

export function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    res.sendStatus(401);
    return;
  }

  const [, accessToken] = authHeader.split(' ');

  if (!accessToken) {
    res.sendStatus(401);
    return;
  }

  const userData = jwtService.validateAccessToken(accessToken);

  if (!userData) {
    res.sendStatus(401);
    return;
  }

  next();
}