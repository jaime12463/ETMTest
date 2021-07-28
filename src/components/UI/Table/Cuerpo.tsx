import {TableBody, TableCell, TableRow} from '@material-ui/core';
import {TPrecio, TPrecioProducto, TPrecioSinVigencia} from 'models';
import {selectPedidoActual} from 'redux/features/pedidoActual/pedidoActualSlice';
import {useAppSelector} from 'redux/hooks';
import {useObtenerPrecioVigenteDelProducto} from 'hooks';

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
	return `$ ${precio.toFixed(2)}`;
};

const obtenerPrecioVigenteDelProducto = useObtenerPrecioVigenteDelProducto();

export const Cuerpo = ({
	asignarProductoActual,
	estilos,
	filas,
}: PropsCuerpo) => {
	const pedidoActual = useAppSelector(selectPedidoActual);

	return (
		<TableBody>
			{filas.map((producto, i) => {
				const precios: TPrecio | undefined = obtenerPrecioVigenteDelProducto(
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
								//ENGHOY
								codigoImplicito1: producto.codigoImplicito1,
								nombreImplicito1: producto.nombreImplicito1,
								codigoImplicito2: producto.codigoImplicito2,
								nombreImplicito2: producto.nombreImplicito2,
							})
						}
						data-cy={`producto-tabla-${i}`}
					>
						<Celda estilos={estilos} width='20' align='left'>
							{producto.codigoProducto.toString()}
						</Celda>
						<Celda
							estilos={estilos}
							resumirTexto={true}
							width='55'
							align='left'
						>
							{producto.nombre}
						</Celda>
						<Celda estilos={estilos} width='25' align='right'>
							{obtenerPrecio(precios.precioConImpuestoUnidad)}
						</Celda>
					</TableRow>
				) : (
					<></>
				);
			})}
		</TableBody>
	);
};
