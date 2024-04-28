import axios from 'axios';

/**
 * Makes a GET request to the specified URL and retrieves the response as text.
 * @param {string} url - The URL to make the GET request to.
 * @returns {Promise<string>} A promise that resolves with the response data as text.
 * @throws {Error} Throws an error if the GET request fails or encounters an error.
 */
export async function getText(url: string) {
  const { data } = await axios.get(url, { responseType: 'text' });

  return data;
}
