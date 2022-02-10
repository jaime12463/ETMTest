import {makeStyles, createStyles} from '@material-ui/styles';

const useEstilos = makeStyles(() =>
	createStyles({
		content: {
			padding: '20px 10px',
			maxWidth: '360px',
			width: '100%',
		},
	})
);

export default useEstilos;
