import {Hidden} from '@mui/material';
import {makeStyles, createStyles, withStyles} from '@material-ui/styles';
import {Height} from '@material-ui/icons';
export const useEstilos = makeStyles(() => ({
	celda: {
		borderBottom: 'none',
		paddingRight: 5,
		paddingLeft: 5,
		overflow: 'hidden',
	},
	subTitulo: {
		fontSize: '0.67rem',
	},
	total: {
		maxWidth: 10,
	},
}));
