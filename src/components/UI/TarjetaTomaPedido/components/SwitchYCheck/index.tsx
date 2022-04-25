import React from 'react';
import Box from '@mui/material/Box';
import {CheckRedondoIcon} from 'assests/iconos';
import {TProductoPedido} from 'models';
import {SwitchCambiarTipoPago} from 'pages/Pasos/2_TomaDePedido/components';

interface Props {
	conSwitch?: boolean;
	producto: TProductoPedido;
}

export const SwitchYCheck: React.VFC<Props> = ({conSwitch, producto}) => {
	return (
		<Box display='flex'>
			{conSwitch ? (
				<>
					<Box
						display='flex'
						flex='1'
						padding='12px 8px 0 14px'
						sx={{gridArea: 'Switch'}}
					>
						<SwitchCambiarTipoPago producto={producto} />
					</Box>
					<Box
						padding='12px 14px 0 8px'
						textAlign='right'
						width='125px'
						sx={{gridArea: 'Check'}}
					>
						{(producto.unidades > 0 || producto.subUnidades > 0) && (
							<CheckRedondoIcon height={20} width={20} />
						)}
					</Box>
				</>
			) : (
				<>
					{(producto.unidades > 0 || producto.subUnidades > 0) && (
						<>
							<Box flex='1' />
							<Box padding='12px 14px 0 8px' textAlign='right' width='125px'>
								<CheckRedondoIcon height={20} width={20} />
							</Box>
						</>
					)}
				</>
			)}
		</Box>
	);
};
