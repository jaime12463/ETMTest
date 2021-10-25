import EnvasesRetornables from './EnvasesRetornables';
import {Canjes} from './Canjes';

import React, {useEffect} from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {TarjetaColapsable} from 'components/UI';
import {useTranslation} from 'react-i18next';
import {
	useObtenerConfiguracion,
	useObtenerVisitaActual,
	useAppDispatch,
} from 'redux/hooks';
import OrdenDeCompra from './OrdenDeCompra';
import {cambiarTipoPedidoActual} from 'redux/features/visitaActual/visitaActualSlice';

export const Otros: React.FC = () => {
	const [expandido, setExpandido] = React.useState<string | boolean>(false);
	const {t} = useTranslation();
	const {habilitaOrdenDeCompra} = useObtenerConfiguracion();
	const visitaActual = useObtenerVisitaActual();
	const {canje} = visitaActual.pedidos;
	const productosConUnidades = canje.productos.filter((producto) => {
		return producto.unidades > 0 || producto.subUnidades > 0;
	});
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(cambiarTipoPedidoActual({tipoPedido: 'canje'}));
	}, []);

	return (
		<Stack spacing={2}>
			<TarjetaColapsable
				titulo={
					<Typography variant={'subtitle1'}>{t('general.envase')}</Typography>
				}
				subTitulo={
					<Typography variant={'body3'}>
						{t('titulos.tarjetaEnvases')}
					</Typography>
				}
				id='tarjetaEnvases'
				expandido={expandido}
				setExpandido={setExpandido}
			>
				<EnvasesRetornables />
			</TarjetaColapsable>
			<TarjetaColapsable
				titulo={
					<Typography variant={'subtitle1'}>{t('general.canje')}</Typography>
				}
				subTitulo={
					<Typography variant={'body3'}>
						{t('titulos.tarjetaCanjes')}
					</Typography>
				}
				id='tarjetaCanjes'
				expandido={expandido}
				setExpandido={setExpandido}
				cantidadItems={productosConUnidades.length}
			>
				<Canjes />
			</TarjetaColapsable>
			<TarjetaColapsable
				titulo={
					<Typography variant={'subtitle1'}>
						{t('general.compromisoCobro')}
					</Typography>
				}
				subTitulo={
					<Typography variant={'body3'}>
						{t('titulos.tarjetaCompromisoCobro')}
					</Typography>
				}
				id='compromisoCobro'
				expandido={expandido}
				setExpandido={setExpandido}
			>
				{' '}
			</TarjetaColapsable>
			{habilitaOrdenDeCompra ? (
				<TarjetaColapsable
					titulo={
						<Typography variant={'subtitle1'}>
							{t('titulos.ordenDeCompra')}
						</Typography>
					}
					subTitulo={
						<Typography variant={'body3'}>
							{t('titulos.tarjetaOrdenDeCompra')}
						</Typography>
					}
					id='titulos.tarjetaEnvases'
					expandido={expandido}
					setExpandido={setExpandido}
				>
					<OrdenDeCompra />
				</TarjetaColapsable>
			) : null}
		</Stack>
	);
};
