import React from 'react';
import Box from '@mui/material/Box';
import {CheckRedondoIcon} from 'assests/iconos';
import {TProductoPedido} from 'models';
import {SwitchCambiarTipoPago} from 'pages/Pasos/2_TomaDePedido/components';
import theme from 'theme';

interface Props {
	producto: TProductoPedido;
}

const Check: React.FC<Props> = ({producto}) => {
	return (
		<>
			{(producto.unidades > 0 || producto.subUnidades > 0) && (
				<Box display='flex' justifyContent='flex-end' padding='12px 14px 0 0'>
					<CheckRedondoIcon height={20} width={20} />
				</Box>
			)}
		</>
	);
};

export default Check;
