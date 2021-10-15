import {makeStyles, createStyles} from '@material-ui/styles';
import {Theme} from '@mui/material';

const useEstilos = makeStyles((theme: Theme) =>
	createStyles({
		root: {
      '&.MuiSwitch-root': {
      }
    },
	})
);

export default useEstilos;
