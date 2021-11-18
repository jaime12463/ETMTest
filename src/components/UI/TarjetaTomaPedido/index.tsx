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
import Derecha from './components/Controles';
import Controles from './components/Controles';
import Informacion from './components/Informacion';
import DescuentoEscalonado from './components/DescuentoEscalonado';

interface Props {
	producto: TProductoPedido | TPrecioProducto;
	conSwitch?: boolean;
	bordeRedondeado?: boolean;
	conDescuentoEscalonado?: boolean;
	conDescuentoPolarizado?: boolean;
}

const InputStyled = styled(Input)(({}) => ({
	backgroundColor: 'white',
	border: '1px solid #2F000E',
	borderRadius: '10px',
	fontSize: '12px',
	fontWeight: 600,
	height: '16px',
	lineHeight: '16px',
	padding: '0 2px',
	width: '42px',
}));

const TarjetaTomaPedido: React.FC<Props> = ({
	producto,
	conSwitch = false,
	bordeRedondeado = false,
	conDescuentoEscalonado = true,
	conDescuentoPolarizado = false,
}) => {
	const {t} = useTranslation();

	return (
		<Box
			border='1px solid #D9D9D9'
			borderRadius={bordeRedondeado ? '8px' : '0'}
			overflow='hidden'
		>
			<Box
				display='flex'
				alignItems='start'
				justifyContent={conSwitch ? 'space-between' : 'end'}
			>
				{conSwitch && (
					<Box padding='12px 0 0 14px'>
						<SwitchCambiarTipoPago />
					</Box>
				)}
				{conSwitch && (
					<Box
						padding='12px 14px 0 0'
						sx={{background: '#F5F0EF'}}
						width='125px'
						textAlign='right'
						height='30px'
						display='flex'
						alignItems='center'
						justifyContent='end'
					>
						{false && (
							<CheckRedondoIcon
								width='17.5px'
								fill={theme.palette.success.main}
							/>
						)}
					</Box>
				)}
			</Box>
			<Box display='flex'>
				<Informacion
					codigoProducto={producto.codigoProducto}
					nombreProducto={producto.nombreProducto}
					presentacion={producto.presentacion}
					precioConImpuestoUnidad={producto.precioConImpuestoUnidad}
					precioConImpuestoSubunidad={producto.precioConImpuestoSubunidad}
					conSwitch={conSwitch}
				/>
				<Controles esVentaSubunidades={producto.esVentaSubunidades} />
			</Box>
			{conDescuentoEscalonado && <DescuentoEscalonado />}
			<Box marginBottom='16px'>
				<input type='text' style={{width: '100%'}} />
			</Box>
		</Box>
	);
};

export default TarjetaTomaPedido;
