import EtmManager from '../../models/Etm/EtmManager';
import {Response, Request} from 'express';

export default class EtmController {
	public static getDatos = async (req: Request, res: Response) => {
		const result = await EtmManager.getDatos(req);
		if (result) {
			res.status(401).send(result);
			return;
		}
		res.status(200).send(result);
	};

	public static getConfiguraciones = async (req: Request, res: Response) => {
		const result = await EtmManager.getConfiguraciones(req);
		if (result) {
			res.status(401).send(result);
			return;
		}
		res.status(200).send(result);
	};
}
