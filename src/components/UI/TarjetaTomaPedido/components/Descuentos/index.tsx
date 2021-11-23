import React from 'react';
import {TPrecioProducto, TProductoPedido} from 'models';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import {
	AgregarRedondoIcon,
	BotellaIcon,
	CajaIcon,
	CheckRedondoIcon,
	PromocionColor,
	QuitarRellenoIcon,
} from 'assests/iconos';
import {formatearNumero} from 'utils/methods';
import {useTranslation} from 'react-i18next';
import theme from 'theme';
import {SwitchCambiarTipoPago} from 'pages/Pasos/2_TomaDePedido/components';
import {styled} from '@mui/material/styles';
import InputConIcono from 'components/UI/InputConIcono';

const ChipStyled = styled(Chip)(() => ({
	'&.MuiChip-root': {
		background: 'transparent',
		border: `1px solid ${theme.palette.primary.main}`,
		cursor: 'pointer',
		borderRadius: '50px',
		height: ' 18px',
		marginBottom: '12px',
		padding: '4px, 12px',
		width: '133px',
	},
}));

interface Props {
	descuento: 'escalonado' | 'polarizado' | 'automatico';
}

const Descuentos: React.FC<Props> = ({descuento}) => {
	const [inputValue, setInputValue] = React.useState<string>('');

	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value.replace(/[^0-9]/g, ''));
	};

	return (
		<Box display='flex' flexDirection='column'>
			<Box display='flex'>
				<Box
					display='flex'
					flexDirection='column'
					width='179px'
					padding='0 5px 0 14px'
					gap='6px'
				>
					<Typography
						variant='caption'
						fontFamily='Open Sans'
						color={theme.palette.primary.main}
					>
						Descuento escalonado del -20%
					</Typography>
					<Box
						display='flex'
						alignItems='center'
						justifyContent='space-between'
						width='145px'
						marginBottom={descuento === 'polarizado' ? '6px' : '0'}
					>
						<PromocionColor height='20px' width='20px' />
						<Typography
							variant='subtitle3'
							fontFamily='Open Sans'
							color={theme.palette.primary.main}
						>
							$147.00
						</Typography>
						<Typography
							variant='subtitle3'
							fontFamily='Open Sans'
							color={theme.palette.primary.main}
						>
							$12.00
						</Typography>
					</Box>
					{(descuento === 'escalonado' || descuento === 'automatico') && (
						<Box alignSelf='start'>
							<ChipStyled
								label={
									<Typography
										variant='caption'
										color={theme.palette.primary.main}
									>
										Eliminar descuento
									</Typography>
								}
								icon={
									<QuitarRellenoIcon
										height='9px'
										width='9px'
										fill={theme.palette.primary.main}
									/>
								}
							/>
						</Box>
					)}
				</Box>
				<Box width='125px' sx={{background: '#F5F0EF'}} />
			</Box>
			{descuento === 'polarizado' && (
				<Box marginBottom='16px'>
					<InputConIcono
						valid={false}
						value={inputValue}
						onChange={onChangeInput}
						label='Ingresar precio de venta al consumidor'
						margin='0'
						simboloMoneda
					/>
				</Box>
			)}
		</Box>
	);
};

export default Descuentos;
