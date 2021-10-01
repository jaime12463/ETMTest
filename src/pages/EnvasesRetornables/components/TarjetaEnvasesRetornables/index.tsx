import {Box, Typography, TextField, Grid, Input} from '@mui/material';
import {TConsolidadoImplicitos, TStateSubUnidadesEnvases} from 'models';
import {Dialogo, TarjetaDoble} from 'components/UI';
import {formatearNumero} from 'utils/methods';
import Chip from '@mui/material/Chip';
import botella from 'assests/iconos/botella.svg';
import caja from 'assests/iconos/caja.svg';
import {ETiposDePago} from 'models';
import {useTranslation} from 'react-i18next';
import {styled} from '@mui/material/styles';
import { Dispatch, SetStateAction, useState } from 'react';
import { useMostrarAdvertenciaEnDialogo } from 'hooks';

const InputStyled = styled(Input)(({theme}) => ({
	borderRadius: '4px',
	border: 'none',
	width: '28px',
	height: '22px',
	backgroundColor: 'white',
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

	const {
		unidades,
		subUnidades,
	} = envase;

	const unidadesIniciales = unidades;
	const subUnidadesIniciales = subUnidades;

	const [unidadesRetorno, setUnidadesRetorno] = useState(unidadesIniciales);
	const [subUnidadesRetorno, setSubUnidadesRetorno] = useState(subUnidadesIniciales);

	const [unidadesVenta, setUnidadesVenta] = useState(0);
	const [subUnidadesVenta, setSubUnidadesVenta] = useState(0);

	const [unidadesPrestamo, setUnidadesPrestamo] = useState(0);
	const [subUnidadesPrestamo, setSubUnidadesPrestamo] = useState(0);

	const {
		mostrarAdvertenciaEnDialogo,
		mostarDialogo,
		parametrosDialogo,
	} = useMostrarAdvertenciaEnDialogo();	

	const cambioSubUnidadesPorTipoPedido = 
	(SubUnidadesIngresadas: number, subUnidadesEnvasesPrincipal: number, setSubUnidadesEnvasesPrincipal: Dispatch<SetStateAction<number>>, subunidadesSecundario: number): boolean => {

		let subUnidadesPermitidas = false;

		if(SubUnidadesIngresadas>= 0)
		{
			if(SubUnidadesIngresadas <= (subUnidadesRetorno + subUnidadesEnvasesPrincipal))
			{
				setSubUnidadesRetorno((subUnidadesIniciales - subunidadesSecundario) - SubUnidadesIngresadas);
				setSubUnidadesEnvasesPrincipal(SubUnidadesIngresadas);
				subUnidadesPermitidas = true;
			}
			else
			{
				//SACAR MENSAJE
				console.log("La cantidad excede a las disponibles para retorno");
			}
		}

		return subUnidadesPermitidas;
	}

	const cambioUnidadesPorTipoPedido = 
	(unidadesIngresadas: number, unidadesEnvasesPrincipal: number, setUnidadesEnvasesPrincipal: Dispatch<SetStateAction<number>>, unidadesSecundario: number): boolean => {

		let unidadesPermitidas = false;

		if(unidadesIngresadas>= 0)
		{
			if(unidadesIngresadas <= (unidadesRetorno + unidadesEnvasesPrincipal))
			{
				setUnidadesRetorno((unidadesIniciales - unidadesSecundario) - unidadesIngresadas);
				setUnidadesEnvasesPrincipal(unidadesIngresadas);
				unidadesPermitidas = true;
			}
			else
			{
				//SACAR MENSAJE
				console.log("La cantidad excede a las disponibles para retorno");
			}
		}

		return unidadesPermitidas;
	}

	return (
		<>
			{mostarDialogo && <Dialogo {...parametrosDialogo} />}
			<TarjetaDoble
				derecha={
					<Box p={1.5} pb={0} minWidth={'180px'} minHeight={'125px'}>
						<Box
							display='flex'
							p={1.5}
							width={'100%'}
							alignItems='center'
							justifyContent='space-between'
						>
							<Typography fontFamily='Open Sans' variant={'caption'}>
								{'Retorno:'}
							</Typography>
							<InputStyled value={unidadesRetorno} disableUnderline readOnly />
							<InputStyled value={subUnidadesRetorno} disableUnderline readOnly />
						</Box>
						<Box
							display='flex'
							p={1.5}
							width={'100%'}
							alignItems='center'
							justifyContent='space-between'
						>
							<Typography fontFamily='Open Sans' variant={'caption'}>
								{'Venta:'}
							</Typography>
							<InputStyled 
								value={unidadesVenta} disableUnderline 
								onChange={e => cambioUnidadesPorTipoPedido(
									parseInt(e.target.value),
									unidadesVenta,
									setUnidadesVenta,
									unidadesPrestamo
								)}
							/>
							<InputStyled 
								value={subUnidadesVenta} 
								disableUnderline
								onChange={e => cambioSubUnidadesPorTipoPedido(
									parseInt(e.target.value),
									subUnidadesVenta,
									setSubUnidadesVenta,
									subUnidadesPrestamo
								)}
							/>
						</Box>
						<Box
							display='flex'
							p={1.5}
							width={'100%'}
							alignItems='center'
							justifyContent='space-between'
						>
							<Typography fontFamily='Open Sans' variant={'caption'}>
								{'Prestamo:'}
							</Typography>

							<InputStyled 
								value={unidadesPrestamo} disableUnderline 
								onChange={e => cambioUnidadesPorTipoPedido(
									parseInt(e.target.value),
									unidadesPrestamo,
									setUnidadesPrestamo,
									unidadesVenta
								)}
							/>
							<InputStyled 
								value={subUnidadesPrestamo} 
								onChange={e => cambioSubUnidadesPorTipoPedido(
									parseInt(e.target.value),
									subUnidadesPrestamo,
									setSubUnidadesPrestamo,
									subUnidadesVenta
								)}
								disableUnderline 
							/>
						</Box>
						<Box
							display='flex'
							p={1.5}
							width={'100%'}
							alignItems='center'
							justifyContent='space-between'
						>
							<Typography fontFamily='Open Sans' variant={'caption'}>
								{'Total:'}
							</Typography>

							<InputStyled value={unidadesIniciales} disableUnderline readOnly />
							<InputStyled value={subUnidadesIniciales} disableUnderline readOnly />
						</Box>				
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
		</>
	);
};

export default TarjetaEnvasesRetornables;
