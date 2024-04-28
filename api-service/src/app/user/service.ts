import * as _db from '../../services/db';
import { User } from '../../models';
import { ApiError } from '../../services/apiError';
import { USER_ROLE } from '../../constants';
import { generateRandomPassword } from '../../utils/password';

const db = _db.getConnection();
const userRespository = db.getRepository(User);

/**
 * Creates a new user with the specified email and role.
 * @param {Object} params - Parameters for creating a user.
 * @param {string} params.email - The email of the user to create.
 * @param {USER_ROLE} params.role - The role of the user to create.
 * @returns {Promise<{ email: string, password: string }>} The email and randomly generated password of the created user.
 * @throws {ApiError} Throws an error if the email is already in use.
 */
export async function createUser({
  email,
  role,
}: {
  email: string;
  role: USER_ROLE;
}) {
  const userExists = await userRespository.exists({ where: { email: email } });

  if (userExists) {
    throw ApiError.conflict(`Email ${email} is already in use`);
  }

  const password = generateRandomPassword();

  await userRespository.save({ email, role, password: password });

  return { email, password: password };
}

/**
 * Retrieves a user by their email.
 * @param {string} email - The email of the user to retrieve.
 * @returns {Promise<User | undefined>} A promise resolving to the retrieved user, or undefined if not found.
 */
export function getUser(email: string) {
  return userRespository.findOne({
    where: { email: email },
  });
}

/**
 * Retrieves a user with their query history by their email.
 * @param {string} email - The email of the user to retrieve.
 * @returns {Promise<Array<{ [key: string]: any }> | undefined>} A promise resolving to the user's query history, or undefined if the user is not found.
 */
export async function getUserWithHistory(email: string) {
  const user = await userRespository.findOne({
    where: { email: email },
    order: { history: { id: 'desc' } },
    relations: ['history'],
  });

  if (!user) return;

  return user.history.map((stock) => {
    delete stock.createdAt;
    delete stock.id;
    delete stock.updatedAt;

    return stock;
  });
}

/**
 * Retrieves a user by their email and matching password.
 * @param {string} email - The email of the user to retrieve.
 * @param {string} password - The password to match.
 * @returns {Promise<User | undefined>} A promise resolving to the retrieved user, or undefined if not found.
 */
export async function getByMatchingPassword(email: string, password: string) {
  return userRespository.findOne({
    where: { email: email, password: password },
  });
}
