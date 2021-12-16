import * as React from 'react';
import Box from '@mui/material/Box';
import {CheckRedondoIcon} from 'assests/iconos';
import {TPrecioProducto, TProductoPedido} from 'models';
import {SwitchCambiarTipoPago} from 'pages/Pasos/2_TomaDePedido/components';
import theme from 'theme';

interface Props {
	conSwitch?: boolean;
	producto: TProductoPedido;
}

const SwitchYCheck: React.FC<Props> = ({conSwitch, producto}) => {
	return (
		<Box
			display='flex'
			alignItems='start'
			justifyContent={conSwitch ? 'space-between' : 'end'}
		>
			{conSwitch ? (
				<>
					<Box
						padding='12px 0 0 14px'
						display='flex'
						justifyContent='start'
						flex={3}
					>
						<SwitchCambiarTipoPago producto={producto} />
					</Box>
					<Box
						padding='12px 14px 0 0'
						sx={{background: '#F5F0EF'}}
						flex={2}
						width='125px'
						textAlign='right'
						height='30px'
						display='flex'
						alignItems='center'
						justifyContent='end'
					>
						{(producto.unidades > 0 || producto.subUnidades > 0) && (
							<CheckRedondoIcon width='17.5px' />
						)}
					</Box>
				</>
			) : (
				<>
					{(producto.unidades > 0 || producto.subUnidades > 0) && (
						<>
							<Box
								padding='12px 0 0 14px'
								display='flex'
								justifyContent='start'
								flex={3}
							/>
							<Box
								padding='12px 14px 0 0'
								sx={{background: '#F5F0EF'}}
								flex={2}
								width='125px'
								textAlign='right'
								height='30px'
								display='flex'
								alignItems='center'
								justifyContent='end'
							>
								<CheckRedondoIcon width='17.5px' />
							</Box>
						</>
					)}
				</>
			)}
		</Box>
	);
};

export default SwitchYCheck;
