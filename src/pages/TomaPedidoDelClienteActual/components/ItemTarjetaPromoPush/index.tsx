import {FunctionComponent} from 'react';
import {Grid, Box} from '@material-ui/core';
import {Center, Fecha, Numero} from 'components/UI';
import useEstilos from './useEstilos';
import React from 'react';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

type Props = {
	item: any;
	onClickItem: (item: any) => void;
};

const ItemTarjetaPromoPush = (props: any) => {
	const {item, onClickItem, estado, index} = props;
	const classes = useEstilos();

	return (
		<Card className={classes.root}>
			<CardHeader
				title={
					<Box display='flex ' justifyContent='space-between'>
						<Typography variant='body2'>290293</Typography>
						<Typography variant='body2'>Disponible: 10</Typography>
					</Box>
				}
				disableTypography={true}
			/>
			<CardContent>
				<Typography variant='body2' component='p'>
					MK
				</Typography>
				<CardActions disableSpacing>
					<IconButton
						className={clsx(classes.expand, {
							[classes.expandOpen]: estado === index ? true : false,
						})}
						onClick={onClickItem(estado === index ? false : index)}
						aria-expanded={estado === index ? true : false}
					>
						<ExpandMoreIcon />
					</IconButton>
				</CardActions>
				<Collapse in={estado === index} timeout='auto' unmountOnExit>
					<CardContent>
						<Typography paragraph>producto</Typography>
					</CardContent>
				</Collapse>
			</CardContent>
		</Card>
	);
};

export default ItemTarjetaPromoPush;
