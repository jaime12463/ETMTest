import {Hidden} from '@material-ui/core';
import {
	makeStyles,
	createStyles,
	withStyles,
	Theme,
} from '@material-ui/core/styles';
import {Height} from '@material-ui/icons';
export const useEstilos = makeStyles((theme) => ({
	celda: {
		borderBottom: 'none',
		overflow: 'hidden',
	},
	subTitulo: {
		fontSize: '0.67rem',
	},
	total: {
		maxWidth: 10,
	},
}));
