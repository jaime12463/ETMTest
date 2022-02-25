import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import {BuscarIcon} from 'assests/iconos';
import {Filter} from 'assests/iconos/Filter';
import {useTranslation} from 'react-i18next';
import useEstilos from '../../useEstilos';

interface Props {
	inputBusqueda: string;
	setInputBusqueda: React.Dispatch<React.SetStateAction<string>>;
	setAbrirFiltros: React.Dispatch<React.SetStateAction<boolean>>;
	cantidadFiltrosAplicados: number;
}

const HeaderBuscador: React.FC<Props> = ({
	inputBusqueda,
	setInputBusqueda,
	setAbrirFiltros,
	cantidadFiltrosAplicados,
}) => {
	const {t} = useTranslation();
	const classes = useEstilos();

	const onChangeBusqueda = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputBusqueda(e.target.value);
	};

	return (
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
						autoFocus
						className={classes.inputBuscador}
						sx={{padding: '4px 12px'}}
						type='text'
						variant='standard'
						InputProps={{
							disableUnderline: true,
							style: {fontSize: '12px'},
						}}
						placeholder={`${t('general.buscarProducto')}`}
						value={inputBusqueda}
						onChange={onChangeBusqueda}
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
				<IconButton
					sx={{padding: 0, position: 'relative'}}
					onClick={() => setAbrirFiltros(true)}
				>
					{cantidadFiltrosAplicados > 0 && (
						<Box
							display='flex'
							alignItems='center'
							justifyContent='center'
							sx={{
								background: '#fff',
								borderRadius: '50%',
								minHeight: '15px',
								minWidth: '15px',
								position: 'absolute',
								right: 1,
								top: -3,
							}}
						>
							<Typography
								fontSize='8px'
								fontFamily='Open Sans'
								color='primary'
								fontWeight={700}
							>
								{cantidadFiltrosAplicados}
							</Typography>
						</Box>
					)}
					<Filter />
				</IconButton>
			</Box>
		</Box>
	);
};

export default HeaderBuscador;
