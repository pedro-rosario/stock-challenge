import { Request, Response } from 'express';
import * as historyService from '../history/service';

export async function getTopStocks(req: Request, res: Response) {
  const stocks = await historyService.getMostRequestedStocks({ limit: 5 });

  res.json(stocks);
}
