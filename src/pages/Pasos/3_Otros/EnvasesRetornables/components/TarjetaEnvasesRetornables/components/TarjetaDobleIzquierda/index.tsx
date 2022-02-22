import {FunctionComponent} from 'react';
import {Box, Chip, Typography} from '@mui/material';
import {formatearNumero} from 'utils/methods';
import {TConsolidadoImplicitos} from 'models';
import {useTranslation} from 'react-i18next';
import {styled} from '@mui/material/styles';
import {ETiposDePago} from 'models';
import {BotellaIcon, CajaIcon} from 'assests/iconos';
import theme from 'theme';
import {useObtenerDatos} from 'redux/hooks';

type Props = {
	envase: TConsolidadoImplicitos;
	tieneTipoPedidoValorizado: boolean;
};

const ChipStyled = styled(Chip)(({theme}) => ({
	height: '18px',
	padding: 0,
	textAlign: 'center',
	width: '70px',
}));

const TarjetaDobleIzquierda: FunctionComponent<Props> = (props) => {
	const {envase, tieneTipoPedidoValorizado} = props;

	const {t} = useTranslation();

	const {productos, envases, medidas} = useObtenerDatos();

	return (
		<>
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
								<Typography
									variant={'caption'}
									color='white'
									textAlign='center'
									fontFamily='Open Sans'
								>
									{ETiposDePago[envase.tipoPago]}
								</Typography>
							}
							sx={{
								background:
									envase.tipoPago === 1
										? theme.palette.success.dark
										: theme.palette.secondary.dark,
							}}
						/>
					)}
				</Box>
				<Typography fontFamily='Open Sans' variant={'subtitle2'}>
					{envase.codigoImplicito}
				</Typography>
				<Typography
					variant={'subtitle2'}
					marginBottom={productos[envase.codigoImplicito].atributos ? 0 : '6px'}
				>
					{envase.nombreImplicito}
				</Typography>
				{productos[envase.codigoImplicito].atributos && (
					<Typography
						margin='4px 0 6px 0'
						variant='caption'
						color={theme.palette.secondary.main}
					>
						{`${
							medidas[productos[envase.codigoImplicito].atributos?.medida ?? 0]
								.descripcion
						} | ${
							envases[productos[envase.codigoImplicito].atributos?.envase ?? 0]
								.descripcion
						}`}
					</Typography>
				)}
				<Box display='flex' alignItems='center' gap='4px'>
					{tieneTipoPedidoValorizado && (
						<>
							<CajaIcon height='19px' width='19px' />
							<Typography variant={'caption'}>
								{`x${envase.presentacion} `}
							</Typography>
							<Typography variant={'subtitle3'}>
								{envase.precioConImpuestoUnidad &&
									formatearNumero(envase.precioConImpuestoUnidad, t)}
							</Typography>

							<BotellaIcon height='19px' width='19px' />
							<Typography variant={'subtitle3'}>
								{envase.precioConImpuestoSubunidad &&
									formatearNumero(envase.precioConImpuestoSubunidad, t)}
							</Typography>
						</>
					)}
				</Box>
			</Box>
		</>
	);
};

export default TarjetaDobleIzquierda;
