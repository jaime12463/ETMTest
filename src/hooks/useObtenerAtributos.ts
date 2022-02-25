import React from 'react';
import {useObtenerDatos} from 'redux/hooks';
import {TAtributosProductos} from 'utils/procesos/filtros/productos/filtroProductos';

interface AtributosCliente {
	[tipo: string]: {
		id: number;
		descripcion: string;
	};
}

export const useObtenerAtributos = (atributos: TAtributosProductos) => {
	const {envases, familias, sabores, marcas, medidas} = useObtenerDatos();

	let envasesDelCliente: AtributosCliente = {};
	let familiasDelCliente: AtributosCliente = {};
	let saboresDelCliente: AtributosCliente = {};
	let marcasDelCliente: AtributosCliente = {};
	let medidasDelCliente: AtributosCliente = {};

	atributos.envase.forEach((id) => (envasesDelCliente[id] = envases[id]));
	atributos.familia.forEach((id) => (familiasDelCliente[id] = familias[id]));
	atributos.sabor.forEach((id) => (saboresDelCliente[id] = sabores[id]));
	atributos.marca.forEach((id) => (marcasDelCliente[id] = marcas[id]));
	atributos.medida.forEach((id) => (medidasDelCliente[id] = medidas[id]));

	return {
		envases: Object.values(envasesDelCliente).sort((a, b) =>
			a.descripcion.localeCompare(b.descripcion)
		),
		familias: Object.values(familiasDelCliente).sort((a, b) =>
			a.descripcion.localeCompare(b.descripcion)
		),
		sabores: Object.values(saboresDelCliente).sort((a, b) =>
			a.descripcion.localeCompare(b.descripcion)
		),
		marcas: Object.values(marcasDelCliente).sort((a, b) =>
			a.descripcion.localeCompare(b.descripcion)
		),
		medidas: Object.values(medidasDelCliente).sort((a, b) => {
			const medidasA = a.descripcion.split(' ');
			const medidasB = b.descripcion.split(' ');

			if (medidasA[1] === medidasB[1]) {
				return a.descripcion.localeCompare(b.descripcion);
			}

			return b.descripcion.localeCompare(a.descripcion);
		}),
	};
};
