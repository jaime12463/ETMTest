import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import {BorrarIcon, BuscarIcon} from 'assests/iconos';
import {Filter} from 'assests/iconos/Filter';
import Drawer from 'components/UI/Drawer';
import {useTranslation} from 'react-i18next';
import theme from 'theme';
import DrawerFiltros from 'components/UI/DrawerFiltros';
import useEstilos from './useEstilos';

interface Props {
	openBuscador: boolean;
	setOpenBuscador: React.Dispatch<React.SetStateAction<boolean>>;
}

const DrawerBuscador: React.FC<Props> = ({openBuscador, setOpenBuscador}) => {
	const classes = useEstilos();
	const {t} = useTranslation();
	const [abrirFiltros, setAbrirFiltros] = React.useState<boolean>(false);

	return (
		<Drawer
			open={openBuscador}
			setOpen={setOpenBuscador}
			titulo={
				<Box padding='37px 14px 14px' width='100%'>
					<Typography
						variant='subtitle2'
						fontFamily='Open Sans'
						fontWeight={700}
						color='#fff'
					>
						{t('general.catalogoDeProductos')}
					</Typography>
					<Box
						alignItems='center'
						display='flex'
						justifyContent='space-between'
						marginTop='12px'
					>
						<Box position='relative'>
							<TextField
								className={classes.inputBuscador}
								sx={{padding: '4px 12px'}}
								type='number'
								variant='standard'
								InputProps={{
									disableUnderline: true,
									style: {fontSize: '12px'},
								}}
								placeholder={`${t('general.buscarProducto')}`}
							/>
							<IconButton
								sx={{
									padding: 0,
									position: 'absolute',
									right: '9px',
									top: '50%',
									transform: 'translateY(-50%)',
								}}
							>
								<BuscarIcon />
							</IconButton>
						</Box>
						<IconButton sx={{padding: 0}} onClick={() => setAbrirFiltros(true)}>
							<Filter />
						</IconButton>
					</Box>
				</Box>
			}
		>
			{false ? (
				<>
					<Box display='flex' flexDirection='column' gap='14px' padding='0 4px'>
						<Box alignItems='center' display='flex' gap='10px'>
							<input
								type='checkbox'
								name='56352 - SPRITE- LIMALIM BOT 1.5L NR PET 12X12U'
								id='56352 - SPRITE- LIMALIM BOT 1.5L NR PET 12X12U'
								className={classes.inputCheckbox}
								value='56352 - SPRITE- LIMALIM BOT 1.5L NR PET 12X12U'
							/>
							<label htmlFor='56352 - SPRITE- LIMALIM BOT 1.5L NR PET 12X12U'>
								<Typography
									variant='caption'
									fontFamily='Open Sans'
									color='#565657'
								>
									56352 - SPRITE- LIMALIM BOT 1.5L NR PET 12X12U
								</Typography>
							</label>
						</Box>
						<Box alignItems='center' display='flex' gap='10px'>
							<input
								type='checkbox'
								name='56360 - RODUCT MEZ-MUL PAC 50.7OZ NR PET 12X12U'
								id='56360 - RODUCT MEZ-MUL PAC 50.7OZ NR PET 12X12U'
								value='56360 - RODUCT MEZ-MUL PAC 50.7OZ NR PET 12X12U'
								className={classes.inputCheckbox}
							/>
							<label htmlFor='56360 - RODUCT MEZ-MUL PAC 50.7OZ NR PET 12X12U'>
								<Typography
									variant='caption'
									fontFamily='Open Sans'
									color='#565657'
								>
									56360 - RODUCT MEZ-MUL PAC 50.7OZ NR PET 12X12U
								</Typography>
							</label>
						</Box>
					</Box>
					<Box className={classes.buttonContainer}>
						<IconButton sx={{padding: 0}}>
							<Box className={classes.button}>
								<BorrarIcon height={13} width={13} fill='#fff' />
								<Typography
									variant='subtitle3'
									fontFamily='Open Sans'
									color='#fff'
								>
									{t('general.borrarTodo')}
								</Typography>
							</Box>
						</IconButton>
						<IconButton sx={{padding: 0}}>
							<Box className={classes.button}>
								<Typography
									variant='subtitle3'
									fontFamily='Open Sans'
									color='#fff'
								>
									{t('general.agregar')}
								</Typography>
							</Box>
						</IconButton>
					</Box>
				</>
			) : (
				<Typography
					variant='subtitle2'
					fontFamily='Open Sans'
					fontWeight={700}
					color='#B2B2B2'
					padding='103px 54px 0 54px'
					textAlign='center'
				>
					{t('general.busquedaVacia')}
				</Typography>
			)}

			<DrawerFiltros open={abrirFiltros} setOpen={setAbrirFiltros}>
				<Typography variant='subtitle3'>
					Próximamente filtros de búsqueda
				</Typography>
			</DrawerFiltros>
		</Drawer>
	);
};

export default DrawerBuscador;
