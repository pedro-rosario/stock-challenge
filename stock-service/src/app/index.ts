import express from 'express';
import stockRouter from './stocks/router';
import docsRouter from './docs/router';
import { PORT } from '../constants';

const app = express();

app.use('/stocks', stockRouter);
app.use('/docs', docsRouter);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
