import {makeStyles} from '@material-ui/styles';

const useEstilos = makeStyles(() => ({
	helperText: {
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
		overflow: 'hidden',
	},
}));

export default useEstilos;
