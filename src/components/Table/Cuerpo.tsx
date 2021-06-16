import {TableBody, TableCell, TableRow} from '@material-ui/core';
import {
	TPrecio,
	TPrecioProducto,
	TPreciosProductos,
	TProductoPedidoConPrecios,
} from 'models';
import {selectPedidoActual} from 'redux/features/pedidoActual/pedidoActualSlice';
import {useAppSelector} from 'redux/hooks';
import {obtenerPrecioConImpuestoUnidad} from 'utils/validaciones';
import {Celda} from './Celda';

type PropsCuerpo = {
	asignarProductoActual: (producto: TProductoPedidoConPrecios) => void;
	estilos: any; // TODO: Buscar como mejorar esto para recibir los estilos como propiedad
	filas: TPreciosProductos;
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
								//TODO: Esto hay que mirarlo a fondo
								codigoProductoConNombre: `${producto.codigoProducto} ${producto.nombre}`,
								unidades: 0,
								subUnidades: 0,
								precioConImpuestoUnidad: precios.precioConImpuestoUnidad,
								precioConImpuestoSubunidad: precios.precioConImpuestoSubunidad,
							})
						}
						data-cy={`valor-${i}`}
					>
						<Celda estilos={estilos} texto={obtenerNombreYCodigo(producto)} />
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
