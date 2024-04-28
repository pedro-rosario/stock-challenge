const _PORT = parseInt(process.env.PORT, 10);

export const PORT = isNaN(_PORT) ? 3001 : _PORT;
