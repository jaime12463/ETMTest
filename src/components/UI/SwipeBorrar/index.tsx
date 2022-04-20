import {ReactNode, useEffect, useState} from 'react';
import SwipeableViews from 'react-swipeable-views';
import {Box, Typography} from '@mui/material';
import {TProductoPedido} from 'models';

interface Props {
	item: TProductoPedido;
	manejadorGesto: Function;
}

export const SwipeBorrar: React.FC<Props> = ({
	children,
	item,
	manejadorGesto,
}) => {
	const [index, setIndex] = useState<number>(item.estado == 'activo' ? 0 : 1);
	const [swipe, SetSwipe] = useState<number>(0);
	const [swipeMargen, SetSwipeMargen] = useState<string>('');

	const switchingHandler = (index: number, type: string) => {
		if (index === 1 && type === 'end') {
			manejadorGesto();
			setIndex(0.5);
		}
		SetSwipe(index);
		SetSwipeMargen(`${index * 100}px`);
	};

	useEffect(() => {
		setIndex(0);
	}, [index]);

	return (
		<SwipeableViews
			onSwitching={(index, type) => switchingHandler(index, type)}
			enableMouseEvents
			hysteresis={0.9}
			index={index}
			slideStyle={{overflow: 'clip visible'}}
			style={{overflow: 'clip visible'}}
		>
			{children}
			<Box
				alignItems='center'
				display='flex'
				sx={{
					backgroundColor: 'red',
					width: '100%',
					height: '100%',
				}}
			>
				{/*ToDo: pasar a multilenguaje */}

				<Typography
					marginLeft={swipe >= 0.2 ? swipeMargen : '20px'}
					sx={{color: 'white'}}
				>
					Eliminar
				</Typography>
			</Box>
		</SwipeableViews>
	);
};
