import * as stooqService from '../../services/stooq';

/**
 * Retrieves the latest stock data for the specified symbol from the Stooq service.
 * @param {string} symbol - The symbol of the stock to retrieve data for.
 * @returns {Promise<any>} A promise that resolves with the latest stock data.
 */
export async function getStockBySymbol(symbol: string) {
  return stooqService.getLatestStockData(symbol);
}
