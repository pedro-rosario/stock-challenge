import { Router } from 'express';
import * as _db from '../../services/db';
import * as logInController from './controller';

const router = Router();

router.post('/', logInController.logIn);

export default router;
