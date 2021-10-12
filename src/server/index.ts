import axios from 'axios';
import {TDatosClientesProductos} from 'models';
import {TDatosConfiguracion} from 'models';
import {URL_API} from 'utils/constants';

export const obtenerDatosClientesProductos: () => Promise<TDatosClientesProductos> =
	async () => {
		const response = await axios.get(`${URL_API}/femsa/tomapedidos`);
		return response.data;
	};

export const obtenerDatosConfiguracion: () => Promise<TDatosConfiguracion> =
	async () => {
		const response = await axios.get(`${URL_API}/femsa/configuracion`);
		return response.data;
	};
