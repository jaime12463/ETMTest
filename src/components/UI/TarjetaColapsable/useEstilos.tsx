import {makeStyles, createStyles} from '@material-ui/styles';
import {Theme} from '@mui/material';
const useEstilos = makeStyles((theme: Theme) =>
	createStyles({
		expand: {
			transform: 'rotate(0deg)',
			padding: 0,
		},
		expandOpen: {
			transform: 'rotate(180deg)',
		},
	})
);

export default useEstilos;
