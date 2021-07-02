import {makeStyles} from '@material-ui/core';
const useEstilos = makeStyles({
	container: {
		marginTop: 12,
		maxHeight: 300,
	},
	alignment: {
		textAlign: 'center',
	},
	text: {
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
		width: '6rem',
		display: 'inline block',
		overflow: 'hidden',
	},
});
export default useEstilos;
