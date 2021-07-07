import EtmManager from '../../models/Etm/EtmManager';
import {Response, Request} from 'express';

export default class EtmController {
	public static getDatos = async (req: Request, res: Response) => {
		const result = await EtmManager.getDatos(req);
		res.status(200).send(result);
	};

	public static getConfiguraciones = async (req: Request, res: Response) => {
		const result = await EtmManager.getConfiguraciones(req);
		res.status(200).send(result);
	};

	public static setDatos = async (req: Request, res: Response) => {
		const result = await EtmManager.setDatos(req);
		res.status(200).send(result);
	};

	public static setConfiguracion = async (req: Request, res: Response) => {
		const result = await EtmManager.setConfiguracion(req);
		res.status(200).send(result);
	};

}
