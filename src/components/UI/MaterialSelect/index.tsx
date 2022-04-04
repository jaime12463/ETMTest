import React from 'react';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import useEstilos from './useEstilos';
import {FlechaAbajoIcon} from 'assests/iconos';
import theme from 'theme';
import {TIniciativasCliente} from 'models';
import {useTranslation} from 'react-i18next';

interface Props {
	opciones: string[];
	state: string;
	setState: React.Dispatch<React.SetStateAction<string>>;
	placeholder?: string;
	greyTextPlaceholder?: boolean;
	borderColor?: boolean;
	disabled?: boolean;
}

const MaterialSelect: React.FC<Props> = ({
	opciones,
	state,
	setState,
	placeholder = '',
	greyTextPlaceholder = false,
	borderColor = false,
	disabled = false,
}) => {
	const classes = useEstilos();
	const {t} = useTranslation();

	const handleChange = (event: SelectChangeEvent) => {
		setState(event.target.value as string);
	};

	const opcionesAMostrar = React.useMemo(
		() => opciones.filter((opcion) => opcion !== state),
		[state]
	);

	return (
		<Box position='relative' width='100%'>
			<Typography
				variant='caption'
				position='absolute'
				fontFamily='Open Sans'
				top='50%'
				left='8px'
				color={state === '' && greyTextPlaceholder ? '#B2B2B2' : '#000'}
				sx={{transform: 'translateY(-50%)', width: '80%'}}
			>
				{state !== '' ? state : placeholder}
			</Typography>
			<Select
				value=''
				onChange={handleChange}
				MenuProps={{
					anchorOrigin: {
						vertical: 'bottom',
						horizontal: 'left',
					},
					transformOrigin: {
						vertical: 'top',
						horizontal: 'left',
					},
					classes: {paper: classes.paper},
				}}
				IconComponent={FlechaAbajoIcon}
				disabled={disabled}
				sx={{
					'&:hover': {
						'&& fieldset': {
							border: borderColor
								? `1px solid ${theme.palette.primary.main}`
								: '1px solid #D9D9D9',
						},
					},
					width: '100%',
					height: '24px',
					fontSize: '10px',
					fontFamily: 'Open Sans',

					'& > div': {
						padding: '8px',
					},
					'& > svg': {
						height: '18px',
						width: '18px',
						top: '50%',
						transform: 'translateY(-50%)',
						transition: 'transform .3s ease-in-out',
					},
					'& .MuiSelect-iconOpen': {
						transform: 'translateY(-50%) rotateX(180deg)',
					},
					'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
						border: borderColor
							? `1px solid ${theme.palette.primary.main}`
							: '1px solid #D9D9D9',
					},
					'& .MuiOutlinedInput-notchedOutline': {
						border: borderColor
							? `1px solid ${theme.palette.primary.main}`
							: '1px solid #D9D9D9',
					},
				}}
			>
				{opcionesAMostrar?.map((opcion) => {
					let opcionIniciativa: null | TIniciativasCliente['estado'] = null;

					if (opcion === t('general.pendiente')) {
						opcionIniciativa = 'pendiente';
					}
					if (opcion === t('general.ejecutada')) {
						opcionIniciativa = 'ejecutada';
					}
					if (opcion === t('general.cancelada')) {
						opcionIniciativa = 'cancelada';
					}

					return (
						<MenuItem
							key={opcionIniciativa ?? opcion}
							value={opcionIniciativa ?? opcion}
						>
							<Typography variant='caption' fontFamily='Open Sans'>
								{opcion}
							</Typography>
						</MenuItem>
					);
				})}
			</Select>
		</Box>
	);
};

export default MaterialSelect;
