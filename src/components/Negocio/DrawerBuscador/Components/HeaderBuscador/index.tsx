import {Box, Typography, TextField, IconButton} from '@mui/material';
import {BuscarIcon} from 'assests/iconos';
import {Filter} from 'assests/iconos/Filter';
import {useTranslation} from 'react-i18next';
import useEstilos from '../../useEstilos';
import theme from 'theme';

interface Props {
	cantidadFiltrosAplicados: number;
	inputBusqueda: string;
	setAbrirFiltros: React.Dispatch<React.SetStateAction<boolean>>;
	setInputBusqueda: React.Dispatch<React.SetStateAction<string>>;
}

export const HeaderBuscador: React.VFC<Props> = ({
	cantidadFiltrosAplicados,
	inputBusqueda,
	setAbrirFiltros,
	setInputBusqueda,
}) => {
	const {t} = useTranslation();
	const classes = useEstilos();

	const onChangeBusqueda = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputBusqueda(e.target.value);
	};

	return (
		<Box paddingBottom='14px' width='100%'>
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
				marginTop='10px'
			>
				<Box position='relative' width='222px'>
					<TextField
						autoFocus
						className={classes.inputBuscador}
						InputProps={{
							disableUnderline: true,
							sx: {fontSize: '12px'},
						}}
						inputProps={{
							sx: {
								fontFamily: 'Open Sans',
								fontSize: '12px',
								lineHeight: '16px',
								'&::placeholder': {
									opacity: 1,
								},
							},
						}}
						onChange={onChangeBusqueda}
						onClick={() => setAbrirFiltros(false)}
						placeholder={`${t('general.buscarProducto')}`}
						sx={{
							boxShadow: '0px 2px 15px rgba(0, 0, 0, 0.15)',
							padding: '4px 12px',
							width: '100%',
						}}
						type='text'
						value={inputBusqueda}
						variant='standard'
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
				<Box
					alignItems='center'
					borderRadius='50px'
					color='#fff'
					display='flex'
					gap='4px'
					height='32px'
					justifyContent='center'
					maxWidth='102px'
					onClick={() => setAbrirFiltros((state) => !state)}
					padding='8px 16px'
					sx={{background: theme.palette.secondary.main, cursor: 'pointer'}}
					width='100%'
				>
					<Filter height={10} width={10} />
					<Typography fontFamily='Open Sans' variant='subtitle3'>
						{t('general.filtros')}
					</Typography>
					{cantidadFiltrosAplicados > 0 && (
						<Box
							alignItems='center'
							borderRadius='50%'
							display='flex'
							height='13px'
							justifyContent='center'
							padding='4px'
							sx={{background: theme.palette.primary.main}}
							width='13px'
						>
							<Typography
								fontFamily='Open Sans'
								fontSize='8px'
								fontWeight={700}
							>
								{cantidadFiltrosAplicados}
							</Typography>
						</Box>
					)}
				</Box>
			</Box>
		</Box>
	);
};
