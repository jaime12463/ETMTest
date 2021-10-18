import React from 'react';
import {TarjetaColapsable, Dialogo} from 'components/UI';
import {Typography, Button, Grid, Radio, Chip, Stack} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import {styled} from '@mui/material/styles';
import TarjetaPromoPush from './TarjetaPromoPush';
import {useObtenerPromoPushDelCliente} from 'hooks';
import useEstilos from './useEstilos';
import {BorrarIcon} from 'assests/iconos';
import {useAgregarProductoAlPedidoActual} from './hooks/useAgregarProductoAlPedidoActual';
import {useObtenerVisitaActual} from 'redux/hooks';
import {useMostrarAdvertenciaEnDialogo} from 'hooks';
import {TProductoPedido} from 'models';

const TextStyled = styled(Typography)(() => ({
	color: '#651C32',
	fontSize: '10px',
}));

interface BotonProps {
	push: boolean;
	ongoing: boolean;
}

const PromoPush: React.FC = () => {
	const {mostrarAdvertenciaEnDialogo, mostarDialogo, parametrosDialogo} =
		useMostrarAdvertenciaEnDialogo();
	/* const [productoActual, setProductoActual] =
		React.useState<TProductoPedido | null>(null); */
	const [expandido, setExpandido] = React.useState<boolean | string>(false);

	const [promoActiva, setPromoActiva] = React.useState<BotonProps>({
		push: true,
		ongoing: false,
	});
	const promociones = useObtenerPromoPushDelCliente();
	const [expandidoPromoPush, setExpandidoexpandidoPromoPush] = React.useState<
		string | boolean
	>(false);
	const classes = useEstilos();

	return (
		<>
			{' '}
			{mostarDialogo && <Dialogo {...parametrosDialogo} />}
			<TarjetaColapsable
				id='Promociones'
				titulo={<Typography variant={'subtitle1'}>Promociones</Typography>}
				subTitulo={
					<Typography variant={'body3'}>
						Selecciona las promociones que tienes disponible para tus clientes.
					</Typography>
				}
				expandido={expandido}
				setExpandido={setExpandido}
			>
				<Grid container justifyContent='space-evenly' paddingBottom={2}>
					<Button
						sx={promoActiva.push === true ? {opacity: '1'} : {opacity: '0.5'}}
						className={classes.root}
					>
						Promo push
					</Button>
					<Button
						sx={
							promoActiva.ongoing === true ? {opacity: '1'} : {opacity: '0.5'}
						}
						className={classes.root}
					>
						Promo ongoing
					</Button>
				</Grid>

				<Grid container justifyContent='space-between' alignItems='center'>
					<FormControlLabel
						control={<Radio color='success' size='small' />}
						label={
							<Typography className={classes.root}>
								Agregar al pedido
							</Typography>
						}
					/>
					<Chip
						className={classes.root}
						size='small'
						icon={<BorrarIcon width='7.5px' height='7.5px' />}
						label={<TextStyled>Borrar todo</TextStyled>}
					/>
				</Grid>

				<Stack spacing={1.5}>
					{promociones.length > 0 &&
						promociones.map((promocion: any, i: number) => {
							return (
								<TarjetaPromoPush
									key={promocion.codigoProducto}
									item={promocion}
									id={promocion.nombreProducto}
									expandidoPromoPush={expandidoPromoPush}
									setExpandidoexpandidoPromoPush={
										setExpandidoexpandidoPromoPush
									}
									mostrarAdvertenciaEnDialogo={mostrarAdvertenciaEnDialogo}
								/>
							);
						})}
				</Stack>
			</TarjetaColapsable>
		</>
	);
};

export default PromoPush;
