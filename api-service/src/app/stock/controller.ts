import axios from 'axios';
import { NextFunction, Response } from 'express';
import { Request as JWTRequest } from 'express-jwt';
import { ApiError } from '../../services/apiError';
import * as stockService from '../../services/stock';
import * as historyService from '../history/service';
import * as userService from '../user/service';

export async function getStock(
  req: JWTRequest,
  res: Response,
  next: NextFunction,
) {
  const { q: stockSymbol } = req.query;

  if (!stockSymbol)
    throw ApiError.notFound('The specified stock was not found');

  const user = await userService.getUser(req.auth.email);

  if (!user) throw ApiError.notFound('User not found');

  try {
    const stockInformation = await stockService.getStock(stockSymbol as string);

    await historyService.createUserHistory(user, stockInformation.data);
    res.json(stockInformation.data);
  } catch (error) {
    next(error);
  }
}
