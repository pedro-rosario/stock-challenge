import { Router } from 'express';
import * as middlewares from '../../middlewares';
import * as historyController from './controller';

const router = Router();

router.get(
  '/',
  middlewares.parseJWT,
  middlewares.checkUserAccess,
  historyController.getUserHistory,
);

export default router;
