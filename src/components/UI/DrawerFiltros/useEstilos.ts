import {makeStyles, createStyles} from '@material-ui/styles';

const useEstilos = makeStyles(() =>
	createStyles({
		content: {
			display: 'flex',
			flexDirection: 'column',
			height: '100%',
			justifyContent: 'space-between',
			width: '100%',
		},
	})
);

export default useEstilos;
