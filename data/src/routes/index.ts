import {Router} from 'express';
import EtmRoutes from './Etm/EtmRoutes';

const routes = Router();

routes.use('/api/etm', EtmRoutes);

export default routes;
