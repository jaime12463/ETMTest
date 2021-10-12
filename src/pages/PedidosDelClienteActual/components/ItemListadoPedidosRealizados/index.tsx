import {FunctionComponent} from 'react';
import {TPedidoClienteParaEnviar} from 'models';
import {Grid} from '@mui/material';
import {Center, Fecha, Numero} from 'components/UI';
import {useCalcularTotalPedidos} from 'hooks';
import {useTranslation} from 'react-i18next';
import {useObtenerConfiguracion} from 'redux/hooks';

type Props = {
	item: TPedidoClienteParaEnviar;
};

const ItemListadoPedidosRealizados: FunctionComponent<Props> = (props) => {
	const {item} = props;
	const {fechaEntrega, productos, tipoPedido} = item;
	const calcularTotalPedido = useCalcularTotalPedidos();
	const totalPedido = calcularTotalPedido(productos).totalPrecio;
	const configuracion = useObtenerConfiguracion();
	const {t} = useTranslation();
	const tipoDePedido = configuracion.tipoPedidos.find(
		(tipoPedidos) => tipoPedidos.codigo === tipoPedido
	);

	return (
		<Grid container>
			<Grid item xs>
				<Center>
					{t(`general.${tipoDePedido?.descripcion?.toLocaleLowerCase()}`)}
				</Center>
			</Grid>
			<Grid item xs>
				<Center>
					<Fecha>{fechaEntrega}</Fecha>
				</Center>
			</Grid>
			<Grid item xs>
				<Center>
					{tipoDePedido?.esValorizado && <Numero valor={totalPedido} />}
				</Center>
			</Grid>
		</Grid>
	);
};

export default ItemListadoPedidosRealizados;
