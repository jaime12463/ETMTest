import {TotalesCompromisoDeCobro} from 'components/Negocio';
import {useObtenerClienteActual} from 'redux/hooks';
import {TClienteActual} from 'models';
import {useObtenerCompromisosDeCobroMismaFechaEntrega} from 'hooks';
import {Grid} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {useObtenerMontoTotalDocumentos} from '../../hooks';
import {obtenerTotalesCompromisoDeCobroCliente} from 'utils/methods';

const TotalesCompromisoDeCobroPedidoActual: any = () => {
	const {t} = useTranslation();
	const clienteActual: TClienteActual = useObtenerClienteActual();
	const {
		obtenerCompromisosDeCobroMismaFechaEntrega,
	} = useObtenerCompromisosDeCobroMismaFechaEntrega();
	const compromisosDeCobroMismaFechaEntrega = obtenerCompromisosDeCobroMismaFechaEntrega(
		clienteActual.codigoCliente
	);

	const montoTotalCompromisos = obtenerTotalesCompromisoDeCobroCliente(
		compromisosDeCobroMismaFechaEntrega
	);
	const montoTotalDocumentos = useObtenerMontoTotalDocumentos();

	const metodosDeVenta = [
		{
			titulo: t('general.deudaPendiente'),
			total: montoTotalDocumentos,
			dataCY: 'DeudaPendiente',
		},
		{
			titulo: t('general.compromisoRegistrado'),
			total: montoTotalCompromisos,
			dataCY: 'CompromisosRegistrados',
		},
	];

	return metodosDeVenta.map((el, i) => (
		<Grid key={i} item xs={12}>
			<TotalesCompromisoDeCobro
				dataCY={el.dataCY}
				titulo={el.titulo}
				total={el.total}
			/>
		</Grid>
	));
};

export default TotalesCompromisoDeCobroPedidoActual;
