import {ReactNode, useState, useEffect} from 'react';
import SwipeableViews from 'react-swipeable-views';
import {Box, Typography} from '@mui/material';
import {TProductoPedido} from 'models';
import {editarProductoDelPedidoActual} from 'redux/features/visitaActual/visitaActualSlice';
import {useAppDispatch} from 'redux/hooks';

type Props = {
	children: ReactNode;
	item: TProductoPedido;
};

export const SwipeBorrar = (props: Props) => {
	const {children, item} = props;
	const dispatch = useAppDispatch();

	const switchingHandler = (index: number, type: string) => {
		if (index === 1 && type === 'end') {
			const itemModificado = {...item, visible: false};

			setTimeout(
				() =>
					dispatch(
						editarProductoDelPedidoActual({productoPedido: itemModificado})
					),
				700
			);
		}
	};

	return (
		<SwipeableViews
			onSwitching={(index, type) => switchingHandler(index, type)}
			enableMouseEvents
			hysteresis={0.3}
		>
			{children}

			<Box
				alignItems='center'
				display='flex'
				justifyContent='center'
				sx={{
					backgroundColor: 'red',
					width: '100%',
					height: '100%',
					position: 'relative',
				}}
			>
				<Typography sx={{color: 'white'}}>Eliminar</Typography>
			</Box>
		</SwipeableViews>
	);
};
