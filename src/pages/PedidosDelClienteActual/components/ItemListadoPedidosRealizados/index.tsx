import {FunctionComponent} from 'react';
import {TPedidoClienteParaEnviar} from 'models';
import {Grid} from '@material-ui/core';
import {Center, Numero} from 'components/UI';
import {useCalcularTotalPedidos} from 'hooks';
import {useTranslation} from 'react-i18next';

type Props = {
	item: TPedidoClienteParaEnviar;
};

const ItemListadoPedidosRealizados: FunctionComponent<Props> = (props) => {
	const {item} = props;
	const {fechaEntrega, productosPedido} = item;
	const calcularTotalPedido = useCalcularTotalPedidos();
	const totalPedido = calcularTotalPedido(productosPedido).totalPrecio;
	const {t} = useTranslation();

	return (
		<Grid container>
			<Grid item xs>
				<Center>{t('general.venta')}</Center>
			</Grid>
			<Grid item xs>
				<Center>{fechaEntrega}</Center>
			</Grid>
			<Grid item xs>
				<Center>
					{<Numero tipo='moneda' valor={totalPedido} decimales={2} />}
				</Center>
			</Grid>
		</Grid>
	);
};

export default ItemListadoPedidosRealizados;
