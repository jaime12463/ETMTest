import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {CheckRedondoIcon, SimboloMoneda, SimboloMonedaBR} from 'assests/iconos';
import {useTranslation} from 'react-i18next';
import theme from 'theme';

interface Props {
	error?: boolean;
	inputRef?: (input: any) => void;
	mensajeError?: string;
	onBlur?: () => void;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onClick?: () => void;
	onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
	onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	placeholder: string;
	simboloMoneda?: boolean;
	valid: boolean;
	value: string;
}

export const InputConIcono: React.VFC<Props> = ({
	error,
	inputRef,
	mensajeError,
	onBlur,
	onChange,
	onClick,
	onKeyPress,
	placeholder,
	simboloMoneda = false,
	valid,
	value,
}) => {
	const {t} = useTranslation();
	const [inputClicked, setInputClicked] = React.useState<boolean>(false);

	return (
		<>
			<Box position='relative' width='100%'>
				{!value && !inputClicked && (
					<Typography
						fontFamily='Open Sans'
						left={simboloMoneda ? '25px' : '12px'}
						position='absolute'
						sx={{transform: 'translateY(-50%)'}}
						top='50%'
						variant='body3'
					>
						{placeholder}
					</Typography>
				)}
				{simboloMoneda &&
					(t('simbolos.moneda') === '$' ? (
						<SimboloMoneda
							style={{
								left: '5px',
								position: 'absolute',
								top: '50%',
								transform: 'translateY(-50%)',
							}}
						/>
					) : (
						<SimboloMonedaBR
							style={{
								left: '5px',
								position: 'absolute',
								top: '50%',
								transform: 'translateY(-50%)',
							}}
						/>
					))}
				<TextField
					InputProps={{
						disableUnderline: true,
						inputMode: simboloMoneda ? 'numeric' : 'text',
					}}
					inputProps={{
						sx: {
							border: error
								? `1px solid ${theme.palette.primary.main}`
								: 'none',
							borderRadius: '20px',
							boxShadow: '0px 2px 15px rgba(0, 0, 0, 0.15)',
							boxSizing: 'border-box',
							color: error ? theme.palette.primary.main : '#000',
							fontFamily: 'Open Sans',
							fontSize: '12px',
							fontWeight: 400,
							height: '32px',
							padding: simboloMoneda
								? '4px 12px 4px 25px'
								: '4px 12px 4px 12px',
							width: '100%',
						},
					}}
					onClick={() => {
						setInputClicked(true);
						onClick && onClick();
					}}
					onBlur={() => {
						setInputClicked(false);
						onBlur && onBlur();
					}}
					onChange={onChange}
					onKeyPress={onKeyPress}
					onFocus={(e) => {
						e.target.select();
						setInputClicked(true);
					}}
					inputRef={inputRef}
					sx={{width: '100%'}}
					variant='standard'
					value={value}
				/>
				<Box
					position='absolute'
					right='8px'
					top='50%'
					sx={{transform: 'translateY(-50%)'}}
				>
					{valid && (
						<CheckRedondoIcon
							height={16}
							width={16}
							fill={`${theme.palette.success.main}`}
						/>
					)}
				</Box>
			</Box>
			{error && (
				<Box marginTop='4px'>
					<Typography fontFamily='Open Sans' variant='caption' color='primary'>
						{mensajeError}
					</Typography>
				</Box>
			)}
		</>
	);
};
