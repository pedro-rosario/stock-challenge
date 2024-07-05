import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants';

/**
 * Generates a JWT token with the specified email and permissions.
 * @param {Object} params - Parameters for generating the token.
 * @param {string} params.email - The email associated with the token.
 * @param {string[]} params.permissions - The permissions associated with the token.
 * @returns {string} The generated JWT token.
 */
export function generateToken({
  email,
  permissions,
}: {
  email: string;
  permissions: string[];
}) {
  return jwt.sign({ email: email, permissions: permissions }, JWT_SECRET);
}
