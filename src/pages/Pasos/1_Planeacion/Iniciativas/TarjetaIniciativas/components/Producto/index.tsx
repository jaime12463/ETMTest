import React from 'react';
import {Box} from '@mui/material';
import {useObtenerClienteActual, useObtenerVisitaActual} from 'redux/hooks';
import {
	EUnidadMedida,
	TCantidadesProductosIniciativas,
	TPrecioProducto,
	TProductoPedido,
} from 'models';
import {Contador, useObtenerDatosCliente} from 'hooks';
import {InformacionProducto, InputPropsEstilos} from 'components/UI';
import theme from 'theme';
import {Controles} from '..';

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
	restoContador: Omit<Contador, 'contador' | 'reiniciar'>;
	unidadMedida: EUnidadMedida;
}

export const Producto: React.VFC<Props> = ({
	cantidadesProductos,
	estado,
	idIniciativa,
	producto,
	restoContador,
	unidadMedida,
}) => {
	const visitaActual = useObtenerVisitaActual();
	const clienteActual = useObtenerClienteActual();
	const {obtenerDatosCliente} = useObtenerDatosCliente();
	const datosCliente = obtenerDatosCliente(clienteActual.codigoCliente)!;
	const configuracionPedido = datosCliente.configuracionPedido;

	const defaultValues: GetValuesProps = {
		unidades: cantidadesProductos[producto.codigoProducto].unidades,
		subUnidades: cantidadesProductos[producto.codigoProducto].subUnidades,
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
			getValues.unidades > (configuracionPedido.cantidadMaximaUnidades ?? 0) ||
			visitaActual.seQuedaAEditar.bordeError,
		unidades: cantidadesProductos[producto.codigoProducto].unidades,
		subUnidades: cantidadesProductos[producto.codigoProducto].subUnidades,
		unidadesDisponibles: producto.unidadesDisponibles ?? 0,
		cantidadMaximaConfig: configuracionPedido.cantidadMaximaUnidades ?? 0,
		disabled: estado !== 'ejecutada' || visitaActual.pasoATomaPedido,
	};

	React.useEffect(() => {
		if (estado === 'pendiente' || estado === 'cancelada') {
			setGetValues((state) => ({
				...state,
				unidades: 0,
				subUnidades: 0,
			}));
		}
	}, [estado]);

	return (
		<Box
			display='flex'
			sx={{
				background:
					'linear-gradient(90deg, transparent 0%, transparent 177px, #F5F0EF 177px, #F5F0EF 100%)',
				outline: visitaActual.seQuedaAEditar.bordeError
					? `1px solid ${theme.palette.primary.main}`
					: 'none',
			}}
		>
			<InformacionProducto producto={productoACargar} />
			<Controles
				cantidadesProductos={cantidadesProductos}
				getValues={getValues}
				idIniciativa={idIniciativa}
				producto={productoACargar}
				restoContador={restoContador}
				setGetValues={setGetValues}
				unidadMedida={unidadMedida}
				useEstilosProps={useEstilosProps}
			/>
		</Box>
	);
};
