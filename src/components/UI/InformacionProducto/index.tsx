import {Box, Typography} from '@mui/material';
import {CajaIcon, BotellaIcon} from 'assests/iconos';
import {formatearNumero} from 'utils/methods';
import {TProductoPedido} from 'models';
import {useObtenerDatos} from 'redux/hooks';
import {useTranslation} from 'react-i18next';

interface Props {
	producto: TProductoPedido;
}

export const InformacionProducto: React.VFC<Props> = ({producto}) => {
	const {
		atributos,
		codigoProducto,
		nombreProducto,
		precioConImpuestoSubunidad,
		precioConImpuestoUnidad,
		presentacion,
	} = producto;
	const {t} = useTranslation();
	const {envases, medidas} = useObtenerDatos();

	return (
		<Box
			display='flex'
			flex='1'
			flexDirection='column'
			padding='12px 8px 12px 14px'
		>
			<Typography fontFamily='Open Sans' variant='subtitle3'>
				{codigoProducto}
			</Typography>
			<Typography variant='subtitle3'>{nombreProducto}</Typography>
			{atributos && (
				<Typography
					color='secondary'
					fontFamily='Open Sans'
					margin='4px 0 6px 0'
					variant='caption'
				>
					{`${medidas[atributos?.medida].descripcion} | ${
						envases[atributos?.envase].descripcion
					}`}
				</Typography>
			)}
			<Box alignItems='center' display='flex' gap='4px'>
				<Box alignItems='center' display='flex' gap='2px'>
					<CajaIcon height={18} width={18} />
					<Typography
						color='secondary'
						fontFamily='Open Sans'
						variant='caption'
					>
						{`x${presentacion}`}
					</Typography>
					<Typography fontFamily='Open Sans' variant='subtitle3'>
						{formatearNumero(precioConImpuestoUnidad, t)}
					</Typography>
				</Box>
				<Box alignItems='center' display='flex' gap='2px'>
					<BotellaIcon height={15} width={15} />
					<Typography fontFamily='Open Sans' variant='subtitle3'>
						{formatearNumero(precioConImpuestoSubunidad, t)}
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};
