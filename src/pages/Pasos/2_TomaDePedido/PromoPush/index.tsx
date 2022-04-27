import React from 'react';
import {BotonSmall, Dialogo} from 'components/UI';
import {Typography, Grid, Stack, Box} from '@mui/material';
import TarjetaPromoPush from './TarjetaPromoPush';
import {useObtenerPromoPushDelCliente} from 'hooks';
import useEstilos from './useEstilos';
import {ReiniciarIcon} from 'assests/iconos';
import {useMostrarAdvertenciaEnDialogo} from 'hooks';
import {useTranslation} from 'react-i18next';
import {Modal} from 'components/UI';
import theme from 'theme';
import {useBorrarTodoPromociones} from './hooks';
import {useObtenerVisitaActual} from 'redux/hooks';

const PromoPush: React.VFC = () => {
	const visitaActual = useObtenerVisitaActual();
	const {venta} = visitaActual.pedidos;
	const {mostrarAdvertenciaEnDialogo, mostarDialogo, parametrosDialogo} =
		useMostrarAdvertenciaEnDialogo();
	const [alerta, setAlerta] = React.useState<boolean>(false);
	const [configAlerta, setConfigAlerta] = React.useState({
		titulo: '',
		mensaje: '',
		tituloBotonAceptar: '',
		tituloBotonCancelar: '',
		iconoMensaje: <></>,
		callbackAceptar: () => {},
	});

	const hayPromosPushEnPedido = venta.productos.some(
		(producto) => producto.promoPush
	);

	const {t} = useTranslation();
	const promociones = useObtenerPromoPushDelCliente();
	const [expandidoPromoPush, setExpandidoexpandidoPromoPush] = React.useState<
		string | boolean
	>(false);
	const classes = useEstilos();

	const borrarTodosLasPromociones = useBorrarTodoPromociones(
		{setAlerta, setConfigAlerta},
		promociones
	);

	return (
		<Box mt={'28px'}>
			{mostarDialogo && <Dialogo {...parametrosDialogo} />}
			<Modal
				setAlerta={setAlerta}
				alerta={alerta}
				contenidoMensaje={configAlerta}
			/>

			{hayPromosPushEnPedido === true && (
				<Grid container>
					<Box width='100%' display='flex' justifyContent='flex-end' mb={1}>
						<BotonSmall
							onClick={() => {
								borrarTodosLasPromociones();
							}}
							padding='4px 10px 4px 5px'
						>
							<ReiniciarIcon width='10px' height='10px' />

							<Typography
								fontFamily='Open Sans'
								variant='caption'
								color={theme.palette.secondary.main}
							>
								{t('general.restablecerCero')}
							</Typography>
						</BotonSmall>
					</Box>
				</Grid>
			)}

			<Stack spacing={1.5}>
				{promociones.length > 0 &&
					promociones.map((promocion: any) => {
						return (
							<TarjetaPromoPush
								key={promocion.codigoProducto}
								item={promocion}
								id={promocion.nombreProducto}
								expandidoPromoPush={expandidoPromoPush}
								setExpandidoexpandidoPromoPush={setExpandidoexpandidoPromoPush}
								mostrarAdvertenciaEnDialogo={mostrarAdvertenciaEnDialogo}
							/>
						);
					})}
			</Stack>
		</Box>
	);
};

export default PromoPush;
