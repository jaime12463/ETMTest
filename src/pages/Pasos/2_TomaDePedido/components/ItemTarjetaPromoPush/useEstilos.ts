import {makeStyles, createStyles} from '@material-ui/styles';
import {Theme} from '@mui/material';
const useEstilos = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
			paddingBottom: 0,
			overflow: 'hidden',
		},
		expand: {
			position: 'relative',
			transform: 'rotate(0deg)',
			marginLeft: 'auto',
			padding: 0,
			/* 			transition: theme.transitions.create('transform', {
				duration: theme.transitions.duration.shortest,
			}), */
		},
		expandOpen: {
			transform: 'rotate(180deg)',
		},
		cardContent: {
			margin: 0,
			paddingBottom: 0,
			padding: 5,
			'&:last-child': {
				paddingBottom: 0,
			},
		},
		cardContentExpand: {
			paddingTop: 0,
		},
		celda: {
			borderBottom: 'none',
			whiteSpace: 'nowrap',
			textOverflow: 'ellipsis',
			overflow: 'hidden',
			maxWidth: 230,
		},
		celdaProducto: {
			fontSize: '0.7rem',
			lineHeight: 1,
			borderBottom: 0,
		},
		celdaValores: {
			fontSize: '0.7rem',
			lineHeight: 1,
		},
	})
);

export default useEstilos;
