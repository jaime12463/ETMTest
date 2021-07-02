import {makeStyles} from '@material-ui/core/styles';
const useEstilos = makeStyles({
	container: {
		marginTop: 12,
		maxHeight: 150,
	},
	alignment: {
		textAlign: 'center',
	},
	text: {
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
		width: '11rem',
		display: 'inline block',
		overflow: 'hidden',
	},
});
export default useEstilos;
