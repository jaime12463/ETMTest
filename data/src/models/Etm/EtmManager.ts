import {Request} from 'express';
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
			return objeto;
		};

		const clientesHash = transformacionJsonConHash(
			json.clientes,
			'codigoCliente'
		);

		const productosHash = transformacionJsonConHash(
			json.productos,
			'codigoProducto'
		);

		const saboresHash=   transformacionJsonConHash(
			json.sabores,
			'id'
		);

		const familiasHash=   transformacionJsonConHash(
			json.familias,
			'id'
		);

		const medidasHash=   transformacionJsonConHash(
			json.medidas,
			'id'
		);

		const marcasHash=   transformacionJsonConHash(
			json.marcas,
			'id'
		);

		const envasesHash=   transformacionJsonConHash(
			json.envases,
			'id'
		);

		const promocionesHash=   transformacionJsonConHash(
			json.promociones,
			'promocionID'
		);

	/*
		let jsonFinal = JSON.parse(
			`{"clientes":${clientesHash}, "productos":${productosHash}, "presupuestoTipoPedido":${JSON.stringify(
				json.presupuestoTipoPedido
			)}, "iniciativas":${JSON.stringify(
				json.iniciativas
			)}, "bonificaciones":${JSON.stringify(json.bonificaciones)}}`
		);
		return jsonFinal;
	
	*/
		return {
			"clientes":clientesHash,
			"productos":productosHash, 
			"presupuestoTipoPedido":json.presupuestoTipoPedido,
			"iniciativas": json.iniciativas,
			"bonificaciones":json.bonificaciones,
			"sabores": saboresHash,
			"familias":familiasHash,
			"medidas": medidasHash,
			"marcas" :marcasHash,
			"envases" :envasesHash,
			"promociones": promocionesHash 
			
		};

	};
}
