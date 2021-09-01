import {FunctionComponent} from 'react';
import {TPedidoClienteParaEnviar} from 'models';
import {Grid} from '@material-ui/core';
import {Center, Fecha, Numero} from 'components/UI';
import {useCalcularTotalPedidos} from 'hooks';
import {useTranslation} from 'react-i18next';

type Props = {
	item: TPedidoClienteParaEnviar;
};

const ItemListadoPedidosRealizados: FunctionComponent<Props> = (props) => {
	const {item} = props;
	const {fechaEntrega, productos} = item;
	const calcularTotalPedido = useCalcularTotalPedidos();
	const totalPedido = calcularTotalPedido(productos).totalPrecio;
	const {t} = useTranslation();

	return (
		<Grid container>
			<Grid item xs>
				<Center>{t('general.venta')}</Center>
			</Grid>
			<Grid item xs>
				<Center>
					<Fecha>{fechaEntrega}</Fecha>
				</Center>
			</Grid>
			<Grid item xs>
				<Center>
					<Numero valor={totalPedido} />
				</Center>
			</Grid>
		</Grid>
	);
};

export default ItemListadoPedidosRealizados;
