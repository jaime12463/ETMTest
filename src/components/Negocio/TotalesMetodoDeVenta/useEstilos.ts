import {makeStyles} from '@material-ui/styles';
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
