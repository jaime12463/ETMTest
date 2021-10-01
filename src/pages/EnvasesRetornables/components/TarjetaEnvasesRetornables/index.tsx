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
		else console.log('ES NAN!');

		return subUnidadesPermitidas;
	};
	console.log(envase);

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
		else console.log('ES NAN!');

		return unidadesPermitidas;
	};

	return (
		<>
			{mostarDialogo && <Dialogo {...parametrosDialogo} />}
			<TarjetaDoble
				derecha={
					<Grid container p={1} minWidth={'180px'} minHeight={'125px'}>
						<Grid
							container
							display='flex'
							xs={10}
							alignItems='center'
							justifyContent='space-between'
							rowSpacing={0}
						>
							<Grid xs={4}>
								<Typography fontFamily='Open Sans' variant={'caption'}>
									{'Retorno:'}
								</Typography>
							</Grid>

							<Grid xs={3}>
								<InputStyled
									inputProps={{style: {textAlign: 'center'}}}
									value={unidadesRetorno}
									disableUnderline
									readOnly
								/>
							</Grid>

							<Grid xs={3}>
								<InputStyled
									inputProps={{style: {textAlign: 'center'}}}
									value={subUnidadesRetorno}
									disableUnderline
									readOnly
								/>
							</Grid>
						</Grid>
						<Grid
							container
							display='flex'
							xs={10}
							alignItems='center'
							justifyContent='space-between'
						>
							<Grid xs={4}>
								<Typography fontFamily='Open Sans' variant={'caption'}>
									{'Venta: '}
								</Typography>
							</Grid>
							<Grid xs={3}>
								<InputStyled
									inputProps={{style: {textAlign: 'center'}}}
									value={unidadesVenta}
									disableUnderline
									onChange={(e) =>
										cambioUnidadesPorTipoPedido(
											parseInt(e.target.value),
											unidadesVenta,
											setUnidadesVenta,
											unidadesPrestamo
										)
									}
								/>
							</Grid>
							<Grid xs={3}>
								<InputStyled
									inputProps={{style: {textAlign: 'center'}}}
									value={subUnidadesVenta}
									disableUnderline
									onChange={(e) =>
										cambioSubUnidadesPorTipoPedido(
											parseInt(e.target.value),
											subUnidadesVenta,
											setSubUnidadesVenta,
											subUnidadesPrestamo
										)
									}
								/>
							</Grid>
						</Grid>
						<Grid
							display='flex'
							xs={10}
							alignItems='center'
							justifyContent='space-between'
						>
							<Grid xs={4}>
								<Typography fontFamily='Open Sans' variant={'caption'}>
									{'Prestamo:'}
								</Typography>
							</Grid>

							<Grid xs={3}>
								<InputStyled
									inputProps={{style: {textAlign: 'center'}}}
									value={unidadesPrestamo}
									disableUnderline
									onChange={(e) =>
										cambioUnidadesPorTipoPedido(
											parseInt(e.target.value),
											unidadesPrestamo,
											setUnidadesPrestamo,
											unidadesVenta
										)
									}
								/>
							</Grid>

							<Grid xs={3}>
								<InputStyled
									inputProps={{style: {textAlign: 'center'}}}
									value={subUnidadesPrestamo}
									onChange={(e) =>
										cambioSubUnidadesPorTipoPedido(
											parseInt(e.target.value),
											subUnidadesPrestamo,
											setSubUnidadesPrestamo,
											subUnidadesVenta
										)
									}
									disableUnderline
								/>
							</Grid>
						</Grid>
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
							<img style={{width: '19px'}} src={caja} alt='icono caja' />
							<Typography variant={'caption'}>
								{`x${envase.presentacion} `}
							</Typography>
							<Typography variant={'subtitle3'}>
								{envase.precioConImpuestoUnidad &&
									formatearNumero(envase.precioConImpuestoUnidad, t)}
							</Typography>

							<img style={{width: '19px'}} src={botella} alt='icono botella' />
							<Typography variant={'subtitle3'}>
								{envase.precioConImpuestoSubunidad &&
									formatearNumero(envase.precioConImpuestoSubunidad, t)}
							</Typography>
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
