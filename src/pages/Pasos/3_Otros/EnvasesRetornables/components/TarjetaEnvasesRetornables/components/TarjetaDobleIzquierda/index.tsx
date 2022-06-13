import {Box, Typography} from '@mui/material';
import {formatearNumero} from 'utils/methods';
import {TConsolidadoImplicitos} from 'models';
import {useTranslation} from 'react-i18next';
import {ETiposDePago} from 'models';
import {BotellaIcon, CajaIcon} from 'assests/iconos';
import theme from 'theme';
import {useObtenerDatos} from 'redux/hooks';

interface Props {
	envase: TConsolidadoImplicitos;
	tieneTipoPedidoValorizado: boolean;
}

const TarjetaDobleIzquierda: React.VFC<Props> = ({
	envase,
	tieneTipoPedidoValorizado,
}) => {
	const {t} = useTranslation();
	const {productos, envases, medidas} = useObtenerDatos();

	return (
		<Box padding='12px 14px' height='100%'>
			{envase.tipoPago !== undefined && (
				<Box
					borderRadius='50px'
					display='flex'
					padding='4px 16px'
					marginBottom='4px'
					sx={{
						background:
							envase.tipoPago === 1
								? theme.palette.success.dark
								: theme.palette.secondary.dark,
					}}
					width='fit-content'
				>
					<Typography color='white' fontFamily='Open Sans' variant='caption'>
						{ETiposDePago[envase.tipoPago]}
					</Typography>
				</Box>
			)}
			<Box display='flex' flexDirection='column'>
				<Typography fontFamily='Open Sans' variant='subtitle3'>
					{envase.codigoImplicito}
				</Typography>
				<Typography
					variant='subtitle3'
					marginBottom={productos[envase.codigoImplicito].atributos ? 0 : '6px'}
				>
					{envase.nombreImplicito}
				</Typography>
			</Box>
			{productos[envase.codigoImplicito].atributos && (
				<Typography
					margin='4px 0 6px 0'
					variant='caption'
					fontFamily='Open Sans'
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
			<Box alignItems='center' display='flex' gap='2px'>
				{tieneTipoPedidoValorizado && (
					<>
						<CajaIcon height='19px' width='19px' />
						<Typography
							color='secondary'
							fontFamily='Open Sans'
							variant='caption'
						>
							{`x${envase.presentacion} `}
						</Typography>
						<Typography fontFamily='Open Sans' variant='subtitle3'>
							{envase.precioConImpuestoUnidad &&
								formatearNumero(envase.precioConImpuestoUnidad, t)}
						</Typography>
						<Box alignItems='center' display='flex' marginLeft='2px'>
							<BotellaIcon height='19px' width='19px' />
							<Typography fontFamily='Open Sans' variant='subtitle3'>
								{envase.precioConImpuestoSubunidad &&
									formatearNumero(envase.precioConImpuestoSubunidad, t)}
							</Typography>
						</Box>
					</>
				)}
			</Box>
		</Box>
	);
};

export default TarjetaDobleIzquierda;
