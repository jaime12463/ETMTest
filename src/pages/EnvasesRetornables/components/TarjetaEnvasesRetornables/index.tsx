import {Box, Typography, TextField, Grid, Input} from '@mui/material';
import {TConsolidadoImplicitos, TStateSubUnidadesEnvases} from 'models';
import {Dialogo, TarjetaDoble} from 'components/UI';
import {formatearNumero} from 'utils/methods';
import Chip from '@mui/material/Chip';
/* import {BotellaIcon, CajaIcon} from 'assests/iconos'; */
import botella from 'assests/iconos/botella.svg';
import caja from 'assests/iconos/caja.svg';

import {ETiposDePago} from 'models';
import {useTranslation} from 'react-i18next';
import {styled} from '@mui/material/styles';
import {Dispatch, SetStateAction, useState} from 'react';
import {useMostrarAdvertenciaEnDialogo} from 'hooks';
import {useObtenerConfiguracion} from 'redux/hooks';

const InputStyled = styled(Input)(({theme}) => ({
	borderRadius: '4px',
	border: 'none',
	width: '28px',
	height: '22px',
	backgroundColor: 'white',
	fontWeight: 600,
	lineHeight: '12px',
	fontSize: '12px',
}));

const ChipStyled = styled(Chip)(({theme}) => ({
	textAlign: 'center',
	fontFamily: 'Open Sans',
	width: '70px',
	height: '18px',
	padding: 0,
}));

