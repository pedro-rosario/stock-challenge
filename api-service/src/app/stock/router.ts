import { Router } from 'express';
import * as _db from '../../services/db';
import * as middlewares from '../../middlewares';
import * as stockController from './controller';

const router = Router();

router.get(
  '/',
  middlewares.parseJWT,
  middlewares.checkUserAccess,
  stockController.getStock,
);

export default router;
