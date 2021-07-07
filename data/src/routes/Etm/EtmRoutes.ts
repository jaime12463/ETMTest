import {Router} from 'express';
import EtmController from '../../controllers/Etm/EtmController';

const router = Router();

router.get('/datos', EtmController.getDatos);
router.get('/configuraciones', EtmController.getConfiguraciones);

export default router;
