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
	//	TODO: La ejecución de obtenerConsolidacionImplicitos tiene que estar dentro de un useEffect
	//  si lo que se quiere es que se realice solo en el primer render (Como esta se hace cada render)
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
			a.tipoPago !== undefined
				? b.tipoPago !== undefined
					? a.tipoPago - b.tipoPago || a.codigoImplicito - b.codigoImplicito
					: 0
				: 0
		);


	return (
		<>
			{puedeVerEnvases && (
				<TarjetaColapsable
					titulo={<Typography variant={'subtitle1'}>Envases</Typography>}
					subTitulo={
						<Typography variant={'body3'}>
							Revisa la cantidad de envases para tus productos.
						</Typography>
					}
					id='Envases'
					expandido={expandido}
					setExpandido={setExpandido}
				>
					{consolidacionImplicitos.map(
						(envase: TConsolidadoImplicitos, i: number) => (
							<TarjetaEnvasesRetornables envase={envase} key={i} />
						)
					)}
				</TarjetaColapsable>
			)}
		</>
	);
};

export default ContenedorEnvasesRetornables;
