import React, {Dispatch, SetStateAction} from 'react';
import {
	Box,
	Card,
	CardActions,
	Collapse,
	CardHeader,
	CardContent,
	IconButton,
} from '@mui/material';
import useEstilos from './useEstilos';
import clsx from 'clsx';
import flechaAbajo from '../../../assests/iconos/chevron--down.svg';
import Chip from '@mui/material/Chip';
import {styled} from '@mui/material/styles';

const ChipStyled = styled(Chip)(() => ({
	background: '#000',
	color: '#fff',
	fontFamily: 'Open Sans',
	fontWeight: 'bold',
	opacity: '0.7',
	padding: '2px 12px',
}));

type Props = {
	setExpandido: Dispatch<SetStateAction<string | boolean>>;
	expandido: string | boolean;
	titulo: React.ReactNode;
	subTitulo?: React.ReactNode;
	id: string;
	cantidadItems?: number;
	disabled?: boolean;
	mensaje?: React.ReactNode;
};

export const TarjetaColapsable: React.FC<Props> = ({
	children,
	setExpandido,
	titulo,
	subTitulo,
	expandido,
	id,
	cantidadItems,
	disabled,
	mensaje,
}) => {
	const manejadorExpandido =
		({id}: any) =>
		(event: React.SyntheticEvent) => {
			setExpandido(id);
		};

	const classes = useEstilos();

	return (
		<>
			<Card
				className={clsx(classes.root, {
					[classes.inactiva]: expandido !== id ? true : false,
				})}
			>
				<CardHeader
					style={{padding: 0}}
					title={
						<Box display='flex' justifyContent='space-between'>
							<Box alignSelf='center'>{titulo}</Box>
							<Box>
								<CardActions disableSpacing style={{padding: 0}}>
									{cantidadItems !== undefined && cantidadItems > 0 && (
										<ChipStyled size='small' label={`${cantidadItems} Items`} />
									)}
									{!disabled ? (
										<IconButton
											className={clsx(classes.expand, {
												[classes.expandOpen]: expandido === id ? true : false,
											})}
											onClick={manejadorExpandido({
												id: expandido === id ? false : id,
											})}
											aria-expanded={expandido === id ? true : false}
										>
											<img src={flechaAbajo} alt='flecha abajo' />
										</IconButton>
									) : null}
								</CardActions>
							</Box>
						</Box>
					}
					subheader={
						<div>
							<p style={{margin: '10px 0 0 0'}}>{subTitulo}</p>
							{disabled ? <p>{mensaje}</p> : null}
						</div>
					}
				></CardHeader>
				<CardContent
					className={expandido !== id ? classes.root : ''}
					style={{padding: 0}}
				>
					<Collapse in={expandido === id} timeout='auto' unmountOnExit>
						{children}
					</Collapse>
				</CardContent>
			</Card>
		</>
	);
};
