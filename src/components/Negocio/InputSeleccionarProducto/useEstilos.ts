import {makeStyles} from '@material-ui/core/styles';

const useEstilos = makeStyles((theme) => ({
	helperText: {
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
		overflow: 'hidden',
	},
}));

export default useEstilos;
