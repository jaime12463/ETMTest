import {TarjetaColapsable} from 'components/UI';
import {FunctionComponent, useState} from 'react';
import {TProductoPedido, ETiposDePago} from 'models';
import {Typography} from '@mui/material';
import {TConsolidadoImplicitos} from 'models';
import {useObtenerConsolidacionImplicitos} from './hooks';
import {useObtenerVisitaActual, useObtenerConfiguracion} from 'redux/hooks';
import TarjetaEnvasesRetornables from '../TarjetaEnvasesRetornables';
import {borrarProductosDeVisitaActual} from 'redux/features/visitaActual/visitaActualSlice';

type Props = {};

const ContenedorEnvasesRetornables: FunctionComponent<Props> = (props) => {
	const [expandido, setExpandido] = useState<string | boolean>(false);

	const visitaActual = useObtenerVisitaActual();

	const {tipoPedidos} = useObtenerConfiguracion();
	const obtenerConsolidacionImplicitos = useObtenerConsolidacionImplicitos();

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

	const consolidacionImplicitos: TConsolidadoImplicitos[] =
		obtenerConsolidacionImplicitos(pedidosArray).sort((a, b) =>
			a.tipoPago !== undefined && b.tipoPago !== undefined
				? a.codigoImplicito - b.codigoImplicito || a.tipoPago - b.tipoPago
				: a.codigoImplicito - b.codigoImplicito
		);

	console.log(consolidacionImplicitos);

	return (
		<>
			{puedeVerEnvases && (
				<>
					{consolidacionImplicitos.map(
						(envase: TConsolidadoImplicitos, i: number) => (
							<TarjetaEnvasesRetornables envase={envase} key={i} />
						)
					)}
				</>
			)}
		</>
	);
};

export default ContenedorEnvasesRetornables;
