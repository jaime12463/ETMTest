import {TotalesMetodoDeVenta} from 'components/Negocio';
import {Grid} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {useObtenerDatosCliente, useCalcularTotalPedido} from 'hooks';

const TotalesMetodoDeVentaDelPedidoActual: any = () => {
	const {t} = useTranslation();
	const calcularTotalPedido = useCalcularTotalPedido();

	const metodosDeVenta = [
		{metodo: t('general.credito'), total: 0, unidades: 0, subunidades: 0},
		{
			metodo: t('general.contado'),
			total: calcularTotalPedido.totalPrecio,
			unidades: calcularTotalPedido.totalUnidades,
			subunidades: calcularTotalPedido.totalSubUnidades,
		},
	];

	return metodosDeVenta.map((el, i) => (
		<Grid key={i} item xs={6}>
			<TotalesMetodoDeVenta
				metodoVenta={el.metodo}
				total={el.total}
				unidades={el.unidades}
				subunidades={el.subunidades}
			/>
		</Grid>
	));
};

export default TotalesMetodoDeVentaDelPedidoActual;
