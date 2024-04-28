import { Router } from 'express';
import * as _db from '../../services/db';
import * as middlewares from '../../middlewares';
import * as statsController from './controller';

const router = Router();
router.get(
  '/',
  middlewares.parseJWT,
  middlewares.checkAdminAcess,
  statsController.getTopStocks,
);

export default router;