const TarjetaEnvasesRetornables = ({
	envase,
}: {
	envase: TConsolidadoImplicitos;
}) => {
	const {t} = useTranslation();

	const {unidades, subUnidades} = envase;

	const unidadesIniciales = unidades;
	const subUnidadesIniciales = subUnidades;

	const [unidadesRetorno, setUnidadesRetorno] = useState(unidadesIniciales);
	const [subUnidadesRetorno, setSubUnidadesRetorno] =
		useState(subUnidadesIniciales);

	const [unidadesVenta, setUnidadesVenta] = useState(0);
	const [subUnidadesVenta, setSubUnidadesVenta] = useState(0);

	const [unidadesPrestamo, setUnidadesPrestamo] = useState(0);
	const [subUnidadesPrestamo, setSubUnidadesPrestamo] = useState(0);

	const {mostrarAdvertenciaEnDialogo, mostarDialogo, parametrosDialogo} =
		useMostrarAdvertenciaEnDialogo();

	const configuracion = useObtenerConfiguracion();

	const pedidosEnvasesHabilitados =
		configuracion.TipoPedidoEnvasesHabilitados.map(
			(tipoEnvases) =>
				configuracion.tipoPedidos.find(
					(tipoPedidos) => tipoPedidos.codigo === tipoEnvases
				)?.descripcionCorta
		);

	const buscarPedidoValorizado = configuracion.TipoPedidoEnvasesHabilitados.map(
		(tipoEnvases) =>
			configuracion.tipoPedidos.find(
				(tipoPedidos) => tipoPedidos.codigo === tipoEnvases
			)?.esValorizado === true
	);

	let tieneTipoPedidoValorizado = buscarPedidoValorizado.includes(true);

	const cambioSubUnidadesPorTipoPedido = (
		subUnidadesIngresadas: number,
		subUnidadesEnvasesPrincipal: number,
		setSubUnidadesEnvasesPrincipal: Dispatch<SetStateAction<number>>,
		subunidadesSecundario: number
	): boolean => {
		let subUnidadesPermitidas = false;

		if (!Number.isNaN(subUnidadesIngresadas))
			if (
				subUnidadesIngresadas <=
				subUnidadesRetorno + subUnidadesEnvasesPrincipal
			) {
				setSubUnidadesRetorno(
					subUnidadesIniciales - subunidadesSecundario - subUnidadesIngresadas
				);
				setSubUnidadesEnvasesPrincipal(subUnidadesIngresadas);
				subUnidadesPermitidas = true;
			} else
				mostrarAdvertenciaEnDialogo(
					t('advertencias.cantidadSuperiorEnvases'),
					'supera-cantidad-en-envases'
				);
		//else console.log('ES NAN!');

		return subUnidadesPermitidas;
	};

	const cambioUnidadesPorTipoPedido = (
		unidadesIngresadas: number,
		unidadesEnvasesPrincipal: number,
		setUnidadesEnvasesPrincipal: Dispatch<SetStateAction<number>>,
		unidadesSecundario: number
	): boolean => {
		let unidadesPermitidas = false;

		if (!Number.isNaN(unidadesIngresadas))
			if (unidadesIngresadas <= unidadesRetorno + unidadesEnvasesPrincipal) {
				setUnidadesRetorno(
					unidadesIniciales - unidadesSecundario - unidadesIngresadas
				);
				setUnidadesEnvasesPrincipal(unidadesIngresadas);
				unidadesPermitidas = true;
			} else
				mostrarAdvertenciaEnDialogo(
					t('advertencias.cantidadSuperiorEnvases'),
					'supera-cantidad-en-envases'
				);
		//else console.log('ES NAN!');

		return unidadesPermitidas;
	};

	return (
		<>
			{mostarDialogo && <Dialogo {...parametrosDialogo} />}
			<TarjetaDoble
				derecha={
					<Grid
						container
						p={1}
						spacing={1}
						maxWidth={'180px'}
						maxHeight={'125px'}
					>
						<Grid
							item
							display='flex'
							alignItems='center'
							justifyContent='flex-end'
							xs={12}
							ml={4}
						>
							<Grid
								item
								xs={4}
								display='flex'
								alignItems='center'
								justifyContent='flex-start'
								mr={-0.4}
							>
								<img style={{width: '19px'}} src={caja} alt='icono caja' />
							</Grid>
							<Grid
								item
								xs={5}
								display='flex'
								alignItems='center'
								justifyContent='center'
							>
								<img
									style={{width: '19px'}}
									src={botella}
									alt='icono botella'
								/>
							</Grid>
						</Grid>
						<Grid
							item
							display='flex'
							alignItems='center'
							justifyContent='space-between'
							xs={12}
						>
							<Grid item xs={4}>
								<Typography fontFamily='Open Sans' variant={'caption'}>
									{'Retorno:'}
								</Typography>
							</Grid>

							<Grid item xs={3}>
								<InputStyled
									inputProps={{style: {textAlign: 'center'}}}
									value={unidadesRetorno}
									disableUnderline
									readOnly
								/>
							</Grid>

							<Grid item xs={3}>
								<InputStyled
									inputProps={{style: {textAlign: 'center'}}}
									value={subUnidadesRetorno}
									disableUnderline
									readOnly
								/>
							</Grid>
						</Grid>

						{pedidosEnvasesHabilitados?.map((tipoPedido) => (
							<Grid
								item
								display='flex'
								alignItems='center'
								justifyContent='space-between'
								xs={12}
								key={tipoPedido}
							>
								<Grid item xs={4}>
									<Typography fontFamily='Open Sans' variant={'caption'}>
										{`${tipoPedido}`}
									</Typography>
								</Grid>
								<Grid item xs={3}>
									<InputStyled
										inputProps={{style: {textAlign: 'center'}}}
										value={
											tipoPedido === 'Venta' ? unidadesVenta : unidadesPrestamo
										}
										disableUnderline
										onChange={(e) =>
											cambioUnidadesPorTipoPedido(
												parseInt(e.target.value),
												tipoPedido === 'Venta'
													? unidadesVenta
													: unidadesPrestamo,
												tipoPedido === 'Venta'
													? setUnidadesVenta
													: setUnidadesPrestamo,
												tipoPedido === 'Venta'
													? unidadesPrestamo
													: unidadesVenta
											)
										}
									/>
								</Grid>
								<Grid item xs={3}>
									<InputStyled
										inputProps={{style: {textAlign: 'center'}}}
										value={
											tipoPedido === 'Venta'
												? subUnidadesVenta
												: subUnidadesPrestamo
										}
										disableUnderline
										onChange={(e) =>
											cambioSubUnidadesPorTipoPedido(
												parseInt(e.target.value),
												tipoPedido === 'Venta'
													? subUnidadesVenta
													: subUnidadesPrestamo,
												tipoPedido === 'Venta'
													? setSubUnidadesVenta
													: setSubUnidadesPrestamo,
												tipoPedido === 'Venta'
													? subUnidadesPrestamo
													: subUnidadesVenta
											)
										}
									/>
								</Grid>
							</Grid>
						))}
					</Grid>
				}
				izquierda={
					<Box p={1.5} pb={0} minWidth={'304px'} minHeight={'125px'}>
						<Box
							style={{
								visibility:
									envase.tipoPago === undefined ? 'hidden' : 'visible',
							}}
							sx={{
								width: '80px',
								height: '16px',
								marginBottom: 2,
							}}
						>
							{envase.tipoPago !== undefined && (
								<ChipStyled
									label={
										<Typography
											variant={'caption'}
											color='white'
											textAlign='center'
											p={0}
										>
											{ETiposDePago[envase.tipoPago]}
										</Typography>
									}
									color={envase.tipoPago === 1 ? 'success' : 'primary'}
								/>
							)}
						</Box>
						<Typography fontFamily='Open Sans' variant={'subtitle2'}>
							{envase.codigoImplicito}
						</Typography>
						<Typography variant={'subtitle2'}>
							{envase.nombreImplicito}
						</Typography>
						<br />
						<Box
							display='flex'
							width={'60%'}
							alignItems='center'
							justifyContent='space-between'
						>
							{tieneTipoPedidoValorizado && (
								<>
									<img style={{width: '19px'}} src={caja} alt='icono caja' />
									<Typography variant={'caption'}>
										{`x${envase.presentacion} `}
									</Typography>
									<Typography variant={'subtitle3'}>
										{envase.precioConImpuestoUnidad &&
											formatearNumero(envase.precioConImpuestoUnidad, t)}
									</Typography>

									<img
										style={{width: '19px'}}
										src={botella}
										alt='icono botella'
									/>
									<Typography variant={'subtitle3'}>
										{envase.precioConImpuestoSubunidad &&
											formatearNumero(envase.precioConImpuestoSubunidad, t)}
									</Typography>
								</>
							)}
						</Box>
					</Box>
				}
			></TarjetaDoble>
		</>
	);
};

export default TarjetaEnvasesRetornables;

{
	/* 						<Box
							display='flex'
							width={'100%'}
							alignItems='center'
							justifyContent='space-between'
						>
							<Typography fontFamily='Open Sans' variant={'caption'}>
								{'Total:'}
							</Typography>

							<InputStyled
								value={unidadesIniciales}
								disableUnderline
								readOnly
							/>
							<InputStyled
								value={subUnidadesIniciales}
								disableUnderline
								readOnly
							/>
						</Box> */
}
