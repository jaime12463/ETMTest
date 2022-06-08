import {makeStyles, createStyles} from '@material-ui/styles';
import theme from 'theme';

const useEstilos = makeStyles(() =>
	createStyles({
		title: {
			alignItems: 'center',
			background: theme.palette.primary.main,
			display: 'flex',
			flexDirection: 'column',
			paddingInline: '14px',
			position: 'sticky',
			top: 0,
			width: '100%',
			zIndex: 99,
		},
		content: {
			flex: 1,
			overflowY: 'auto',
			width: '100%',
		},
	})
);

export default useEstilos;
