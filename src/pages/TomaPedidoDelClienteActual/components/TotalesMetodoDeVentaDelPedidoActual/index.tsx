import {TotalesMetodoDeVenta} from 'components/Negocio';
import {Grid} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {useObtenerDatosCliente, useCalcularTotalPedido} from 'hooks';

const TotalesMetodoDeVentaDelPedidoActual: any = () => {
	const {t} = useTranslation();
	const calcularTotalPedido = useCalcularTotalPedido();
	const totalPedidoActual = calcularTotalPedido();

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

	return metodosDeVenta.map((el, i) => (
		<Grid key={i} item xs={6}>
			<TotalesMetodoDeVenta
				dataCY={el.dataCY}
				metodoVenta={el.metodo}
				total={el.total}
				unidades={el.unidades}
				subunidades={el.subunidades}
			/>
		</Grid>
	));
};

export default TotalesMetodoDeVentaDelPedidoActual;
