/**
 * Generates a random password.
 * @returns {string} The randomly generated password.
 */
export function generateRandomPassword() {
  return Buffer.from(`${Math.floor(Math.random() * Date.now())}`).toString(
    'base64',
  );
}
