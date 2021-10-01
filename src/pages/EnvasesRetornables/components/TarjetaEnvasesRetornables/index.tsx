import {Box, Typography, TextField, Grid, Input} from '@mui/material';
import {TConsolidadoImplicitos} from 'models';
import {TarjetaDoble} from 'components/UI';
import {formatearNumero} from 'utils/methods';
import Chip from '@mui/material/Chip';
import botella from 'assests/iconos/botella.svg';
import caja from 'assests/iconos/caja.svg';
import {ETiposDePago} from 'models';
import {useTranslation} from 'react-i18next';
import {styled} from '@mui/material/styles';
import {useState} from 'react';

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
	width: '75px',
	height: '16px',
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

	const cambioSubUnidadesPorVenta = (
		SubUnidadesIngresadas: number
	): boolean => {
		let subUnidadesPermitidas = false;

		if (SubUnidadesIngresadas >= 0) {
			if (SubUnidadesIngresadas <= subUnidadesRetorno + subUnidadesVenta) {
				setSubUnidadesRetorno(
					subUnidadesIniciales - subUnidadesPrestamo - SubUnidadesIngresadas
				);
				setSubUnidadesVenta(SubUnidadesIngresadas);
				subUnidadesPermitidas = true;
			} else {
				//SACAR MENSAJE
				console.log('La cantidad excede a las disponibles para retorno');
			}
		}

		return subUnidadesPermitidas;
	};

	const cambioSubUnidadesPorPrestamo = (SubUnidadesIngresadas: number) => {
		let subUnidadesPermitidas = false;

		if (SubUnidadesIngresadas >= 0) {
			if (SubUnidadesIngresadas <= subUnidadesRetorno + subUnidadesPrestamo) {
				setSubUnidadesRetorno(
					subUnidadesIniciales - subUnidadesVenta - SubUnidadesIngresadas
				);
				setSubUnidadesPrestamo(SubUnidadesIngresadas);
				subUnidadesPermitidas = true;
			} else {
				//SACAR MENSAJE
				console.log('La cantidad excede a las disponibles para retorno');
			}
		}

		return subUnidadesPermitidas;
	};

	return (
		<TarjetaDoble
			derecha={
				<Box
					p={1.5}
					pb={0}
					maxWidth={'180px'}
					minWidth={'180px'}
					minHeight={'125px'}
					maxHeight={'125px'}
				>
					<Grid container>
						<Grid
							display='flex'
							width={'100%'}
							alignItems='center'
							justifyContent='space-between'
						>
							<Typography fontFamily='Open Sans' variant={'caption'}>
								{'Retorno:'}
							</Typography>
							<InputStyled value={unidadesRetorno} disableUnderline readOnly />
							<InputStyled
								value={subUnidadesRetorno}
								disableUnderline
								readOnly
							/>
						</Grid>
						<Grid
							display='flex'
							width={'100%'}
							alignItems='center'
							justifyContent='space-between'
						>
							<Typography fontFamily='Open Sans' variant={'caption'}>
								{'Venta:'}
							</Typography>
							<InputStyled value={unidadesVenta} disableUnderline />
							<InputStyled
								value={subUnidadesVenta}
								disableUnderline
								onChange={(e) =>
									cambioSubUnidadesPorVenta(parseInt(e.target.value))
								}
							/>
						</Grid>
						<Grid
							display='flex'
							width={'100%'}
							alignItems='center'
							justifyContent='space-between'
						>
							<Typography fontFamily='Open Sans' variant={'caption'}>
								{'Prestamo:'}
							</Typography>

							<InputStyled value={unidadesPrestamo} disableUnderline />
							<InputStyled
								value={subUnidadesPrestamo}
								onChange={(e) =>
									cambioSubUnidadesPorPrestamo(parseInt(e.target.value))
								}
								disableUnderline
							/>
						</Grid>
					</Grid>
				</Box>
			}
			izquierda={
				<Box p={1.5} pb={0} minWidth={'304px'} minHeight={'125px'}>
					<Box
						style={{
							visibility: envase.tipoPago === undefined ? 'hidden' : 'visible',
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
									<Typography variant={'caption'} color='white'>
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
	);
};

export default TarjetaEnvasesRetornables;
