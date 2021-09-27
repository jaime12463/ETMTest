import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Card,
	CardActions,
	Collapse,
	CardHeader,
	CardContent,
	IconButton,
} from '@mui/material';
import {useState, Dispatch, SetStateAction, Children} from 'react';
import useEstilos from './useEstilos';
import clsx from 'clsx';

type Props = {
	children: React.ReactNode;
	setExpandido: Dispatch<SetStateAction<string | boolean>>;
	expandido: string | boolean;
	titulo: React.ReactNode;
	subTitulo?: React.ReactNode;
	id: string;
};

export const TarjetaColapsable = ({
	children,
	setExpandido,
	titulo,
	subTitulo,
	expandido,
	id,
}: Props) => {
	const manejadorExpandido =
		({id}: any) =>
		(event: React.SyntheticEvent) => {
			setExpandido(id);
		};

	const classes = useEstilos();

	return (
		<>
			<Card>
				<CardHeader title={titulo} subheader={subTitulo}></CardHeader>
				<CardContent>
					{children}
					<CardActions disableSpacing style={{padding: 0}}>
						<IconButton
							className={clsx(classes.expand, {
								[classes.expandOpen]: expandido === id ? true : false,
							})}
							onClick={manejadorExpandido({id: expandido === id ? false : id})}
							aria-expanded={expandido === id ? true : false}
						>
							{'<>'}
						</IconButton>
					</CardActions>
				</CardContent>
			</Card>
		</>
	);
};
