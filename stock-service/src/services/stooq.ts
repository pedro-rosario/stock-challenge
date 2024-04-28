import Parse from 'papaparse';
import * as rest from './rest';

const stooqResponseNumberKeys = ['Open', 'High', 'Low', 'Close', 'Volume'];

function getStockUrl(symbol: string) {
  return `https://stooq.com/q/l/?s=${symbol}&f=sd2t2ohlcvn&h&e=csv`;
}

/**
 * Formats the response from Stooq into a standardized format.
 * @param {Object} stockContent - The raw stock content object from Stooq.
 * @returns {Object} The formatted stock content object with lowercase keys and parsed number values.
 */
function formatStooqResponse(stockContent: { [s: string]: string }) {
  const entries = Object.entries(stockContent);
  const formattedEntries = entries.map(([key, value]: [string, string]) => {
    const parsedValue = stooqResponseNumberKeys.includes(key)
      ? parseInt(value, 10)
      : value;

    return [key.toLowerCase(), parsedValue];
  });

  return Object.fromEntries(formattedEntries);
}

/**
 * Retrieves the latest stock data for the specified symbol from the Stooq service.
 * @param {string} symbol - The symbol of the stock to retrieve data for.
 * @returns {Promise<Object>} A promise that resolves with the latest stock data formatted in a standardized way.
 */
export async function getLatestStockData(symbol: string) {
  const stockCsv = await rest.getText(getStockUrl(symbol));

  const { data: stockContent }: any = Parse.parse(stockCsv, { header: true });

  // All stocks should have a date.
  // If this is not properly set, lets assume its an invalid stock
  if (stockContent[0]?.Date === 'N/D') return;

  return formatStooqResponse(stockContent[0]);
}
