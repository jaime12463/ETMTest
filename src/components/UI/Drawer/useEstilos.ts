import {makeStyles, createStyles} from '@material-ui/styles';
import theme from 'theme';

const useEstilos = makeStyles(() =>
	createStyles({
		title: {
			background: theme.palette.primary.main,
			display: 'flex',
			justifyContent: 'center',
			position: 'sticky',
			top: 0,
			width: '100%',
			zIndex: 99,
		},
		puller: {
			backgroundColor: '#E5E5E5',
			borderRadius: 3,
			height: '4px',
			left: '50%',
			position: 'absolute',
			transform: 'translateX(-50%)',
			top: '8px',
			width: '153px',
		},
		content: {
			maxWidth: '360px',
			width: '100%',
		},
	})
);

export default useEstilos;
