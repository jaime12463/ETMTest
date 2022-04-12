import {FunctionComponent} from 'react';
import {TProductoPedido} from 'models';
import {Stack} from '@mui/material';
import {TConsolidadoImplicitos} from 'models';
import {
	useCalcularEnvasesDeObsequios,
	useObtenerConsolidacionImplicitos,
} from './hooks';
import {useObtenerVisitaActual, useObtenerConfiguracion} from 'redux/hooks';
import TarjetaEnvasesRetornables from '../TarjetaEnvasesRetornables';
import Box from '@mui/material/Box';

const ContenedorEnvasesRetornables: FunctionComponent = () => {
	const visitaActual = useObtenerVisitaActual();
	const {tipoPedidos} = useObtenerConfiguracion();
	const obtenerConsolidacionImplicitos = useObtenerConsolidacionImplicitos();
	const calcularEnvasesDeObsequios = useCalcularEnvasesDeObsequios();

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

	pedidosArray = pedidosArray.concat(calcularEnvasesDeObsequios());

	const consolidacionImplicitos: TConsolidadoImplicitos[] =
		obtenerConsolidacionImplicitos(pedidosArray).sort((a, b) =>
			a.tipoPago !== undefined && b.tipoPago !== undefined
				? a.codigoImplicito - b.codigoImplicito || a.tipoPago - b.tipoPago
				: a.codigoImplicito - b.codigoImplicito
		);

	return (
		<>
			{puedeVerEnvases && (
				<Box marginTop='32px'>
					<Stack spacing={1.5}>
						{consolidacionImplicitos.map(
							(envase: TConsolidadoImplicitos, i: number) => (
								<TarjetaEnvasesRetornables envase={envase} key={i} />
							)
						)}
					</Stack>
				</Box>
			)}
		</>
	);
};

export default ContenedorEnvasesRetornables;
