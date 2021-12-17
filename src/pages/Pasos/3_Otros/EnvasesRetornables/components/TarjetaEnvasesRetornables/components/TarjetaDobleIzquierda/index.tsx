import {FunctionComponent} from 'react';
import {Box, Chip, Typography} from '@mui/material';
import {formatearNumero} from 'utils/methods';
import {TConsolidadoImplicitos} from 'models';
import {useTranslation} from 'react-i18next';
import {styled} from '@mui/material/styles';
import {ETiposDePago} from 'models';
import {BotellaIcon, CajaIcon} from 'assests/iconos';

type Props = {
	envase: TConsolidadoImplicitos;
	tieneTipoPedidoValorizado: boolean;
};

const ChipStyled = styled(Chip)(({theme}) => ({
	textAlign: 'center',
	fontFamily: 'Open Sans',
	width: '70px',
	height: '18px',
	padding: 0,
}));

const TarjetaDobleIzquierda: FunctionComponent<Props> = (props) => {
	const {envase, tieneTipoPedidoValorizado} = props;

	const {t} = useTranslation();

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
									p={0}
								>
									{ETiposDePago[envase.tipoPago]}
								</Typography>
							}
							color={envase.tipoPago === 1 ? 'success' : 'secondary'}
						/>
					)}
				</Box>
				<Typography fontFamily='Open Sans' variant={'subtitle2'}>
					{envase.codigoImplicito}
				</Typography>
				<Typography variant={'subtitle2'}>{envase.nombreImplicito}</Typography>
				<br />
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
