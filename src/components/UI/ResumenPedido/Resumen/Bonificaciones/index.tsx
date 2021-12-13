import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import {TDetalleBonificacionesCliente} from 'models';
import {useObtenerProductoPorCodigo} from 'hooks/useObtenerProductoPorCodigo';
import {BotellaIcon, CajaIcon} from 'assests/iconos';

export interface BonificacionesProps {
	bonificaciones: {
		id: number | null;
		nombre: string;
		detalle: TDetalleBonificacionesCliente[];
	}[];
}

export const Bonificaciones: React.FC<BonificacionesProps> = ({
	bonificaciones,
}) => {
	console.log(bonificaciones);
	return (
		<>
			{bonificaciones.map((bonificacion, index) => {
				if (bonificacion.detalle.length === 0) {
					return;
				}

				return (
					<Box key={bonificacion.id}>
						<Box display='flex'>
							<Box
								display='flex'
								flex='2'
								flexDirection='column'
								padding='8px 8px 8px 14px'
							>
								<Typography variant='subtitle3' fontFamily='Open Sans'>
									{bonificacion.id}
								</Typography>
								<Typography variant='subtitle3'>
									{bonificacion.nombre}
								</Typography>
								<Typography
									fontSize='12px'
									lineHeight='14px'
									fontFamily='Open Sans'
									fontWeight='700'
									color='#000'
									letterSpacing='-0.4px'
									marginBottom='12px'
									marginTop='8px'
								>
									Paquetes:
								</Typography>
								{bonificacion.detalle.map((detalle, index) => {
									const producto = useObtenerProductoPorCodigo(
										detalle.codigoProducto
									);
									if (!producto) return null;

									return (
										<Box
											key={`${detalle.idGrupo}${index}`}
											marginBottom={
												index === bonificacion.detalle.length - 1 ? '0' : '12px'
											}
										>
											<Box
												display='flex'
												flexDirection='column'
												marginBottom='4px'
											>
												<Typography variant='subtitle3' fontFamily='Open Sans'>
													{producto.codigoProducto}
												</Typography>
												<Typography variant='subtitle3'>
													{producto.nombreProducto}
												</Typography>
											</Box>
											<Box alignItems='center' display='flex' gap='4px'>
												{detalle.unidadMedida === 'Unidad' ? (
													<CajaIcon height='14px' width='14px' />
												) : (
													<BotellaIcon height='12px' width='12px' />
												)}
												<Typography variant='subtitle3' fontFamily='Open Sans'>
													{detalle.cantidad}
												</Typography>
											</Box>
										</Box>
									);
								})}
							</Box>
							<Box
								display='flex'
								flex='1.5'
								flexDirection='column'
								gap='4px'
								justifyContent='center'
								padding='8px'
								sx={{background: '#F5F0EF'}}
							>
								<Typography variant='caption' fontFamily='Open Sans'>
									Tipo:
								</Typography>
								<Typography variant='subtitle3'>Bonificacion</Typography>
							</Box>
						</Box>
						{index < bonificaciones.length - 1 &&
							bonificaciones[index + 1].detalle.length > 0 && <Divider />}
					</Box>
				);
			})}
		</>
	);
};
