git import {Request} from 'express';
import fs from 'fs';

export default class EtmManager {
	public static getDatos = async (req: Request) => {
		const datos = fs.readFileSync('db.json');
		const datosJson = JSON.parse(datos.toString());
		const datosConHash = EtmManager.transformarAHash(datosJson);
		return datosConHash;
	};

	public static getConfiguraciones = async (req: Request) => {
		const configuracion = fs.readFileSync('configuracion.json');
		const configuracionJson = JSON.parse(configuracion.toString());
		return configuracionJson;
	};

	public static setDatos = async (req: Request) => {
		const datos = req.body;
		fs.writeFileSync('db.json', JSON.stringify(datos));
		return true;
	};

	public static setConfiguracion = async (req: Request) => {
		const datos = req.body;
		fs.writeFileSync('configuracion.json', JSON.stringify(datos));
		return true;
	};

	public static transformarAHash = async (json: any) => {
		const transformacionJsonConHash = (array: any, elementoHash: string) => {
			const objeto = array.reduce(
				(acumulado: any, elemento: any) => ({
					...acumulado,
					[elemento[elementoHash]]: elemento,
				}),
				{}
			);
			return JSON.stringify(objeto);
		};
		const clientesHash = transformacionJsonConHash(
			json.clientes,
			'codigoCliente'
		);

		const productosHash = transformacionJsonConHash(
			json.productos,
			'codigoProducto'
		);

		let jsonFinal = JSON.parse(
			`{"clientes":${clientesHash}, "productos":${productosHash}, "presupuestoTipoPedido":${JSON.stringify(
				json.presupuestoTipoPedido
			)}}`
		);
		return jsonFinal;
	};
}
