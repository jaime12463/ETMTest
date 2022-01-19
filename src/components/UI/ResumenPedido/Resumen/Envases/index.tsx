import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {TConsolidadoImplicitos, TProductoPedido} from 'models';
import {BotellaIcon, CajaIcon} from 'assests/iconos';
import {useTranslation} from 'react-i18next';
import theme from 'theme';

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
				<Typography
					margin='4px 0 6px 0'
					variant='caption'
					color={theme.palette.secondary.main}
				>
					355 ml | Vidrio | Retornable {/* TODO REEMPLAZAR VALORES ACA */}
				</Typography>
				<Box alignItems='center' display='flex' gap='8px'>
					<Box alignItems='center' display='flex' gap='4px'>
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
						<Box alignItems='center' display='flex' gap='4px'>
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
