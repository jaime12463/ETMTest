import {Router} from 'express';
import EtmRoutes from './Etm/EtmRoutes';

const routes = Router();

routes.use('/femsa', EtmRoutes);

export default routes;
