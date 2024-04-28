import * as rest from './rest';
import { STOCK_SERVICES_HOST } from '../constants';
import { ApiError } from './apiError';

/**
 * Retrieves stock information for the specified symbol from the stock service.
 * @param {string} symbol - The symbol of the stock to retrieve information for.
 * @returns {Promise<any>} A promise that resolves with the stock information.
 * @throws {ApiError|Error} Throws an ApiError if the stock service returns an error response, or throws a generic error otherwise.
 */
export async function getStock(symbol: string) {
  try {
    return await rest.get(`${STOCK_SERVICES_HOST}/stocks/${symbol}`);
  } catch (error) {
    if (error.response?.status && error.response?.data?.message) {
      throw new ApiError(error.response.data.message, error.response.status);
    }

    throw error;
  }
}
