import {Router} from 'express';
import EtmController from '../../controllers/Etm/EtmController';

const router = Router();

router.get('/tomapedidos', EtmController.getDatos);
router.get('/configuracion', EtmController.getConfiguraciones);
router.post('/setdatos', EtmController.setDatos);
router.post('/setconfiguracion', EtmController.setConfiguracion);

export default router;
