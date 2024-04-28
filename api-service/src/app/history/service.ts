import { User, StockHistory } from '../../models';
import * as _db from '../../services/db';

const db = _db.getConnection();
const stockHistoryRepository = db.getRepository(StockHistory);

/**
 * Creates a new entry in the stock history for the specified user.
 * @param {User} user - The user for whom the stock history entry is created.
 * @param {StockHistory} stockInformation - The stock information to save in the history.
 * @returns {Promise<void>} A promise that resolves when the stock history entry is successfully created.
 */
export async function createUserHistory(
  user: User,
  stockInformation: StockHistory,
) {
  await stockHistoryRepository.save({
    ...stockInformation,
    user,
  });
}

/**
 * Retrieves the top requested stocks from the stock history.
 * @param {Object} params - Parameters for retrieving the most requested stocks.
 * @param {number} params.limit - The maximum number of stocks to retrieve.
 * @returns {Promise<Array<{ times_requested: number, stock: string }>>} A promise that resolves to an array of objects containing the top requested stocks and their request counts.
 */
export async function getMostRequestedStocks({ limit }: { limit: number }) {
  return stockHistoryRepository.query(`
    SELECT COUNT("symbol") as times_requested, "symbol" as stock
    FROM "StockHistory"
    GROUP BY "symbol"
    ORDER BY "times_requested" DESC
    LIMIT ${limit}
  `);
}
