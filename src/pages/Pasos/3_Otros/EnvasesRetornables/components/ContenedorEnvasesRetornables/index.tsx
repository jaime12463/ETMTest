import {FunctionComponent} from 'react';
import {TProductoPedido} from 'models';
import {Stack} from '@mui/material';
import {TConsolidadoImplicitos} from 'models';
import {
	useObtenerConsolidacionImplicitos,
	useObtenerDatosProducto,
} from './hooks';
import {useObtenerVisitaActual, useObtenerConfiguracion} from 'redux/hooks';
import TarjetaEnvasesRetornables from '../TarjetaEnvasesRetornables';
import Box from '@mui/material/Box';

const ContenedorEnvasesRetornables: FunctionComponent = () => {
	const visitaActual = useObtenerVisitaActual();
	const {tipoPedidos} = useObtenerConfiguracion();
	const obtenerConsolidacionImplicitos = useObtenerConsolidacionImplicitos();
	const obtenerDatosProducto = useObtenerDatosProducto();

	let pedidosArray: TProductoPedido[] = [];
	let esGeneraEnvases = false;
	let puedeVerEnvases = false;

	Object.values(visitaActual.pedidos).forEach((pedido) => {
		tipoPedidos.forEach((tipoPedido) => {
			if (tipoPedido.codigo === pedido.tipoPedido)
				esGeneraEnvases = tipoPedido.generaEnvases;
			if (tipoPedido.generaEnvases && pedido.productos.length) {
				puedeVerEnvases = true;
			}
		});

		if (esGeneraEnvases) pedidosArray = pedidosArray.concat(pedido.productos);
	});

	const calcularEnvasesDeObsequios = () => {
		const medidaUnidad = 'Unidad';
		const medidaSubunidad = 'Subunidad';

		let promosConvertidasAProducto: TProductoPedido[] = [];
		visitaActual.promosOngoing.forEach((promo) => {
			promo.productos.forEach((producto) => {
				const {implicito1, implicito2} = obtenerDatosProducto(
					producto.codigoProducto
				);
				let datosImplicito1,  datosImplicito2;

				if (implicito1)
					datosImplicito1 = obtenerDatosProducto(implicito1);
				if (implicito2)
					datosImplicito2 = obtenerDatosProducto(implicito2);					

				const productoConvertido: TProductoPedido = {
					codigoProducto: producto.codigoProducto,
					unidades:
						producto.unidadMedida === medidaUnidad ? producto.cantidad : 0,
					subUnidades:
						producto.unidadMedida === medidaSubunidad ? producto.cantidad : 0,
					tipoPago: producto.tipoPago,
					codigoImplicito1: implicito1,
					nombreImplicito1: datosImplicito1 ? datosImplicito1.nombre : '',
					codigoImplicito2: implicito2,
					nombreImplicito2: datosImplicito2 ? datosImplicito2.nombre : '',

					nombreProducto: '',
					presentacion: 0,
					subunidadesVentaMinima: 0,
					esVentaSubunidades: false,
					precioConImpuestoUnidad: 0,
					precioConImpuestoSubunidad: 0,
					tipoProducto: 0,
					total: 0,
					preciosBase: {
						unidad: 0,
						subUnidad: 0,
					},
					preciosNeto: {
						unidad: 0,
						subUnidad: 0,
					},
					catalogoMotivo: '',
				};

				promosConvertidasAProducto =
					promosConvertidasAProducto.concat(productoConvertido);
			});
		});

		return promosConvertidasAProducto;
	};

	pedidosArray = pedidosArray.concat(calcularEnvasesDeObsequios());

	const consolidacionImplicitos: TConsolidadoImplicitos[] =
		obtenerConsolidacionImplicitos(pedidosArray).sort((a, b) =>
			a.tipoPago !== undefined && b.tipoPago !== undefined
				? a.codigoImplicito - b.codigoImplicito || a.tipoPago - b.tipoPago
				: a.codigoImplicito - b.codigoImplicito
		);

	return (
		<Box marginTop='32px'>
			{puedeVerEnvases && (
				<Stack spacing={1.5}>
					{consolidacionImplicitos.map(
						(envase: TConsolidadoImplicitos, i: number) => (
							<TarjetaEnvasesRetornables envase={envase} key={i} />
						)
					)}
				</Stack>
			)}
		</Box>
	);
};

export default ContenedorEnvasesRetornables;
