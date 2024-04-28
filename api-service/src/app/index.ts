import 'reflect-metadata';
import express, { json, urlencoded } from 'express';
import * as db from '../services/db';
import * as logger from '../services/logger';
import { PORT } from '../constants';
import * as middlewares from '../middlewares';
import historyRouter from './history/router';
import registerRouter from './register/router';
import statsRouter from './stats/router';
import stockRouter from './stock/router';
import loginRouter from './login/router';
import docsRouter from './docs/router';

const log = logger.setup('API-Service');
const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));

db.getConnection()
  .initialize()
  .then(async (connection) => {
    log.info('Database connection initialized');
    await connection.synchronize();

    app.use((req, res, next) => {
      log.info('Hitting route', req.url);
      next();
    });

    app.use('/register', registerRouter);
    app.use('/login', loginRouter);

    app.use('/history', historyRouter);
    app.use('/stock', stockRouter);
    app.use('/stats', statsRouter);
    app.use('/docs', docsRouter);

    app.use(middlewares.notFoundHandler);
    app.use(middlewares.errorHandler);

    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`);
    });
  })
  .catch((error) => log.error(error));
