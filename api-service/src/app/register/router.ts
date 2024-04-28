import { Router } from 'express';
import * as _db from '../../services/db';
import * as registerController from './controller';

const router = Router();

router.post('/', registerController.createUser);

export default router;
