import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {BotellaIcon, CajaIcon} from 'assests/iconos';
import {formatearNumero} from 'utils/methods';
import {useTranslation} from 'react-i18next';

interface Props {
	codigoProducto: number;
	nombreProducto: string;
	presentacion: number;
	precioConImpuestoUnidad: number;
	precioConImpuestoSubunidad: number;
	esVentaSubunidades: boolean;
}

const Informacion: React.FC<Props> = ({
	codigoProducto,
	nombreProducto,
	presentacion,
	precioConImpuestoSubunidad,
	precioConImpuestoUnidad,
	esVentaSubunidades,
}) => {
	const {t} = useTranslation();

	return (
		<Box
			display='flex'
			flexDirection='column'
			padding='12px 0 12px 14px'
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
					<Typography variant='subtitle3' fontFamily='Open Sans'>
						{formatearNumero(precioConImpuestoUnidad, t)}
					</Typography>
				</Box>
				{esVentaSubunidades && (
					<Box display='flex' alignItems='center' gap='4px'>
						<BotellaIcon height='14px' width='14px' />
						<Typography variant='subtitle3' fontFamily='Open Sans'>
							{formatearNumero(precioConImpuestoSubunidad, t)}
						</Typography>
					</Box>
				)}
			</Box>
		</Box>
	);
};

export default Informacion;
