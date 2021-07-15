import {makeStyles} from '@material-ui/core';
const useEstilos = makeStyles((theme) => ({
	container: {
		marginTop: 20,
		maxHeight: 300,
	},
	margin: {
		marginTop: 30,
	},
	alignment: {
		textAlign: 'center',
	},
	text: {
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
		width: '7rem',
		display: 'inline block',
		overflow: 'hidden',
	},
	typography: {
		padding: theme.spacing(2),
	},
}));
export default useEstilos;
