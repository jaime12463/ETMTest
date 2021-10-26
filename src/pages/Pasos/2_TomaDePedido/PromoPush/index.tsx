import React from 'react';
import {TarjetaColapsable, Dialogo} from 'components/UI';
import {Typography, Button, Grid, Chip, Stack, Box} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import {styled} from '@mui/material/styles';
import TarjetaPromoPush from './TarjetaPromoPush';
import {useObtenerPromoPushDelCliente} from 'hooks';
import useEstilos from './useEstilos';
import {BorrarIcon} from 'assests/iconos';
import {useAgregarProductoAlPedidoActual} from './hooks/useAgregarProductoAlPedidoActual';
import {useObtenerVisitaActual} from 'redux/hooks';
import {useMostrarAdvertenciaEnDialogo, useBorrarTodoLosProductos} from 'hooks';
import {TProductoPedido} from 'models';
import {useTranslation} from 'react-i18next';

interface BotonProps {
	push: boolean;
	ongoing: boolean;
}

const PromoPush: React.FC = () => {
	const {mostrarAdvertenciaEnDialogo, mostarDialogo, parametrosDialogo} =
		useMostrarAdvertenciaEnDialogo();
	const {t} = useTranslation();
	const [promoActiva, setPromoActiva] = React.useState<BotonProps>({
		push: true,
		ongoing: false,
	});
	const promociones = useObtenerPromoPushDelCliente();
	const [expandidoPromoPush, setExpandidoexpandidoPromoPush] = React.useState<
		string | boolean
	>(false);
	const classes = useEstilos();

	const borrarTodosLosProductos = useBorrarTodoLosProductos(
		mostrarAdvertenciaEnDialogo,
		promociones
	);

	const manejadorConfirmarEliminarPromoPush = (
		oprimioBotonAceptar: boolean
	) => {
		if (oprimioBotonAceptar) {
			borrarTodosLosProductos();
		}
	};

	return (
		<>
			{mostarDialogo && <Dialogo {...parametrosDialogo} />}
			<Grid
				container
				justifyContent='space-evenly'
				paddingBottom={2}
				marginTop='18px'
			>
				<Button
					sx={promoActiva.push === true ? {opacity: '1'} : {opacity: '0.5'}}
					className={classes.root}
				>
					Promo push
				</Button>
				<Button
					sx={promoActiva.ongoing === true ? {opacity: '1'} : {opacity: '0.5'}}
					className={classes.root}
				>
					Promo ongoing
				</Button>
			</Grid>

			<Grid container>
				<Box width='100%' display='flex' justifyContent='flex-end' mb={1}>
					<Button
						onClick={() =>
							mostrarAdvertenciaEnDialogo(
								t('advertencias.borrarPromosPush'),
								'eliminar-promopush',
								manejadorConfirmarEliminarPromoPush,
								{
									aceptar: t('general.si'),
									cancelar: t('general.no'),
								}
							)
						}
						className={classes.root}
						style={{
							backgroundColor: '#FFFFFF',
							border: '1px solid #651C32',
							width: '93px',
							height: '18px',
						}}
					>
						<Stack
							spacing={0.5}
							direction='row'
							display='flex'
							flexDirection='row'
							alignItems='center'
						>
							<BorrarIcon width='7.5px' height='7.5px' />
							<Typography variant='caption'> {`Borrar Todo`}</Typography>
						</Stack>
					</Button>
				</Box>
			</Grid>

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
		</>
	);
};

export default PromoPush;
