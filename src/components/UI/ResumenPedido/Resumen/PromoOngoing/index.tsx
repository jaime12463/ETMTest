import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import {Caja} from 'assests/iconos';
import {useTranslation} from 'react-i18next';
import theme from 'theme';
import {TPromoOngoingAplicables} from 'utils/procesos/promociones/PromocionesOngoing';
import {TCodigoCantidad} from 'models/server';
import {useObtenerDatosProducto} from 'pages/Pasos/3_Otros/EnvasesRetornables/components/ContenedorEnvasesRetornables/hooks';

export interface PromoOngoingProps {
	promocion: TPromoOngoingAplicables;
}

export const PromoOngoing: React.FC<PromoOngoingProps> = ({promocion}) => {
	const {t} = useTranslation();
	const {promocionID, beneficios, descripcion} = promocion;
	const obtenerDatosProducto = useObtenerDatosProducto();
	const secuencias = beneficios[0].secuencias;

	return (
		<Box border={`1px solid ${theme.palette.secondary.light}`}>
			<Box
				alignItems='center'
				display='flex'
				sx={{background: theme.palette.secondary.light}}
			>
				<Box
					flex='1'
					display='flex'
					flexDirection='column'
					gap='2px'
					padding='10px 8px 10px 14px'
				>
					<Typography variant='subtitle3' fontFamily='Open Sans' color='#fff'>
						{promocionID}
					</Typography>
					<Typography variant='subtitle3' color='#fff'>
						{descripcion}
					</Typography>
				</Box>
			</Box>
			{secuencias?.map((secuencia) => {
				const materialesBeneficio =
					secuencia.materialesBeneficio as TCodigoCantidad[];

				const beneficiosFiltrados = materialesBeneficio.filter(
					(beneficio) => beneficio.cantidad > 0
				);

				return beneficiosFiltrados.map((beneficio, index) => {
					const {cantidad, codigo} = beneficio as TCodigoCantidad;

					const producto = obtenerDatosProducto(Number(codigo));

					return (
						<Box key={codigo}>
							<Box display='flex'>
								<Box
									display='flex'
									flexDirection='column'
									gap='4px'
									flex='1'
									padding='8px 8px 8px 14px'
								>
									<Box display='flex' flexDirection='column'>
										<Typography variant='subtitle3' fontFamily='Open Sans'>
											{codigo}
										</Typography>
										<Typography variant='subtitle3'>
											{producto.nombre}
										</Typography>
									</Box>
								</Box>
								<Box
									display='flex'
									flexBasis='143px'
									flexDirection='column'
									justifyContent='space-between'
									minHeight='100%'
									sx={{background: '#F5F0EF'}}
								>
									<Box
										alignItems='center'
										display='flex'
										gap='4px'
										padding='8px 14px 16px 8px'
									>
										<Caja height='14px' width='14px' />
										<Typography variant='caption' fontFamily='Open Sans'>
											{cantidad}{' '}
											{cantidad > 1
												? t('general.cajas').toLowerCase()
												: t('general.caja').toLowerCase()}
										</Typography>
									</Box>
									<Typography
										variant='subtitle3'
										sx={{
											background: '#F5F0EF',
											padding: '8px 14px 8px 8px',
											width: '100%',
											mixBlendMode: 'multiply',
										}}
									>
										{t('general.obsequio')}
									</Typography>
								</Box>
							</Box>
							{beneficiosFiltrados.length - 1 !== index && (
								<Divider sx={{borderColor: theme.palette.secondary.main}} />
							)}
						</Box>
					);
				});
			})}
		</Box>
	);
};
