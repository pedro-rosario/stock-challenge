import { Response } from 'express';
import { Request as JWTRequest } from 'express-jwt';
import { ApiError } from '../../services/apiError';
import * as userService from '../user/service';

export async function getUserHistory(req: JWTRequest, res: Response) {
  const userHistory = await userService.getUserWithHistory(req.auth.email);

  if (!userHistory) throw ApiError.notFound('User not found');

  res.json(userHistory);
}
