import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useEstilos from './useEstilos';
import {CheckRedondoIcon} from 'assests/iconos';
import {useTranslation} from 'react-i18next';
import InputAdornment from '@mui/material/InputAdornment';
import theme from 'theme';

interface Props {
	valid: boolean;
	value: string;
	onBlur?: () => void;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onKeyPress?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
	inputRef?: (input: any) => void;
	onClick?: () => void;
	onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
	margin?: string;
	label: string;
	simboloMoneda?: boolean;
	error?: boolean;
	mensajeError?: string;
	focus?: boolean;
}

const InputConIcono: React.FC<Props> = ({
	valid,
	value,
	onChange,
	inputRef,
	onKeyPress,
	onClick,
	onBlur,
	margin = '10px 0 0 0',
	label,
	simboloMoneda = false,
	error = false,
	mensajeError,
	focus = false,
	onFocus,
}) => {
	const classes = useEstilos({valid, error});
	const {t} = useTranslation();

	return (
		<Box margin={margin} position='relative'>
			<TextField
				label={label}
				variant='filled'
				fullWidth
				className={classes.root}
				autoFocus={focus ? true : false}
				focused
				inputRef={inputRef}
				onClick={onClick}
				value={value}
				onChange={onChange}
				onFocus={onFocus}
				onKeyPress={onKeyPress}
				onBlur={onBlur}
				sx={{borderBottom: error ? '1px solid red' : 'none'}}
				InputProps={{
					startAdornment: simboloMoneda && (
						<InputAdornment
							position='start'
							sx={{color: '#000', marginRight: 0}}
						>
							<Typography
								variant='body2'
								sx={{color: error ? '#FF0000' : 'inherit'}}
							>
								{t('simbolos.moneda')}
							</Typography>
						</InputAdornment>
					),
					inputMode: simboloMoneda ? 'numeric' : 'text',
				}}
			/>
			<Box position='absolute' right='16px' bottom='8px'>
				{valid && <CheckRedondoIcon fill={`${theme.palette.success.main}`} />}
			</Box>
			{error && (
				<Box marginTop='8px' paddingLeft='16px'>
					<Typography
						fontSize='10px'
						fontFamily='Open Sans'
						color='primary'
						lineHeight='12px'
					>
						{mensajeError}
					</Typography>
				</Box>
			)}
		</Box>
	);
};

export default InputConIcono;
