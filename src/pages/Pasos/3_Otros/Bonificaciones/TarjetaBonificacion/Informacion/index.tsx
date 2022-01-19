import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {TPrecioProducto} from 'models';
import theme from 'theme';
import {BotellaIcon, CajaIcon} from 'assests/iconos';

interface Props {
	producto: TPrecioProducto;
	unidadMedida: string;
}

const Informacion: React.FC<Props> = ({producto, unidadMedida}) => {
	return (
		<Box flex='1' padding='8px 4px 8px 14px'>
			<Box display='flex' flexDirection='column' marginBottom='4px'>
				<Typography variant='subtitle3' fontFamily='Open Sans'>
					{producto.codigoProducto}
				</Typography>
				<Typography variant='subtitle3' noWrap width='130px'>
					{producto.nombreProducto}
				</Typography>
				<Typography
					margin='4px 0 6px 0'
					variant='caption'
					color={theme.palette.secondary.main}
				>
					355 ml | Vidrio | Retornable {/* TODO REEMPLAZAR VALORES ACA */}
				</Typography>
			</Box>
			<Box alignItems='center' display='flex' gap='2px'>
				{unidadMedida === 'Unidad' ? (
					<>
						<CajaIcon height='18px' width='18px' />
						<Typography
							variant='caption'
							fontFamily='Open Sans'
							color={theme.palette.secondary.main}
						>
							x{producto.presentacion}
						</Typography>
					</>
				) : (
					<BotellaIcon height='15px' width='15px' />
				)}
			</Box>
		</Box>
	);
};

export default Informacion;
