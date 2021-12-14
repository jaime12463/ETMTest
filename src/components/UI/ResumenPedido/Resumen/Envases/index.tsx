import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {TConsolidadoImplicitos, TProductoPedido} from 'models';
import {BotellaIcon, CajaIcon} from 'assests/iconos';
import {useTranslation} from 'react-i18next';

export interface ProductoEnvases extends TProductoPedido {
	tipo: string;
}

export interface EnvasesProps {
	producto?: ProductoEnvases;
	retorno?: TConsolidadoImplicitos;
}

export const Envases: React.FC<EnvasesProps> = ({producto, retorno}) => {
	const {t} = useTranslation();

	return (
		<Box display='flex'>
			<Box
				display='flex'
				flexDirection='column'
				flex='2'
				padding='8px 8px 8px 14px'
			>
				{producto ? (
					<Typography variant='subtitle3' fontFamily='Open Sans'>
						{producto?.codigoProducto}
					</Typography>
				) : (
					<Typography variant='subtitle3' fontFamily='Open Sans'>
						{retorno?.codigoImplicito}
					</Typography>
				)}
				{producto ? (
					<Typography variant='subtitle3'>
						{producto?.nombreProducto}
					</Typography>
				) : (
					<Typography variant='subtitle3'>
						{retorno?.nombreImplicito}
					</Typography>
				)}
				<Box alignItems='center' display='flex' gap='8px'>
					<Box alignItems='center' display='flex' gap='4px' marginTop='8px'>
						<CajaIcon height='14px' width='14px' />
						{producto ? (
							<Typography variant='subtitle3' fontFamily='Open Sans'>
								{producto?.unidades}
							</Typography>
						) : (
							<Typography variant='subtitle3' fontFamily='Open Sans'>
								{retorno?.unidades}
							</Typography>
						)}
					</Box>
					{(producto?.esVentaSubunidades ||
						(retorno && retorno.subUnidades > 0)) && (
						<Box alignItems='center' display='flex' gap='4px' marginTop='8px'>
							<BotellaIcon height='12px' width='12px' />
							{producto ? (
								<Typography variant='subtitle3' fontFamily='Open Sans'>
									{producto?.subUnidades}
								</Typography>
							) : (
								<Typography variant='subtitle3' fontFamily='Open Sans'>
									{retorno?.subUnidades}
								</Typography>
							)}
						</Box>
					)}
				</Box>
			</Box>
			<Box
				alignItems='center'
				display='flex'
				flex='1.5'
				padding='8px 14px 8px 8px'
				sx={{background: '#F5F0EF'}}
			>
				<Box display='flex' flexDirection='column' gap='4px'>
					<Typography variant='caption' fontFamily='Open Sans' color='#000'>
						{t('general.tipo')}
					</Typography>
					<Typography variant='subtitle3'>
						{producto?.tipo === 'prestamo' && t('general.prestamo')}
						{retorno && t('general.retorno')}
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};
