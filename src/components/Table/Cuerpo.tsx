import {TableBody, TableCell, TableRow} from '@material-ui/core';
import {TPrecio, TPrecioProducto, TPrecioSinVigencia} from 'models';
import {selectPedidoActual} from 'redux/features/pedidoActual/pedidoActualSlice';
import {useAppSelector} from 'redux/hooks';
import {obtenerPrecioConImpuestoUnidad} from 'utils/validaciones';

import {Celda} from './Celda';

type PropsCuerpo = {
	asignarProductoActual: (producto: TPrecioSinVigencia) => void;
	estilos: any; // TODO: Buscar como mejorar esto para recibir los estilos como propiedad
	filas: TPrecioProducto[];
};

const obtenerNombreYCodigo = (producto: TPrecioProducto) => {
	return `${producto.codigoProducto} ${producto.nombre.substring(12, -1)}`;
};

const obtenerPrecio = (precio: number) => {
	return `$ ${precio}`;
};

export const Cuerpo = ({
	asignarProductoActual,
	estilos,
	filas,
}: PropsCuerpo) => {
	const pedidoActual = useAppSelector(selectPedidoActual);

	return (
		<TableBody>
			{filas.map((producto, i) => {
				const precios: TPrecio | undefined = obtenerPrecioConImpuestoUnidad(
					producto.precios,
					pedidoActual.fechaEntrega
				);

				return precios ? (
					<TableRow
						hover
						key={producto.codigoProducto}
						onClick={() =>
							asignarProductoActual({
								codigoProductoConNombre: `${producto.codigoProducto} ${producto.nombre}`,
								precioConImpuestoUnidad: precios.precioConImpuestoUnidad,
								precioConImpuestoSubunidad: precios.precioConImpuestoSubunidad,
							})
						}
						data-cy={`producto-tabla-${i}`}
					>
						<Celda
							estilos={estilos}
							texto={producto.codigoProducto.toString()}
						></Celda>
						<Celda
							estilos={estilos}
							texto={producto.nombre}
							resumirTexto={true}
						/>
						<Celda
							estilos={estilos}
							texto={obtenerPrecio(precios.precioConImpuestoUnidad)}
						/>
					</TableRow>
				) : (
					<></>
				);
			})}
		</TableBody>
	);
};
