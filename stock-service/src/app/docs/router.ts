import swaggerUi from 'swagger-ui-express';
import { Router } from 'express';
import swaggerJson from '../../static/swagger.json';

const router = Router();

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerJson));

export default router;
