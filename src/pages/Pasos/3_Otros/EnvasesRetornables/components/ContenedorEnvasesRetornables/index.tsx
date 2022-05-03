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

	const hayEnvasesParaMostrar = consolidacionImplicitos.some(
		(envase) => envase.unidades > 0 || envase.subUnidades > 0
	);

	return (
		<>
			{puedeVerEnvases && (
				<Box marginTop={hayEnvasesParaMostrar ? '32px' : '0'}>
					<Stack spacing={1.5}>
						{consolidacionImplicitos.map((envase: TConsolidadoImplicitos) => {
							if (envase.unidades === 0 && envase.subUnidades === 0)
								return null;

							return (
								<TarjetaEnvasesRetornables
									envase={envase}
									key={envase.codigoImplicito}
								/>
							);
						})}
					</Stack>
				</Box>
			)}
		</>
	);
};

export default ContenedorEnvasesRetornables;
