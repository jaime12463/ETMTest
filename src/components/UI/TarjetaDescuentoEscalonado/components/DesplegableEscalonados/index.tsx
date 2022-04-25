import React from 'react';
import {BotonSmall} from 'components/UI/BotonSmall';
import {Box, Collapse, Typography, Divider} from '@mui/material';
import {CajaIcon, FlechaAbajoIcon} from 'assests/iconos';
import {TDescuentoEscalonado} from 'models';
import {useTranslation} from 'react-i18next';

interface Props {
	abrirCollapse: boolean;
	descuentosEscalonados: TDescuentoEscalonado[];
	setAbrirCollapse: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DesplegableEscalonados: React.VFC<Props> = ({
	abrirCollapse,
	descuentosEscalonados,
	setAbrirCollapse,
}) => {
	const {t} = useTranslation();

	return (
		<>
			<Box
				alignItems='center'
				display='flex'
				justifyContent='center'
				flexDirection='column'
				sx={{gridArea: 'Descuento'}}
			>
				<Collapse
					in={abrirCollapse}
					unmountOnExit
					sx={{marginBlock: '10px', width: '100%'}}
				>
					<Box
						display='grid'
						gridTemplateColumns='repeat(3, 1fr)'
						marginBottom='12px'
						sx={{placeItems: 'center'}}
					>
						<Typography fontFamily='Open Sans' variant='subtitle3'>
							{t('general.rangoInicial')}
						</Typography>
						<Typography fontFamily='Open Sans' variant='subtitle3'>
							{t('general.rangoFinal')}
						</Typography>
						<Typography fontFamily='Open Sans' variant='subtitle3'>
							{t('general.descuento')}
						</Typography>
					</Box>
					{descuentosEscalonados?.map(
						({unidadesDesde, unidadesHasta, porcentajeDescuentoEscalonado}) => {
							return (
								<Box key={`${unidadesDesde}-${unidadesHasta}`}>
									<Box
										display='grid'
										gridTemplateColumns='repeat(3, 1fr)'
										sx={{marginBlock: '6px', placeItems: 'center'}}
									>
										<Box alignItems='center' display='flex' gap='2px'>
											<Typography
												color='secondary'
												fontFamily='Open Sans'
												variant='caption'
											>
												{unidadesDesde}
											</Typography>
											<CajaIcon height={18} width={18} />
										</Box>
										<Box alignItems='center' display='flex' gap='2px'>
											<Typography
												color='secondary'
												fontFamily='Open Sans'
												variant='caption'
											>
												{unidadesHasta}
											</Typography>
											<CajaIcon height={18} width={18} />
										</Box>
										<Box>
											<Typography
												color='#000'
												fontFamily='Open Sans'
												variant='body3'
											>
												{porcentajeDescuentoEscalonado}%
											</Typography>
										</Box>
									</Box>
									<Divider />
								</Box>
							);
						}
					)}
				</Collapse>
			</Box>
			<Box
				marginTop={abrirCollapse ? 0 : '8px'}
				padding='0 14px'
				sx={{gridArea: 'BotonDescuento'}}
			>
				<BotonSmall
					fullWidth
					onClick={() => setAbrirCollapse((state) => !state)}
				>
					<Typography
						color='secondary'
						fontFamily='Open Sans'
						textAlign='center'
						variant='caption'
					>
						{t('general.verRangosDescuentoEscalonado')}
					</Typography>
					<FlechaAbajoIcon
						height={10}
						width={10}
						style={{
							transition: 'transform .3s ease-in-out',
							transform: abrirCollapse ? 'rotateX(180deg)' : 'rotateX(0deg)',
						}}
					/>
				</BotonSmall>
			</Box>
		</>
	);
};
