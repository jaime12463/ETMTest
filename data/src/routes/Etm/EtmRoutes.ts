import {Router} from 'express';
import EtmController from '../../controllers/Etm/EtmController';

const router = Router();

router.get('/tomapedidos', EtmController.getDatos);
router.get('/configuracion', EtmController.getConfiguraciones);
router.post('/datos', EtmController.setDatos);

export default router;
