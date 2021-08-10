import {TotalesMetodoDeVenta} from 'components/Negocio';
import {Grid} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {useObtenerDatosCliente, useCalcularTotalPedido} from 'hooks';

const TotalesMetodoDeVentaDelPedidoActual: any = () => {
	const {t} = useTranslation();
	const calcularTotalPedido = useCalcularTotalPedido();

	const metodosDeVenta = [
		{
			metodo: t('general.credito'),
			total: calcularTotalPedido.totalCredito.totalPrecio,
			unidades: calcularTotalPedido.totalCredito.totalUnidades,
			subunidades: calcularTotalPedido.totalCredito.totalSubUnidades,
		},
		{
			metodo: t('general.contado'),
			total: calcularTotalPedido.totalContado.totalPrecio,
			unidades: calcularTotalPedido.totalContado.totalUnidades,
			subunidades: calcularTotalPedido.totalContado.totalSubUnidades,
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
