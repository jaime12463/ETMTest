import React from 'react';
import {Box} from '@mui/material';
import {useObtenerClienteActual, useObtenerVisitaActual} from 'redux/hooks';
import {
	TCantidadesProductosIniciativas,
	TPrecioProducto,
	TProductoPedido,
} from 'models';
import {useObtenerDatosCliente} from 'hooks';
import {
	ControlesProducto,
	InformacionProducto,
	InputPropsEstilos,
} from 'components/UI';

export interface GetValuesProps {
	unidades: number;
	subUnidades: number;
	productoABuscar: string;
	tipoDePedido: string;
	catalogoMotivo: string;
}

interface Props {
	cantidadesProductos: TCantidadesProductosIniciativas;
	estado: string;
	idIniciativa: number;
	producto: TPrecioProducto;
}

const Producto: React.FC<Props> = ({
	cantidadesProductos,
	estado,
	idIniciativa,
	producto,
}) => {
	const visitaActual = useObtenerVisitaActual();
	const clienteActual = useObtenerClienteActual();
	const {obtenerDatosCliente} = useObtenerDatosCliente();
	const datosCliente = obtenerDatosCliente(clienteActual.codigoCliente)!;
	const configuracionPedido = datosCliente.configuracionPedido;

	const defaultValues: GetValuesProps = {
		unidades: 0,
		subUnidades: 0,
		productoABuscar: '',
		tipoDePedido: visitaActual.tipoPedidoActual,
		catalogoMotivo: '',
	};

	const [getValues, setGetValues] =
		React.useState<GetValuesProps>(defaultValues);

	const productoACargar: TProductoPedido = {
		...producto,
		unidades: 0,
		subUnidades: 0,
		catalogoMotivo: '',
		total: 0,
		tipoPago: clienteActual.tipoPagoActual,
		preciosBase: {
			unidad: producto.precioConImpuestoUnidad,
			subUnidad: producto.precioConImpuestoSubunidad,
		},
		preciosNeto: {
			unidad: producto.precioConImpuestoUnidad,
			subUnidad: producto.precioConImpuestoSubunidad,
		},
		preciosPromo: {
			unidad: 0,
			subUnidad: 0,
		},
	};

	const useEstilosProps: InputPropsEstilos = {
		bordeError:
			getValues.unidades > (configuracionPedido.cantidadMaximaUnidades ?? 0),
		unidades: getValues.unidades,
		subUnidades: getValues.subUnidades,
		unidadesDisponibles: producto.unidadesDisponibles ?? 0,
		cantidadMaximaConfig: configuracionPedido.cantidadMaximaUnidades ?? 0,
		disabled: estado !== 'ejecutada' || visitaActual.pasoATomaPedido,
	};

	return (
		<Box
			display='flex'
			sx={{
				background:
					'linear-gradient(90deg, transparent 0%, transparent 177px, #F5F0EF 177px, #F5F0EF 100%)',
			}}
		>
			<InformacionProducto producto={productoACargar} />
			<ControlesProducto
				cantidadesProductos={cantidadesProductos}
				cantidadMaximaUnidades={configuracionPedido.cantidadMaximaUnidades}
				getValues={getValues}
				idIniciativa={idIniciativa}
				producto={productoACargar}
				setGetValues={setGetValues}
				useEstilosProps={useEstilosProps}
			/>
		</Box>
	);
};

export default Producto;
