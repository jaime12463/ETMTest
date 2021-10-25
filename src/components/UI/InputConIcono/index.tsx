import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useEstilos from './useEstilos';
import {CheckRedondoIcon} from 'assests/iconos';
import {useTranslation} from 'react-i18next';
import InputAdornment from '@mui/material/InputAdornment';

interface Props {
	valid: boolean;
	value: string;
	onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	onChange: (
		e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => void;
	margin?: string;
	label: string;
	simboloMoneda?: boolean;
}

const InputConIcono: React.FC<Props> = ({
	valid,
	value,
	onChange,
	margin = '10px 0 0 0',
	label,
	simboloMoneda = false,
	onKeyPress,
}) => {
	const classes = useEstilos({valid});
	const {t} = useTranslation();

	return (
		<Box margin={margin} position='relative'>
			<TextField
				label={label}
				variant='filled'
				fullWidth
				className={classes.root}
				autoFocus
				value={value}
				onChange={onChange}
				onKeyPress={onKeyPress}
				focused
				InputProps={{
					startAdornment: simboloMoneda && (
						<InputAdornment
							position='start'
							sx={{color: '#000', marginRight: 0}}
						>
							<Typography variant='body2'>{t('simbolos.moneda')}</Typography>
						</InputAdornment>
					),
					inputMode: simboloMoneda ? 'numeric' : 'text',
				}}
			/>
			<Box position='absolute' right='16px' bottom='8px'>
				{valid && <CheckRedondoIcon />}
			</Box>
		</Box>
	);
};

export default InputConIcono;
