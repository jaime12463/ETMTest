import {makeStyles, createStyles} from '@material-ui/styles';
import theme from 'theme';

const useEstilos = makeStyles(() =>
	createStyles({
		root: {
			width: '100%',
			paddingBottom: 0,
			overflow: 'hidden',
		},
		expand: {
			position: 'relative',
			transform: 'rotate(0deg)',
			marginLeft: 'auto',
			padding: 0,
		},
		expandOpen: {
			transform: 'rotate(180deg)',
		},
		cardContent: {
			margin: 0,
			paddingBottom: 0,
			padding: 5,
			'&:last-child': {
				paddingBottom: 0,
			},
		},
		cardContentExpand: {
			paddingTop: 0,
		},
	})
);

export default useEstilos;
