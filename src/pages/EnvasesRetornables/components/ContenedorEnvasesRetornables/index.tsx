import {TarjetaColapsable} from 'components/UI';
import {FunctionComponent, useState} from 'react';
import {TProductoPedido} from 'models';
import {Typography} from '@mui/material';
import {TConsolidadoImplicitos} from 'models';
import {useObtenerConsolidacionImplicitos} from './hooks';
import {useObtenerVisitaActual, useObtenerConfiguracion} from 'redux/hooks';
import TarjetaEnvasesRetornables from '../TarjetaEnvasesRetornables';

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

	Object.values(visitaActual.pedidos).forEach((pedido) => {
		tipoPedidos.forEach((tipoPedido) => {
			if (tipoPedido.codigo === pedido.tipoPedido)
				esGeneraEnvases = tipoPedido.generaEnvases;
		});

		if (esGeneraEnvases) pedidosArray = pedidosArray.concat(pedido.productos);
	});

	const consolidacionImplicitos: TConsolidadoImplicitos[] =
		obtenerConsolidacionImplicitos(pedidosArray);

	const prueba: TConsolidadoImplicitos[] = [
		{
			codigoImplicito: 1001,
			nombreImplicito: 'COCA COLA',
			unidades: 10,
			subUnidades: 1,
			tipoPago: 1,
			presentacion: 12,
			precioConImpuestoUnidad: 150,
			precioConImpuestoSubunidad: 15,
		},
	];

	return (
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
			{prueba.map((envase: TConsolidadoImplicitos) => (
				<TarjetaEnvasesRetornables envase={envase} />
			))}
		</TarjetaColapsable>
	);
};

export default ContenedorEnvasesRetornables;
