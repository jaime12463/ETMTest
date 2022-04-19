import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {BotellaIcon, CajaIcon} from 'assests/iconos';
import {formatearNumero} from 'utils/methods';
import {useTranslation} from 'react-i18next';
import theme from 'theme';
import {useObtenerDatos} from 'redux/hooks';
import {TProductoPedido} from 'models';
import {useValidacionPermiteSubUnidades} from 'hooks';

interface Props {
	producto: TProductoPedido;
}

const Informacion: React.FC<Props> = ({producto}) => {
	const {t} = useTranslation();
	const permiteSubUnidades = useValidacionPermiteSubUnidades(producto);
	const {envases, medidas} = useObtenerDatos();

	return (
		<Box
			display='flex'
			flexDirection='column'
			padding='12px 0 12px 14px'
			justifyContent='center'
			width='179px'
		>
			<Typography variant='subtitle3' fontFamily='Open Sans'>
				{producto.codigoProducto}
			</Typography>
			<Typography
				variant='subtitle3'
				noWrap
				width='150px'
				marginBottom={producto.atributos ? 0 : '6px'}
			>
				{producto.nombreProducto}
			</Typography>
			{producto.atributos && (
				<Typography
					margin='4px 0 6px 0'
					variant='caption'
					fontFamily='Open Sans'
					color={theme.palette.secondary.main}
				>
					{`${medidas[producto.atributos?.medida ?? 0].descripcion} | ${
						envases[producto.atributos?.envase ?? 0].descripcion
					}`}
				</Typography>
			)}
			<Box display='flex' gap='10px' alignItems='center'>
				<Box display='flex' alignItems='center' flexDirection='row' gap='4px'>
					<CajaIcon height='18px' width='18px' />
					<Typography variant='caption' fontFamily='Open Sans'>
						x{producto.presentacion}
					</Typography>
					<Typography variant='subtitle3' fontFamily='Open Sans'>
						{formatearNumero(producto.precioConImpuestoUnidad, t)}
					</Typography>
				</Box>
				{permiteSubUnidades && (
					<Box display='flex' alignItems='center' gap='4px'>
						<BotellaIcon height='14px' width='14px' />
						<Typography variant='subtitle3' fontFamily='Open Sans'>
							{formatearNumero(producto.precioConImpuestoSubunidad, t)}
						</Typography>
					</Box>
				)}
			</Box>
		</Box>
	);
};

export default Informacion;
