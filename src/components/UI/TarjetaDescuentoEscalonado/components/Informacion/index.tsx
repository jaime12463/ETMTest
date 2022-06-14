import {forwardRef} from 'react';
import {Box, Typography} from '@mui/material';
import {BotellaIcon, CajaIcon} from 'assests/iconos';
import theme from 'theme';
import {TProductoPedido} from 'models';
import {useTranslation} from 'react-i18next';
import {formatearNumero} from 'utils/methods';
import {useObtenerDatos} from 'redux/hooks';

interface Props {
	abrirCollapse: boolean;
	producto: TProductoPedido;
}

export const Informacion = forwardRef<HTMLDivElement, Props>(
	(
		{
			abrirCollapse,
			producto: {
				codigoProducto,
				nombreProducto,
				atributos,
				precioConImpuestoUnidad,
				precioConImpuestoSubunidad,
				preciosNeto,
				presentacion,
			},
		},
		ref
	) => {
		const {t} = useTranslation();
		const {envases, medidas} = useObtenerDatos();

		return (
			<>
				<Box
					display='flex'
					flexDirection='column'
					padding={abrirCollapse ? '10px 8px 6px 14px' : '10px 8px 4px 14px'}
					sx={{
						background: abrirCollapse ? theme.palette.secondary.light : 'none',
						gridArea: 'Informacion1',
						transition: 'all .3s ease-in-out',
					}}
				>
					<Typography
						color={abrirCollapse ? '#fff' : '#000'}
						fontFamily='Open Sans'
						variant='subtitle3'
					>
						{codigoProducto}
					</Typography>
					<Typography
						color={abrirCollapse ? '#fff' : '#000'}
						variant='subtitle3'
					>
						{nombreProducto}
					</Typography>
				</Box>
				<Box
					display='flex'
					flexDirection='column'
					gap='6px'
					padding={abrirCollapse ? '10px 8px 0 14px' : '0 8px 0 14px'}
					sx={{gridArea: 'Informacion2'}}
				>
					{atributos && (
						<Typography
							color='secondary'
							fontFamily='Open Sans'
							variant='caption'
						>
							{`${medidas[atributos?.medida].descripcion} | ${
								envases[atributos?.envase].descripcion
							}`}
						</Typography>
					)}
					<Box alignItems='center' display='flex' gap='2px' ref={ref}>
						<CajaIcon height={18} width={18} />
						<Typography
							color='secondary'
							fontFamily='Open Sans'
							variant='caption'
						>
							{`x${presentacion}`}
						</Typography>
						<Typography
							fontFamily='Open Sans'
							sx={{
								textDecoration:
									precioConImpuestoUnidad !== preciosNeto.unidad
										? 'line-through'
										: 'none',
							}}
							variant='subtitle3'
						>
							{formatearNumero(precioConImpuestoUnidad, t)}
						</Typography>
						<BotellaIcon height={15} width={15} />
						<Typography
							fontFamily='Open Sans'
							sx={{
								textDecoration:
									precioConImpuestoUnidad !== preciosNeto.unidad
										? 'line-through'
										: 'none',
							}}
							variant='subtitle3'
						>
							{formatearNumero(precioConImpuestoSubunidad, t)}
						</Typography>
					</Box>
				</Box>
			</>
		);
	}
);
