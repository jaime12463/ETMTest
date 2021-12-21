import React, {Dispatch, SetStateAction} from 'react';
import {
	Box,
	Card,
	CardActions,
	Collapse,
	CardHeader,
	CardContent,
	IconButton,
	Typography,
} from '@mui/material';
import useEstilos from './useEstilos';
import clsx from 'clsx';
import flechaAbajo from '../../../assests/iconos/chevron--down.svg';
import Chip from '@mui/material/Chip';
import {styled} from '@mui/material/styles';
import {FlechaAbajoIcon} from 'assests/iconos';

const ChipStyled = styled(Chip)(() => ({
	background: '#000',
	color: '#fff',
	fontFamily: 'Open Sans',
	fontWeight: 'bold',
	opacity: '0.7',
	'&.MuiChip-sizeSmall': {
		fontSize: '12px',
		padding: '2px 4px',
	},
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
	valido?: boolean;
	labelChip?: string | React.ReactNode;
	dataCy: string;
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
	valido = false,
	labelChip,
	dataCy,
}) => {
	const manejadorExpandido = (id: string | boolean) => {
		setExpandido(id);
	};

	const classes = useEstilos({valido, open: expandido === id});

	return (
		<>
			<Card
				className={clsx(classes.root, {
					[classes.inactiva]: expandido !== id,
				})}
				sx={{overflow: 'visible'}}
				data-cy={'tarjeta-' + dataCy}
			>
				<CardHeader
					style={{padding: 0}}
					title={
						<Box display='flex' justifyContent='space-between'>
							<Box alignSelf='center' data-cy={'titulo-' + dataCy}>
								{titulo}
							</Box>
							<Box>
								<CardActions disableSpacing style={{padding: 0}}>
									{cantidadItems !== undefined && cantidadItems > 0 && (
										<ChipStyled
											size='small'
											label={labelChip}
											className={classes.root}
										/>
									)}
									{!disabled ? (
										<IconButton
											sx={{padding: 0}}
											onClick={() =>
												manejadorExpandido(expandido === id ? false : id)
											}
											aria-expanded={expandido === id}
											data-cy={'expandir-' + dataCy}
										>
											<FlechaAbajoIcon className={classes.arrow} />
										</IconButton>
									) : null}
								</CardActions>
							</Box>
						</Box>
					}
					subheader={
						<Box marginTop='10px'>
							<Typography variant='body3' fontFamily='Open Sans'>
								{subTitulo}
							</Typography>
							{disabled ? <p data-cy={'mensaje-' + dataCy}>{mensaje}</p> : null}
						</Box>
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
