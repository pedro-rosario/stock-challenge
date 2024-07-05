import { Request, Response } from 'express';
import * as stockService from './service';

export async function getStock(req: Request, res: Response) {
  try {
    const { symbol } = req.params;

    const stock = await stockService.getStockBySymbol(symbol);

    if (!stock) return res.status(404).json({ message: 'Stock not found' });

    res.json({ data: stock });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
