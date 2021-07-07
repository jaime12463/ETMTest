import {Request} from 'express';
import fs from 'fs';

export default class EtmManager {
	public static getDatos = async (req: Request) => {
		const datos = fs.readFileSync('../../../db.json');
		const datosJson = JSON.parse(datos);
		const datosConHash = EtmManager.transformarAHash(datosJson);
		return datosJson;
	};
	public static getConfiguraciones = async (req: Request) => {
		const configuracion = fs.readFileSync('../../../configuracion.json');
		const configuracionJson = JSON.parse(configuracion);
		return configuracionJson;
	};
	public static transformarAHash = async (json: any) => {
		const transformacionJsonConHash = (array: any, elementoHash: any) => {
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
			`{"clientes":${clientesHash}, "productos":${productosHash}}`
		);
		return jsonFinal;
	};
}
