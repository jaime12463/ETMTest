import {TotalesMetodoDeVenta} from 'components/Negocio';
import {Grid} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {useCalcularTotalPedido, useObtenerDatosTipoPedido} from 'hooks';

const TotalesMetodoDeVentaDelPedidoActual: any = () => {
	const {t} = useTranslation();
	const calcularTotalPedido = useCalcularTotalPedido();
	const totalPedidoActual = calcularTotalPedido();
	const obtenerDatosTipoPedido = useObtenerDatosTipoPedido();
	const datosTipoPedidoActual = obtenerDatosTipoPedido();

	const metodosDeVenta = [
		{
			metodo: t('general.credito'),
			total: totalPedidoActual.totalCredito.totalPrecio,
			unidades: totalPedidoActual.totalCredito.totalUnidades,
			subunidades: totalPedidoActual.totalCredito.totalSubUnidades,
			dataCY: 'credito',
		},
		{
			metodo: t('general.contado'),
			total: totalPedidoActual.totalContado.totalPrecio,
			unidades: totalPedidoActual.totalContado.totalUnidades,
			subunidades: totalPedidoActual.totalContado.totalSubUnidades,
			dataCY: 'contado',
		},
	];

	return (
		<>
			{datosTipoPedidoActual?.esValorizado &&
				metodosDeVenta.map((el, i) => (
					<Grid key={i} item xs={6}>
						<TotalesMetodoDeVenta
							dataCY={el.dataCY}
							metodoVenta={el.metodo}
							total={el.total}
							unidades={el.unidades}
							subunidades={el.subunidades}
						/>
					</Grid>
				))}
			{!datosTipoPedidoActual?.esValorizado && (
				<Grid item xs={6}>
					<TotalesMetodoDeVenta
						dataCY='totalProducto'
						unidades={totalPedidoActual.totalUnidades}
						subunidades={totalPedidoActual.totalSubUnidades}
					/>
				</Grid>
			)}
		</>
	);
};

export default TotalesMetodoDeVentaDelPedidoActual;
