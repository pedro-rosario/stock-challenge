import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User, StockHistory } from '../models';
import {
  DB_DATABASE_NAME,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_SCHEMA_NAME,
  DB_USERNAME,
} from '../constants';

let database: DataSource;

/**
 * Retrieves the database connection.
 * If the connection does not exist, it initializes a new one.
 * @returns {DataSource} The database connection.
 */
export function getConnection(): DataSource {
  if (!database) {
    database = init();
  }

  return database;
}

/**
 * Initializes a new database connection.
 * @returns {DataSource} The initialized database connection.
 */
export function init(): DataSource {
  const AppDataSource = new DataSource({
    type: 'postgres',
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE_NAME,
    schema: DB_SCHEMA_NAME,
    entities: [User, StockHistory],
    synchronize: true,
    logging: false,
  });
  return AppDataSource;
}
