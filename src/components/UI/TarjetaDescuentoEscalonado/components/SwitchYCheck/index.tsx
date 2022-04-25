import React from 'react';
import {Box} from '@mui/material';
import {CheckRedondoIcon} from 'assests/iconos';
import {SwitchCambiarTipoPago} from 'pages/Pasos/2_TomaDePedido/components';
import theme from 'theme';

interface Props {
	abrirCollapse: boolean;
	conSwitch: boolean;
	unidades: number;
}

export const SwitchYCheck: React.VFC<Props> = ({
	abrirCollapse,
	conSwitch,
	unidades,
}) => {
	return (
		<>
			<Box
				padding='12px 0 0 14px'
				sx={{
					background: abrirCollapse ? theme.palette.secondary.light : 'none',
					gridArea: 'Switch',
					transition: 'all .3s ease-in-out',
				}}
			>
				{conSwitch && <SwitchCambiarTipoPago />}
			</Box>
			<Box
				display='flex'
				justifyContent='flex-end'
				padding='12px 14px 0 0'
				sx={{
					background: abrirCollapse ? theme.palette.secondary.light : 'none',
					gridArea: 'Check',
					transition: 'all .3s ease-in-out',
				}}
				width='100%'
			>
				{unidades > 0 && <CheckRedondoIcon height={20} width={20} />}
			</Box>
		</>
	);
};
