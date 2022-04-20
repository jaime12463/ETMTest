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
	error?: boolean;
	focus?: boolean;
	inputRef?: (input: any) => void;
	label: string;
	margin?: string;
	mensajeError?: string;
	onBlur?: any;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onClick?: () => void;
	onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
	onKeyPress?: any;
	simboloMoneda?: boolean;
	valid: boolean;
	value: string;
}

export const InputConIcono: React.VFC<Props> = ({
	error = false,
	focus = false,
	inputRef,
	label,
	margin = '10px 0 0 0',
	mensajeError,
	onBlur,
	onChange,
	onClick,
	onFocus,
	onKeyPress,
	simboloMoneda = false,
	valid,
	value,
}) => {
	const classes = useEstilos({valid, error});
	const {t} = useTranslation();

	return (
		<Box margin={margin} position='relative'>
			<Typography
				variant='caption'
				color='secondary.light'
				fontFamily='Open Sans'
				position='absolute'
				top='8px'
				left='12px'
				sx={{zIndex: 1}}
			>
				{label}
			</Typography>
			<TextField
				variant='filled'
				fullWidth
				className={classes.root}
				autoFocus={focus}
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
								variant='body3'
								fontFamily='Open Sans'
								sx={{color: error ? theme.palette.primary.main : 'inherit'}}
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
