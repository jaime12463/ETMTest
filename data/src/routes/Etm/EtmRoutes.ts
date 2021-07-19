import {Router} from 'express';
import EtmController from '../../controllers/Etm/EtmController';

const router = Router();

/**
 * @swagger
 * /femsa/tomapedidos:
 *  get:
 *      description: Obtener todos los datos para la Tomaa de Pedidos
 *      responses:
 *          '200':
 *              description: Respuesta satisfactoria
 */
router.get('/tomapedidos', EtmController.getDatos);

/**
 * @swagger
 * /femsa/configuracion:
 *  get:
 *      description: Obtener los datos de configuración
 *      responses:
 *          '200':
 *              description: Respuesta satisfactoria
 */
router.get('/configuracion', EtmController.getConfiguraciones);

/**
 * @swagger
 * /femsa/setdatos:
 *  post:
 *      description: Establecer los datos a ser utilizados para la Toma de Pedidos
 *      consumes:
 *        - application/json
 *      parameters: 
 *        - in: body
 *          name: datos
 *          description: Nuevos datos a establecer
 *          schema:
 *            type: object
 *            required:
 *              - "clientes"
 *            properties:
 *              "clientes":
 *                type: object
 *              "products":
 *                type: object
 *      responses:
 *          '200':
 *              description: Respuesta satisfactoria
 */
router.post('/setdatos', EtmController.setDatos);

/**
 * @swagger
 * /femsa/setconfiguracion:
 *  post:
 *      description: Establecer los datos de configuración a ser utilizados para la Toma de Pedidos
 *      consumes:
 *        - application/json
 *      parameters: 
 *        - in: body
 *          name: configuracion
 *          description: Nuevas configuraciones a establecer
 *          schema:
 *            type: object
 *            required:
 *              - "datos"
 *            properties:
 *              "datos":
 *                type: object
 *      responses:
 *          '200':
 *              description: Respuesta satisfactoria
 */
 router.post('/setconfiguracion', EtmController.setConfiguracion);

export default router;
