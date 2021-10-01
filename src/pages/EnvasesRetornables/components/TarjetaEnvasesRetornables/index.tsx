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

	return (
		<TarjetaDoble
			derecha={
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

					<InputStyled value={envase.unidades} disableUnderline readOnly />
					<InputStyled value={envase.subUnidades} disableUnderline readOnly />
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
