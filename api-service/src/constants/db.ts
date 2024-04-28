const _DB_PORT = parseInt(process.env.DB_PORT, 10);
export const DB_PORT = isNaN(_DB_PORT) ? _DB_PORT : 5432;

export const DB_HOST = process.env.DB_HOST || 'db';
export const DB_USERNAME = process.env.DB_USERNAME || 'postgres';
export const DB_PASSWORD = process.env.DB_PASSWORD || 'example';
export const DB_DATABASE_NAME = process.env.DB_DATABASE_NAME || 'postgres';
export const DB_SCHEMA_NAME = process.env.DB_SCHEMA_NAME || 'public';
