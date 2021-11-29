import React from 'react';
import {TPrecioProducto, TProductoPedido} from 'models';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {BotellaIcon, CajaIcon} from 'assests/iconos';
import {formatearNumero} from 'utils/methods';
import {useTranslation} from 'react-i18next';

interface Props {
	producto: TProductoPedido;
	conSwitch?: boolean;
}

const Informacion: React.FC<Props> = ({producto, conSwitch}) => {
	const {t} = useTranslation();

	const {
		codigoProducto,
		nombreProducto,
		presentacion,
		precioConImpuestoUnidad,
		precioConImpuestoSubunidad,
		preciosNeto,
		unidades,
		subUnidades,
	} = producto;

	const {unidad, subUnidad} = preciosNeto;

	return (
		<Box
			display='flex'
			flexDirection='column'
			padding={conSwitch ? '10px 0 12px 14px' : '12px 0 12px 14px'}
			justifyContent='center'
			width='179px'
		>
			<Typography variant='subtitle3' fontFamily='Open Sans'>
				{codigoProducto}
			</Typography>
			<Typography variant='subtitle3' noWrap width='150px' marginBottom='4px'>
				{nombreProducto}
			</Typography>
			<Box display='flex' gap='10px' alignItems='center'>
				<Box display='flex' alignItems='center' flexDirection='row' gap='4px'>
					<CajaIcon height='18px' width='18px' />
					<Typography variant='caption' fontFamily='Open Sans'>
						x{presentacion}
					</Typography>
					<Typography
						variant='subtitle3'
						fontFamily='Open Sans'
						sx={
							unidades > 0
								? unidad !== precioConImpuestoUnidad
									? {textDecoration: 'line-through'}
									: null
								: null
						}
					>
						{formatearNumero(precioConImpuestoUnidad, t)}
					</Typography>
				</Box>
				<Box display='flex' alignItems='center' gap='4px'>
					<BotellaIcon height='14px' width='14px' />
					<Typography
						variant='subtitle3'
						fontFamily='Open Sans'
						sx={
							subUnidades > 0
								? subUnidad !== precioConImpuestoSubunidad
									? {textDecoration: 'line-through'}
									: null
								: null
						}
					>
						{formatearNumero(precioConImpuestoSubunidad, t)}
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};

export default Informacion;
