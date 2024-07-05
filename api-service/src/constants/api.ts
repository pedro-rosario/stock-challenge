const _PORT = parseInt(process.env.PORT, 10);

export const PORT = isNaN(_PORT) ? 3002 : _PORT;
export const JWT_SECRET = process.env.JWT_SECRET || 'not-so-secure-secret';
export const LOG_LEVEL = process.env.LOG_LEVEL || 'debug';
export const STOCK_SERVICES_HOST =
  process.env.STOCK_SERVICES_HOST || 'http://localhost:3001';
export const EMAIL_RE = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
