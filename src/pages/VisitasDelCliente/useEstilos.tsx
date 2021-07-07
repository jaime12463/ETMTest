import {makeStyles} from '@material-ui/core';
const useEstilos = makeStyles((theme)=>({
	container: {
		marginTop: 20,
		maxHeight: 300,
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
	fab: {
		position: 'absolute',
		bottom: theme.spacing(2),
		right: theme.spacing(2),
  	},
}));
export default useEstilos;
