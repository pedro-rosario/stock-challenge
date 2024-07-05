import { Router } from 'express';
import * as stockController from './controller';

const router = Router();

router.get('/:symbol', stockController.getStock);

export default router;
