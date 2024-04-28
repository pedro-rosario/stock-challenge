import axios from 'axios';

/**
 * Makes a GET request to the specified URL using Axios.
 * @param {string} url - The URL to make the GET request to.
 * @returns {Promise<any>} A promise that resolves with the response data from the GET request.
 * @throws {Error} Throws an error if the GET request fails or encounters an error.
 */
export async function get(url: string) {
  const { data } = await axios.get(url);

  return data;
}
